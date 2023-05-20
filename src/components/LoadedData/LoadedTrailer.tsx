import useLoader from "@container/Loader/hooks/useLoader";

import CarouselVideo from "@components/carousel-video";
import Title from "@components/title";


export default function LoadedTrailer(){
    let {data} = useLoader();
    
    if(data.length === 0){
        return <></>
    }

    data = data.slice(0, 9);
    return (
        <section>
            <style jsx>{`
                section{
                    width: 100%;
                    margin: 3rem 0;
                    position: relative;
                    z-index: 300;
                }

                header{
                    margin-left: 3rem;
                    margin-bottom: 1rem;
                }
            `}</style>
            <header>
                <Title text="Trailer" 
                    size="big" 
                    color="primary"
                    uppercase={true}/>
            </header>
            <CarouselVideo data={data}/>
        </section>
    )
}