import useLoadData from "@container/Loader/hooks/useFetch";
import useLoader from "@container/Loader/hooks/useLoader";

interface ILoadedDataProps {
    children: React.ReactNode | JSX.Element;
}

export default function LoadedData({children}:ILoadedDataProps){
    useLoadData();
    let {isLoading, data} = useLoader();
    
    if(!isLoading && data)
        return (<>{children}</>)

    return <></>
}