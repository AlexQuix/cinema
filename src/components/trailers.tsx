import React, {useState, useEffect} from "react";
import useSWR from "swr";

interface ISlide{
    idFocus:number, 
    direction?:"left"|"right"
}

import style from "./styles/trailer.module.css";
let slideStyles = ({btnLeft, btnRight}:{btnLeft:string, btnRight:string})=>{
    return `
        #${btnLeft},
        #${btnRight}{
            width: 10vw; 
            height: 150px;
            background: #1a1d29a8;
            z-index: 500;
        }
        #${btnLeft}{
            width: 11vw;
        }
        #${btnLeft} > div{
            width: 20px;
            left: 30px;
        }
        #${btnRight} > div{
            width: 20px;
            right: 30px;
        }
        #${btnLeft}:hover > div{
            left: 20px;
        }
        #${btnRight}:hover > div{
            right: 20px;
        }

        #${btnLeft} > div > svg,
        #${btnRight} > div > svg{
            fill: var(--color-light);
        }

        @media (max-width: 780px){
            #${btnLeft},
            #${btnRight}{
                height: 120px;
            }
            #${btnLeft} > div{
                width: 18px;
                left: 30%;
            }
            #${btnRight} > div{
                width: 18px;
                right: 30%;
            }
            #${btnLeft}:hover > div{
                width: 15px;
                left: 10%;
            }
            #${btnRight}:hover > div{
                width: 15px;
                right: 10%;
            }
        }
        @media (max-width: 440px){
            
        }
`}

import ContainerSlide from "@container/container-slide";
import ExhibitTrailer from "@components/exhibit-trailer";

let {NEXT_PUBLIC_URL_TRAILER} = process.env;
let fetcher = (...arch)=>fetch(arch[0]).then(res => res.json());


function Trailer({url}:{url:string}){
    let stateSlide:ISlide= {idFocus:0,direction: undefined};
    let stateMatchmedia = {elementDisplay: 4};
    let [slide, setSlide] = useState(stateSlide);
    let [trailer, setTrailer] = useState<Movie.Video|undefined>(undefined);
    let [matchmedia, setMatchmedia] = useState<{elementDisplay:number}>(stateMatchmedia);

    let {data, error} = useSWR(url, fetcher);

    function showTrailer(trailer:Movie.Video){
        return function(){
            setTrailer(trailer);
        }
    }
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

        return function(){
            window.onresize = ()=>{};
        }
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
    return (<>
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
        {trailer?
            <ExhibitTrailer trailer={trailer}  setTrailer={setTrailer}/>
            :<div style={{paddingTop: "60px"}}></div>
        } 
    </>);
}

export default Trailer;