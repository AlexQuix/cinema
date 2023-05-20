import React, {useEffect, useState} from "react";
import {GetServerSideProps} from "next";

import ERROR from "@container/error";
import Navegation from "@container/navegation";
import Header from "@container/header";
import FilterPanel, { IQuery } from "@container/filter-panel";
import MediaResult from "@container/media-results";

let sort = [
    {id:"popularity.asc", name:"Popularity Ascending"},
    {id:"popularity.desc", name:"Popularity Descending"},
    {id:"primary_release_date.asc", name:"Release Date Ascending"},
    {id:"primary_release_date.desc", name:"Release Date Descending"},
    {id:"title.asc", name:"Title (A-Z)"},
    {id:"title.desc", name:"Title (Z-A)"},
    {id:"vote_average.asc", name:"Rating Ascending"},
    {id:"vote_average.desc", name:"Rating Descending"},
];

function getQueryString(query: {
    genre: string,
    sort: string,
}):string{
    let q:string = "";

    if( query.genre ) q += `with_genres=${query.genre}`;
    if( query.sort ) q += `&sort_by=${query.sort}`;

    return q;
}

function Discover({media, genres}){
    let [url, setUrl] = useState<string>("");

    useEffect(()=>{
        setUrl(`/api/${media}/discover`);
    }, [media])

    if(!(media == "movie" || media == "tv")){
        return <ERROR/>
    }

    return (<>
        <style jsx>{`
            .container{
                width: 100%;
                position: relative;
            }
        `}</style>
        <Header/>
        <Navegation/>
        <div className="container">
            <FilterPanel sorf={sort}
                        genres={genres}
                        media={media}
                        onSearch={(query)=>{
                            let queryString = getQueryString({
                                genre: query.genre.name,
                                sort: query.sorf.id as string
                            })

                            let newUrl = `/api/${media}/discover?${queryString}`;
                            setUrl(newUrl);
                        }}/>
            
            { url
                ? <MediaResult mediatype={media} url={url}/>
                : undefined }
        </div>
    </>)
};

export const getServerSideProps:GetServerSideProps = async function ({req, query}){
    let { mediatype } = query;
    let { host } = req.headers;

    try{    
        let protocol = req.headers['x-forwarded-proto'] || 'http';
        let url = `${protocol}://${host}/api/${mediatype}/genre`;
        let resp = await fetch(url);
        let data = await resp.json();
        
        return {
            props: {
                media: mediatype,
                genres: data
            }
        };
    }catch(e){
        return {
            props: { media: mediatype, genres: null }
        }
    }
};

export default Discover;