import React, {useState} from "react";

import style from "./styles/btn-search.module.css";

import Keyword from "./keyword";

function BtnSearch(){
    let stateKeywords:Search.Keywords[] = [];
    let [isTitle, setIsTitle] = useState(true);
    let [keywords, setKeywords] = useState(stateKeywords);
    let [isKeywords, setIskeywords] = useState<boolean>(false);
    async function searchKeywords(e?){
        let urlTrending = `https://api.themoviedb.org/3/trending/all/week?api_key=36e9bc3df49bcf8ff1978a5075c591c1`;
        let url:string = urlTrending;
        if(e && e.target.value){
            let query = e.target.value;
            url = `https://api.themoviedb.org/3/search/multi?api_key=36e9bc3df49bcf8ff1978a5075c591c1&query=${query}&page=1&include_adult=false`;
            setIsTitle(false);
        }
        if(url === urlTrending && !isTitle){
            setIsTitle(true);
        }
        let resp = await fetch(url);
        let json = await resp.json();
        if(json.results){
            let results = json.results.slice(0, 10);
            setKeywords(results);
        }
    }
    function handleClick(){
        setIskeywords(!isKeywords);
        searchKeywords();
    }
    return (<>
        <span
            className={style["btn-search"]}
            onClick={handleClick}
        >
            {!isKeywords?
                <div
                    className={style["search"]}
                >
                    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42.2552 33.123L35.9619 28.3912C37.5352 25.6873 38.2095 22.5327 38.2095 19.1528C38.2095 8.56255 29.6686 0.000183105 19.1048 0.000183105C8.54095 0.000183105 0 8.56255 0 19.1528C0 29.743 8.54095 38.3054 19.1048 38.3054C22.4762 38.3054 25.3981 37.4041 28.32 36.0522L33.04 42.3613C35.5124 45.5158 40.2324 45.9665 43.1543 43.0373C45.8514 40.3334 45.6267 35.6015 42.2552 33.123ZM19.1048 33.799C11.0133 33.799 4.49524 27.2646 4.49524 19.1528C4.49524 11.0411 11.0133 4.50669 19.1048 4.50669C27.1962 4.50669 33.7143 11.0411 33.7143 19.1528C33.7143 27.2644 27.1962 33.799 19.1048 33.799Z"/>
                    </svg>
                </div>
                :<div
                    className={style["close"]}
                >
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="339.177px" height="339.177px" viewBox="0 0 339.177 339.177">
                        <path d="M247.244,169.59l83.938-83.938c5.332-5.327,7.994-11.798,7.994-19.414c0-7.614-2.669-14.084-7.994-19.414L292.355,7.993
                            C287.026,2.665,280.556,0,272.944,0c-7.617,0-14.085,2.665-19.417,7.993L169.59,91.931L85.651,7.993
                            C80.325,2.665,73.854,0,66.237,0c-7.611,0-14.083,2.665-19.414,7.993L7.994,46.824C2.667,52.15,0,58.624,0,66.238
                            c0,7.616,2.664,14.084,7.994,19.414l83.937,83.938L7.994,253.528C2.667,258.859,0,265.327,0,272.945
                            c0,7.61,2.664,14.082,7.994,19.41l38.83,38.828c5.33,5.332,11.803,7.994,19.414,7.994c7.616,0,14.084-2.669,19.414-7.994
                            l83.939-83.938l83.944,83.938c5.328,5.332,11.793,7.994,19.417,7.994c7.611,0,14.082-2.669,19.411-7.994l38.82-38.828
                            c5.332-5.324,7.994-11.8,7.994-19.41c0-7.618-2.662-14.086-7.994-19.417L247.244,169.59z"/>
                    </svg>
                </div>
            }
        </span>
        { isKeywords?
            <div
                className={style["wrapper-search-result"]}
            >
                <div 
                    className={style["input-search"]}
                >
                    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42.2552 33.123L35.9619 28.3912C37.5352 25.6873 38.2095 22.5327 38.2095 19.1528C38.2095 8.56255 29.6686 0.000183105 19.1048 0.000183105C8.54095 0.000183105 0 8.56255 0 19.1528C0 29.743 8.54095 38.3054 19.1048 38.3054C22.4762 38.3054 25.3981 37.4041 28.32 36.0522L33.04 42.3613C35.5124 45.5158 40.2324 45.9665 43.1543 43.0373C45.8514 40.3334 45.6267 35.6015 42.2552 33.123ZM19.1048 33.799C11.0133 33.799 4.49524 27.2646 4.49524 19.1528C4.49524 11.0411 11.0133 4.50669 19.1048 4.50669C27.1962 4.50669 33.7143 11.0411 33.7143 19.1528C33.7143 27.2644 27.1962 33.799 19.1048 33.799Z"/>
                    </svg>
                    <input type="text" onChange={searchKeywords} autoFocus={true}/>
                </div>
                {isTitle?
                    <header
                        className={style["trending"]}
                    >
                        <svg width="44" height="33" viewBox="0 0 44 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1934 31.2302C14.1934 32.193 13.281 32.9808 12.1657 32.9808H3.78475C2.66954 32.9808 1.7571 32.193 1.7571 31.2302V23.2942C1.7571 22.3313 2.66954 21.5435 3.78475 21.5435H12.1657C13.281 21.5435 14.1934 22.3313 14.1934 23.2942V31.2302Z" fill="#46A3FF"/>
                            <path d="M29.0967 31.2302C29.0967 32.1931 28.1842 32.9808 27.069 32.9808H18.688C17.5728 32.9808 16.6604 32.1931 16.6604 31.2302V19.0927C16.6604 18.1299 17.5728 17.3421 18.688 17.3421H27.069C28.1842 17.3421 29.0967 18.1299 29.0967 19.0927V31.2302Z" fill="#46A3FF"/>
                            <path d="M44.0001 31.2302C44.0001 32.193 43.0876 32.9808 41.9724 32.9808H33.5914C32.4762 32.9808 31.5638 32.193 31.5638 31.2302V14.4244C31.5638 13.4616 32.4762 12.6738 33.5914 12.6738H41.9724C43.0876 12.6738 44.0001 13.4616 44.0001 14.4244V31.2302Z" fill="#46A3FF"/>
                            <path d="M42.2459 0.0326557L33.1384 1.94571C32.4157 2.09673 32.2547 2.59169 32.7804 3.04556L34.7239 4.68424C34.887 4.84483 34.6935 5.0584 34.5399 5.14885C33.3161 5.8701 31.374 6.92839 28.6896 8.13759C14.0749 14.7207 2.02746 14.3169 1.84632 14.3097C0.87926 14.2674 0.0523808 14.9106 0.00236522 15.7469C-0.0475152 16.5837 0.697582 17.2971 1.6668 17.3402C1.73804 17.3433 2.02773 17.3546 2.51477 17.3546C5.63831 17.3546 16.8586 16.8893 30.3153 10.8279C33.4994 9.39371 35.7063 8.15673 36.995 7.37363C37.1772 7.26287 37.4947 7.07194 37.7878 7.32951L39.9135 9.16461C40.4392 9.61848 41.0096 9.47879 41.1816 8.85429L43.2477 0.893602C43.4194 0.268987 42.9685 -0.118363 42.2459 0.0326557Z"/>
                        </svg>
                        <h1>Trending</h1>
                    </header>:undefined
                }
                <div
                    className={style["result-keywords"]}
                > 
                    { keywords.map(data=>
                        <Keyword key={`${data.id}-${Math.floor(Math.random() * 100000).toString(32)}`} result={data} setIskeywords={setIskeywords}/>
                    )}
                </div>
            </div>:undefined
        }
    </>)
}

export default BtnSearch;