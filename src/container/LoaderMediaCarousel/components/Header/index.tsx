import style from "./style.module.css";
import useMedia from "../../hooks/useMedia"

import BtnMediaSelector from "@components/btn-media-selector";

interface IHeaderProps{
    children: React.ReactNode | JSX.Element;
    enableSelectedMedia: boolean;
}

export default function Header({children, enableSelectedMedia}:IHeaderProps){
    let { selectedMedia, changeSelectedMedia } = useMedia();

    return (
        <div className={style["wrapper-title"]} >
            <header className={style["title"]}>
                {children}
            </header>
            { enableSelectedMedia && <BtnMediaSelector mediatype={selectedMedia} 
                                                    setMediaType={changeSelectedMedia}/> }
        </div>
    )
}

Header.defaultProps = {
    enableSelectedMedia: true
}