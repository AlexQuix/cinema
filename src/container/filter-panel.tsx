import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";

interface Props{
    query:any;
    state: [string|undefined, React.Dispatch<React.SetStateAction<string|undefined>>]
}
interface IQueryURL{
    discover:string;
    mediatype:string;
    genre:string;
    sorf:string;
}

import style from "./styles/filter-panel.module.css";
import SelectBox from "@components/select-box";

let sorfItems = [
    {value:"popularity.asc", title:"Popularity Ascending"},
    {value:"popularity.desc", title:"Popularity Descending"},
    {value:"primary_release_date.asc", title:"Release Date Ascending"},
    {value:"primary_release_date.desc", title:"Release Date Descending"},
    {value:"title.asc", title:"Title (A-Z)"},
    {value:"title.desc", title:"Title (Z-A)"},
    {value:"vote_average.asc", title:"Rating Ascending"},
    {value:"vote_average.desc", title:"Rating Descending"},
];
let discoverItems = {
    movie:[
        {value:"popular", title:"Popular"},
        {value:"now_playing", title:"Now Playing"},
        {value:"upcoming", title:"Upcoming"},
        {value:"top_rated", title:"Top Rated"},
    ],
    tv:[
        {value:"popular", title:"Popular"},
        {value:"airing_today", title:"Airing Today"},
        {value:"on_the_air", title:"Currently Airing"},
        {value:"top_rated", title:"Top Rated"},
    ]
};
let genreItems = [
    {value:28, title:"Action"},
    {value:12, title:"Adventure"},
    {value:16, title:"Animation"},
    {value:35, title:"Comedy"},
    {value:80, title:"Crime"},
    {value:99, title:"Documentary"},
    {value:18, title:"Drama"},
    {value:10751, title:"Family"},
    {value:14, title:"Fantasy"},
    {value:36, title:"History"},
    {value:27, title:"Horror"},
    {value:10402, title:"Music"},
    {value:9648, title:"Mystery"},
    {value:10749, title:"Romance"},
    {value:878, title:"Science Fiction"},
    {value:10770, title:"TV Movie"},
    {value:53, title:"Thriller"},
    {value:10752, title:"War"},
    {value:37, title:"Western"},
    {value:"undefined", title:"Any"}
];
let getCurrentValue = (discover, mediatype)=>discoverItems[mediatype].filter((e)=>e.value==discover)[0];
function FilterPanel({query, state:[url, setURL]}:Props){
    let router = useRouter();
    let {mediatype, discover} = query;

    let [isFirstTime, setIsFirstTime] = useState<boolean>(true);
    let [sorfSelect, setSorfSelect] = useState<Data.Item>(sorfItems[0]);
    let [discoverSelect, setDiscoverSelect] = useState<Data.Item>(getCurrentValue(discover, mediatype));
    let [genreSelect, setGenreSelect] = useState<Data.Item>({value:"undefined", title:"Any"});
    let [queryUrl, setQueryUrl] = useState<IQueryURL|undefined>(undefined);

    useEffect(()=>{
        let stateQuery:IQueryURL = {
            mediatype: mediatype,
            genre: (genreSelect.value !== "undefined")?`&genre=${genreSelect.value}`:"",
            sorf: `&sorf=${sorfSelect.value}`,
            discover: (discoverSelect)?`discover=${discoverSelect.value}`:""
        };
        setQueryUrl(stateQuery);
    }, [sorfSelect, discoverSelect, genreSelect])
    useEffect(()=>{
        if(isFirstTime && queryUrl){
            setIsFirstTime(false);
            let url = `${queryUrl.discover}${queryUrl.sorf}${queryUrl.genre}`;
            setURL(url);
            setQueryUrl(undefined);
        }
    }, [queryUrl])
    return (
    <div  className={style["container"]}>
        <div className={style["wrapper-title"]}>
            <header>
                <h1 className={style["title"]}>
                    {`${getCurrentValue(discover, mediatype)?.title} ${(mediatype=="movie")?"Movies":"TV Shows"}`}:
                </h1>
            </header>
        </div>
        <div className={style["wrapper"]}>
            
            <SelectBox title="Sorf by:" state={[sorfSelect, setSorfSelect]} items={sorfItems}/>
            <SelectBox title="Genre:" state={[genreSelect, setGenreSelect]} items={genreItems}/>
            <SelectBox title="Discover:" state={[discoverSelect, setDiscoverSelect]} items={discoverItems[mediatype]}/>
            <span className={style["line"]}/>
            <button 
                id={(queryUrl)?style["btn-search-press"]:""}
                className={style["btn-search"]}
                onClick={()=>{
                    if(discover !== discoverSelect.value){
                        router.replace(`/discover/${mediatype}/${discoverSelect.value}`);
                    }
                    if(queryUrl){
                        let url = `${queryUrl.discover}${queryUrl.sorf}${queryUrl.genre}`;
                        setURL(url);
                        setQueryUrl(undefined);
                    }
                }}
            >Buscar</button>
        </div>
    </div>)
}



export default FilterPanel;