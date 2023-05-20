import style from "../styles/collection.module.css";
import Header from "./components/Header";
import Inner from "./components/Inner";
import Loader from "@container/Loader";

import { MediaCarouselProvider } from "./context";

/**
 * Props interface for MediaCarousel component
 * @interface IMediaCarouselProps
 */
interface IMediaCarouselProps{
    /**
     * Children nodes to render within the carousel
     * @type {React.ReactNode | JSX.Element}
     */
    children: React.ReactNode | JSX.Element;
    /**
     * Initial media option
     * @type {MediaTypeOptions}
     */
    initialMedia: MediaTypeOptions;

    getUrl: (media)=>string;
}

export default function MediaCarousel({children, initialMedia, getUrl}:IMediaCarouselProps){
    return (
        <MediaCarouselProvider initialMedia={initialMedia}>
            <Loader url={getUrl(initialMedia)}>
                <Inner getUrl={getUrl}>
                    {children}
                </Inner>
            </Loader>
        </MediaCarouselProvider>
    )
};

MediaCarousel.Header = Header;