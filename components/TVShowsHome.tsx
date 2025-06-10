'use client'

import { useState, useEffect, useRef } from 'react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import Link from 'next/link';

interface TVShow {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    first_air_date: string;
}

export default function TVShowsHome() {
    const [tvShows, setTvShows] = useState<TVShow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchTVShows = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
                );
                const data = await response.json();
                setTvShows(data.results.slice(0, 20)); // Get first 10 shows
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching TV shows:', error);
                setIsLoading(false);
            }
        };

        fetchTVShows();
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        }
    };

    if (isLoading) {
        return (
            <div className="py-12 flex justify-center">
                <div className="text-white text-lg">Loading TV shows...</div>
            </div>
        );
    }

    return (
        <section className="pt-2 relative">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-white">Popular TV Shows</h2>
                <div className="items-center">
                    <button onClick={scrollLeft} className="p-2 text-sm bg-slate-800 text-white rounded-md mr-2"><LuArrowLeft /></button>
                    <button onClick={scrollRight} className="p-2 text-sm bg-slate-800 text-white rounded-md"><LuArrowRight /></button>
                </div>
            </div>

            <div className="relative">
                {/* Scroll container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide"
                    style={{ scrollbarWidth: 'none' }}
                >
                    {tvShows.map((show) => (
                        <div
                            key={show.id}
                            className="flex-shrink-0 relative group transition-all duration-500 ease-in-out border border-slate-900"
                        >
                            {/* Default state - Poster */}
                            <div className="w-48 h-72 rounded-lg overflow-hidden shadow-lg group-hover:hidden">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                    alt={show.name}
                                    width={192}
                                    height={288}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Hover state - Expanded card */}
                            <div
                                className="hidden group-hover:block w-96 h-72 rounded-lg overflow-hidden shadow-lg relative"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original${show.backdrop_path})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                    <h3 className="text-xl font-bold text-white mb-2">{show.name}</h3>
                                    <p className="text-sm text-gray-300 line-clamp-3 mb-4">{show.overview}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-yellow-400">
                                                {show.vote_average.toFixed(1)}
                                            </span>
                                            <span className="text-sm text-gray-300">
                                                {new Date(show.first_air_date).getFullYear()}
                                            </span>
                                        </div>
                                        <Link
                                            href={`/tv/${show.id}`}
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