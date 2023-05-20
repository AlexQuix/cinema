export let fetcher = (...arch)=>fetch(arch[0]).then(res => res.json());


export function isMovie(media:Media):media is IMovie{
    return (media as IMovie).title !== undefined;
}