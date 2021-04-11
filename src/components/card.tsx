import React from "react";

interface Props{
    result:Search.MovieAndTV,
    mediatype:"movie"|"tv"
}

import style from "./styles/card-media.module.css";

import RatingStar from "@components/rating-star";

function Card({result, mediatype}:Props){
    if(mediatype == "movie"){
        let data = result as Movie.Search;
        return (
            <div className={style["container"]}>
                <div className={style["wrapper-ratingstar"]}>
                    <RatingStar rating={data.vote_average}/>
                </div>
                <div className={style["wrapper-img"]}>
                    <img src={process.env.NEXT_PUBLIC_URL_IMG + data.poster_path} alt=""/>
                </div>
                <div className={style["wrapper-info"]}>
                    <h1 className={style["title"]}>{data.original_title}</h1>
                    <h3 className={style["date"]}>{data.release_date}</h3>
                </div>
            </div>
        )
    }
    let data = result as TVShow.Search;
    return (
        <div className={style["container"]}>
            <div className={style["wrapper-ratingstar"]}>
                <RatingStar rating={data.vote_average}/>
            </div>
            <div className={style["wrapper-img"]}>
                <img src={process.env.NEXT_PUBLIC_URL_IMG + data.poster_path} alt=""/>
            </div>
            <div className={style["wrapper-info"]}>
                <h1 className={style["title"]}>{data.original_name}</h1>
                <h3 className={style["date"]}>{data.first_air_date}</h3>
            </div>
        </div>
    )
};

export default Card;