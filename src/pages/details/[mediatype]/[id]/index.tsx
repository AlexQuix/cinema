import { useParams, useRouter } from "next/navigation"
import { GetServerSideProps } from "next";

import Navegation from "@container/navegation";
import DetailsMedia from "@container/media-details";
import Header from "@container/header";
import Loader from "@container/Loader";
import LoadedCredits from "@components/LoadedData/LoadedCredits";
import LoadedTrailer from "@components/LoadedData/LoadedTrailer";
import LoadingEffect from "@container/loading-effect";

interface IProps{
    data: MediaDetail;
    success: boolean;
    media: MediaTypeOptions;
    id: string;
}


export default function Details({data, media, id}:IProps){
    return(<>
        <Header/>
        <div style={{background:"#1a1d29", position:"relative", overflow: "hidden"}}>
            <Navegation/>
            <DetailsMedia data={data} mediatype={"movie"}/>
            
            <Loader url={`/api/${media}/${id}/trailers`}>
                <Loader.Loading>
                    <LoadingEffect contentType="trailer"/>
                </Loader.Loading>
                <Loader.LoadData>
                    <LoadedTrailer/>
                </Loader.LoadData>
            </Loader>
            
            <Loader url={`/api/${media}/${id}/credits`}>
                <Loader.Loading>
                    <LoadingEffect contentType="media"/>
                </Loader.Loading>
                <Loader.LoadData>
                    <LoadedCredits />
                </Loader.LoadData>
            </Loader>
        </div>
    </>);
}

export const getServerSideProps:GetServerSideProps = async ({query, req})=>{
    try{
        let { mediatype, id } = query;
        let { host } = req.headers;

        let protocol = req.headers['x-forwarded-proto'] || 'http';
        let url = `${protocol}://${host}/api/${mediatype}/${id}/detail`;
        let resp = await fetch(url);
        let data = await resp.json();

        let success = data?.id ? true : false;

        return {
            props: { data, success, media: mediatype, id },
            notFound: !success
        }
    }catch(e){
        return {
            props: { },
            notFound: true
        }
    }
}