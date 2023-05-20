import { useEffect, useState } from "react";
import Carousel from "./Carousel";

interface IProps{
  /**
     * Gap values for different breakpoints [desktop, bigTablet, tablet, mobile, default]
     * @type {number[]}
     */
    gapResize: [number, number, number, number, number];
    /**
     * Number of slides to move for different breakpoints [desktop, bigTablet, tablet, mobile, default]
     * @type {number[]}
     */
    slidesToMoveResize: [number, number, number, number, number];
    /**
     * Number of slides to show for different breakpoints [desktop, bigTablet, tablet, mobile, default]
     * @type {number[]}
     */
    slidesToShowResize: [number, number, number, number, number];
    /**
     * Transition duration in milliseconds
     * @type {number}
     */
    transition: number;
    /**
     * Total number of slides
     * @type {number}
     */
    slideCount: number;
    /**
     * The children to be rendered within the Carousel component
     * @type {React.ReactNode | JSX.Element}
     */
    children: React.ReactNode | JSX.Element;
}

enum BREAKPOINTS {
    DESKTOP = 1240,
    BIG_TABLET = 1040,
    TABLET = 780,
    MOBILE = 540,
}



export default function CarouselResize({
    gapResize,
    slidesToMoveResize,
    slidesToShowResize,
    transition,
    slideCount,
    children
}:IProps){
    let [size, setSize] = useState({
        gap: gapResize[0],
        slidesToMove: slidesToMoveResize[0],
        slidesToShow: slidesToShowResize[0]
    });

    function resize(){
        if(matchMedia(`(min-width: ${BREAKPOINTS.DESKTOP}px)`).matches)
            return setSize({
                gap: gapResize[0],
                slidesToMove: slidesToMoveResize[0],
                slidesToShow: slidesToShowResize[0]
            });

        if(matchMedia(`(min-width: ${BREAKPOINTS.BIG_TABLET}px)`).matches)
            return setSize({
                gap: gapResize[1],
                slidesToMove: slidesToMoveResize[1],
                slidesToShow: slidesToShowResize[1]
            });

        if(matchMedia(`(min-width: ${BREAKPOINTS.TABLET}px)`).matches)
            return setSize({
                gap: gapResize[2],
                slidesToMove: slidesToMoveResize[2],
                slidesToShow: slidesToShowResize[2]
            });

        if(matchMedia(`(min-width: ${BREAKPOINTS.MOBILE}px)`).matches)
            return setSize({
                gap: gapResize[3],
                slidesToMove: slidesToMoveResize[3],
                slidesToShow: slidesToShowResize[3]
            });

        return setSize({
            gap: gapResize[4],
            slidesToMove: slidesToMoveResize[4],
            slidesToShow: slidesToShowResize[4]
        });
    }

    useEffect(()=>{
        resize();
        window.addEventListener("resize", resize);

        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <Carousel slidesGap={size.gap}
                slidesToShow={size.slidesToShow}
                slidesToMove={size.slidesToMove}
                sliderTransition={transition}
                slideCount={slideCount}
        >
            {children}
        </Carousel>
    )
}

CarouselResize.SlideViewer = Carousel.SlideViewer;
CarouselResize.RightArrow = Carousel.RightArrow;
CarouselResize.LeftArrow = Carousel.LeftArrow;
CarouselResize.Slide = Carousel.Slide;
CarouselResize.LateralArrows = Carousel.LateralArrows;