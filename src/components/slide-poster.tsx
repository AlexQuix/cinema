import React, {useState, useEffect} from "react";

import style from "./styles/slide-poster.module.css";


function SlidePoster({backdrops, isFocus}:{backdrops:Image.Backdrops[], isFocus:boolean}){
    let [idCurrent, setIdCurrent] = useState(0);
    useEffect(()=>{
        let idTimeout:NodeJS.Timeout;
        if(isFocus){
            idTimeout = setTimeout(()=>{
                if(isFocus){
                    let length = backdrops.length - 1;
                    if(idCurrent < length){
                        let id = idCurrent;
                        setIdCurrent(++id);
                        return;
                    }
                    setIdCurrent(0);
                    return;
                }
                setIdCurrent(0);
            }, 3000);
        }
        return function cleanup(){
            if(idTimeout){
                clearTimeout(idTimeout);
            }
        }
    }, [idCurrent, isFocus]);
    return (
        <section
            className={style["container"]}
        >
            {(backdrops[0])?
                backdrops.map((img, index)=>
                    <div
                        id={(idCurrent === index)?"focus-img":undefined}
                        className={style["wrapper-img"]}
                        key={new Date().getTime().toString(16) + Math.floor(Math.random() * 100000).toString(32)}
                    >
                        <img
                            alt="source no found"
                            src={"https://image.tmdb.org/t/p/original/" + img.file_path}
                        />
                    </div>):undefined
            }
            <style jsx>{`
                #focus-img{
                    visibility: visible;
                    animation: appear-effect 0.5s ease-in-out;
                }
                @keyframes appear-effect {
                    0%{
                        opacity: 0;
                    }
                    100%{
                        opacity: 1;
                    }
                }
            `}</style>
        </section>
    )
}
export default SlidePoster;