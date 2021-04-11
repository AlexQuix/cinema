import React, {useState} from "react";
import LINK from "next/link";
import useSWR from "swr";

interface ISlide{
    idFocus:number, 
    direction?:"left"|"right"
};

import style from "./styles/collection.module.css";

import Card from "@components/card";
import ContainerSlide from "@container/container-slide";
import BtnMediaSelector from "@components/btn-media-selector";


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

function ContentTrending(){
    let stateSlide:ISlide= {idFocus:0,direction: undefined};

    let [mediatype, setMediatype] = useState<"movie"|"tv">("movie");
    let [slide, setSlide] = useState(stateSlide);
    let [countCard, setCountCard] = useState<number>(6);

    let {data, error} = useSWR<{results: Search.MovieAndTV[]}>(`https://api.themoviedb.org/3/trending/${mediatype}/week?api_key=36e9bc3df49bcf8ff1978a5075c591c1`);
    if(error){
        return (
            <h1>Error!</h1>
        )
    }
    if(!data){
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <section>
            <div
               id={style["wrapper-title"]} 
            >
                <header>
                    <svg width="41" height="35" viewBox="0 0 41 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M40.2061 13.1766C39.9422 12.4398 39.2183 11.9165 38.3617 11.8469L26.7268 10.8933L22.126 1.17361C21.7868 0.46128 21.0142 0.000183105 20.1558 0.000183105C19.2974 0.000183105 18.5248 0.46128 18.1856 1.17527L13.5848 10.8933L1.94807 11.8469C1.09306 11.9182 0.37091 12.4398 0.105487 13.1766C-0.159935 13.9133 0.0851885 14.7214 0.731983 15.2308L9.5266 22.1925L6.93328 32.5035C6.74351 33.2616 7.06952 34.0453 7.76645 34.5C8.14106 34.7443 8.57933 34.8687 9.02129 34.8687C9.40235 34.8687 9.78034 34.776 10.1196 34.5927L20.1558 29.1787L30.1884 34.5927C30.9225 34.9914 31.8479 34.955 32.5433 34.5C33.2406 34.0439 33.5663 33.26 33.3765 32.5035L30.7832 22.1925L39.5778 15.2322C40.2246 14.7214 40.4716 13.9147 40.2061 13.1766Z"/>
                    </svg>
                    <h1>Trending</h1>
                </header>
                <BtnMediaSelector mediatype={mediatype} setMediaType={setMediatype}/>
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