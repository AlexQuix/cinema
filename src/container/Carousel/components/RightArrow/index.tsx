import useControl from "@container/Carousel/hooks/useControl";


export default function RightArrow(){
    let { slideToRight } = useControl();

    function handleClick(){
        slideToRight();
    }

    return (
        <button onClick={handleClick}>
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
                <path d="M2 2L10 17L2 32" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    )
}