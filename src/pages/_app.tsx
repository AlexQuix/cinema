import React from "react";

import "../public/style/index.css";

export default function CoreApp ({Component, pageProps}){
    return (
        <Component {...pageProps}/>
    )
}