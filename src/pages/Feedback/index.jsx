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
  console.log("Received data: " + receivedData);

  var sessionID;

  sessionID = receivedData.id;
  // if(receivedData){
  //   sessionID = receivedData.id;
  // } else{
  //   sessionID = 'c142633c-3ff0-4a3f-8668-7ce87f02cf8c';
  // }
  console.log("SessionID: " + sessionID);




  /*
    HOW THE FRONTEND READS MESSAGE JSON:
    {
      id: 'string',
      role: 'string',
      parts: {
        type: 'string'
        content: 'string'
      }
    }









  */



  function formatSingleMessageResponse(apiResponse) {
    const messageParts = apiResponse.response.map((part) => {
      if (part.type == 'text') {
        return { type: 'text', content: part.data }
      }

      if(part.type == 'imageV2'){
        return { type: 'imageV2', content: part.data.url }
      }

      return null;
    }).filter(Boolean);

    console.log(messageParts);

    return {
      id: apiResponse.id,
      role: 'assistant',
      parts: messageParts,
    }
  }

  function formatHistoryResponse(apiResponse) {
    const turnParts = apiResponse.current_conversation.map((turn) => {
      console.log(turn);
      if (turn.role == 'human') {

        const messageParts = turn.content.map((part) => {
          return { type: 'text', content: part.text }
        });

        const formatedData = {
          id: turn.id,
          role: 'human',
          parts: messageParts,
        }
        // console.log(formatedData);
        setMessages(messages => [...messages, formatedData]);
        return formatedData;

      }

      if (turn.role == 'ai') {

        const messageParts = turn.content.map((part) => {
          if(part.type=='function'){
            return { type: 'text', content: 'Registered feedback' }; // retorna se o turn.content possui o parametro arguments, que é a resposta do gatilho que a api respondeu
          } else{
            return { type: 'text', content: part.text }
          }
        });

        const formatedData = {
          id: turn.id,
          role: 'ai',
          parts: messageParts,
        }
        // console.log(formatedData);
        setMessages(messages => [...messages, formatedData]);
        return formatedData;

      }
    });

    return apiResponse;
  }








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
      if (response) {
        const formatedResponse = formatSingleMessageResponse(response);
        console.log(response);
        setMessages(messages => [...messages, formatedResponse]);
        console.log(formatedResponse);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSession(id) {

    try {
      const response = await retrieveSession(id);

      // response.forEach((msg, i) => {

      // })

      // setMessages(messages => [...messages, response.current_conversation[0].content[0].text]);
      console.log(response);
      console.log("Formated history: " + formatHistoryResponse(response));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleSession(sessionID);
  }, [])

  useEffect(() => {
    // messages.forEach((msg) => {
    //   console.log(msg);
    // })
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
            {msg.parts.map((singleData, i) => {
              if (singleData.type == "imageV2") {
                return <img key={i} src={singleData.content}></img>;
              }
            })}
          </div>
          <div>
            {msg.parts.map((singleData, i) => {
              if (singleData.type == "text") {
                return <p key={i}>{singleData.content}</p>;
              }
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FeedbackPage
