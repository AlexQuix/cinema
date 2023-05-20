import { useEffect } from "react";
import useSWR from "swr";
import useLoader from "./useLoader";
import { fetcher } from "src/helpers";

export default function useFetch(){
    let {url, updateData, updateIsLoading, updateError} = useLoader();
    let {data, error, isLoading} = useSWR(url, fetcher);

    useEffect(()=>{
        if(data instanceof Object) 
            updateData(data);
    }, [data]);

    useEffect(()=>{
        updateIsLoading(isLoading);
    }, [isLoading]);

    useEffect(()=>{
        updateError(error);
    }, [error]);

    return {data, error, isLoading}
}