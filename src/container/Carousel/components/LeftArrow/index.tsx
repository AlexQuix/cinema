import useControl from "@container/Carousel/hooks/useControl";

type Props = {
    enable: boolean;
    handleClick: ()=>void;
}

export default function LeftArrow(){
    let { slideToLeft } = useControl();

    return(
        <button onClick={()=>slideToLeft()}>
            <style jsx>{`
                button {
                    width: 100%;
                    background: none;
                    outline: none;
                    border: none;
                }

                button svg{
                    width: 100%;
                    height: 100%;
                    stroke: #fff;
                    stroke-width: 2;
                }
            `}</style>
            <svg viewBox="0 0 12 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2L2 17L10 32" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    )
}