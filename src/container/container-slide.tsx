import React, {useState, useEffect} from "react";

import BtnControl from "@components/slide-btn-control";
import WrapperCards from "@components/slide-wrapper-cards";

interface location{
    pushSize:number,
    posxInit:number,
    posxEnd:number,
    length:number,
}
interface ISlideFact{
    screenSizes?:number[],
    itemsDisplayed?:number[];
    pushSize?:number;
    length:number;
}
interface Props{
    children:any;
    styles:({btnLeft, btnRight}:{btnLeft:string, btnRight:string})=>string;
    attachInfo:ISlideFact
    state:[{idFocus:number, direction?:"left"|"right"}, (prop:any)=>void]
};

let getUniqueID = (base:string)=>{
    let random = Math.floor(Math.random() * 16) + 16;
    let firstChunck = Math.pow(Math.ceil(Math.random() * 100), 10).toString(random);
    return base + "-" + firstChunck;
};
let getLocation = (slideInfo:ISlideFact, countCard:number)=>{
    let pushSize = (slideInfo.pushSize)?slideInfo.pushSize:84;
    let posxInit = (100 - pushSize)/2;
    let length = Math.ceil((slideInfo.length/countCard))-1;
    let posxEnd = (-(pushSize * length)+posxInit);
    return {
        pushSize,
        posxInit,
        posxEnd,
        length
    };
}
let buildSlideFact = (slideInfo:ISlideFact)=>{
    let result:any = {};
    result.itemsDisplayed = slideInfo.itemsDisplayed;
    result.screenSizes = slideInfo.screenSizes;
    if(!result.itemsDisplayed){
        result.itemsDisplayed = [3,4,5,6,7,8];
    }
    if(!result.screenSizes){
        result.screenSizes = [340,590,780,1100,1520];
    }
    result.pushSize = (slideInfo.pushSize)?slideInfo.pushSize:84;
    result.length = slideInfo.length;
    return result as {    
        screenSizes:number[],
        itemsDisplayed:number[];
        pushSize:number;
        length:number;
    }
}


// COMPONENT
function ContainerSlide({
    children,
    styles,
    attachInfo,
    state
}:Props){
    let [point, setPoint] = state;
    let [info, setInfo] = useState(buildSlideFact(attachInfo));
    let [location, setLocation] = useState<location>(getLocation(info, info.itemsDisplayed[info.itemsDisplayed.length-1]));

    let btnLeft = getUniqueID("left");
    let btnRight = getUniqueID("right");
    function checkPointer(direction:"left"|"right"){
        if(direction === "left"){
            if(point.idFocus > 0){
                let id = --point.idFocus;
                setPoint({idFocus:id, direction});
                return;
            }
            setPoint({idFocus:location.length, direction});
            return
        }
        if(direction === "right"){
            if(point.idFocus < location.length){
                let id = ++point.idFocus;
                setPoint({idFocus:id, direction});
                return;
            }
            setPoint({idFocus:0, direction});
            return;
        }
    }

    useEffect(()=>{
        function checkScreenSize(){
            let screenSizes = info.screenSizes as number[];
            let countCards = info.itemsDisplayed as number[];
            if(matchMedia(`(min-width:${screenSizes[screenSizes.length-1]}px)`).matches){
                setLocation(getLocation(info, countCards[countCards.length-1]));
                return;
            }
            for(let i = 0; i <= screenSizes.length - 1; i++){
                if(matchMedia(`(max-width:${screenSizes[i]}px)`).matches){
                    setLocation(getLocation(info, countCards[i]));
                    break;
                }
            }
        }
        checkScreenSize();
        window.onresize = checkScreenSize;

        return function(){
            window.onresize = ()=>{};
        }
    }, []);
    return(
        <section
        >
            {(location.length > 0)?<>
                <BtnControl id={btnLeft} direction="left" checkPointer={checkPointer}/>
                <BtnControl id={btnRight} direction="right" checkPointer={checkPointer}/>
                </>:undefined
            }
            <WrapperCards point={point} location={location}>
                {children}
            </WrapperCards>
            <style>{styles({btnLeft, btnRight})}</style>
        </section>
    )
}

export default ContainerSlide;