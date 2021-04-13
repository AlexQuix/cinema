import React from "react";

import style from "./styles/loading-effect.module.css";

function LoadingEffect({contentType}:{contentType:"media"|"trailer"|"popular"}){
    let result = [1,2,3,4,5,6,7,8,10];
    return (
        <section className={style["container"]}>
            <div
                className={style["wrapper-title"]} 
            >
                <div className={style["svg"]}></div>
                <div className={style["title"]}></div>
            </div>
            <div
                id={style["wrapper-cards-"+contentType]}
                className={style["wrapper-cards"]}
            >
                <div>
                    {result.map((e)=>
                        <div key={e} className={style["card-"+contentType]}></div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default LoadingEffect;