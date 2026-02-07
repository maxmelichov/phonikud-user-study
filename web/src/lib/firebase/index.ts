import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, writeBatch, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDhX8O6T5v1wNVFQsQQ4j9_K9jQTNarf2s",
  authDomain: "phonikud-user-study.firebaseapp.com",
  projectId: "phonikud-user-study",
  storageBucket: "phonikud-user-study.firebasestorage.app",
  messagingSenderId: "689783511490",
  appId: "1:689783511490:web:c67b072cff4bc6754a9e5b",
  measurementId: "G-G6SD739KV4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export interface Submission {
  name: string;
  email: string;
  sentence_id: string;
  naturalness_preferred: string; // actual model name
  accuracy_preferred: string;    // actual model name
  timestamp?: Date;
}

export interface CommentSubmission {
  name: string;
  email: string;
  comments: string;
  sessionId: string;
  timestamp?: Date;
}

/**
 * Submit a rating to Firestore
 */
export async function submitSubmission(submission: Submission) {
  try {
    const docRef = await addDoc(collection(db, 'submissions'), {
      ...submission,
      timestamp: new Date()
    });
    console.log('Submission added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding submission:', error);
    throw error;
  }
}

/**
 * Submit multiple ratings in a batch (more efficient)
 */
export async function submitBatch(submissions: Submission[]): Promise<void> {
  try {
    const batch = writeBatch(db);

    submissions.forEach((submission) => {
      const docRef = doc(collection(db, 'submissions'));
      batch.set(docRef, {
        ...submission,
        timestamp: new Date()
      });
    });

    await batch.commit();
    console.log(`Batch of ${submissions.length} submissions added successfully`);
  } catch (error) {
    console.error('Error submitting batch:', error);
    throw error;
  }
}

/**
 * Submit user comments to Firestore
 */
export async function submitComments(commentData: CommentSubmission): Promise<void> {
  try {
    const docRef = await addDoc(collection(db, 'comments'), {
      ...commentData,
      timestamp: new Date()
    });
    console.log('Comments submitted with ID:', docRef.id);
  } catch (error) {
    console.error('Error submitting comments:', error);
    throw error;
  }
}

/**
 * Get all comments from Firestore
 */
export async function getAllComments(): Promise<CommentSubmission[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'comments'));
    return querySnapshot.docs.map(doc => doc.data() as CommentSubmission);
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

/**
 * Get all submissions from Firestore
 */
export async function getAllSubmissions(): Promise<Submission[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'submissions'));
    return querySnapshot.docs.map(doc => doc.data() as Submission);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
}

/**
 * Calculate win-count statistics per model
 */
export interface ModelStats {
  model: string;
  naturalness_wins: number;
  accuracy_wins: number;
  total_comparisons: number;
}

export function calculateStats(submissions: Submission[]): ModelStats[] {
  const modelMap: Record<string, { naturalness_wins: number; accuracy_wins: number; total: number }> = {};

  for (const sub of submissions) {
    for (const model of [sub.naturalness_preferred, sub.accuracy_preferred]) {
      if (!modelMap[model]) {
        modelMap[model] = { naturalness_wins: 0, accuracy_wins: 0, total: 0 };
      }
    }

    modelMap[sub.naturalness_preferred].naturalness_wins++;
    modelMap[sub.accuracy_preferred].accuracy_wins++;
  }

  return Object.keys(modelMap).map(model => ({
    model,
    naturalness_wins: modelMap[model].naturalness_wins,
    accuracy_wins: modelMap[model].accuracy_wins,
    total_comparisons: submissions.length
  }));
}

/**
 * Export all submissions as CSV string
 */
export async function exportToCSV(): Promise<string> {
  try {
    const querySnapshot = await getDocs(collection(db, 'submissions'));

    // CSV header
    const headers = ['name', 'email', 'sentence_id', 'naturalness_preferred', 'accuracy_preferred', 'timestamp'];
    const rows = [headers.join(',')];

    // CSV rows
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const row = [
        data.name,
        data.email,
        data.sentence_id,
        data.naturalness_preferred,
        data.accuracy_preferred,
        data.timestamp?.toDate?.().toISOString() || data.timestamp
      ];
      rows.push(row.join(','));
    });

    return rows.join('\n');
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    throw error;
  }
}
