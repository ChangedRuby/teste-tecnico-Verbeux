import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './style.css'
import Trash from '../../assets/react.svg'
import handleFeedback from '../../services/feedbackService.js'
import createSession from '../../services/sessionService.js'

function FeedbackPage() {

  const [messages, setMessages] = useState([]);

  const inputMessage = useRef();
  const location = useLocation();

  const receivedData = location.state?.responseData;
  console.log(receivedData);

  const sessionID = receivedData.id;

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
      setMessages(messages => [...messages, response]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // handleCreateSession();
  }, [])

  useEffect(() => {
    messages.forEach((msg) => {
      console.log(msg);
    })
  }, [messages])


  return (
    <div className='container'>
      <form>
        <h1>Sugerir Feedback</h1>
        <input name='mensagem' type='text' placeholder='Message' ref={inputMessage}></input>
        <button type='button' onClick={() => sendFeedback(inputMessage.current.value)}>Enviar</button>
        <p>Chat criado com id: {sessionID}</p>
      </form>

      {messages.map((msg) => (
        <div key={msg.id} className='messageCard'>
          <div>
            {msg.response.map((singleData, i) => {
              if (singleData.type == "imageV2") {
                return <img key={i} src={singleData.data.url}></img>;
              }
            })}
          </div>
          <div>
            {msg.response.map((singleData, i) => {
              if (singleData.type == "text") {
                return <p key={i}>{singleData.data}</p>;
              }
            })}
          </div>
          <button>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default FeedbackPage
