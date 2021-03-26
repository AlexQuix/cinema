import React from "react";

// COMPONENTS
import Navegation from "@container/navegation";
import CoverPage from "@container/cover-page";
import Popular from "@container/popular";

function Home(){
    return (
        <>  
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet"></link>
            <div>
                <Navegation/>
                <CoverPage/>
                <Popular/>
            </div>
        </>
    )
}

export default Home;