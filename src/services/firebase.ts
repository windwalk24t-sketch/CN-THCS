import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  getDocFromServer,
  query,
  orderBy,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { StudentSubmission, EXAM_STORAGE_KEY } from '../data/examData';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore (handling custom databaseId if configured)
export const db =
  firebaseConfig.firestoreDatabaseId &&
  firebaseConfig.firestoreDatabaseId !== '(default)'
    ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
    : getFirestore(app);

// Collection name for live cloud submissions
const SUBMISSIONS_COLLECTION = 'exam_submissions';

// Test connection on boot
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('[Firestore] Connected to Cloud Database successfully.');
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('[Firestore] Client appears offline, checking configuration.');
      return false;
    }
    // Document not found is fine, connection succeeded
    return true;
  }
}

// Initial connection test
testFirestoreConnection();

/**
 * Save a new student submission to Firestore Cloud Database
 * and maintain local fallback storage.
 */
export async function saveSubmissionToCloud(
  submission: StudentSubmission
): Promise<void> {
  // Always update local storage first as resilient cache
  try {
    const raw = localStorage.getItem(EXAM_STORAGE_KEY);
    const localList: StudentSubmission[] = raw ? JSON.parse(raw) : [];
    const updatedLocal = [
      submission,
      ...localList.filter((s) => s.id !== submission.id),
    ];
    localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(updatedLocal));
  } catch (err) {
    console.warn('LocalStorage save failed', err);
  }

  // Save to Firestore
  try {
    const docRef = doc(db, SUBMISSIONS_COLLECTION, submission.id);
    const payload = {
      ...submission,
      createdAt: Date.now(),
    };
    await setDoc(docRef, payload);
    console.log('[Firestore] Submission saved to cloud:', submission.id);
  } catch (err) {
    console.error('[Firestore] Failed to save submission to cloud:', err);
    throw err;
  }
}

/**
 * Real-time listener for all submissions across any devices.
 * Invokes callback whenever any student on any machine submits or teacher grades.
 */
export function subscribeToSubmissions(
  onUpdate: (submissions: StudentSubmission[]) => void,
  onError?: (error: Error) => void
): () => void {
  try {
    const colRef = collection(db, SUBMISSIONS_COLLECTION);
    const q = query(colRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const cloudList: StudentSubmission[] = [];
        snapshot.forEach((d) => {
          cloudList.push(d.data() as StudentSubmission);
        });

        // Merge with any local submissions
        try {
          const raw = localStorage.getItem(EXAM_STORAGE_KEY);
          if (raw) {
            const localList: StudentSubmission[] = JSON.parse(raw);
            localList.forEach((localSub) => {
              if (!cloudList.some((c) => c.id === localSub.id)) {
                cloudList.push(localSub);
              }
            });
          }
          // Update local cache
          localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(cloudList));
        } catch {
          // Ignore
        }

        onUpdate(cloudList);
      },
      (error) => {
        console.error('[Firestore] Real-time subscription error:', error);
        onError?.(error);

        // Fallback to local storage if Firestore connection errors
        try {
          const raw = localStorage.getItem(EXAM_STORAGE_KEY);
          if (raw) {
            onUpdate(JSON.parse(raw));
          }
        } catch {
          // Ignore
        }
      }
    );

    return unsubscribe;
  } catch (err) {
    console.error('[Firestore] Failed to establish subscription:', err);
    return () => {};
  }
}

/**
 * Update an existing submission (e.g. Teacher grading, scores, feedback)
 */
export async function updateSubmissionInCloud(
  submissionId: string,
  updates: Partial<StudentSubmission>
): Promise<void> {
  // Update local storage
  try {
    const raw = localStorage.getItem(EXAM_STORAGE_KEY);
    if (raw) {
      const list: StudentSubmission[] = JSON.parse(raw);
      const updatedList = list.map((s) =>
        s.id === submissionId ? { ...s, ...updates } : s
      );
      localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(updatedList));
    }
  } catch {
    // Ignore
  }

  // Update in Firestore
  try {
    const docRef = doc(db, SUBMISSIONS_COLLECTION, submissionId);
    await updateDoc(docRef, updates as any);
    console.log('[Firestore] Submission updated:', submissionId);
  } catch (err) {
    console.error('[Firestore] Failed to update submission in cloud:', err);
    throw err;
  }
}

/**
 * Delete a submission from Cloud Database
 */
export async function deleteSubmissionFromCloud(
  submissionId: string
): Promise<void> {
  // Delete from local storage
  try {
    const raw = localStorage.getItem(EXAM_STORAGE_KEY);
    if (raw) {
      const list: StudentSubmission[] = JSON.parse(raw);
      const updatedList = list.filter((s) => s.id !== submissionId);
      localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(updatedList));
    }
  } catch {
    // Ignore
  }

  // Delete from Firestore
  try {
    const docRef = doc(db, SUBMISSIONS_COLLECTION, submissionId);
    await deleteDoc(docRef);
    console.log('[Firestore] Submission deleted from cloud:', submissionId);
  } catch (err) {
    console.error('[Firestore] Failed to delete submission from cloud:', err);
    throw err;
  }
}

/**
 * One-off fetch all submissions from Firestore
 */
export async function fetchAllSubmissions(): Promise<StudentSubmission[]> {
  try {
    const colRef = collection(db, SUBMISSIONS_COLLECTION);
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const list: StudentSubmission[] = [];
    snapshot.forEach((d) => list.push(d.data() as StudentSubmission));
    return list;
  } catch (err) {
    console.warn('[Firestore] getDocs failed, fallback to local', err);
    try {
      const raw = localStorage.getItem(EXAM_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}
