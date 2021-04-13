import React from "react";
import HEAD from "next/head";

// COMPONENTS
import Navegation from "@container/navegation";
import CoverPage from "@container/cover-page";
import ContentPopular from "@container/content-popular";
import Collection from "@container/collection";
import BtnMediaSelector from "@components/btn-media-selector";
import ContentTrailers from "@container/content-trailers";
import Header from "@container/header";

function Home(){
    return (<>  
        <Header/>
        <div>
            <Navegation/>
            <CoverPage/>
            <ContentPopular/>
            <Collection
                url={(mediatype)=>`${process.env.NEXT_PUBLIC_BASE_URL}/trending/${mediatype}/week${process.env.NEXT_PUBLIC_API_KEY}`}
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
            <ContentTrailers
                url={(mediatype)=>`/api/${mediatype}/trailer`}
                styletype={2}
                children={([mediatype, setMediatype], style)=>(<>
                    <header className={style["title-style-2"]}>
                        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="m245.652344 111.300781c-12.214844-7.089843-26.8125-7.113281-39.050782-.066406-12.273437 7.070313-19.601562 19.761719-19.601562 33.945313v99.640624c0 14.1875 7.328125 26.875 19.605469 33.945313 6.097656 3.511719 12.78125 5.269531 19.46875 5.269531 6.726562 0 13.453125-1.777344 19.578125-5.335937l85.855468-49.816407c12.207032-7.082031 19.492188-19.75 19.492188-33.882812s-7.285156-26.800781-19.492188-33.882812zm-18.652344 131.976563v-96.554688l83.199219 48.277344zm245-34.277344v-129c0-22.054688-17.945312-40-40-40h-352c-22.054688 0-40 17.945312-40 40v230c0 22.054688 17.945312 40 40 40h352c22.054688 0 40-17.945312 40-40 0-11.046875 8.953125-20 20-20s20 8.953125 20 20c0 44.113281-35.886719 80-80 80h-352c-44.113281 0-80-35.886719-80-80v-230c0-44.113281 35.886719-80 80-80h352c44.113281 0 80 35.886719 80 80v129c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20zm40 262c0 11.046875-8.953125 20-20 20h-257c-11.046875 0-20-8.953125-20-20s8.953125-20 20-20h257c11.046875 0 20 8.953125 20 20zm-337 1c0 22.089844-17.910156 40-40 40-15.214844 0-28.441406-8.496094-35.207031-21h-79.792969c-11.046875 0-20-8.953125-20-20s8.953125-20 20-20h80.957031c7.046875-11.398438 19.65625-19 34.042969-19 22.089844 0 40 17.910156 40 40zm0 0"/>
                        </svg>
                        <h1>Last Trailers</h1>
                    </header>
                    <BtnMediaSelector mediatype={mediatype} setMediaType={setMediatype}/> 
                </>)}
            />
            <Collection 
                url={()=>"https://api.themoviedb.org/3/movie/upcoming?api_key=36e9bc3df49bcf8ff1978a5075c591c1&language=en-US&page=1"}
                children={([], style)=>{
                    return (<>
                        <header className={style["title"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612">
                                <path d="M612,463.781c0-70.342-49.018-129.199-114.75-144.379c-10.763-2.482-21.951-3.84-33.469-3.84
                                    c-3.218,0-6.397,0.139-9.562,0.34c-71.829,4.58-129.725,60.291-137.69,131.145c-0.617,5.494-0.966,11.073-0.966,16.734
                                    c0,10.662,1.152,21.052,3.289,31.078C333.139,561.792,392.584,612,463.781,612C545.641,612,612,545.641,612,463.781z
                                    M463.781,561.797c-54.133,0-98.016-43.883-98.016-98.016s43.883-98.016,98.016-98.016s98.016,43.883,98.016,98.016
                                    S517.914,561.797,463.781,561.797z"/>
                                <polygon points="482.906,396.844 449.438,396.844 449.438,449.438 396.844,449.438 396.844,482.906 482.906,482.906 
                                    482.906,449.438 482.906,449.438 		"/>
                                <path d="M109.969,0c-9.228,0-16.734,7.507-16.734,16.734v38.25v40.641c0,9.228,7.506,16.734,16.734,16.734h14.344
                                    c9.228,0,16.734-7.507,16.734-16.734V54.984v-38.25C141.047,7.507,133.541,0,124.312,0H109.969z"/>
                                <path d="M372.938,0c-9.228,0-16.734,7.507-16.734,16.734v38.25v40.641c0,9.228,7.507,16.734,16.734,16.734h14.344
                                    c9.228,0,16.734-7.507,16.734-16.734V54.984v-38.25C404.016,7.507,396.509,0,387.281,0H372.938z"/>
                                <path d="M38.25,494.859h236.672c-2.333-11.6-3.572-23.586-3.572-35.859c0-4.021,0.177-7.999,0.435-11.953H71.719
                                    c-15.845,0-28.688-12.843-28.688-28.688v-229.5h411.188v88.707c3.165-0.163,6.354-0.253,9.562-0.253
                                    c11.437,0,22.61,1.109,33.469,3.141V93.234c0-21.124-17.126-38.25-38.25-38.25h-31.078v40.641c0,22.41-18.23,40.641-40.641,40.641
                                    h-14.344c-22.41,0-40.641-18.231-40.641-40.641V54.984H164.953v40.641c0,22.41-18.231,40.641-40.641,40.641h-14.344
                                    c-22.41,0-40.641-18.231-40.641-40.641V54.984H38.25C17.126,54.984,0,72.111,0,93.234v363.375
                                    C0,477.733,17.126,494.859,38.25,494.859z"/>
                                <circle cx="134.774" cy="260.578" r="37.954"/>
                                <circle cx="248.625" cy="260.578" r="37.954"/>
                                <circle cx="362.477" cy="260.578" r="37.954"/>
                                <circle cx="248.625" cy="375.328" r="37.953"/>
                                <circle cx="134.774" cy="375.328" r="37.953"/>
                            </svg>
                            <h1>Upcoming</h1>
                        </header>
                    </>)
                }}
            />
            <Collection
                url={()=>"https://api.themoviedb.org/3/tv/airing_today?api_key=36e9bc3df49bcf8ff1978a5075c591c1&language=en-US&page=1"}
                choicemedia="tv"
                children={([], style)=>(
                    <header className={style["title"]}>
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 512.001 512.001">
                            <g>
                                    <path d="M497.052,301.696l-19.097-39.063c-2.06-4.214-2.06-9.049,0-13.263l19.096-39.065
                                        c10.632-21.751,2.208-47.676-19.178-59.024l-38.409-20.378c-4.144-2.199-6.986-6.11-7.796-10.729l-7.512-42.828
                                        c-4.183-23.847-26.243-39.865-50.208-36.479l-43.053,6.09c-4.644,0.661-9.241-0.837-12.613-4.099l-31.251-30.231
                                        c-17.401-16.836-44.661-16.835-62.06-0.001l-31.252,30.232c-3.372,3.261-7.968,4.756-12.613,4.099l-43.053-6.09
                                        c-23.964-3.383-46.025,12.633-50.208,36.479l-7.512,42.828c-0.81,4.62-3.652,8.531-7.795,10.729l-38.41,20.38
                                        c-21.387,11.346-29.811,37.272-19.178,59.024l19.096,39.063c2.06,4.214,2.06,9.049,0,13.263l-19.096,39.065
                                        c-10.632,21.751-2.208,47.676,19.178,59.024l38.409,20.378c4.144,2.199,6.986,6.11,7.796,10.729l7.512,42.829
                                        c4.183,23.847,26.242,39.861,50.208,36.479l43.053-6.09c4.647-0.658,9.242,0.838,12.613,4.099l31.251,30.231
                                        c8.702,8.419,19.864,12.627,31.03,12.626c11.164-0.001,22.332-4.209,31.03-12.625l31.252-30.232
                                        c3.372-3.261,7.966-4.756,12.613-4.099l43.053,6.09c2.152,0.304,4.285,0.452,6.395,0.452c21.389-0.002,40.006-15.226,43.814-36.93
                                        l7.512-42.828c0.81-4.62,3.652-8.531,7.795-10.729l38.41-20.38C499.261,349.374,507.685,323.448,497.052,301.696z
                                        M451.425,275.601l19.096,39.063c3.597,7.36,0.747,16.131-6.489,19.97l-38.411,20.379c-12.246,6.499-20.644,18.058-23.04,31.712
                                        l-7.512,42.828c-1.415,8.067-8.88,13.483-16.987,12.341l-43.053-6.09c-13.73-1.943-27.315,2.474-37.281,12.114l-31.252,30.233
                                        c-5.886,5.694-15.109,5.695-20.997-0.001l-31.251-30.232c-8.422-8.146-19.432-12.563-30.927-12.563
                                        c-2.106,0-4.229,0.149-6.354,0.449l-43.053,6.09c-8.113,1.143-15.571-4.273-16.987-12.341l-7.512-42.829
                                        c-2.396-13.655-10.793-25.214-23.041-31.713l-38.409-20.379c-7.236-3.839-10.086-12.611-6.489-19.969l19.096-39.065
                                        c6.088-12.455,6.088-26.743,0-39.198V236.4l-19.096-39.063c-3.597-7.36-0.747-16.131,6.489-19.97l38.411-20.379
                                        c12.246-6.499,20.644-18.058,23.04-31.712l7.513-42.828c1.415-8.067,8.873-13.491,16.987-12.341l43.053,6.09
                                        c13.725,1.942,27.315-2.475,37.281-12.114l31.252-30.233c5.886-5.694,15.109-5.695,20.997,0.001l31.251,30.232
                                        c9.965,9.64,23.554,14.05,37.281,12.114l43.053-6.09c8.111-1.145,15.571,4.273,16.987,12.341l7.512,42.828
                                        c2.396,13.655,10.793,25.214,23.041,31.713l38.41,20.378c7.236,3.839,10.086,12.611,6.489,19.969l-19.096,39.065
                                        C445.336,248.857,445.336,263.145,451.425,275.601z"/>
                            </g>
                            <g>
                                    <path d="M187.095,182.175c-8.154,0-14.765,6.611-14.765,14.765v55.575l-31.088-62.178c-3.062-6.125-9.936-9.341-16.599-7.767
                                        c-6.665,1.574-11.373,7.522-11.373,14.37v118.12c0,8.154,6.611,14.765,14.765,14.765c8.154,0,14.765-6.611,14.765-14.765v-55.575
                                        l31.088,62.178c2.542,5.084,7.708,8.164,13.203,8.164c1.125-0.001,2.263-0.13,3.396-0.397c6.665-1.574,11.373-7.522,11.373-14.37
                                        V196.94C201.86,188.786,195.25,182.175,187.095,182.175z"/>
                            </g>
                            <g>
                                    <path d="M285.528,300.295h-44.295v-29.53h34.452c8.154,0,14.765-6.611,14.765-14.765s-6.611-14.765-14.765-14.765h-34.452v-29.53
                                        h44.295c8.154,0,14.765-6.611,14.765-14.765s-6.611-14.765-14.765-14.765h-59.06c-8.154,0-14.765,6.611-14.765,14.765v118.12
                                        c0,8.154,6.611,14.765,14.765,14.765h59.06c8.154,0,14.765-6.611,14.765-14.765S293.683,300.295,285.528,300.295z"/>
                            </g>
                            <g>
                                    <path d="M383.962,182.175c-8.154,0-14.765,6.611-14.765,14.765v55.575l-1.558-3.117c-2.501-5.002-7.614-8.162-13.207-8.162
                                        s-10.705,3.16-13.207,8.162l-1.558,3.117V196.94c0-8.154-6.611-14.765-14.765-14.765c-8.154,0-14.765,6.611-14.765,14.765v118.12
                                        c0,6.848,4.708,12.796,11.373,14.37c6.667,1.575,13.536-1.641,16.599-7.767l16.323-32.647l16.323,32.647
                                        c2.543,5.084,7.708,8.164,13.203,8.164c1.125-0.001,2.263-0.13,3.396-0.397c6.665-1.574,11.373-7.522,11.373-14.37V196.94
                                        C398.727,188.786,392.117,182.175,383.962,182.175z"/>
                            </g>

                        </svg>
                        <h1>New Episodes</h1>
                    </header>
                )}
            />
        </div>
    </>)
}

export default Home;