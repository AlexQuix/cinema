import React, { useEffect, useRef } from "react"; 

import styles from "./style.module.css";
import useCarousel from "@container/Carousel/hooks/useCarousel";

export interface ISliderProps {
    children: JSX.Element[];
}

export default function SlideViewer({ children }:ISliderProps){
    let sliderRef = useRef({} as HTMLDivElement);
    let { setting, sliderPos, updateSliderWidth } = useCarousel();

    useEffect(()=>{
        if(sliderRef.current && sliderRef.current.className){
            let rect = sliderRef.current.getBoundingClientRect();
            updateSliderWidth(rect.width);
        }
    }, [ sliderRef, setting ])

    return (
        <div className={styles["carousel-slide-viewer"]}
            ref={sliderRef}>
            <div className={styles["slider"]}
                style={{
                    gap: setting.slidesGap,
                    transform: `translateX(${ sliderPos }px)`,
                    transition: `transform ${ setting.sliderTransition }ms`
                }}
            >
                {children}
            </div>
        </div>
    )
}