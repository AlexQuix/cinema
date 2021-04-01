import React, {useEffect} from "react";

import BtnSlideControl from "@components/btn-slide-control";
import SlideWrapperCards from "@components/slide-wrapper-cards";

interface Props{
    children:any;
    styles:JSX.Element;
    slideInfo:{
        increasePosx:number,
        posxInit:number,
        posxEnd:number,
        length:number,
    }
    state:[{idFocus:number, direction?:"left"|"right"}, (prop:any)=>void]
};

function ContainerSlide({
    children,
    styles,
    slideInfo,
    state
}:Props){
    let [slide, setSlide] = state;
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
            style={{
                width: "100%",
                height: "auto",
                padding: "40px 0px",
                position: "relative",
                overflow: "hidden"
            }}
        >
            <BtnSlideControl direction="left" slideControl={slideControl}/>
            <BtnSlideControl direction="right" slideControl={slideControl}/>
            <SlideWrapperCards slide={slide} slideInfo={slideInfo}>
                {children}
            </SlideWrapperCards>
            {styles}
        </section>
    )
}

export default ContainerSlide;