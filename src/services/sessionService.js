import axios from 'axios'

export const createSession = async (sessionData) => {
    try {
        const response = await axios.post('/api/postSession', sessionData);

        return response.data;
    } catch(err){
        console.error('Error when creating session', err);
    }
}

export const sendMsgToSession = async (sessionData) => {
    try {
        const response = await axios.put('/api/putSession', sessionData);

        return response.data;
    } catch(err){
        console.error('Error when sending message', err);
    }
}

export const retrieveSession = async (sessionID) => {
    try {
        const response = await axios.get('/api/getSession', { params: {sessionID} });

        return response.data;
    } catch(err){
        console.error('Error when sending message', err);
    }
}