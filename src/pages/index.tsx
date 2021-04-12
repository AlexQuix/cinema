import React from "react";

// COMPONENTS
import Navegation from "@container/navegation";
import CoverPage from "@container/cover-page";
import ContentPopular from "@container/content-popular";
import Collection from "@container/collection";
import BtnMediaSelector from "@components/btn-media-selector";

function Home(){
    return (
        <>  
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet"></link>
            <div>
                <Navegation/>
                <CoverPage/>
                <ContentPopular/>
                <Collection
                    url={(mediatype)=>{
                        if(mediatype == "movie"){
                            return process.env.NEXT_PUBLIC_BASE_URL + "/trending/movie/week" + process.env.NEXT_PUBLIC_API_KEY;
                        }
                        return process.env.NEXT_PUBLIC_BASE_URL + "/trending/tv/week" + process.env.NEXT_PUBLIC_API_KEY;
                    }}
                    children={function([mediatype, setMediatype], style){
                        return (<>
                            <header className={style["title"]}>
                                <svg width="44" height="33" viewBox="0 0 44 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.1934 31.2302C14.1934 32.193 13.281 32.9808 12.1657 32.9808H3.78475C2.66954 32.9808 1.7571 32.193 1.7571 31.2302V23.2942C1.7571 22.3313 2.66954 21.5435 3.78475 21.5435H12.1657C13.281 21.5435 14.1934 22.3313 14.1934 23.2942V31.2302Z"/>
                                    <path d="M29.0967 31.2302C29.0967 32.1931 28.1842 32.9808 27.069 32.9808H18.688C17.5728 32.9808 16.6604 32.1931 16.6604 31.2302V19.0927C16.6604 18.1299 17.5728 17.3421 18.688 17.3421H27.069C28.1842 17.3421 29.0967 18.1299 29.0967 19.0927V31.2302Z"/>
                                    <path d="M44.0001 31.2302C44.0001 32.193 43.0876 32.9808 41.9724 32.9808H33.5914C32.4762 32.9808 31.5638 32.193 31.5638 31.2302V14.4244C31.5638 13.4616 32.4762 12.6738 33.5914 12.6738H41.9724C43.0876 12.6738 44.0001 13.4616 44.0001 14.4244V31.2302Z"/>
                                    <path d="M42.2459 0.0326557L33.1384 1.94571C32.4157 2.09673 32.2547 2.59169 32.7804 3.04556L34.7239 4.68424C34.887 4.84483 34.6935 5.0584 34.5399 5.14885C33.3161 5.8701 31.374 6.92839 28.6896 8.13759C14.0749 14.7207 2.02746 14.3169 1.84632 14.3097C0.87926 14.2674 0.0523808 14.9106 0.00236522 15.7469C-0.0475152 16.5837 0.697582 17.2971 1.6668 17.3402C1.73804 17.3433 2.02773 17.3546 2.51477 17.3546C5.63831 17.3546 16.8586 16.8893 30.3153 10.8279C33.4994 9.39371 35.7063 8.15673 36.995 7.37363C37.1772 7.26287 37.4947 7.07194 37.7878 7.32951L39.9135 9.16461C40.4392 9.61848 41.0096 9.47879 41.1816 8.85429L43.2477 0.893602C43.4194 0.268987 42.9685 -0.118363 42.2459 0.0326557Z"/>
                                </svg>
                                <h1>Trending</h1>
                            </header>
                            <BtnMediaSelector mediatype={mediatype} setMediaType={setMediatype}/> 
                        </>)
                    }}
                />

            </div>
        </>
    )
}

export default Home;