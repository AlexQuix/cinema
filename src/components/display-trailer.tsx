import style from "./styles/display-trailer.module.css";

import React from "react";
import useSWR from "swr";
import { fetcher } from "src/helpers";


interface IProps {
    trailerData: Media, 
    setTrailer:React.Dispatch<React.SetStateAction<Movie.Video | undefined>>;
    mediatype: MediaTypeOptions
}



function DisplayTrailer({trailerData, setTrailer, mediatype}:IProps){
    function closeTrailer(){
        setTrailer(undefined);
    }

    let {data} = useSWR<ITrailer[]>(`/api/${mediatype}/${trailerData.id}/trailers`, fetcher);

    if(!(data instanceof Array))
        return (<div>Loading...</div>)

    return(
        <div
            className={style["container"]}
        >   
            <div
                className={style["wrapper-trailer"]}
            >
                <div
                    className={style["close"]}
                    onClick={closeTrailer}
                >
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="339.177px" height="339.177px" viewBox="0 0 339.177 339.177">
                        <path d="M247.244,169.59l83.938-83.938c5.332-5.327,7.994-11.798,7.994-19.414c0-7.614-2.669-14.084-7.994-19.414L292.355,7.993
                            C287.026,2.665,280.556,0,272.944,0c-7.617,0-14.085,2.665-19.417,7.993L169.59,91.931L85.651,7.993
                            C80.325,2.665,73.854,0,66.237,0c-7.611,0-14.083,2.665-19.414,7.993L7.994,46.824C2.667,52.15,0,58.624,0,66.238
                            c0,7.616,2.664,14.084,7.994,19.414l83.937,83.938L7.994,253.528C2.667,258.859,0,265.327,0,272.945
                            c0,7.61,2.664,14.082,7.994,19.41l38.83,38.828c5.33,5.332,11.803,7.994,19.414,7.994c7.616,0,14.084-2.669,19.414-7.994
                            l83.939-83.938l83.944,83.938c5.328,5.332,11.793,7.994,19.417,7.994c7.611,0,14.082-2.669,19.411-7.994l38.82-38.828
                            c5.332-5.324,7.994-11.8,7.994-19.41c0-7.618-2.662-14.086-7.994-19.417L247.244,169.59z"/>
                    </svg>
                </div>
                <header className={style["title"]}><h1>{data[0]?.name}</h1></header>
                <div className={style["wrapper-iframe"]}>
                    <iframe 
                        className={style["iframe"]}
                        src={`//www.youtube.com/embed/${data[0]?.key}?autoplay=1&origin=http%3A%2F%2Fwww.themoviedb.org&hl=es&modestbranding=1&fs=1&autohide=1` }
                    >
                    </iframe>
                </div>
            </div>
        </div>
    )
}

export default DisplayTrailer;