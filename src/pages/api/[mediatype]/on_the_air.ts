import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    try{
        let { mediatype } = req.query;
        let { NEXT_PUBLIC_API_BASE, NEXT_PUBLIC_API_KEY } = process.env;

        let headers:RequestInit = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + NEXT_PUBLIC_API_KEY
            }
        };

        let dataRes = await fetch(`${NEXT_PUBLIC_API_BASE}/${mediatype}/on_the_air?language=en-US&page=1`, headers);
        let data = await dataRes.json() as ITrendingResult;
        
        res.status(200).send(data.results)
    }catch(e){
        res.status(500).send("Error");
    }
}