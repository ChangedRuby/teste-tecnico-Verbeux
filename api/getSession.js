import axios from 'axios'

async function handler(req, res){
    if(req.method !== 'GET'){
        return res.status(405).json({ message: 'Only method GET allowed'});
    }
    
    try {
        const sessionID = req.query.sessionID;
        const externalApiUrl = `https://generative-api.verbeux.com.br/session/${sessionID}`;
        
        const apiResponse = await axios.get(externalApiUrl, {
            headers: {
                'Api-Key': process.env.API_KEY,
                'accept': 'application/json', 
            },
        });

        return res.status(apiResponse.status).json(apiResponse.data);
    } catch (err){
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }


}

export default handler;