import { useEffect } from "react";
import { ICarouselProps } from "@container/Carousel";
import useCarousel from "@container/Carousel/hooks/useCarousel";

interface IProps{
    children: React.ReactNode | JSX.Element;
}

export default function Inner({ children }: IProps){
    return (
        <div className="carousel"
            style={{width: "100%"}}>
            {children}
        </div>
    )
}