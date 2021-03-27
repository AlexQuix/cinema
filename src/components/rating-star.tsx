import React, {useState} from "react";

import style from "./styles/rating-star.module.css";

function RatingStar({rating}:{rating:number}){
    let [fillStars, setFillStar] = useState(calcRatingStar(rating));
    function calcRatingStar(rating){
        let fillStars:unknown[] = [];
        for(let i = 0; i < 5; i++){
            if(rating >= 2 ){
                rating = rating - 2;
                fillStars.push(true);
                continue;
            }
            if(rating <= 0){
                fillStars.push(false);
                continue;
            }
            let percentage = (rating * 100) / 2;
            fillStars.push(percentage);
            rating = 0;
            continue;
        }
        return fillStars;
    }
    function getStyles(fill: boolean | number):{
        style:{width:string, height:string, zIndex:number, clipPath:string},
        colorSvg: string,
        hasBackground:boolean
    }{
        let result = {
            style: {
                width: "100%",
                height: "100%",
                position: "relative",
                zIndex: 200,
                clipPath: "none"
            },
            colorSvg: "#E5AD1B",
            hasBackground: false
        }
        if(fill == false){
            result.hasBackground = true;
            return result;
        }
        if(fill === true){
            return result;
        }
        result.style.clipPath = `polygon(0% 0%, ${fill}% 0%, ${fill}% 100%, 0% 100%)`;
        result.hasBackground = true;
        return result;
    }
    return (
        <>
            {
                fillStars.map((fill, index)=>{
                    let result = getStyles(fill as any);
                    return (
                        <div
                            className={style["star"]}
                            key={index}
                        >
                            <div
                                style={result.style}
                            >
                                { fill?
                                    <svg style={{width:"100%", height:"100%", fill:result.colorSvg}} width="41" height="35" viewBox="0 0 41 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M40.2061 13.1766C39.9422 12.4398 39.2183 11.9165 38.3617 11.8469L26.7268 10.8933L22.126 1.17361C21.7868 0.46128 21.0142 0.000183105 20.1558 0.000183105C19.2974 0.000183105 18.5248 0.46128 18.1856 1.17527L13.5848 10.8933L1.94807 11.8469C1.09306 11.9182 0.37091 12.4398 0.105487 13.1766C-0.159935 13.9133 0.0851885 14.7214 0.731983 15.2308L9.5266 22.1925L6.93328 32.5035C6.74351 33.2616 7.06952 34.0453 7.76645 34.5C8.14106 34.7443 8.57933 34.8687 9.02129 34.8687C9.40235 34.8687 9.78034 34.776 10.1196 34.5927L20.1558 29.1787L30.1884 34.5927C30.9225 34.9914 31.8479 34.955 32.5433 34.5C33.2406 34.0439 33.5663 33.26 33.3765 32.5035L30.7832 22.1925L39.5778 15.2322C40.2246 14.7214 40.4716 13.9147 40.2061 13.1766Z"/>
                                    </svg>:undefined
                                }
                            </div>
                            {   result.hasBackground?
                                <div className={style["background"]}>
                                    <svg width="659" height="578" viewBox="0 0 659 578" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M624.644 226.274L624.653 226.275L624.662 226.276C626.234 226.405 627.401 226.935 628.125 227.464C628.662 227.857 628.878 228.182 628.956 228.328C628.941 228.354 628.923 228.382 628.901 228.415C628.806 228.554 628.614 228.791 628.257 229.078L628.245 229.087L628.232 229.097L484.46 344.476L469.501 356.48L474.119 375.095L516.478 545.872C516.393 546.028 516.126 546.426 515.428 546.889L515.426 546.89C513.417 548.223 510.256 548.398 507.982 547.146L507.948 547.127L507.913 547.108L343.904 457.362L329.505 449.483L315.106 457.359L151.036 547.106L151.029 547.11L151.023 547.113C149.985 547.682 148.775 548 147.478 548C145.926 548 144.554 547.554 143.511 546.865C142.831 546.414 142.575 546.029 142.495 545.881L184.856 375.095L189.473 356.482L174.518 344.477L30.7451 229.076L30.7162 229.053L30.6871 229.03C30.3503 228.761 30.173 228.54 30.0871 228.414C30.071 228.39 30.0573 228.369 30.0457 228.349C30.136 228.182 30.3622 227.856 30.8901 227.47C31.6142 226.94 32.7839 226.407 34.3653 226.271C34.3688 226.271 34.3723 226.271 34.3758 226.27L224.566 210.467L241.905 209.027L249.265 193.262L324.46 32.2079C324.461 32.2061 324.461 32.2042 324.462 32.2022C324.555 32.0068 324.87 31.4981 325.743 30.9704C326.63 30.4336 327.921 30 329.503 30C331.085 30 332.38 30.4339 333.274 30.974C334.148 31.5021 334.463 32.0089 334.553 32.1955C334.554 32.1987 334.556 32.2017 334.557 32.2047L409.74 193.26L417.099 209.026L434.439 210.467L624.644 226.274ZM629.008 228.445C629.007 228.436 629.005 228.424 629.003 228.408L657.273 218.422L629.008 228.445ZM516.514 546.016L545.631 538.794L516.509 545.998L516.514 546.016Z" strokeWidth="60"/>
                                    </svg>
                                </div>:undefined
                            }
                        </div>
                    );
                })
            }
        </>
    )
}

export default RatingStar;