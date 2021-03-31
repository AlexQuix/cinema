import React, {useState, useEffect} from "react";
import Next from "next/link";

import style from "./styles/popular.module.css";

// IMPORT COMPONENTS
import BtnChangeMovieOrTV from "@components/btn-change-movie-or-tv";
import ContainerSlide from "@container/container-slide";
import Card from "@components/population-card";

interface ISlide{
    idFocus:number, 
    direction?:"left"|"right"
}

let slideStyles = <style>{`
                        .left,
                        .right{
                            width: 20vw; 
                            height: 400px;
                            background: #35353582;
                        }
                        .left > div{
                            width: 30px;
                            left: 40px;
                        }
                        .right > div{
                            width: 30px;
                            right: 40px;
                        }
                        .left:hover > div{
                            left: 20px;
                        }
                        .right:hover > div{
                            right: 20px;
                        }

                        .left > div > svg,
                        .right > div > svg{
                            fill: var(--color-text-opaque);
                        }
                        .left:hover > div > svg,
                        .right:hover > div > svg{
                            fill: var(--color-light);
                        }
                    `}</style>;

// COMPONENT
function SlidePopulation(){
    let slideInfo = {
        increasePosx:60,
        posxInit:20,
        posxEnd:-520,
        length: 9
    };
    let statePackData:Search.MovieAndTV[] = [];
    let stateSlide:ISlide= {idFocus:0,direction: undefined};
    let stateType:"movie"|"tv" = "movie";

    let [type, setType] = useState(stateType);
    let [slide, setSlide] = useState(stateSlide);
    let [packData, setPackData] = useState(statePackData);
    let [enableBtn, setEnableBtn] = useState(true);

    function slideControl(direction:"left"|"right"){
        if(direction === "left"){
            if(slide.idFocus > 0){
                let id = --slide.idFocus;
                setSlide({idFocus:id, direction});
                return;
            }
            setSlide({idFocus:9, direction});
            return
        }
        if(direction === "right"){
            if(slide.idFocus < 9){
                let id = ++slide.idFocus;
                setSlide({idFocus:id, direction});
                return;
            }
            setSlide({idFocus:0, direction});
            return;
        }
    }
    async function searchPackData(type: "movie"|"tv"){
        let urls = {
            movie: "https://api.themoviedb.org/3/movie/popular?api_key=36e9bc3df49bcf8ff1978a5075c591c1&language=en-US&page=1&region=sv",
            tv: "https://api.themoviedb.org/3/tv/popular?api_key=36e9bc3df49bcf8ff1978a5075c591c1&language=en-US&page=1"
        }
        let resp = await fetch(urls[type]);
        let json = await resp.json();
        let result = json.results.slice(0, 10);
        if(result){
            setPackData(result);
        }
    }
    function changeData(type:"movie"|"tv"){0
        setEnableBtn(false);
        setType(type as "movie");
        searchPackData(type);
        setTimeout(()=>{
            setEnableBtn(true);
        }, 1700);
    }
    useEffect(()=>{
        searchPackData("movie");
    }, []);
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
                <BtnChangeMovieOrTV enableBtn={enableBtn} changeData={changeData}/>
            </div>
            {(packData[0])?
                <ContainerSlide
                    styles={slideStyles}
                    slide={slide}
                    slideInfo={slideInfo}
                    slideControl={slideControl}
                >
                    {packData.map((data, index)=>{
                        let isFocus = (slide.idFocus === index)?true:false;
                        return  (
                            <Next href={`/${type}/${data.id}`} key={data.id}>
                                <a>
                                    <Card data={data} isFocus={isFocus} type={type}/>
                                </a>
                            </Next>
                        );})}
                </ContainerSlide>
                :undefined
            }
        </section>
    )
};




export default SlidePopulation;