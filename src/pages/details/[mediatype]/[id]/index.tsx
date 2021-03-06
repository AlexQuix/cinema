import React from "react";
import HEAD from "next/head"
import {InferGetServerSidePropsType, GetServerSideProps} from "next";

import Navegation from "@container/navegation";
import DetailsMedia from "@container/media-details";
import ContentTrailers from "@container/content-trailers";
import WrapperCredits from "@components/wrapper-credits";
import Header from "@container/header";


function Details({data, mediatype, id, urlTrailer}:{data:TVShow.Details|Movie.Details|any, mediatype:string, id:number, urlTrailer:string}){
    if(!data.sucess && !data.id){
        return <>No found</>
    }
    return(<>
        <Header/>
        <div
            style={{background:"#1a1d29", position:"relative", overflow: "hidden"}}
        >
            <Navegation/>
            <DetailsMedia data={data} mediatype={mediatype}/>
            <ContentTrailers
                    url={()=>`/api/${mediatype}/trailer?typesearch=find&id=${id}`}
                    styletype={1}
                    children={([], style)=>(<>
                        <header className={style["title-style-1"]}>
                            <h1>Last Trailers</h1>
                        </header>
                    </>)}
                />
            <WrapperCredits mediatype={mediatype} id={id}/>
        </div>
    </>);
}

export const getServerSideProps:GetServerSideProps = async function (context){
    let {mediatype, id} = context.query;
    let {   NEXT_PUBLIC_URL_MOVIE, 
            NEXT_PUBLIC_URL_TV, 
            NEXT_PUBLIC_URL_PEOPLE, 
            NEXT_PUBLIC_API_KEY,
            NEXT_PUBLIC_BASE_URL,
            NEXT_PUBLIC_URL_APPEND} = process.env;
    let querys = {
        movie: (id)=>`${NEXT_PUBLIC_URL_MOVIE + id + NEXT_PUBLIC_API_KEY + NEXT_PUBLIC_URL_APPEND + "release_dates"}`,
        tv: (id)=>`${NEXT_PUBLIC_URL_TV + id + NEXT_PUBLIC_API_KEY + NEXT_PUBLIC_URL_APPEND + "content_ratings"}`,
        people: (id)=>`${NEXT_PUBLIC_URL_PEOPLE + id + NEXT_PUBLIC_API_KEY}`
    };
    let url = querys[mediatype as string](id);
    let resp = await fetch(url);
    let json = await resp.json();
    let data:TVShow.Details | Movie.Details = json;
    let urlTrailer = `${NEXT_PUBLIC_BASE_URL}/${mediatype}/${id}/videos${NEXT_PUBLIC_API_KEY}`;
    return {
        props: {
            data,
            mediatype,
            id,
            urlTrailer
        }
    }
}

export default Details;