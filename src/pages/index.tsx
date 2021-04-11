import React from "react";

// COMPONENTS
import Navegation from "@container/navegation";
import CoverPage from "@container/cover-page";
import ContentPopular from "@container/content-popular";
import Collection from "@container/collection";

function Home(){
    return (
        <>  
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet"></link>
            <div>
                <Navegation/>
                <CoverPage/>
                <ContentPopular/>
                <Collection/>
            </div>
        </>
    )
}

export default Home;