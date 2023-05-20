import style from "./styles/content-trailers.module.css";
import React, { useState } from "react";
import useSWR from "swr";

import DisplayTrailer from "@components/display-trailer";
import CardTrailer from "@components/card-trailer";
import BtnMediaSelector from "@components/btn-media-selector";

import LoadingEffect from "@container/loading-effect";
import Carousel from "@container/Carousel";
import CarouselResize from "./carousel-resize";


interface Props{
    url: (mediatype?:"movie"|"tv")=>string;
    choiceMedia?: "movie" | "tv";
    styletype:1|2;
}

let fetcher = (...arch)=>fetch(arch[0]).then(res => res.json());

export default function Trailers({url, choiceMedia, styletype}:Props){
    let [mediatype, setMediatype] = useState<"movie"|"tv">(choiceMedia?choiceMedia:"movie");
    let [trailer, setTrailer] = useState<Media|undefined>(undefined);


    let {data, error} = useSWR<IMovie[]>(url(mediatype), fetcher);

    if(error){
        return <></>
    }

    if(!(data instanceof Array)){
        return (
            <LoadingEffect contentType={"trailer"}/>
        )
    }

    return (<>
        <section className={style["container"]}>
            <div className={style["wrapper-title"]}>
                <header className={style["title-style-2"]}>
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="m245.652344 111.300781c-12.214844-7.089843-26.8125-7.113281-39.050782-.066406-12.273437 7.070313-19.601562 19.761719-19.601562 33.945313v99.640624c0 14.1875 7.328125 26.875 19.605469 33.945313 6.097656 3.511719 12.78125 5.269531 19.46875 5.269531 6.726562 0 13.453125-1.777344 19.578125-5.335937l85.855468-49.816407c12.207032-7.082031 19.492188-19.75 19.492188-33.882812s-7.285156-26.800781-19.492188-33.882812zm-18.652344 131.976563v-96.554688l83.199219 48.277344zm245-34.277344v-129c0-22.054688-17.945312-40-40-40h-352c-22.054688 0-40 17.945312-40 40v230c0 22.054688 17.945312 40 40 40h352c22.054688 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80h-352c-44.113281 0-80-35.886719-80-80v-230c0-44.113281 35.886719-80 80-80h352c44.113281 0 80 35.886719 80 80v129c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20zm40 262c0 11.046875-8.953125 20-20 20h-257c-11.046875 0-20-8.953125-20-20s8.953125-20 20-20h257c11.046875 0 20 8.953125 20 20zm-337 1c0 22.089844-17.910156 40-40 40-15.214844 0-28.441406-8.496094-35.207031-21h-79.792969c-11.046875 0-20-8.953125-20-20s8.953125-20 20-20h80.957031c7.046875-11.398438 19.65625-19 34.042969-19 22.089844 0 40 17.910156 40 40zm0 0"/>
                    </svg>
                    <h1>Last Trailers</h1>
                </header>
                <BtnMediaSelector mediatype={mediatype} setMediaType={setMediatype}/> 
            </div>
            <div className={style["trailers"]}>
                <CarouselResize gapResize={[20,20,20,20,20]}
                            slidesToShowResize={[5, 4, 4, 3, 2]}
                            slidesToMoveResize={[5, 4, 4, 3, 2]}
                            transition={200}
                            slideCount={data.length}
                >
                    <div className={style["slide-viewer-wrapper"]}>
                        <Carousel.SlideViewer>
                            { data.map((trailerData)=>(
                                <Carousel.Slide key={trailerData.id}>
                                    <CardTrailer mediatype={mediatype} 
                                                data={trailerData} 
                                                setTrailer={setTrailer} 
                                                styletype={styletype}/>
                                </Carousel.Slide>
                            ))}
                        </Carousel.SlideViewer>
                    </div>
                    <Carousel.LateralArrows width={18}/>
                </CarouselResize>
            </div>
        </section>
        {
            trailer
                ? <DisplayTrailer trailerData={trailer} setTrailer={setTrailer as any} mediatype={mediatype}/>
                : <div style={{paddingTop: "10px"}}></div>
        } 
    </>);
}