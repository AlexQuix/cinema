import React from "react";

interface Props{
    id:string;
    direction:"left"|"right";
    slideControl:(direction:"left"|"right")=>void;
}

function BtnSlideDirection({id, direction, slideControl}:Props){
    return (<>
        <div
            id={id}
            className={direction}
            onClick={()=>{slideControl(direction)}}
        >
            <div>
                <svg width="57" height="206" viewBox="0 0 57 206" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.54763 110.607L44.724 201.922C45.7226 204.036 47.0556 205.2 48.4771 205.2C49.8985 205.2 51.2315 204.036 52.2301 201.922L55.4098 195.199C57.4788 190.818 57.4788 183.698 55.4098 179.324L19.1536 102.643L55.45 25.8769C56.4486 23.7632 57 20.9454 57 17.9409C57 14.933 56.4486 12.1152 55.45 9.99986L52.2704 3.27837C51.271 1.16466 49.9387 0.000198364 48.5173 0.000198364C47.0959 0.000198364 45.7628 1.16466 44.7642 3.27837L1.54763 94.6767C0.546646 96.7971 -0.00314331 99.6282 1.52588e-05 102.638C-0.00314331 105.659 0.546646 108.488 1.54763 110.607Z"/>
                </svg>
            </div>
        </div>
        <style jsx>{`
            .left,
            .right{
                cursor: pointer;
                position: absolute;
                display: flex;
                align-items: center;
                z-index: 300;
            }
            .left{
                left: 0px;
            }
            .right{
                right: 0px;
            }

            .left > div,
            .right > div{
                transform: scale(1);
                position: absolute;
                transition: 0.5s;
            }
            .right > div{
                transform: rotateZ(180deg) scale(1);
            }
            .left:hover > div{
                transform: scale(1.1);
            }
            .right:hover > div{
                transform: rotateZ(180deg) scale(1.1);
            }

            .left > div > svg,
            .right > div > svg{
                width: 100%;
                height: 100%;
                transition: 0.5s;
            }
            .left:hover > div > svg,
            .right:hover > div > svg{
                fill: var(--color-light);
            }
        `}</style>
    </>)
}

export default BtnSlideDirection;