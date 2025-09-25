import axios from 'axios'

async function handler(req, res){
    if(req.method !== 'POST'){
        return res.status(405).json({ message: 'Only method POST allowed'});
    }
    
    try {
        const externalApiUrl = 'https://generative-api.verbeux.com.br/session/one-shot';
        
        const apiResponse = await axios.post(externalApiUrl, req.body, {
            headers: {
                'Api-Key': process.env.API_KEY,
                'accept': 'application/json', 
                'Content-Type': 'multipart/form-data', 
            },
        });

        return res.status(apiResponse.status).json(apiResponse.data);

        // const apiResponse = await fetch(externalApiUrl, {
        //     method: 'POST',
        //     headers: {
        //         'Api-Key': '77fb6a79-6873-49d8-bbea-6f11b3a99be0',
        //         'accept': 'application/json', 
        //         'Content-Type': 'multipart/form-data', 
        //     },
        //     body: JSON.stringify(req.body),
        // })

        // const data = await apiResponse.json();
    } catch (err){
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }


}

export default handler;