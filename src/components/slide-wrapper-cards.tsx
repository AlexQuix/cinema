import React, {useState, useEffect} from "react";

interface Props{
    slide: {
        idFocus:number,
        direction?:"left"|"right"
    };
    slideInfo:{
        increasePosx:number,
        posxInit:number,
        posxEnd:number,
        length:number,
    }
    children: any,
    type?: "movie" | "tv"
}


// COMPONENT
function SlideWrapperCards({
    slide,
    slideInfo,
    children,
    type
}:Props){
    let [left, setLeft] = useState(slideInfo.posxInit);
    useEffect(()=>{
        if(slide.direction == "left"){
            if(slide.idFocus === slideInfo.length){
                setLeft(slideInfo.posxEnd);
                return;
            }
            setLeft(left + slideInfo.increasePosx);
            return;
        }
        if(slide.direction == "right"){
            if(slide.idFocus === 0){
                setLeft(slideInfo.posxInit);
                return;
            }
            setLeft(left - slideInfo.increasePosx);
            return;
        }
    }, [slide]);
    return (<>
        <div
            style={{
                width: "auto",
                display: "inline-flex",
                position: "relative",
                left: `${left}vw`,
                transition: "0.3s"
            }}
        >
            {children}
        </div>
    </>)
}

export default SlideWrapperCards;