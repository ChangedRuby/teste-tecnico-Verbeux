import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss'
import { createSession, sendMsgToSession } from '../../services/sessionService.js'

function Home() {

  const navigate = useNavigate();

  async function handleCreateSession() {
    const post = {
      'assistant_id': 945,
    }

    try {
      const response = await createSession(post);

      navigate('/give-feedback', { state: { responseData: response } });
    } catch (err) {
      console.log(err);
    }
  }
  
  function handleFeedbackHistoryNavigation(){
    navigate('/feedback-history');
  }

  useEffect(() => {
    
  }, [])


  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Welcome to HungryFood's Feedback Page</h1>
        <button onClick={handleCreateSession}>Open chat ticket</button>
        <button onClick={handleFeedbackHistoryNavigation}>See feedbacks</button>
      </div>
      <footer className={styles.footer}>&copy; 2025 Gustavo Macêdo. All rights reserved.</footer>
    </div>
  )
}

export default Home
