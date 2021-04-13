import React from "react";
import LINK from "next/link";

interface Props{
    trailer:Movie.Video;
    mediatype:"movie"|"tv",
    setTrailer:React.Dispatch<React.SetStateAction<Movie.Video | undefined>>, 
    styletype:1|2;
}

import style from "./styles/card-trailer.module.css";

function CardTrailer({trailer, mediatype, setTrailer, styletype}:Props){
        return (<>
            <div                             
                key={trailer.id}
                id={style["trailer-style-"+styletype]}
                className={style["trailer"]}
            >
                <div 
                    className={style["wrapper-poster"]}
                    onClick={()=>{setTrailer(trailer)}}
                >
                    <img src={`${process.env.NEXT_PUBLIC_URL_TRAILER}${trailer.key}/hqdefault.jpg`} alt=""/>
                    <div className={style["play"]}>
                        <svg width="22" height="31" viewBox="0 0 22 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.98587 0.674017C1.78463 -0.906831 0 0.388218 0 3.56428V27.0022C0 30.1814 1.78463 31.4748 3.98587 29.8955L20.3485 18.1469C22.5505 16.5655 22.5505 14.0034 20.3485 12.4224L3.98587 0.674017Z"/>
                        </svg>
                    </div>
                </div>
                {styletype==2?
                    <LINK
                        href={`/${mediatype}/${trailer.id}`}
                    >
                        <a className={style["link"]}>{trailer.name}</a>
                    </LINK>   
                    :undefined
                }
            </div>
        </>)
}

export default CardTrailer;