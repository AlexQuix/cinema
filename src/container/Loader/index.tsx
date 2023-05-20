import { LoaderContextProvider } from "./context";

import ErrorIndicator from "./components/ErrorIndicator";
import LoadingIndicator from "./components/LoadingIndicator";
import LoadData from "./components/LoadedData";

/**
 * Represents the props for the Loader component.
 */
interface ILoaderProps {
    /**
     * The content to be rendered when the data has been loaded.
     * @type {React.ReactNode | JSX.Element} children
     */
    children: React.ReactNode | JSX.Element;

    url: string;
}



export default function Loader({children, url}: ILoaderProps){
    return (
        <LoaderContextProvider url={url}>
            {children}
        </LoaderContextProvider>
    )
}


Loader.Error = ErrorIndicator;
Loader.Loading = LoadingIndicator;
Loader.LoadData = LoadData;