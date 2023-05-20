import style from "./style.module.css";
import useMedia from "../../hooks/useMedia";

import CardMedia from "@components/card-media";
import Carousel from "@container/Carousel";
import CarouselResize from "@container/carousel-resize";

export default function Body(){
    let { data:mediaData, selectedMedia } = useMedia();

    return (
        <div className={style["carousel-container"]}>
            <div className={style["carousel-wrapper"]}>
                <CarouselResize gapResize={[20,20,20,20,20]}
                        slidesToShowResize={[5, 4, 4, 3, 2]}
                        slidesToMoveResize={[5, 4, 4, 3, 2]}
                        transition={200}
                        slideCount={mediaData.length}
                >
                    <div className={style["slide-viewer-wrapper"]}>
                        <Carousel.SlideViewer>
                            { mediaData.map((data)=>(
                                <Carousel.Slide key={data.id}>
                                    <CardMedia href={`/${selectedMedia}/${data.id}`} data={data}/>
                                </Carousel.Slide>
                            ))}
                        </Carousel.SlideViewer>
                    </div>
                    <Carousel.LateralArrows width={18}/>
                </CarouselResize>
            </div>
        </div>
    )
}