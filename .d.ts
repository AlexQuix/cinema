declare interface TVShow{
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;s
}
declare interface Movie{
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: string;
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
declare interface Person{
    adult: boolean;
    gender: number;
    id: number;
    known_for: any[];
    known_for_department: string;
    media_type: string;
    name: string;
    popularity: number;
    profile_path: string;
}

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

    type MovieAndTV = Movie & TVShow;
    type Keywords = Movie | TVShow | Person;
}