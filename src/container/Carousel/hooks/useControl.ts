import { useContext } from "react";
import { CarouselContext } from "../context";

export default function useControl(){
    let { setting, slideSetting, currentSlide, setCurrentSlide, setSliderPos } = useContext(CarouselContext);

    function slideToRight(){
        let { slidesGap, slideCount, slidesToShow, slidesToMove, loopMode } = setting;
        let { width: slideWidth } = slideSetting;

        let fullSlideWidth = slideWidth + slidesGap;
        let nextSlide = currentSlide + slidesToMove;
        
        // Check if there are more slides to show on the right
        if(nextSlide < slideCount){
            setCurrentSlide(nextSlide);
            setSliderPos(-(nextSlide * fullSlideWidth));
            return;
        }

        // Check if there are partial slides remaining on the right
        if((currentSlide + slidesToShow) < slideCount){
            setCurrentSlide(nextSlide);
            setSliderPos(-((slideCount * fullSlideWidth) - (slidesToShow * fullSlideWidth)));
            return;
        }

        // Check if loopMode is enabled, reset to the beginning
        if(loopMode){
            setCurrentSlide(0)
            setSliderPos(0);
            return;
        }
    }

    function slideToLeft(){
        let { slidesGap, slidesToMove, loopMode, slideCount, slidesToShow } = setting;
        let { width: slideWidth } = slideSetting;

        let fullSlideWidth = slideWidth + slidesGap;
        let nextSlide = currentSlide - slidesToMove;

        
        // Check if there are more slides to show on the left
        if( nextSlide >= 0 ){
            setCurrentSlide(nextSlide);
            setSliderPos(-(nextSlide * fullSlideWidth));
            return;
        }

        // Check if already at the beginning
        if( currentSlide > 0 ){
            setCurrentSlide(0);
            setSliderPos(0);
            return;
        }

        // Check if loopMode is enabled, jump to the end
        if(loopMode){
            nextSlide = slideCount - slidesToShow;
            setCurrentSlide(nextSlide);
            setSliderPos(-(nextSlide * fullSlideWidth));
            return;
        }
    }


    return {
        slideToRight,
        slideToLeft
    }
}