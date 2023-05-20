import {NextApiResponse, NextApiRequest} from "next";

let getJson = async (url:string)=>{
    let resp = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        }
    });
    let json = await resp.json();
    let results = json.results as Search.MovieAndTV[];
    return results;
}

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    let {mediatype, id, typesearch} = req.query;
    try{
        if(typesearch == "find" && id){
            let results = await getJson(`https://api.themoviedb.org/3/${mediatype}/${id}/videos`);
            if(results){
                res.status(200).json(results);
                return;
            }
            throw "error";
        }


        let results = await getJson(`https://api.themoviedb.org/3/trending/${mediatype}/day`) as Search.MovieAndTV[];
        return res.status(200).json([results[0], results[1]]);
        // if(results){
        //     let promiseTrailers:Promise<Response>[] = [];
        //     let dataTrailers: Movie.Video[] = [];
        //     for (let media of results){
        //         promiseTrailers.push(fetch(`https://api.themoviedb.org/3/${mediatype}/${media.id}/videos`));
        //     }
        //     for await(let promise of promiseTrailers){
        //         let json = await promise.json();
        //         if(json.results){
        //             let results = json.results as Movie.Video[];
        //             let trailer = results[results.length-1];
        //             trailer.id = json.id;
        //             dataTrailers.push(trailer);
        //         }
        //     }
        //     res.status(200).json(dataTrailers);
        //     return;
        // }
    }catch(e){
        res.status(404).json("error, data not found");
    }
}