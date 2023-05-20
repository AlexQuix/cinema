import style from "./styles/card-trailer.module.css";

import React from "react";
import Link from "next/link";
import { isMovie } from "src/helpers";

interface Props{
    data:Media;
    mediatype:"movie"|"tv",
    setTrailer:React.Dispatch<React.SetStateAction<Media | undefined>>, 
    styletype:1|2;
}


function CardTrailer({data, mediatype, setTrailer, styletype}:Props){
    return (<>
        <div                             
            key={data.id}
            id={style["trailer-style-"+styletype]}
            className={style["trailer"]}
        >
            <div 
                className={style["wrapper-poster"]}
                onClick={()=>{setTrailer(data)}}
            >
                <img src={`${process.env.NEXT_PUBLIC_URL_TRAILER}${data.poster_path}`} alt=""/>
                <div className={style["play"]}>
                    <svg width="22" height="31" viewBox="0 0 22 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.98587 0.674017C1.78463 -0.906831 0 0.388218 0 3.56428V27.0022C0 30.1814 1.78463 31.4748 3.98587 29.8955L20.3485 18.1469C22.5505 16.5655 22.5505 14.0034 20.3485 12.4224L3.98587 0.674017Z"/>
                    </svg>
                </div>
            </div>
            {styletype==2?
                <Link
                    href={`/${mediatype}/${data.id}`}
                    className={style["link"]}
                >
                    { isMovie(data) ? data.title : data.name }
                </Link>   
                :undefined
            }
        </div>
    </>)
}

export default CardTrailer;