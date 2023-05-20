import Credits from "@components/credits";
import useLoader from "@container/Loader/hooks/useLoader";

export default function LoadedCredits(){
    let {data} = useLoader();

    return (
        <Credits data={data}/>
    )
}