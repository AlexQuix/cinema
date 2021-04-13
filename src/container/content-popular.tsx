import React, {useState, useEffect} from "react";
import useSWR from "swr";
import LINK from "next/link";

import style from "./styles/content-popular.module.css";

// IMPORT COMPONENTS
import BtnMediaSelector from "@components/btn-media-selector";
import ContainerSlide from "@container/container-slide";
import Card from "@components/population-card";
import LoadingEffect from "@container/loading-effect";

interface ISlide{
    idFocus:number, 
    direction?:"left"|"right"
}

let slideStyles = ({btnLeft, btnRight}:{btnLeft:string, btnRight:string})=>{
    return `
        #${btnLeft},
        #${btnRight}{
            width: 20vw; 
            height: 400px;
            background: #26262682;
        }
        #${btnLeft} > div{
            width: 30px;
            left: 40px;
        }
        #${btnRight} > div{
            width: 30px;
            right: 40px;
        }
        #${btnLeft}:hover > div{
            left: 20px;
        }
        #${btnRight}:hover > div{
            right: 20px;
        }

        #${btnLeft} > div > svg,
        #${btnRight} > div > svg{
            fill: var(--color-text-opaque);
        }
        #${btnLeft}:hover > div > svg,
        #${btnRight}:hover > div > svg{
            fill: var(--color-light);
        }
`}

function getUrl(type: "movie" | "tv"){
    let urls = {
        movie: process.env.NEXT_PUBLIC_URL_MOVIE + "popular" + process.env.NEXT_PUBLIC_API_KEY + "&language=en-US&page=1",
        tv: process.env.NEXT_PUBLIC_URL_TV + "popular" + process.env.NEXT_PUBLIC_API_KEY + "&language=en-US&page=1"
    };
    return urls[type];
}

// COMPONENT
function SlidePopulation(){
    let [mediatype, setMediaType] = useState<"movie"|"tv">("movie");
    let [slide, setSlide] = useState<ISlide>({idFocus:0,direction: undefined});

    let {data, error} = useSWR(getUrl(mediatype));

    if(error){
        return <div>ERROR</div>
    }
    if(!data){
        return <LoadingEffect contentType="popular"/>
    }
    let packData:Search.MovieAndTV[] = data.results.slice(0, 10);
    let slideInfo = {
        increasePosx:60,
        posxInit:20,
        posxEnd:-((60 * (packData.length-1))-20),
        length: packData.length-1
    };
    return (
        <section
            className={style["container"]}
        >
            <div
               id={style["wrapper-title"]} 
            >
                <header>
                    <svg width="41" height="35" viewBox="0 0 41 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M40.2061 13.1766C39.9422 12.4398 39.2183 11.9165 38.3617 11.8469L26.7268 10.8933L22.126 1.17361C21.7868 0.46128 21.0142 0.000183105 20.1558 0.000183105C19.2974 0.000183105 18.5248 0.46128 18.1856 1.17527L13.5848 10.8933L1.94807 11.8469C1.09306 11.9182 0.37091 12.4398 0.105487 13.1766C-0.159935 13.9133 0.0851885 14.7214 0.731983 15.2308L9.5266 22.1925L6.93328 32.5035C6.74351 33.2616 7.06952 34.0453 7.76645 34.5C8.14106 34.7443 8.57933 34.8687 9.02129 34.8687C9.40235 34.8687 9.78034 34.776 10.1196 34.5927L20.1558 29.1787L30.1884 34.5927C30.9225 34.9914 31.8479 34.955 32.5433 34.5C33.2406 34.0439 33.5663 33.26 33.3765 32.5035L30.7832 22.1925L39.5778 15.2322C40.2246 14.7214 40.4716 13.9147 40.2061 13.1766Z"/>
                    </svg>
                    <h1>What's popular</h1>
                </header>
                <BtnMediaSelector mediatype={mediatype} setMediaType={setMediaType}/>
            </div>
            {(packData[0])?
                <div className={style["wrapper-cards"]}>
                    <ContainerSlide
                        styles={slideStyles}
                        slideInfo={slideInfo}
                        state={[slide, setSlide]}
                    >
                        {packData.map((data, index)=>{
                            let isFocus = (slide.idFocus === index)?true:false;
                            console
                            return  (
                                <LINK href={`/${mediatype}/${data.id}`} key={data.id}>
                                    <a>
                                        <Card data={data} isFocus={isFocus} type={mediatype}/>
                                    </a>
                                </LINK>
                            );})}
                    </ContainerSlide>
                </div>
                :undefined
            }
        </section>
    );
};




export default SlidePopulation;