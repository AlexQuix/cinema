import React, {useState, useEffect} from "react";

interface SlidePos{
    pushSize:number,
    posxInit:number,
    posxEnd:number,
    length:number,
}
interface Props{
    point: {
        idFocus:number,
        direction?:"left"|"right"
    };
    location:SlidePos;
    children: any,
    type?: "movie" | "tv"
}


// COMPONENT
function SlideWrapperCards({
    point,
    location,
    children
}:Props){
    let [left, setLeft] = useState(location.posxInit);
    useEffect(()=>{
        if(point.direction == "left"){
            if(point.idFocus === location.length){
                setLeft(location.posxEnd);
                return;
            }
            setLeft(left + location.pushSize);
            return;
        }
        if(point.direction == "right"){
            if(point.idFocus === 0){
                setLeft(location.posxInit);
                return;
            }
            setLeft(left - location.pushSize);
            return;
        }
    }, [point]);
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