import React, { createContext, useEffect, useState } from "react";

export interface ISlideSetting {
    width: number;
}

export interface ICarouselSetting {
    sliderWidth: number; // Width of the carousel slider
    slidesGap: number; // Gap between slides
    slidesToShow: number; // Number of slides to show at once
    slidesToMove: number; // Number of slides to move when navigation buttons are clicked
    sliderTransition: number; // Transition duration for slider animation
    slideCount: number; // Total number of slides in the carousel
    loopMode: boolean; // Indicates if the carousel should loop back to the beginning when reaching the end
}

export interface ICarousel{
    setting: ICarouselSetting;
    setSetting: (settings: ICarouselSetting)=>void;
    slideSetting: ISlideSetting;
    setSlideSetting:React.Dispatch<React.SetStateAction<ISlideSetting>>;
    sliderPos: number;
    setSliderPos:React.Dispatch<React.SetStateAction<number>>;
    currentSlide: number;
    setCurrentSlide:React.Dispatch<React.SetStateAction<number>>;
    sliderWidth: number;
    updateSliderWidth: (newWidth: number)=>void;
}

export const CarouselContext = createContext<ICarousel>({} as any);


export interface IProviderProps {
    children: React.ReactNode | JSX.Element;
    initialSettings: ICarouselSetting;
}

export function CarouselProvider({children, initialSettings}:IProviderProps){
    const [ currentSlide, setCurrentSlide ] = useState(0);
    const [ sliderPos, setSliderPos ] = useState(0);
    const [ sliderWidth, setSliderWidth ] = useState(0);
    const [ slideSetting, setSlideSetting ] = useState<ISlideSetting>({ width: 0 });

    function setSetting(){
        
    }

    function updateSliderWidth(newWidth: number){
        setSliderWidth(newWidth);
    }

    return (
        <CarouselContext.Provider value={{
            setting: initialSettings, setSetting,
            slideSetting, setSlideSetting,
            sliderPos, setSliderPos,
            currentSlide, setCurrentSlide,
            sliderWidth, updateSliderWidth
        }}>
            {children}
        </CarouselContext.Provider>
    )
}