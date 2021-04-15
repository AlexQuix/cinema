import React, {useState} from 'react';

interface Item {
    value:string|number, 
    title:string
}
interface Props{
    state:[Item,React.Dispatch<React.SetStateAction<Item>>];
    items:Item[];
    title:string;
}

import style from "./styles/select-box.module.css";

function SelectBox({state:[selectValue, setSelectValue], items, title}:Props){
    let [visibleItems, setVisibleItems] = useState<boolean>(false);
    return (
        <div className={style["container"]}>
            <h1 className={style["title"]}>{title}</h1>
            <div 
                className={style["contain"]}
            >
                <span 
                    id={style[(visibleItems)?"selected-pressed":""]}
                    className={style["selected"]}
                    onClick={()=>setVisibleItems(!visibleItems)}
                >
                    {selectValue.title}
                    <div className={style["arrow"]}>
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.004 492.004">
                            <path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
                                c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
                                c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
                                c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"/>
                        </svg>
                    </div>
                </span>
                <ul 
                    className={style[(visibleItems)?"wrapper-items":"wrapper-items-reduce"]}
                >
                    {items.map((item, i)=>
                        (item.value !== selectValue.value)?
                            <li 
                                key={i}
                                className={style["item"]}
                                onClick={()=>{
                                    setSelectValue(item);
                                    setVisibleItems(false);
                                }}
                            >{item.title}</li>
                        :undefined
                    )}
                </ul>
            </div>
        </div>
    )
};

export default SelectBox;