import { createContext, useState } from "react";

export const MediaCarouselContext = createContext({} as MediaCarouselContext);


interface MediaCarouselContext{
  selectedMedia: MediaTypeOptions; // The currently selected media
  changeSelectedMedia: (media: MediaTypeOptions) => void; // Function to change the selected media
}

export interface MediaCarouselProviderProps {
  children: React.ReactNode | JSX.Element;
  initialMedia: MediaTypeOptions;
  onSelectMedia: ((media: MediaTypeOptions) => void) | undefined;
}

export function MediaCarouselProvider({ children, initialMedia, onSelectMedia }:MediaCarouselProviderProps){
    const [ selectedMedia, setSelectedMedia ] = useState<MediaTypeOptions>(initialMedia);
  
    const changeSelectedMedia = (media) => {
      setSelectedMedia(media);

      if(onSelectMedia) onSelectMedia(media);
    };
  
    return (
      <MediaCarouselContext.Provider
        value={{
          selectedMedia, 
          changeSelectedMedia
        }}
      >
        {children}
      </MediaCarouselContext.Provider>
    );
};

MediaCarouselProvider.defaultProps = {
  onSelectMedia: undefined
}