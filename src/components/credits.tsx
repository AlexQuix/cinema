import style from "./styles/wrapper-credits.module.css";
import React, {useState} from "react";
import useSWR from "swr";

import ContainerSlide from "@container/container-slide";
import CardCast from "./card-cast";

let fetcher = (...arch)=>fetch(arch[0]).then(res => res.json());

let slideStyles = ({btnLeft, btnRight}:{btnLeft:string, btnRight:string})=>{
    return `
    #${btnLeft},
    #${btnRight}{
        background: #1a1d2978;
    }
`}

interface ISlide{
    idFocus:number, 
    direction?:"left"|"right"
}

interface IProps{
    data: ICredits
}

function Credits({data}:IProps){
    let [slide, setSlide] = useState<ISlide>({idFocus: 0, direction: "right"});

    return (
        <section
            className={style["container"]}
        >
            <header className={style["title"]}>
                <h1>Cast</h1>
            </header>
            <div className={style["set-cards"]}>
                <ContainerSlide
                    styles={slideStyles}
                    attachInfo={{
                        length:data.cast.length
                    }}
                    state={[slide, setSlide]}
                >
                    { data.cast.map((castData)=>( <CardCast key={castData.cast_id} data={castData}/> ))}
                </ContainerSlide>
            </div>
        </section>
    );
}

export default Credits;