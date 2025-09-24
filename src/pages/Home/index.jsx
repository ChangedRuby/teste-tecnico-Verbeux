import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/react.svg'
import handleFeedback from '../../services/feedbackService.js'

function Home() {

  const [messages, setMessages] = useState([]);

  const inputMessage = useRef();

  async function sendFeedback(msg) {
    const post = {
      'message': msg,
      'assistant_id': '945',
      'ignore_trigger_response': 'false',
      'force_trigger_call': 'false',
      'client_data': '{}',
      'channel': 'API',
    }

    try {
      const response = await handleFeedback(post);
      setMessages(response.response[0].data);
    } catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    // sendFeedback("hello");
  }, [])

  useEffect(() => {
    console.log(messages);
  }, [messages])


  return (
    <div className='container'>
      <form>
        <h1>Sugerir Feedback</h1>
        <input name='mensagem' type='text' placeholder='Message' ref={inputMessage}></input>
        <button type='button' onClick={() => sendFeedback(inputMessage.current.value)}>Enviar</button>
      </form>

      <div className='cardMsg'>
        <div>
          <p>Mensagem: </p>
          <p></p>
        </div>
        <button>
          <img src={Trash} />
        </button>
      </div>
    </div>
  )
}

export default Home
