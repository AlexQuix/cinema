import React, {useState, useEffect} from "react";
import LINK from "next/link";
import useSWR from "swr";

interface ISlide{
    idFocus:number, 
    direction?:"left"|"right"
};
interface Props{
    url: (mediatype?:"movie"|"tv")=>string;
    choiceMedia?: "movie" | "tv";
    children: ([], style:any)=>JSX.Element;
    styletype:1|2;
}

import style from "./styles/content-trailers.module.css";

import ContainerSlide from "@container/container-slide";
import DisplayTrailer from "@components/display-trailer";
import CardTrailer from "@components/card-trailer";
import LoadingEffect from "@container/loading-effect";

let fetcher = (...arch)=>fetch(arch[0]).then(res => res.json());

function ContentTrailers({url, choiceMedia, children, styletype}:Props){
    let slideStyles = ({btnLeft, btnRight}:{btnLeft:string, btnRight:string})=>{
        return `
        #${btnLeft},
        #${btnRight}{
            background: ${(styletype==1)?"#1a1d29a8":"#262626a8"};
            z-index: 500;
        }
    `}
    let [mediatype, setMediatype] = useState<"movie"|"tv">(choiceMedia?choiceMedia:"movie");
    let [slide, setSlide] = useState<ISlide>({idFocus:0,direction: undefined});
    let [trailer, setTrailer] = useState<Movie.Video|undefined>(undefined);

    let {data, error} = useSWR(url(mediatype), fetcher);

    if(error){
        return <></>
    }
    if(!data){
        return (
            <LoadingEffect contentType={"trailer"}/>
        )
    }
    let trailers = data as Movie.Video[];
    return (<>
        <section
            className={style["container"]}
        >
            <div className={style["wrapper-title"]}>
                {children([mediatype, setMediatype], style)}
            </div>
            <div className={style["wrapper-trailers"]}>
                <ContainerSlide
                    styles={slideStyles}
                    attachInfo={{
                        screenSizes:[520, 780],
                        itemsDisplayed:[2, 3, 4],
                        length:trailers.length
                    }}
                    state={[slide, setSlide]}
                >
                    {trailers.map((trailer)=>{
                        return (<CardTrailer key={trailer.id} mediatype={mediatype} trailer={trailer} setTrailer={setTrailer} styletype={styletype}/>);
                    })}
                </ContainerSlide>
            </div>
        </section>
        {trailer?
            <DisplayTrailer trailer={trailer}  setTrailer={setTrailer}/>
            :<div style={{paddingTop: "10px"}}></div>
        } 
    </>);
}

export default ContentTrailers;