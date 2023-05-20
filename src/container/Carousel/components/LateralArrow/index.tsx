import LeftArrow from "../LeftArrow";
import RightArrow from "../RightArrow";

interface IProps {
    width: number;
}

export default function LateralArrows({width}:IProps){
    return (
        <>
            <style jsx>{`
                .arrow{
                    width: ${width}px;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }

                .arrow-right{
                    right: 0px;
                }

                .arrow-left{
                    left: 0px;
                }
            `}</style>
            <div className="arrow arrow-right">
                <RightArrow />
            </div>
            <div className="arrow arrow-left">
                <LeftArrow />
            </div>
        </>
    )
}