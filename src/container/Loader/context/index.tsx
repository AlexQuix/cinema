import { createContext, useState } from "react";

interface ILoaderContext{
    url: string | null;
    data: any;
    error: any;
    isLoading: boolean;
    isRefresh: boolean;
    
    refresh: ()=>void;
    updateURL: (newUrl:string)=>void;
    updateData: (newData:any)=>void;
    updateError: (newError:any)=>void;
    updateIsLoading: (newIsLoading:boolean)=>void;
}

export const LoaderContext = createContext({} as ILoaderContext);


interface ILoaderProvider{
    children: JSX.Element | React.ReactNode;
    url: string | null;
}

export const LoaderContextProvider = ({ children, url }:ILoaderProvider) => {
    const [loader, setLoader] = useState({ url, data: null, error: null, isLoading: false, isRefresh: false })

    // Function to update the URL
    const updateURL = (newURL:string) => {
        setLoader(prevState => ({
        ...prevState,
            url: newURL
        }));
    };

    // Function to update the data
    const updateData = (newData:any) => {
        setLoader(prevState => ({
        ...prevState,
            data: newData
        }));
    };

    // Function to update the error
    const updateError = (newError:any) => {
        setLoader(prevState => ({
        ...prevState,
            error: newError
        }));
    };

    // Function to update the isLoading flag
    const updateIsLoading = (isLoading:boolean) => {
        setLoader(prevState => ({
        ...prevState,
            isLoading
        }));
    };

    const refresh = ()=>{
        if(!loader.isRefresh)
            setLoader((prev)=>({...prev, isRefresh: true}));
    }

    return (
        <LoaderContext.Provider value={{
            ...loader,
            updateURL,
            updateData,
            updateError,
            updateIsLoading,
            refresh
        }}>
            {children}
        </LoaderContext.Provider>
    )
}