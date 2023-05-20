import style from "./style.module.css";
import { useEffect } from "react";
import useMedia from "../../hooks/useMedia";

import Carousel from "../Carousel";
import Loader from "@container/Loader";
import LoadingEffect from "@container/loading-effect";

interface InnerProps{
    /**
     * Children nodes to render within the carousel
     * @type {React.ReactNode | JSX.Element}
     */
    children: React.ReactNode | JSX.Element;

    getUrl: (media:MediaTypeOptions)=>string;
}

export default function Inner({children, getUrl}: InnerProps){
    let {selectedMedia, url, updateURL} = useMedia();

    useEffect(()=>{
        let newUrl = getUrl(selectedMedia);
        if(url !== newUrl) updateURL(getUrl(selectedMedia))
    }, [selectedMedia])

    return (
        <section className={style["inner"]}>
            <div className={style["inner-content"]}>
                { children }
                <Loader.Loading>
                    <LoadingEffect contentType="media"/>
                </Loader.Loading>
                <Loader.LoadData>
                    <Carousel />
                </Loader.LoadData>
            </div>
        </section>
    )
}