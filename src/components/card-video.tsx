import style from "./styles/card-video.module.css";

interface ICardVideoProps {
    data: ITrailer
}

export default function CardVideo({data}:ICardVideoProps){
    return (
        <div className={style["card-video"]}>   
            <h3 className={style["title"]}>{data.name}</h3>
            <div className={style["wrapper-iframe"]}>
                <iframe src={`//www.youtube.com/embed/${data.key}?autoplay=1&origin=http%3A%2F%2Fwww.themoviedb.org&hl=es&modestbranding=1&fs=1&autohide=1` }>
                </iframe>
            </div>
        </div>
    )
}