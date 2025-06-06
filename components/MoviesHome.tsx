'use client'

import { useState, useEffect, useRef } from 'react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import Image from 'next/image';
import Link from 'next/link';

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
    genre_ids: number[];
}

interface Genre {
    id: number;
    name: string;
}

export default function MoviesHome() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                // Fetch movie genres first
                const genresResponse = await fetch(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
                );
                const genresData = await genresResponse.json();
                setGenres(genresData.genres);

                // Then fetch popular movies
                const moviesResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
                );
                const moviesData = await moviesResponse.json();
                setMovies(moviesData.results.slice(0, 12)); // Get first 12 movies

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -400,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 400,
                behavior: 'smooth'
            });
        }
    };

    const getGenreNames = (genreIds: number[]) => {
        return genreIds.map(id =>
            genres.find(genre => genre.id === id)?.name
        ).filter(Boolean).join(', ');
    };

    if (isLoading) {
        return (
            <div className="py-12 flex justify-center">
                <div className="text-white text-lg">Loading movies...</div>
            </div>
        );
    }

    return (
        <section className="pt-8 relative">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-white">Popular Movies</h2>
                <div className="items-center">
                    <button onClick={scrollLeft} className="p-2 text-sm bg-slate-800 text-white rounded-md mr-2"><LuArrowLeft/></button>
                    <button onClick={scrollRight} className="p-2 text-sm bg-slate-800 text-white rounded-md"><LuArrowRight/></button>
                </div>
            </div>

            <div className="relative">
                {/* Scroll container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide"
                    style={{ scrollbarWidth: 'none' }}
                >
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="flex-shrink-0 relative group transition-all duration-300 ease-in-out"
                        >
                            {/* Default state - Poster */}
                            <div className="w-48 h-72 rounded-lg overflow-hidden shadow-lg group-hover:hidden relative">
                                <img
                                    src={movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        : '/placeholder-movie.jpg'}
                                    alt={movie.title}
                                    width={192}
                                    height={288}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                                    <p className="text-white text-sm font-medium truncate">{movie.title}</p>
                                </div>
                            </div>

                            {/* Hover state - Expanded card */}
                            <div
                                className="hidden group-hover:block w-96 h-72 rounded-lg overflow-hidden shadow-lg relative"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${movie.backdrop_path
                                        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                                        : '/placeholder-backdrop.jpg'})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                    <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>

                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="flex items-center bg-yellow-500 text-black px-2 py-1 rounded text-xs">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            {movie.vote_average.toFixed(1)}
                                        </span>
                                        <span className="text-sm text-gray-300">
                                            {new Date(movie.release_date).getFullYear()}
                                        </span>
                                        {movie.genre_ids.length > 0 && (
                                            <span className="text-sm text-gray-300 truncate">
                                                {getGenreNames(movie.genre_ids)}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm text-gray-300 line-clamp-3 mb-4">{movie.overview}</p>

                                    <div className="flex justify-end">
                                        <Link
                                            href={`/movie/${movie.id}`}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                                        >
                                            Learn More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}