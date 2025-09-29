import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig'
import styles from './style.module.scss'

function FeedbackHistory() {

  const [positiveFeedbacks, setPositiveFeedbacks] = useState([]);
  const [negativeFeedbacks, setNegativeFeedbacks] = useState([]);

  const navigate = useNavigate();

  async function handleFeedbacks(db) {
    try {
      const feedbacksQuery = query(collection(db, "feedbacks"), orderBy("messageDate", "desc"));

      const querySnapshot = await getDocs(feedbacksQuery);

      const positiveData = [];
      const negativeData = [];

      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);

        // separates the itens from doc.data to the new JSON with doc.id
        const feedback = { id: doc.id, ...doc.data() };
        if (feedback.feedbackStatus == "POSITIVE") {
          positiveData.push({ id: doc.id, ...doc.data() });
        }
        if (feedback.feedbackStatus == "NEGATIVE") {
          negativeData.push({ id: doc.id, ...doc.data() });
        }
      });
      setPositiveFeedbacks(positiveData);
      setNegativeFeedbacks(negativeData);
    } catch (err) {
      console.err("Error when fetching Firebase data", err);
    }
  }








  useEffect(() => {
    handleFeedbacks(db);
  }, [])

  useEffect(() => {
    // console.log(positiveFeedbacks);
  }, [positiveFeedbacks])




  return (
    <div className={styles.container}>
      <h1>Feedback History</h1>
      <button className={styles.back} onClick={() => navigate('/')}>Back</button>
      <div className={styles.feedbacksHolder}>
        <div className={styles.messagesHolder}>
          <h1>Positive Feedback History</h1>
          {positiveFeedbacks.map((feedback, i) => (
            <div key={feedback.id} className={styles.messageCard}>
              <div>
                <p>{feedback.message}</p>
                <small>{`${feedback.messageDate?.toDate().toLocaleString('pt-BR')}`}</small>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.messagesHolder}>
          <h1>Negative Feedback History</h1>
          {negativeFeedbacks.map((feedback, i) => (
            <div key={feedback.id} className={styles.messageCard}>
              <div>
                <p>{feedback.message}</p>
                <small>{`${feedback.messageDate?.toDate().toLocaleString('pt-BR')}`}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className={styles.footer}>&copy; 2025 Gustavo Macêdo. All rights reserved.</footer>
    </div>
  )
}

export default FeedbackHistory
