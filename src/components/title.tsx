type Size = "big" | "medium" | "small" | "extra-big";

interface ITitleProps{
    text: string;
    size: Size;
    color: "white" | "primary";
    uppercase: boolean;
}

const getSize = (size: Size) => {
    if(size === "extra-big")
        return "2.7rem";

    if(size === "big")
        return "2rem";
        
    if(size === "medium")
        return "1.5rem"
        
    return "1rem"
};
const getColor = (color) => color === "primary" ? "#83cdef" : "#fff"

export default function Title({text, size, color, uppercase}:ITitleProps){
    return (
        <>
            <style jsx>{`
                h1{
                    font-family: "Bebas Neue";
                    font-size: ${getSize(size)};
                    font-weight: 500;
                    color: ${getColor(color)};
                    text-transform: ${ uppercase? "uppercase" : "normal"};
                }
            `}</style>
            <h1>{text}</h1>
        </>
    )
}