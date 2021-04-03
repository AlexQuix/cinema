import React, {useState} from "react";
import useSWR from "swr";

interface ISlide{
    idFocus:number, 
    direction?:"left"|"right"
}

import style from "./styles/credits.module.css";

import ContainerSlide from "@container/container-slide";

let fetcher = (...arch)=>fetch(arch[0]).then(res => res.json());

function Credits({mediatype, id}:{mediatype:string, id:number}){
    let stateSlide:ISlide= {idFocus:0,direction: undefined};
    let stateMatchmedia = {elementDisplay: 6};
    let [matchmedia, setMatchmedia] = useState<{elementDisplay:number}>(stateMatchmedia);
    let [slide, setSlide] = useState<ISlide>(stateSlide);

    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/${mediatype}/${id}/credits${process.env.NEXT_PUBLIC_API_KEY}`;
    let {data, error} = useSWR(url, fetcher);
    if(error){
        return (
            <div><h1>Error</h1></div>
        )
    }
    if(!data){
        return (
            <div><h1>Loading...</h1></div>
        )
    }
    let {cast} = data as Search.Credits;
    let slideStyles = ({btnLeft, btnRight}:{btnLeft:string, btnRight:string})=>{
        return `
        #${btnLeft},
        #${btnRight}{
            width: 8vw; 
            height: 200px;
            background: #1a1d2978;
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

    return (
        <section
            className={style["container"]}
        >
            <header className={style["title"]}>
                <h1>Cast</h1>
            </header>
            <div>
                <ContainerSlide
                    styles={slideStyles}
                    slideInfo={{
                        increasePosx:84,
                        posxInit:8,
                        posxEnd:(-(84 * (Math.ceil(cast.length/matchmedia.elementDisplay)-1))+8),
                        length:Math.ceil(cast.length/matchmedia.elementDisplay)-1
                    }}
                    state={[slide, setSlide]}
                >
                    {cast.map((data)=>
                        <div 
                            key={data.credit_id}
                            className={style["wrapper-card"]}
                        >
                            <div
                                className={style["card"]}
                            >
                                <div className={style["wrapper-img"]}>
                                    {(data.profile_path)?
                                    <img 
                                        src={process.env.NEXT_PUBLIC_URL_IMG + data.profile_path} 
                                    />
                                    :<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"viewBox="0 0 31.192 31.192">
                                        <path d="M25.874,19.225c-0.645-1.431-4.575-2.669-4.575-2.669c-2.096-0.739-2.11-1.477-2.11-1.477
                                            c-4.124,8.125-7.252,0.022-7.252,0.022c-0.287,1.096-4.528,2.384-4.528,2.384c-1.238,0.477-1.763,1.191-1.763,1.191
                                            c-1.834,2.717-2.048,8.769-2.048,8.769c0.024,1.38,0.618,1.524,0.618,1.524c4.218,1.882,10.829,2.216,10.829,2.216
                                            c6.792,0.143,11.735-1.929,11.735-1.929c0.717-0.452,0.738-0.811,0.738-0.811C28.019,24.11,25.874,19.225,25.874,19.225z"/>
                                        <path d="M10.898,10.786c0.315,2.612,2.563,5.32,4.603,5.32c2.344,0,4.572-2.846,4.919-5.32c0.132-0.094,0.349-0.321,0.428-0.837
                                            c0,0,0.501-1.791-0.162-1.599c0.232-0.691,0.997-3.381-0.488-5.053c0,0-0.694-0.949-2.385-1.452
                                            c-0.059-0.049-0.119-0.099-0.188-0.147c0,0,0.037,0.043,0.092,0.118c-0.096-0.027-0.198-0.051-0.299-0.075
                                            c-0.091-0.096-0.195-0.195-0.311-0.3c0,0,0.102,0.105,0.225,0.28c-0.047-0.01-0.088-0.022-0.134-0.03
                                            c-0.077-0.117-0.17-0.237-0.289-0.359c0,0,0.05,0.094,0.115,0.242c-0.312-0.229-0.938-0.758-0.938-1.35c0,0-0.391,0.183-0.62,0.517
                                            c0.09-0.275,0.241-0.53,0.487-0.741c0,0-0.258,0.132-0.495,0.418c-0.185,0.104-0.606,0.392-0.748,0.904l-0.134-0.068
                                            c0.066-0.145,0.158-0.298,0.284-0.452c0,0-0.183,0.163-0.343,0.423l-0.271-0.136c0.081-0.151,0.187-0.307,0.331-0.459
                                            c0,0-0.146,0.112-0.3,0.301c0.043-0.176,0.036-0.378-0.512,0.222c0,0-2.469,1.071-3.183,3.288c0,0-0.42,1.001,0.137,3.946
                                            c-0.791-0.374-0.252,1.561-0.252,1.561C10.548,10.465,10.765,10.691,10.898,10.786z M10.85,9.739L10.85,9.739L10.85,9.739z
                                            M15.384,0.516c-0.12,0.167-0.224,0.375-0.274,0.63l-0.086-0.033C15.091,0.899,15.204,0.693,15.384,0.516z"/>
                                    </svg>
                                    }
                                </div>
                                <div className={style["wrapper-info"]}>
                                    <p className={style["name"]}>{data.original_name}</p>
                                    <p className={style["character"]}>{data.character}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </ContainerSlide>
            </div>
        </section>
    );
}

export default Credits;