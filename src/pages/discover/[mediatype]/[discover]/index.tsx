import React, {useEffect, useState} from "react";
import {GetServerSideProps} from "next";

import ERROR from "@container/error";
import Navegation from "@container/navegation";
import Header from "@container/header";
import FilterPanel from "@container/filter-panel";
import MediaResult from "@container/media-results";

function Discover({query, items}){
    let [pageError, setPageError] = useState<boolean>(false)
    let [url, setUrl] = useState<string|undefined>(undefined);
    if(!(query.mediatype == "movie" || query.mediatype == "tv") || pageError){
        return <ERROR/>
    }
    return (<>
        <Header/>
        <Navegation/>
        <div className="container">
            <FilterPanel items={items} query={query} state={[url, setUrl]}/>
            {url?
                <MediaResult mediatype={query.mediatype} url={url}/>
                :undefined
            }
        </div>
        <style jsx>{`
            .container{
                width: 100%;
                position: relative;
            }
        `}</style>
    </>)
};

export const getServerSideProps:GetServerSideProps = async function (context){
    let {mediatype} = context.query;
    let resp = await fetch(`https://api.themoviedb.org/3/genre/${mediatype}/list?api_key=36e9bc3df49bcf8ff1978a5075c591c1`);
    let json = await resp.json();
    let discover = {
        movie:[
            {id:"popular", name:"Popular"},
            {id:"now_playing", name:"Now Playing"},
            {id:"upcoming", name:"Upcoming"},
            {id:"top_rated", name:"Top Rated"},
        ],
        tv:[
            {id:"popular", name:"Popular"},
            {id:"airing_today", name:"Airing Today"},
            {id:"on_the_air", name:"Currently Airing"},
            {id:"top_rated", name:"Top Rated"},
        ]
    };
    let sorf = [
        {id:"popularity.asc", name:"Popularity Ascending"},
        {id:"popularity.desc", name:"Popularity Descending"},
        {id:"primary_release_date.asc", name:"Release Date Ascending"},
        {id:"primary_release_date.desc", name:"Release Date Descending"},
        {id:"title.asc", name:"Title (A-Z)"},
        {id:"title.desc", name:"Title (Z-A)"},
        {id:"vote_average.asc", name:"Rating Ascending"},
        {id:"vote_average.desc", name:"Rating Descending"},
    ];
    return {
        props: {
            query: context.query,
            items:{
                genre:json.genres,
                sorf,
                discover: discover[mediatype as string]
            }
        }
    };
};

export default Discover;