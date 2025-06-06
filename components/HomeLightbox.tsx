/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react';
import { LuFlame, LuArrowRight, LuPlay } from 'react-icons/lu'

interface Movie {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    vote_average: number;
    genres: { id: number; name: string }[];
    credits?: {
        cast: { id: number; name: string; character: string }[];
    };
    providers?: {
        results?: {
            US?: {
                flatrate?: { provider_id: number; provider_name: string; logo_path: string }[];
            };
        };
    };
    videos?: {
        results: { key: string; site: string; type: string }[];
    };
}

export default function HomeLightbox() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                setIsLoading(true);

                // First fetch trending movies
                const trendingResponse = await fetch(
                    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
                );
                const trendingData = await trendingResponse.json();
                const trendingMovies = trendingData.results.slice(0, 7);

                // Then fetch details for each movie including credits and providers
                const detailedMovies = await Promise.all(
                    trendingMovies.map(async (movie: Movie) => {
                        const [detailsResponse, creditsResponse, providersResponse, videosResponse] = await Promise.all([
                            fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=genres`),
                            fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`),
                            fetch(`https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`),
                            fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
                        ]);

                        const details = await detailsResponse.json();
                        const credits = await creditsResponse.json();
                        const providers = await providersResponse.json();
                        const videos = await videosResponse.json();

                        return {
                            ...movie,
                            ...details,
                            credits,
                            providers,
                            videos
                        };
                    })
                );

                setMovies(detailedMovies);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setIsLoading(false);
            }
        };

        fetchTrendingMovies();
    }, []);

    useEffect(() => {
        if (movies.length === 0) return;

        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
                setFade(true);
            }, 500); // Half second for fade out before changing content
        }, 15000); // Change every 10 seconds

        return () => clearInterval(interval);
    }, [movies]);

    if (isLoading) {
        return (
            <section className="h-[100dvh] bg-slate-800 flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </section>
        );
    }

    if (movies.length === 0) {
        return (
            <section className="h-[100dvh] bg-slate-800 flex items-center justify-center">
                <div className="text-white text-2xl">No movies found</div>
            </section>
        );
    }

    const currentMovie = movies[currentIndex];
    const trailer = currentMovie.videos?.results?.find(video => video.site === 'YouTube' && video.type === 'Trailer');
    const topCast = currentMovie.credits?.cast.slice(0, 5) || [];
    const streamingProviders = currentMovie.providers?.results?.US?.flatrate || [];

    console.log(currentMovie)

    return (
        <section
            className="h-[90dvh] relative overflow-hidden transition-all duration-500 p-4 md:p-12"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgb(0, 0, 0)), url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >

            <div className='md:w-2/3'>
                <button className="px-2 py-1 bg-blue-500 text-white text-xs flex items-center mb-2"><LuFlame className="mr-1" />Trending</button>
                <h1 className="text-2xl md:text-6xl font-bold text-white mb-1">{currentMovie.title}</h1>
                <p className="text-sm text-slate-300 mb-2 w-2/3">{currentMovie.genres.map((genre, index) => (<span key={genre.id}>{genre.name}{index < currentMovie.genres.length - 1 ? ', ' : ''}</span>))}</p>
                <p className="text-sm text-white md:w-2/3 mb-5">{currentMovie.overview}</p>
                <div className="flex items-center mb-5">
                    <a target="_blank" href={`/${currentMovie.id}`}></a><button className="px-4 py-2 text-sm bg-white flex items-center rounded-sm border-2 border-white mr-2">Learn More<LuArrowRight className="ml-2" /></button>
                    <a target="_blank" href={`https://www.youtube.com/watch?v=${trailer?.key}`}><button className="px-4 py-2 text-sm text-white flex items-center rounded-sm border-2 border-white mr-2"><LuPlay className="mr-2" /> Watch Trailer</button></a>
                </div>
                <div className="flex items-center">
                    <p className="text-sm text-slate-300 mr-2">Watch on</p>
                    <div className="flex gap-2">
                        {streamingProviders ? (
                            <>
                                {streamingProviders.map((provider) => (
                                    <img
                                        key={provider.provider_id}
                                        src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                                        alt={provider.provider_name}
                                        width={60}
                                        height={60}
                                        className="h-8 w-auto object-contain rounded-lg" // Maintains aspect ratio
                                        title={provider.provider_name} // Shows provider name on hover
                                        loading="lazy"
                                    />
                                ))}
                            </>
                        ) : (null)}

                    </div>
                </div>
            </div>


            {/* Navigation dots */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                {movies.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setFade(false);
                            setTimeout(() => {
                                setCurrentIndex(index);
                                setFade(true);
                            }, 500);
                        }}
                        className={`w-5 h-1 rounded-full transition-colors ${currentIndex === index ? 'bg-white' : 'bg-gray-500'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}