import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";

interface Props{
    query:any;
    state: [string|undefined, React.Dispatch<React.SetStateAction<string|undefined>>];
    items: {
        genre:{id:number|string,name:string}[],
        sorf:{id:number|string,name:string}[],
        discover:{id:number|string,name:string}[]
    }
}
interface IQueryURL{
    discover:string;
    mediatype:string;
    genre:string;
    sorf:string;
}

import style from "./styles/filter-panel.module.css";
import SelectBox from "@components/select-box";

function FilterPanel({query, items, state:[url, setURL]}:Props){
    let getCurrentValue = (discover, mediatype)=>items.discover.filter((e)=>e.id==discover)[0];
    let router = useRouter();
    let {mediatype, discover} = query;

    let [isFirstTime, setIsFirstTime] = useState<boolean>(true);
    let [sorfSelect, setSorfSelect] = useState<Data.Item>(items.sorf[0]);
    let [discoverSelect, setDiscoverSelect] = useState<Data.Item>(getCurrentValue(discover, mediatype));
    let [genreSelect, setGenreSelect] = useState<Data.Item>({id:"undefined", name:"Any"});
    let [queryUrl, setQueryUrl] = useState<IQueryURL|undefined>(undefined);
    
    useEffect(()=>{
        let stateQuery:IQueryURL = {
            mediatype: mediatype,
            genre: (genreSelect.id !== "undefined")?`&genre=${genreSelect.id}`:"",
            sorf: `&sorf=${sorfSelect.id}`,
            discover: (discoverSelect)?`discover=${discoverSelect.id}`:""
        };
        setQueryUrl(stateQuery);
    }, [sorfSelect, discoverSelect, genreSelect])
    useEffect(()=>{
        if(isFirstTime && queryUrl){
            if(!discoverSelect){
                router.replace(`/discover/${mediatype}/popular`);
                setDiscoverSelect(items.discover[0]);
                return
            }
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
                    {`${getCurrentValue(discover, mediatype)?.name} ${(mediatype=="movie")?"Movies":"TV Shows"}`}:
                </h1>
            </header>
        </div>
        <div className={style["wrapper"]}>
            <SelectBox title="Sorf by:" state={[sorfSelect, setSorfSelect]} items={items.sorf}/>
            <SelectBox title="Genre:" state={[genreSelect, setGenreSelect]} items={items.genre}/>
            <SelectBox title="Discover:" state={[discoverSelect, setDiscoverSelect]} items={items.discover}/>
            <span className={style["line"]}/>
            <button 
                id={(queryUrl)?style["btn-search-press"]:""}
                className={style["btn-search"]}
                onClick={()=>{
                    if(discover !== discoverSelect.id){
                        router.replace(`/discover/${mediatype}/${discoverSelect.id}`);
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