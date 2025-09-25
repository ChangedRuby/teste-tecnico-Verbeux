import axios from 'axios'

async function handler(req, res){
    if(req.method !== 'POST'){
        return res.status(405).json({ message: 'Only method POST allowed'});
    }
    
    try {
        const externalApiUrl = 'https://generative-api.verbeux.com.br/session/';
        
        const apiResponse = await axios.post(externalApiUrl, req.body, {
            headers: {
                'Api-Key': '77fb6a79-6873-49d8-bbea-6f11b3a99be0',
                'accept': 'application/json', 
                'Content-Type': 'application/json', 
            },
        });

        return res.status(apiResponse.status).json(apiResponse.data);
    } catch (err){
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }


}

export default handler;