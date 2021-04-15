import React from "react";
import LINK from "next/link";

interface Props{
    result:Search.MovieAndTV,
    mediatype:"movie"|"tv",
    href:string;
}

import style from "./styles/card-media.module.css";

import RatingStar from "@components/rating-star";

function Card({href, result, mediatype}:Props){
    if(mediatype == "movie"){
        let data = result as Movie.Search;
        return (
            <LINK
                href={"/details" + href}
            >
                <a className={style["container"]}>
                    <div className={style["wrapper"]}>
                        <div className={style["wrapper-ratingstar"]}>
                            <RatingStar rating={data.vote_average}/>
                        </div>
                        <div className={style["wrapper-img"]}>
                            <img src={process.env.NEXT_PUBLIC_URL_IMG + data.poster_path} alt=""/>
                        </div>
                        <div className={style["wrapper-info"]}>
                            <h1 className={style["title"]}>{data.title}</h1>
                            <h3 className={style["date"]}>{data.release_date}</h3>
                        </div>
                    </div>
                </a>
            </LINK>
        )
    }
    let data = result as TVShow.Search;
    return (
        <LINK
            href={"/details" + href}
        >
            <a className={style["container"]}>
                <div className={style["wrapper"]}>
                    <div className={style["wrapper-ratingstar"]}>
                        <RatingStar rating={data.vote_average}/>
                    </div>
                    <div className={style["wrapper-img"]}>
                        <img src={process.env.NEXT_PUBLIC_URL_IMG + data.poster_path} alt=""/>
                    </div>
                    <div className={style["wrapper-info"]}>
                        <h1 className={style["title"]}>{data.name}</h1>
                        <h3 className={style["date"]}>{data.first_air_date}</h3>
                    </div>
                </div>
            </a>
        </LINK>
    )
};

export default Card;