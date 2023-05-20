import { useContext } from "react"
import { CarouselContext } from "../context";

export default function useCarousel(){
    let context = useContext(CarouselContext);
    return context;
}