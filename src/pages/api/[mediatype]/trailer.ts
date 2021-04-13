import {NextApiResponse, NextApiRequest} from "next";

let getJson = async (url:string)=>{
    let resp = await fetch(url);
    let json = await resp.json();
    let results = json.results as Search.MovieAndTV[];
    return results;
}

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    let {mediatype, id, typesearch} = req.query;
    try{
        if(typesearch == "find" && id){
            let results = await getJson(`https://api.themoviedb.org/3/${mediatype}/${id}/videos?api_key=36e9bc3df49bcf8ff1978a5075c591c1`);
            if(results){
                res.status(200).json(results);
                return;
            }
            throw "error";
        }
        let results = await getJson(`https://api.themoviedb.org/3/trending/${mediatype}/day?api_key=36e9bc3df49bcf8ff1978a5075c591c1`) as Search.MovieAndTV[];
        if(results){
            let promiseTrailers:Promise<Response>[] = [];
            let dataTrailers: Movie.Video[] = [];
            for (let media of results){
                promiseTrailers.push(fetch(`https://api.themoviedb.org/3/${mediatype}/${media.id}/videos?api_key=36e9bc3df49bcf8ff1978a5075c591c1`));
            }
            for await(let promise of promiseTrailers){
                let json = await promise.json();
                if(json.results){
                    let results = json.results as Movie.Video[];
                    let trailer = results[results.length-1];
                    trailer.id = json.id;
                    dataTrailers.push(trailer);
                }
            }
            res.status(200).json(dataTrailers);
            return;
        }
        throw "error";
    }catch(e){
        res.status(404).json("error, data not found");
    }
}