import React from "react";

// COMPONENTS
import Navegation from "@components/navegation";
import CoverPage from "@components/cover-page";

function Home(){
    return (
        <>  
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet"></link>
            <div>
                <Navegation/>
                <CoverPage/>
            </div>
        </>
    )
}

export default Home;