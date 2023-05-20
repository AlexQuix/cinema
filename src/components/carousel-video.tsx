import style from "./styles/carousel-video.module.css";
import Carousel from "@container/Carousel";
import CardVideo from "./card-video";
import CarouselResize from "@container/carousel-resize";

interface ICarouselVideoProps{
    data: Array<ITrailer>
}

export default function CarouselVideo({data}:ICarouselVideoProps){
    return (
        <div className={style["carousel-video"]}>
            <div className={style["carousel-video-wrapper"]}>
                <CarouselResize gapResize={[20, 20, 20, 20, 10]}
                                slidesToMoveResize={[3, 2, 2, 2, 1]}
                                slidesToShowResize={[3, 2, 2, 2, 1]}
                                slideCount={data.length}
                                transition={200}>
                    <div className={style["slide-viewer-wrapper"]}>
                        <Carousel.SlideViewer>
                            { data.map((trailerData)=>(
                                <Carousel.Slide key={trailerData.id}>
                                    <CardVideo data={trailerData}/>
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