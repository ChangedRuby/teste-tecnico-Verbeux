import axios from 'axios'

async function handler(req, res){
    if(req.method !== 'PUT'){
        return res.status(405).json({ message: 'Only method PUT allowed'});
    }
    
    try {
        const externalApiUrl = 'https://generative-api.verbeux.com.br/session/7b2f5903-8354-4146-af7e-1ffdf750434b';
        
        const apiResponse = await axios.put(externalApiUrl, req.body, {
            headers: {
                'Api-Key': '77fb6a79-6873-49d8-bbea-6f11b3a99be0',
                'accept': 'application/json', 
                'Content-Type': 'multipart/form-data', 
            },
        });

        return res.status(apiResponse.status).json(apiResponse.data);
    } catch (err){
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }


}

export default handler;