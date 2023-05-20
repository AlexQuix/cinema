import useLoader from "@container/Loader/hooks/useLoader";

export default function ErrorIndicator(){
    let {error, isLoading} = useLoader();

    if(!isLoading && error)
        return (
            <div>Something was wrong</div>
        )

    return <></>
}