import React from "react";

import Navegation from "@container/navegation";
import Header from "@container/header";
import FilterPanel from "@container/filter-panel";

function Discover(){
    return (<>
        <Header/>
        <Navegation/>
        <FilterPanel/>
    </>)
}

export default Discover;