import React, {useEffect, useState} from "react";
import {GetServerSideProps} from "next";

import Navegation from "@container/navegation";
import Header from "@container/header";
import FilterPanel from "@container/filter-panel";
import MediaResult from "@container/media-results";

function Discover({query}){
    let [url, setUrl] = useState<string|undefined>(undefined);
    return (<>
        <Header/>
        <Navegation/>
        <div className="container">
            {query.mediatype == "movie" || query.mediatype == "tv"?
                <FilterPanel query={query} state={[url, setUrl]}/>
                :url
            }
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
}

export const getServerSideProps:GetServerSideProps = async function (context){
    return {
        props: {
            query: context.query
        }
    }
}

export default Discover;