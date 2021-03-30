import React from "react";
import useSWR from "swr";

import style from "./styles/trailer.module.css";

let fetcher = (...arch)=>fetch(arch[0]).then(res => res.json());

function Trailer({url, showTrailer}:{url:string, showTrailer:(key:string)=>()=>void}){
    let {data, error} = useSWR(url, fetcher);
    if(error){
        return (
            <div>Un error a ocurrido</div>
        )
    }
    if(!data){
        return (
            <div>Loading...</div>
        )
    }
    let trailers = data.results as Movie.Video[];
    console.log(trailers);
    return (
        <section
            className={style["container"]}
        >
            <header><h1>Trailer</h1></header>
            <div>
                {trailers.map((trailer)=>
                    <span 
                        key={trailer.id}
                        onClick={showTrailer(trailer.key)}
                    >{trailer.name}</span>
                )}
            </div>
        </section>
    );
}

export default Trailer;