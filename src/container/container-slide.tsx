import React, {useEffect} from "react";

import BtnControl from "@components/slide-btn-control";
import WrapperCards from "@components/slide-wrapper-cards";

interface Props{
    children:any;
    styles:({btnLeft, btnRight}:{btnLeft:string, btnRight:string})=>string;
    slideInfo:{
        increasePosx:number,
        posxInit:number,
        posxEnd:number,
        length:number,
    }
    state:[{idFocus:number, direction?:"left"|"right"}, (prop:any)=>void]
};

let getUniqueID = (base:string)=>{
    let random = Math.floor(Math.random() * 16) + 16;
    let firstChunck = Math.pow(Math.ceil(Math.random() * 100), 10).toString(random);
    return base + "-" + firstChunck;
}

function ContainerSlide({
    children,
    styles,
    slideInfo,
    state
}:Props){
    let [slide, setSlide] = state;
    let btnLeft = getUniqueID("left");
    let btnRight = getUniqueID("right");

    function slideControl(direction:"left"|"right"){
        if(direction === "left"){
            if(slide.idFocus > 0){
                let id = --slide.idFocus;
                setSlide({idFocus:id, direction});
                return;
            }
            setSlide({idFocus:slideInfo.length, direction});
            return
        }
        if(direction === "right"){
            if(slide.idFocus < slideInfo.length){
                let id = ++slide.idFocus;
                setSlide({idFocus:id, direction});
                return;
            }
            setSlide({idFocus:0, direction});
            return;
        }
    }
    return(
        <section
        >
            <BtnControl id={btnLeft} direction="left" slideControl={slideControl}/>
            <BtnControl id={btnRight} direction="right" slideControl={slideControl}/>
            <WrapperCards slide={slide} slideInfo={slideInfo}>
                {children}
            </WrapperCards>
            <style>{styles({btnLeft, btnRight})}</style>
        </section>
    )
}

export default ContainerSlide;