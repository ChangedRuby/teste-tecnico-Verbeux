import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Default message from documentation in case i need it

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

if (getApps().length === 0) {
    initializeApp({
        credential: cert(serviceAccount)
    });
}

const db = getFirestore();

async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only method POST allowed' });
    }

    try {
        const { feedbackText, feedbackType, sessionID } = req.body;

        if (!feedbackText) {
            return res.status(400).json({ message: 'message paremeter is required' });
        }

        const newFeedback = {
            message: feedbackText,
            feedbackStatus: feedbackType,
            sessionID: sessionID || null,
            messageDate: new Date(),
        };

        const docRef = await db.collection('feedbacks').add(newFeedback);
        
        console.log("Feedback saved with ID: "+docRef.id);

        return res.status(201).json({ message: 'Feedback sent with success', id: docRef.id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error when sensing feedback to Firestore' });
    }


}

export default handler;