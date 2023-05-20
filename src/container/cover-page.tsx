import React from "react";

import style from "./styles/cover-page.module.css";

interface IProps {
    data: Media
}

function CoverPage({data}:IProps){
    return (<>
        <section id="contain-img" className={style["container"]}>
            <div className={style["wrapper-text"]}>
                <header><h1 className={style["title"]}>Welcome!</h1></header>
                <p className={style["msg"]}>Millions of movies, TV show and people to discover, Explore now.</p>
            </div>
        </section>
        <style>{`
            #contain-img{
                background: url("${process.env.NEXT_PUBLIC_URL_IMG + data.backdrop_path}");
                background-position: bottom;
            }
        `}</style>
    </>)
}

export default CoverPage;