import useLoader from "@container/Loader/hooks/useLoader";

interface ILoadingIndicatorProps{
    children: JSX.Element | undefined;
}

export default function LoadingIndicator({children}: ILoadingIndicatorProps){
    let {isLoading} = useLoader();

    if(isLoading)
        return (<>
            { children ? children : ( <div>Loading...</div> ) }
        </>)

    return <></>
}