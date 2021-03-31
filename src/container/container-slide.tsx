import React, {useEffect} from "react";

import BtnSlideControl from "@components/btn-slide-control";
import SlideWrapperCards from "@components/slide-wrapper-cards";

interface Props{
    children:any;
    styles:JSX.Element;
    slide:{
        idFocus:number, 
        direction?:"left"|"right"
    };
    slideInfo:{
        increasePosx:number,
        posxInit:number,
        posxEnd:number,
        length:number,
    }
    slideControl:(direction:"left"|"right")=>void;
};

function ContainerSlide({
    children,
    styles,
    slide,
    slideInfo,
    slideControl
}:Props){
    
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