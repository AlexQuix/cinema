import React, {useState, useEffect} from "react";

import style from "./styles/popular.module.css";

import Card from "@components/population-card";

interface IWrapperCards{
    packData:Search.MovieAndTV[];
    slide: {idFocus:number, direction?:"left"|"right"}
    type: "movie" | "tv"
}

function WrapperCards({packData, slide, type}:IWrapperCards){
    let [slideLeft, setSlideLeft] = useState(20);
    useEffect(()=>{
        if(slide.direction == "left"){
            let left = slideLeft;
            if(slide.idFocus === 9){
                setSlideLeft(-520);
                return;
            }
            setSlideLeft(left + 60);
            return;
        }
        if(slide.direction == "right"){
            let left = slideLeft;
            if(slide.idFocus === 0){
                setSlideLeft(20);
                return;
            }
            setSlideLeft(left - 60);
            return;
        }
    }, [slide]);
    return(
        <>
            <div
                id="wrapper-cards"
                className={style["wrapper-cards"]}
            >   {
                    packData.map((data, index)=>{
                        let isFocus = (slide.idFocus === index)?true:false;
                        return <Card data={data} isFocus={isFocus} key={data.id} type={type}/>
                    })
                }
            </div>
            <style jsx>{`
                #wrapper-cards{
                    left: ${slideLeft}vw;
                }
            `}</style>
        </>
    );
}

export default WrapperCards;