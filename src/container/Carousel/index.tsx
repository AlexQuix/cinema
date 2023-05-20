import { CarouselProvider, ICarouselSetting } from "./context";

import SlideViewer from "./components/SlideViewer";
import LeftArrow from "./components/LeftArrow";
import RightArrow from "./components/RightArrow";
import Inner from "./components/Inner";
import Slide from "./components/Slide";
import LateralArrows from "./components/LateralArrow";

export interface ICarouselProps extends ICarouselSetting{
    children: React.ReactNode | JSX.Element;
}

export default function Carousel({
    children,
    slidesGap,
    slidesToMove,
    slidesToShow,
    sliderTransition,
    slideCount,
    sliderWidth,
    loopMode
}:ICarouselProps){
    return (
        <CarouselProvider initialSettings={{
            slideCount,
            slidesGap,
            sliderTransition,
            slidesToMove,
            slidesToShow,
            sliderWidth,
            loopMode
        }}>
            <Inner>
                {children}
            </Inner>
        </CarouselProvider>
    )
}


Carousel.defaultProps = {
    loopMode: true,
    sliderWidth: 0
}


Carousel.SlideViewer = SlideViewer;
Carousel.RightArrow = RightArrow;
Carousel.LeftArrow = LeftArrow;
Carousel.Slide = Slide;
Carousel.LateralArrows = LateralArrows;