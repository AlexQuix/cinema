import React from "react";

import Navegation from "@components/navegation";

function Home(){
    return (
        <>  
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet"></link>
            <div>
                <Navegation/>
                <h1>Hola mundo!</h1>
            </div>
        </>
    )
}

export default Home;