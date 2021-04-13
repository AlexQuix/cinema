import React, {useState, useEffect} from "react";
import LINK from "next/link";
import useSWR from "swr";

interface ISlide{
    idFocus:number, 
    direction?:"left"|"right"
};
interface Props{
    url: (mediatype?:"movie"|"tv")=>string;
    choiceMedia?: "movie" | "tv";
    children: ([], style:any)=>JSX.Element;
    styletype:1|2;
}

import style from "./styles/content-trailers.module.css";

import ContainerSlide from "@container/container-slide";
import DisplayTrailer from "@components/display-trailer";
import CardTrailer from "@components/card-trailer";
import LoadingEffect from "@container/loading-effect";

let fetcher = (...arch)=>fetch(arch[0]).then(res => res.json());

function ContentTrailers({url, choiceMedia, children, styletype}:Props){
    let slideStyles = ({btnLeft, btnRight}:{btnLeft:string, btnRight:string})=>{
        return `
        #${btnLeft},
        #${btnRight}{
            width: 8vw; 
            height: 100%;
            background: ${(styletype==1)?"#1a1d29a8":"#000000a8"};
            z-index: 500;
        }
        #${btnRight}{
            width: 7.5vw;
            border-radius: 10px 0px 0px 10px;
        }
        #${btnLeft} > div{
            width: 23px;
            left: 30%;
        }
        #${btnRight} > div{
            width: 23px;
            right: 30%;
        }
        #${btnLeft}:hover > div{
            left: 10%;
        }
        #${btnRight}:hover > div{
            right: 10%;
        }
    
        #${btnLeft} > div > svg,
        #${btnRight} > div > svg{
            fill: var(--color-light);
        }
    
        @media (max-width: 1080px){
            #${btnLeft} > div,
            #${btnRight} > div{
                width: 18px;
            }
        }
        @media (max-width: 780px){
            #${btnLeft} > div,
            #${btnRight} > div{
                width: 15px;
            }
        }
        @media (max-width: 480px){
            #${btnLeft} > div,
            #${btnRight} > div{
                width: 10px;
            }
            #${btnLeft} > div{
                left: 20%;
            }
            #${btnRight} > div{
                right: 20%;
            }
        }
    `}
    let [mediatype, setMediatype] = useState<"movie"|"tv">(choiceMedia?choiceMedia:"movie");
    let [slide, setSlide] = useState<ISlide>({idFocus:0,direction: undefined});
    let [trailer, setTrailer] = useState<Movie.Video|undefined>(undefined);
    let [matchmedia, setMatchmedia] = useState<{elementDisplay:number}>({elementDisplay: 4});

    let {data, error} = useSWR(url(mediatype), fetcher);

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
        return <></>
    }
    if(!data){
        return (
            <LoadingEffect contentType={"trailer"}/>
        )
    }
    let trailers = data as Movie.Video[];
    return (<>
        <section
            className={style["container"]}
        >
            <div className={style["wrapper-title"]}>
                {children([mediatype, setMediatype], style)}
            </div>
            <div className={style["wrapper-trailers"]}>
                <ContainerSlide
                    styles={slideStyles}
                    slideInfo={{
                        increasePosx: 84,
                        posxInit: 8,
                        posxEnd:(-(84 * (Math.ceil(trailers.length/matchmedia.elementDisplay)-1))+8),
                        length:Math.ceil(trailers.length/matchmedia.elementDisplay)-1
                    }}
                    state={[slide, setSlide]}
                >
                    {trailers.map((trailer)=>{
                        return (<CardTrailer key={trailer.id} mediatype={mediatype} trailer={trailer} setTrailer={setTrailer} styletype={styletype}/>);
                    })}
                </ContainerSlide>
            </div>
        </section>
        {trailer?
            <DisplayTrailer trailer={trailer}  setTrailer={setTrailer}/>
            :<div style={{paddingTop: "10px"}}></div>
        } 
    </>);
}

export default ContentTrailers;