import style from "./styles/media-results.module.css";
import React from "react";
import useSWR from "swr";
import { fetcher } from "src/helpers";

import CardMedia from "@components/card-media"

function MediaResults({mediatype, url}){
    let {data, error, isLoading} = useSWR(url, fetcher);

    if(error || !data){
        return (
        <div className={style["container"]}>
            <h1>Error</h1>
        </div>)
    }

    if(isLoading){
        return (
        <div className={style["container"]}>
            <h1>Loading...</h1>
        </div>)
    }

    return (
        <div className={style["container"]}>
            <div className={style["wrapper-cards"]}>
                {data.map((data)=>
                    <CardMedia key={data.id} 
                        href={`/${mediatype}/${data.id}`} 
                        data={data} />
                )}
            </div>
        </div>
    )
}

export default MediaResults;