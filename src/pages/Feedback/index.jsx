import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './style.css'
import Trash from '../../assets/react.svg'
import handleFeedback from '../../services/oneshotService.js'
import { createSession, sendMsgToSession, retrieveSession } from '../../services/sessionService.js'

function FeedbackPage() {

  const [messages, setMessages] = useState([]);

  const inputMessage = useRef();
  const location = useLocation();

  const receivedData = location.state?.responseData;
  console.log("Received data: "+receivedData);

  var sessionID;

  sessionID = receivedData.id;
  // if(receivedData){
  //   sessionID = receivedData.id;
  // } else{
  //   sessionID = 'c142633c-3ff0-4a3f-8668-7ce87f02cf8c';
  // }
  console.log("SessionID: "+sessionID);

  async function sendFeedback(msg) {
    // Post para chamada api oneshot
    // const post = {
    //   'message': msg,
    //   'assistant_id': '945',
    //   'ignore_trigger_response': 'false',
    //   'force_trigger_call': 'false',
    //   'client_data': '{}',
    //   'channel': 'API',
    // }

    const post = {
      'message': msg,
      'sessionID': sessionID,
      'ignore_trigger_response': 'false',
      'force_trigger_call': 'false',
      'client_data': '{}',
      'channel': 'API',
    }

    try {
      const response = await sendMsgToSession(post);
      if(response){
        console.log(response);
        setMessages(messages => [...messages, response]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSession(id) {

    try {
      const response = await retrieveSession(id);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleSession(sessionID);
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

      {messages.map((msg, i) => (
        <div key={i} className='messageCard'>
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
