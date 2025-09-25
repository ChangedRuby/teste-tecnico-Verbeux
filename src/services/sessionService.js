import axios from 'axios'

const createSession = async (sessionData) => {
    try {
        const response = await axios.post('/api/postSession', sessionData);

        return response.data;
    } catch(err){
        console.error('Erro ao enviar mensagem');
    }
}

export default createSession;