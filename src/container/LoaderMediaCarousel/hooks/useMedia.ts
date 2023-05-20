import { useContext } from "react";
import { MediaCarouselContext } from "../context";
import useLoader from "@container/Loader/hooks/useLoader";

export default function useMedia(){
  const loader = useLoader();
  const context = useContext(MediaCarouselContext);

  if (!context) {
    throw new Error('useMediaCarousel must be used within a MediaCarouselProvider');
  }

  return {
    ...context,
    ...loader
  }
};