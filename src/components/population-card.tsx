import React, {useState, useEffect} from "react";

// STYLES
import style from "./styles/population-card.module.css";

// IMPORT COMPONENTS
import RatingStar from "./rating-star";
import SlidePoster from "./slide-poster";

// COMPONENT
function PopulationCard({data, isFocus, type}:{data:Search.MovieAndTV, isFocus:boolean, type:"movie"|"tv"}){
    let typeState:Image.Backdrops[] = [];
    let [porters, setPorters] = useState(typeState);
    function handleClick(e){
        
    }
    useEffect(()=>{
        async function findBackdrops(){
            let resp = await fetch(`https://api.themoviedb.org/3/${type}/${data.id}/images?api_key=36e9bc3df49bcf8ff1978a5075c591c1`);
            let imgs = await resp.json();
            let results = imgs.backdrops;
            if(results){
                setPorters(results.slice(0, 5));
            };
        };
        findBackdrops();
    }, []);
    return (<>
        <div
            id={(isFocus)?"focus-card":undefined}
            className={style["container"]}
            onClick={handleClick}
        >
            {(porters[0])?
                <SlidePoster backdrops={porters} isFocus={isFocus}/>
                :undefined
            }
            {(isFocus)?
                <section 
                    className={style["wrapper-info"]}
                >
                    <header>
                        <h1 className={style["title"]}>
                            {(type=="movie")?data.original_title:data.original_name}
                        </h1>
                    </header>
                    <div 
                        className={style["wrapper-ratingstar-time-year"]}
                    >
                        <span 
                            className={style["rating-star"]}
                        >
                            <RatingStar rating={data.vote_average}/>
                        </span>
                    </div>
                </section>:undefined
            }
        </div>
        <style jsx>{`
                #focus-card{
                    cursor: pointer;
                    transform: scaleY(1.1);
                    z-index: 550;
                }
        `}</style>
    </>)
}

export default PopulationCard;