import style from "./styles/card-media.module.css";
import React from "react";
import Link from "next/link";

import RatingStar from "@components/rating-star";

interface ICardMediaProps{
    data: Media;
    href: string;
}


const getTitle = (data: Media) => ('title' in data) ? data.title : data.name;
const getDate = (data: Media) => ('release_date' in data) ? data.release_date : data.first_air_date;
const getImgSource = (src)=> src ? process.env.NEXT_PUBLIC_IMAGE + src : "/img/no-poster.jpg";

function CardMedia({href, data}:ICardMediaProps){

    return (
        <Link
            href={"/details" + href}
            className={style["container"]}
        >
            <div className={style["wrapper"]}>
                <div className={style["wrapper-ratingstar"]}>
                    <RatingStar rating={data.vote_average}/>
                </div>
                <div className={style["wrapper-img"]}>
                    <img src={getImgSource(data.poster_path)} alt=""/>
                </div>
                <div className={style["wrapper-info"]}>
                    <h1 className={style["title"]}>
                        { getTitle(data) }
                    </h1>
                    <h3 className={style["date"]}>
                        { getDate(data) }
                    </h3>
                </div>
            </div>
        </Link>
    )
};

export default CardMedia;