import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig'
import './style.css'

function FeedbackHistory() {

  const [positiveFeedbacks, setPositiveFeedbacks] = useState([]);
  const [negativeFeedbacks, setNegativeFeedbacks] = useState([]);


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
    <div className='container'>
      <h1>Feedback History</h1>
      <div className='feedbacksHolder'>
        <div className='messagesHolder'>
          <h1>Positive Feedback History</h1>
          {positiveFeedbacks.map((feedback, i) => (
            <div key={feedback.id} className='messageCard'>
              <div>
                <p>{feedback.message}</p>
                <small>{`${feedback.messageDate?.toDate().toLocaleString('pt-BR')}`}</small>
              </div>
            </div>
          ))}
        </div>

        <div className='messagesHolder'>
          <h1>Negative Feedback History</h1>
          {negativeFeedbacks.map((feedback, i) => (
            <div key={feedback.id} className='messageCard'>
              <div>
                <p>{feedback.message}</p>
                <small>{`${feedback.messageDate?.toDate().toLocaleString('pt-BR')}`}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeedbackHistory
