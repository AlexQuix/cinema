import { NextApiRequest, NextApiResponse } from "next";

function getQueryString(query){
    let q = "";
    if(query.with_genres)
        q += `&with_genres=${query.with_genres}`;

    if(query.sort_by)
        q += `&sort_by=${query.sort_by}`;

    return q;
}

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

        let queryString = `language=en-US&page=1` + getQueryString(req.query);
        let dataRes = await fetch(`${NEXT_PUBLIC_API_BASE}/discover/${mediatype}?${queryString}`, headers);
        let data = await dataRes.json() as ITrendingResult;
        res.status(200).send(data.results)
    }catch(e){
        res.status(500).send("Error");
    }
}