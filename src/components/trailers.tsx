import React, {useState, useEffect} from "react";
import useSWR from "swr";

interface ISlide{
    idFocus:number, 
    direction?:"left"|"right"
}

import style from "./styles/trailer.module.css";
let slideStyles = <style>{`
                        .left,
                        .right{
                            width: 10vw; 
                            height: 150px;
                            z-index: 500;
                        }
                        .left > div{
                            width: 20px;
                            left: 30px;
                        }
                        .right > div{
                            width: 20px;
                            right: 30px;
                        }
                        .left:hover > div{
                            left: 20px;
                        }
                        .right:hover > div{
                            right: 20px;
                        }

                        .left > div > svg,
                        .right > div > svg{
                            fill: var(--color-light);
                        }

                        @media (max-width: 780px){
                            .left,
                            .right{
                                height: 120px;
                            }
                            .left > div{
                                width: 18px;
                                left: 30%;
                            }
                            .right > div{
                                width: 18px;
                                right: 30%;
                            }
                            .left:hover > div{
                                width: 15px;
                                left: 10%;
                            }
                            .right:hover > div{
                                width: 15px;
                                right: 10%;
                            }
                        }
                        @media (max-width: 440px){
                            
                        }
                    `}</style>;

import ContainerSlide from "@container/container-slide";

let {NEXT_PUBLIC_URL_TRAILER} = process.env;
let fetcher = (...arch)=>fetch(arch[0]).then(res => res.json());


function Trailer({url, showTrailer}:{url:string, showTrailer:(trailer:Movie.Video)=>()=>void}){
    let stateSlide:ISlide= {idFocus:0,direction: undefined};
    let stateMatchmedia = {elementDisplay: 4};
    let [slide, setSlide] = useState(stateSlide);
    let [matchmedia, setMatchmedia] = useState<{elementDisplay:number}>(stateMatchmedia);

    let {data, error} = useSWR(url, fetcher);

    useEffect(()=>{
        function verifyMatchMedia(){
            if(matchMedia("(max-width:440px)").matches){
                setMatchmedia({elementDisplay: 2});
                return;
            }
            if(matchMedia("(max-width:780px)").matches){
                return;
            }
            if(matchMedia("(max-width:1040px)").matches){
                setMatchmedia({elementDisplay: 3});
                return;
            }
            setMatchmedia({elementDisplay: 4});
            return;
        }
        window.onresize = verifyMatchMedia;
    }, []);
    if(error){
        return (
            <div>Un error a ocurrido</div>
        )
    }
    if(!data){
        return (
            <div>Loading...</div>
        )
    }
    let trailers = data.results as Movie.Video[];
    return (
        <section
            className={style["container"]}
        >
            <header className={style["title"]}>
                <h1>Trailers</h1>
            </header>
            <div className={style["wrapper-trailers"]}>
                <ContainerSlide
                    styles={slideStyles}
                    slideInfo={{
                        increasePosx:78,
                        posxInit: 11,
                        posxEnd:(-(78 * (Math.ceil(trailers.length/matchmedia.elementDisplay)-1))+11),
                        length:Math.ceil(trailers.length/matchmedia.elementDisplay)-1
                    }}
                    state={[slide, setSlide]}
                >
                    {trailers.map((trailer)=>{
                        return ( 
                        <div                             
                            key={trailer.id}
                            className={style["trailer"]}
                            onClick={showTrailer(trailer)}
                        >
                            <img src={`${NEXT_PUBLIC_URL_TRAILER}${trailer.key}/hqdefault.jpg`} alt=""/>
                            <div className={style["play"]}>
                                <svg width="22" height="31" viewBox="0 0 22 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.98587 0.674017C1.78463 -0.906831 0 0.388218 0 3.56428V27.0022C0 30.1814 1.78463 31.4748 3.98587 29.8955L20.3485 18.1469C22.5505 16.5655 22.5505 14.0034 20.3485 12.4224L3.98587 0.674017Z"/>
                                </svg>
                            </div>
                        </div>);
                    })}
                </ContainerSlide>
            </div>
        </section>
    );
}

export default Trailer;