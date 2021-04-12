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

let slideStyles = ({btnLeft, btnRight}:{btnLeft:string, btnRight:string})=>{
    return `
    #${btnLeft},
    #${btnRight}{
        width: 8vw; 
        height: 300px;
        background: #26262678;
        top: -15px;
        z-index: 500;
    }
    #${btnRight}{
        width: 7vw;
        border-radius: 10px 0px 0px 10px;
    }
    #${btnLeft} > div{
        width: 23px;
        left: 30px;
    }
    #${btnRight} > div{
        width: 23px;
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
        let result = [1,2,3,4,5,6,7,8,10];
        return (
            <section className={style["load-container"]}>
                <div
                    className={style["load-wrapper-title"]} 
                >
                    <div className={style["load-svg"]}></div>
                    <div className={style["load-title"]}></div>
                </div>
                <div
                    className={style["load-wrapper-cards"]}
                >
                    <div>
                        {result.map(()=>
                            <div className={style["load-card"]}></div>
                        )}
                    </div>
                </div>
            </section>
        )
    }
    return (
        <section>
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