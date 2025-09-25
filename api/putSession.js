import axios from 'axios'

async function handler(req, res){
    if(req.method !== 'PUT'){
        return res.status(405).json({ message: 'Only method PUT allowed'});
    }
    
    try {
        const externalApiUrl = `https://generative-api.verbeux.com.br/session/${req.body.sessionID}`;
        
        const apiResponse = await axios.put(externalApiUrl, req.body, {
            headers: {
                'Api-Key': process.env.API_KEY,
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