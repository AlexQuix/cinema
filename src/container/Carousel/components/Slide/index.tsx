import { useEffect } from "react";

import useCarousel from "@container/Carousel/hooks/useCarousel"

interface ISlideProps {
    children: JSX.Element | React.ReactNode;
}

export default function Slide({children}:ISlideProps){
    let { setting, slideSetting:slide, setSlideSetting, sliderWidth } = useCarousel();

    useEffect(()=>{        
        if(slide.width <= 0){
            let {slidesGap, slidesToShow} = setting;

            setSlideSetting({
                width: (sliderWidth / slidesToShow) - slidesGap
            })
        }
    }, [ setting ])

    return (
        <div style={{
                width: `${slide.width}px`,
                flexShrink: 0
            }}>
            {children}
        </div>
    )
}