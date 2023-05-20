import style from "./styles/media-details.module.css";
import React, {useEffect, useState} from "react";

import RatingStar from "@components/rating-star";

function removeHyphen(date:string){
    if(!date) return ;

    let generatorDate = date.matchAll(/[0-9]*/g);
    if(generatorDate){
        let year = generatorDate.next().value[0];
        generatorDate.next();
        let moth = generatorDate.next().value[0];
        generatorDate.next();
        let day = generatorDate.next().value[0];

        return `${year}/${moth}/${day}`;
    }
}

function convertRuntime(runtime:number){
    if(!runtime) return;

    if(runtime >= 60){
        let hours = Math.floor(runtime/60);
        let min = runtime%60;
        return `${hours?hours + "h":null} ${min?min + "m":null}`;
    }
    return `${runtime}m`;
}

interface IProps {
    data: MediaDetail;
    mediatype: MediaTypeOptions;
}

function DetailsMedia({data, mediatype}:IProps){
    data.genres = data.genres.slice(0, 2);

    let getBackground = (alphat:number)=>`linear-gradient(to right, #1a1d29 7%, rgb(26, 29, 41, ${alphat}) 100%)`;
    let [backgroundAlpha, setBackgroundAlpha] = useState<number>(0);
    let [ageCertification, setAgeCertification] = useState({} as {iso_3166_1:string, certification:string});

    useEffect(()=>{
        function findAgeCertification(){
            if(mediatype == "movie"){
                let releaseDates = (data as Movie.Details).release_dates?.results;
                if(releaseDates){
                    let {iso_3166_1, release_dates} = releaseDates.filter(chunck=>chunck.iso_3166_1=="US")[0];
                    let result = {
                        iso_3166_1,
                        certification: release_dates[0].certification
                    }
                    setAgeCertification(result);
                }
            }
            if(mediatype == "tv"){
                let contentRatings = (data as TVShow.Details).content_ratings?.results;
                if(contentRatings){
                    let {iso_3166_1, rating} = contentRatings.filter(chunck=>chunck.iso_3166_1 == "US")[0];
                    let result = {iso_3166_1, certification:rating};
                    setAgeCertification(result)
                }
            }
        }
        findAgeCertification();
    }, [])
    useEffect(()=>{
        function handleScroll(){
            let alphatShades = [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 0.9];
            let scrollMeseasures = [0, 50, 100, 150, 200, 250, 300, 350];
            
            if(window.scrollY >= 350 && backgroundAlpha !== 0.9){
                setBackgroundAlpha(0.9);
                return;
            }
            if(window.scrollY <= 350){
                for(let i = 0; i < scrollMeseasures.length; ++i){
                    if(window.scrollY <= scrollMeseasures[i]){
                        setBackgroundAlpha(alphatShades[i]);
                        break;
                    }
                };
                return;
            }
            return;
        };
        handleScroll();
        window.onscroll = handleScroll;

        return function(){
            window.onscroll = ()=>{};
        }
    }, [backgroundAlpha]);

    return(
        <section
            className={style["container"]}
        >
            <div className={style["wrapper-img"]}>
                <img src={(process.env.NEXT_PUBLIC_IMAGE as string) + data.backdrop_path} alt=""/>
                <div id="wrapper-background" style={{background: getBackground(backgroundAlpha)}}></div>
                <style jsx>{`
                    #wrapper-background{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        z-index: 250;
                    }
                `}</style>
            </div>
            <div className={style["container-info"]}>
                <div className={style["wrapper-title"]}>
                    <header>
                        <h1>
                            {mediatype == "movie"?
                                (data as Movie.Details).title
                                :(data as TVShow.Details).name
                            }
                        </h1>
                    </header>
                </div>
                <div className={style["wrapper-fact"]}>
                    <div className={style["column-1"]}>
                        <span className={style["release-date"]}>
                            {mediatype == "movie"?
                                removeHyphen((data as Movie.Details).release_date)
                                :removeHyphen((data as TVShow.Details).first_air_date)
                            }
                        </span>
                        {data.production_countries[0]?
                            <span>
                                ({data.production_countries[0].iso_3166_1})
                            </span>:undefined
                        }
                    </div>
                    {data.vote_average?
                        <div className={style["column-2"]}>
                            <RatingStar rating={data.vote_average}/>
                        </div>:undefined
                    }
                    <div className={style["column-3"]}>
                        {ageCertification.iso_3166_1 && ageCertification.certification?
                            <div
                                className={style["certification"]}
                            >
                                {ageCertification.certification}
                            </div>:undefined
                        }
                        <div className={style["genre"]}>
                            {data.genres.map((genre, index)=>{
                                let comma = (index == (data.genres.length - 1))?"":", ";
                                return <span key={genre.id}>{genre.name + comma}</span>   
                            })}
                        </div>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9" cy="9.00018" r="9"/>
                        </svg>
                        <span className={style["runtime"]}>
                            {mediatype === "movie"?
                                convertRuntime((data as Movie.Details).runtime)
                                :convertRuntime((data as TVShow.Details).episode_run_time[0])
                            }
                        </span>
                    </div>
                </div>
                <div className={style["wrapper-review"]}>
                    <p>{data.overview}</p>
                </div>
            </div>
        </section>
    )
}

export default DetailsMedia;