import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css'
import createSession from '../../services/sessionService.js'

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
