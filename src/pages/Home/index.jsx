import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/react.svg'
import handleFeedback from '../../services/feedbackService.js'
import createSession from '../../services/sessionService.js'

function Home() {

  async function handleCreateSession(){
    const post = {
      'assistant_id': 945,
    }

    try {
      const response = await createSession(post);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // handleCreateSession();
  }, [])


  return (
    <div className='container'>
      <div className='form'>
        <h1>Bem vindo a página de Feedback</h1>
        <button onClick={handleCreateSession}>Abrir sessão de chat</button>
      </div>
    </div>
  )
}

export default Home
