import React, {useState} from "react";
import LINK from "next/link";
import useSWR from "swr";

interface ISlide{
    idFocus:number, 
    direction?:"left"|"right"
};
interface Props{
    children:any, 
    url:(mediatype:"movie"|"tv")=>string,
    choicemedia?:"movie"|"tv"
}

import style from "./styles/collection.module.css";

import Card from "@components/card-media";
import ContainerSlide from "@container/container-slide";
import LoadingEffect from "@container/loading-effect";

let slideStyles = ({btnLeft, btnRight}:{btnLeft:string, btnRight:string})=>{
    return `
    #${btnLeft},
    #${btnRight}{
        width: 8vw; 
        height: 100%;
        background: #26262678;
        top: -10px;
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

function ContentTrending({children, url, choicemedia}:Props){
    let stateSlide:ISlide= {idFocus:0,direction: undefined};

    let [mediatype, setMediatype] = useState<"movie"|"tv">(choicemedia?choicemedia:"movie");
    let [slide, setSlide] = useState(stateSlide);
    let [countCard, setCountCard] = useState<number>(7);

    let {data, error} = useSWR<{results: Search.MovieAndTV[]}>(url(mediatype));
    if(error){
        return (
            <></>
        )
    }
    if(!data){
        return (
            <LoadingEffect contentType="media"/>
        )
    }
    return (
        <section className={style["container"]}>
            <div
               className={style["wrapper-title"]} 
            >
                {children([mediatype, setMediatype], style)}
            </div>
            <div
                className={style["wrapper-cards"]}
            >
                <ContainerSlide
                    styles={slideStyles}
                    slideInfo={{
                        increasePosx:84,
                        posxInit:8,
                        posxEnd:(-(84 * (Math.ceil(data.results.length/countCard)-1))+8),
                        length:Math.ceil(data.results.length/countCard)-1
                    }}
                    state={[slide, setSlide]}
                >
                    {data.results.map(data=>
                        <LINK
                            key={data.id}
                            href={`/${mediatype}/${data.id}`}
                        >
                            <a className={style["link"]}>
                                <Card result={data} mediatype={mediatype}/>
                            </a>
                        </LINK>  
                    )}
                </ContainerSlide>
            </div>
        </section>
    )
};

export default ContentTrending;