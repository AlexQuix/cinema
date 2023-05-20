import { useContext } from "react";
import { LoaderContext } from "../context";

export default function useLoader(){
    const context = useContext(LoaderContext);

    if (!context) {
        throw new Error('useMediaCarousel must be used within a LoaderProvider');
    }

    return context;
}