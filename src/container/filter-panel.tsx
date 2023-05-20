import style from "./styles/filter-panel.module.css";
import React, {useState, useEffect} from "react";

import SelectBox from "@components/select-box";

interface IDiscover {
    id:number|string,
    name:string
}

interface ISorf{
    id:number|string,
    name:string
}

export interface IQuery{
    mediatype: MediaTypeOptions;
    genre: IGenre;
    sorf: ISorf;
}

interface IProps{
    media: MediaTypeOptions;
    genres: IGenre[],
    sorf: ISorf[],

    onSearch: (query:IQuery) => void;
}

function FilterPanel({media, genres, sorf, onSearch}:IProps){
    let [sorfSelect, setSorfSelect] = useState<ISorf>(sorf[0]);
    let [genreSelect, setGenreSelect] = useState<IGenre>(genres[0]);

    return (
        <div  className={style["container"]}>
            <div className={style["wrapper-title"]}>
                <header>
                    <h1 className={style["title"]}>
                        {media.toUpperCase()}:
                    </h1>
                </header>
            </div>
            <div className={style["wrapper"]}>
                <SelectBox title="Sorf by:" 
                        items={sorf}
                        initial={sorfSelect}
                        onSelect={(value)=>{
                            setSorfSelect(value);
                        }}/>
                <SelectBox title="Genre:" 
                        items={genres}
                        initial={genreSelect}
                        onSelect={(value)=>{
                            setGenreSelect(value as IGenre);
                        }}/>
                
                <span className={style["line"]}/>
                <button className={style["btn-search"]}
                    onClick={()=>{
                        let query: IQuery = {
                            sorf: sorfSelect,
                            genre: genreSelect,
                            mediatype: media
                        };
                        onSearch(query);
                    }}
                >Buscar</button>
            </div>
        </div>)
}



export default FilterPanel;