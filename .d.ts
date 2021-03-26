declare namespace Image{
    interface Backdrops{
        aspect_ratio: number;
        file_path: string;
        height: number;
        iso_639_1: string;
        vote_average: number;
        vote_count: number;
        width: number;
    }
}
declare namespace Search{
    interface TVShow{
        backdrop_path: string
        first_air_date: string
        genre_ids: [number, number, number]
        id: number
        name: string
        origin_country: [string]
        original_language: string
        original_name: string
        overview: string
        popularity: number
        poster_path: string
        vote_average: number
        vote_count: numberr
    }
    interface Movie{
        adult: boolean
        backdrop_path: string;
        id: number;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
    }
    type MovieAndTV = Movie & TVShow;
}