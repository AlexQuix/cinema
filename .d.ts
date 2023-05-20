
interface Cast{
    adult: boolean,
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id?: number;
    character: string;
    credit_id: string;
    order: number;
}
interface Crew{
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: any;
    credit_id: string;
    department: string;
    job: string;
}

//////////////////////// TV SHOWS 
declare namespace TVShow{
    interface CreatedBy{
        id: number;
        credit_id: string;
        name: string;
        gender: number;
        profile_path: string;
    }
    interface LastEpisodeToAir{
        air_date: string
        episode_number: number;
        id: number;
        name: string
        overview: string
        production_code: string
        season_number: number;
        still_path?: string
        vote_average: number
        vote_count: number;
    }
    interface Networks{
        name:string
        id:number
        logo_path?:string
        origin_country:string
    }
    interface Season{
        air_date:string;
        episode_count:number;
        id:number;
        name:string;
        overview:string;
        poster_path:string;
        season_number:number;
    }

s
    interface Search{
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
        vote_count: number;
    }
    interface Details{
        backdrop_path?: string;
        created_by: CreatedBy[];
        episode_run_time: number[];
        first_air_date:string
        genres: Genres[];
        homepage:string
        id:number;
        in_production:boolean
        languages: string[]
        last_air_date:string
        last_episode_to_air:LastEpisodeToAir
        name:string
        next_episode_to_air?:any;
        networks: Networks[]
        number_of_episodes:number;
        number_of_seasons:number;
        origin_country:string[]
        original_language:string
        original_name:string
        overview:string
        popularity:number
        poster_path:string
        production_companies: ProductionCompany[]
        production_countries: ProductionCountries[]
        seasons: Season[]
        spoken_languages: SpokenLanguages[]
        status:string
        tagline:string
        type:string
        vote_average:number
        vote_count:number;
        content_ratings?:{
            results:{iso_3166_1: string,rating: string;}[]
        }
    }
}
//////////////////////// MOVIE
declare namespace Movie{
    type Credits = {
        id: number;
        cast: Cast[];
        crew: Crew[];
    }
    interface Certifications{
        certification: string;
        iso_639_1: string;
        note: string;
        release_date: string;
        type: number;
    }
    interface ReleaseDates{
        iso_3166_1: string;
        release_dates: Certifications[]
    }
    interface Video{
        id: string;
        iso_639_1: string;
        iso_3166_1: string;
        key: string;
        name: string;
        site: string;
        size: number,
        type: string;
    }
    interface Search{
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
    interface Details{
        adult: boolean;
        backdrop_path: string;
        belongs_to_collection?: any;
        budget: number;
        genres: Genres[]
        homepage: string;
        id: number;
        imdb_id: string;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path?: any;
        production_companies: ProductionCompany[];
        production_countries: ProductionCountries[];
        release_date: string;
        revenue: number;
        runtime: number;
        spoken_languages: SpokenLanguages[]
        status: string;
        tagline: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
        release_dates?: {
            results: ReleaseDates[]
        }
    }
}
//////////////////////// PEOPLE
declare namespace People{
    interface Search{
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
    interface Details{
        birthday?:string
        known_for_department:string
        deathday?:string
        id:number
        name:string
        also_known_as:string[]
        gender:number
        biography:string
        popularity:number
        place_of_birth?:string
        profile_path?:string
        adult:boolean
        imdb_id:string
        homepage?:string
    }
}

//////////////////////// IMAGE
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

//////////////////////// SEARCH
declare namespace Search{
    type MovieAndTV = Movie.Search & TVShow.Search;
    type Keywords = Movie.Search | TVShow.Search | People.Search;
    type Credits = {
        id: number;
        cast: Cast[];
        crew: Crew[];
    }
}


declare namespace Data{
    interface Item {
        id:string|number;
        name:string;
    }
}


























// NEW DATA


interface IProductionCompany{
    id: number, 
    logo_path: string, 
    name: string, 
    origin_country: string
}
interface IProductionCountry{
    iso_3166_1: string, 
    name: string
}
interface IGenre{
    id: number, 
    name: string
}
interface ISpokenLanguage{
    iso_639_1: string, 
    name: string
}

interface ICredits{
    id: number;
    cast: Cast[];
    crew: Crew[];
}

interface IResults<T>{
    results: T;
}

type Media = ITv | IMovie;
type MediaDetail = ITvDetails | IMovieDetails
type MediaTypeOptions = "movie" | "tv";

interface ITrendingResult{
    page: number;
    results: Media[];
    total_pages: number;
    total_results: number;
}

// tv shows
interface ICreatedBy{
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
}

interface ISeason{
    air_date:string;
    episode_count:number;
    id:number;
    name:string;
    overview:string;
    poster_path:string;
    season_number:number;
}

interface ILastEpisodeToAir{
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path?: string;
    vote_average: number;
    vote_count: number;
    runtime: number;
    show_id: number;
}

interface INetwork{
    name:string
    id:number
    logo_path?:string
    origin_country:string
}

interface ITv{
    adult: boolean;
    backdrop_path: string;
    id: number;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    media_type: MediaTypeOptions;
    genre_ids: number[];
    popularity: number;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
}

interface ITvDetails extends ITv{
    created_by: ICreatedBy[];
    episode_run_time: number[];
    genres: IGenre[];
    homepage: string,
    in_production: true,
    languages: string[],
    last_air_date: string,
    last_episode_to_air: ILastEpisodeToAir;
    next_episode_to_air: null,
    networks: INetwork[],
    number_of_episodes: number,
    number_of_seasons: number,
    production_companies: IProductionCompany[],
    production_countries: IProductionCountry[],
    seasons: ISeason[],
    spoken_languages: ISpokenLanguage[],
    status: string,
    tagline: string,
    type: string,
}

interface IMovie {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: MediaTypeOptions;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface IMovieDetails extends IMovie{
    revenue: number;
    runtime: number;
    genres: IGenre[];
    budget: number;
    belongs_to_collection: any,
    homepage: string,
    imdb_id: string,
    production_companies: IProductionCompany[],
    production_countries: IProductionCountry[],
    spoken_languages: ISpokenLanguage[],
    status: string,
    tagline: string,
}

interface ITrailer{
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}