import {NextApiResponse, NextApiRequest} from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    let {mediatype, discover, sorf, genre} = req.query;
    console.log(req.query)
    if(mediatype && discover && sorf){
        let url = `
            https://api.themoviedb.org/3/${mediatype}/${discover}${process.env.NEXT_PUBLIC_API_KEY}&sort_by=${sorf}${(genre)?"&with_genres="+genre:""}
        `;
        let resp = await fetch(url);
        let json = await resp.json();
        res.status(200).json(json);
    }
    res.status(404).json("error");
}