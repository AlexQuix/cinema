import React from "react";
import useSWR from "swr";
import LINK from "next/link";

import style from "./styles/media-results.module.css";
import Card from "@components/card-media"

function MediaResults({mediatype, url}){
    let {data, error} = useSWR(`/api/${mediatype}/discover?${url}`);
    if(error){
        return <></>
    }
    if(!data){
        return <h1>Loading</h1>
    }
    let packData = data.results as Search.MovieAndTV[];
    return (
        <div className={style["container"]}>
            <div className={style["wrapper-cards"]}>
                {packData.map((data)=>
                    <Card key={data.id} href={`/${mediatype}/${data.id}`} result={data} mediatype={mediatype}></Card>
                )}
            </div>
        </div>
    )
}

export default MediaResults;