import React, {useEffect, useState} from "react";

import style from "./styles/media-details.module.css";

import RatingStar from "@components/rating-star";

let {NEXT_PUBLIC_URL_IMG} = process.env;

function DetailsMedia({data, mediatype}:{data:Movie.Details|TVShow.Details, mediatype:string}){
    let getBackground = (alphat:number)=>`linear-gradient(to right, #1a1d29 7%, rgb(26, 29, 41, ${alphat}) 100%)`;
    let [backgroundTono, setBackgroundTono] = useState(getBackground(0));
    let [ageCertification, setAgeCertification] = useState({} as {iso_3166_1:string, certification:string});

    function filterData<Type, P extends keyof Type>(data:Type, property:P){
        if(data[property]){
            return data[property]
        }
        return undefined;
    }
    function replaceCharacter(text?:string){
        if(text && text.replaceAll){
            return text.replaceAll("-", "/");
        }
        return undefined;
    }
    function convertRuntime(runtime?:number){
        if(runtime){
            if(runtime >= 60){
                let hours = Math.floor(runtime/60);
                let min = runtime%60;
                return `${hours?hours + "h":null} ${min?min + "m":null}`;
            }
            return `${runtime}m`;
        }
    }
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
        function handleScroll(e){
            let aphatShades = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];
            let scrollMeseasures = [0, 50, 100, 150, 200, 250, 300, 350];
            
            for(let i = 0; i < scrollMeseasures.length; ++i){
                if(window.scrollY <= scrollMeseasures[i]){
                    let background = getBackground(aphatShades[i]);
                    setBackgroundTono(background);
                    break;
                }
            };
        };
        window.onscroll = handleScroll;
    }, [backgroundTono]);
    return(
        <section
            className={style["container"]}
        >
            <div className={style["wrapper-img"]}>
                <img src={(NEXT_PUBLIC_URL_IMG as string) + data.backdrop_path} alt=""/>
                <div id="wrapper-background" style={{background: backgroundTono}}></div>
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
            <div
                className={style["container-info"]}

            >
                <div className={style["wrapper-title"]}>
                    <header>
                        <h1>
                            {filterData(data as Movie.Details, "title")}
                            {filterData(data as TVShow.Details, "name")}
                        </h1>
                    </header>
                </div>
                <div className={style["wrapper-rating-star"]}>
                    <RatingStar rating={data.vote_average}/>
                </div>
                <div className={style["wrapper-fact"]}>
                    <span
                        className={style["certification"]}
                    >
                        {ageCertification.iso_3166_1?ageCertification.certification:undefined}
                    </span>
                    <span
                        className={style["release-date"]}
                    >
                        {replaceCharacter(filterData(data as Movie.Details, "release_date"))}
                        {/* {replaceCharacter(filterData(data as TVShow.Details, "first_air_date"))} */}
                    </span>
                    <span>
                        ({data.production_countries[0].iso_3166_1})
                    </span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="9.00018" r="9"/>
                    </svg>
                    <span>
                        {data.genres.map((genre, index)=>{
                            let comma = (index == (data.genres.length - 1))?"":", ";
                            return <span key={genre.id}>{genre.name + comma}</span>   
                        })}
                    </span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="9.00018" r="9"/>
                    </svg>
                    <span className={style["runtime"]}>
                        {convertRuntime(filterData(data as Movie.Details, "runtime"))}
                        {convertRuntime(filterData(data as TVShow.Details, "episode_run_time")?.[0])}
                    </span>
                </div>
                <div className={style["wrapper-review"]}>
                    <p>{data.overview}</p>
                </div>
            </div>
        </section>
    )
}

export default DetailsMedia;