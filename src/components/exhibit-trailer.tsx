import React from "react";

function ExhibitTrailer({keyTrailer}:{keyTrailer:string|undefined}){
    return(
        <div>
            <iframe 
                src={`//www.youtube.com/embed/${keyTrailer}?autoplay=1&origin=http%3A%2F%2Fwww.themoviedb.org&hl=es&modestbranding=1&fs=1&autohide=1` }
                style={{
                    width: "700px",
                    height: "300px",
                    position: "relative",
                    zIndex: 500
                }}
            >
            </iframe>
        </div>
    )
}

export default ExhibitTrailer;