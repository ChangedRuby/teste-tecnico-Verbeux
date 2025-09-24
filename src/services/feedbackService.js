import axios from 'axios'

const handleFeedback = async (messageData) => {
    try {
        const response = await axios.post('/api/oneshot', messageData);

        return response.data;
    } catch(err){
        console.error('Erro ao enviar mensagem');
    }
}

export default handleFeedback;