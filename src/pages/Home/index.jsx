import { useEffect, useState } from 'react'
import './style.css'
import Trash from '../../assets/react.svg'
import handleFeedback from '../../services/feedbackService.js'

function Home() {

  const [messages, setMessages] = useState([]);

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
      console.log(response.response[0].data);
    } catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    sendFeedback();
  }, [])


  return (
    <div className='container'>
      <form>
        <h1>Sugerir Feedback</h1>
        <input name='mensagem' type='text' placeholder='Message'></input>
        <button type='button'>Enviar</button>
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
