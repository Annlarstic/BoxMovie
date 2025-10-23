import React, { useEffect, useState, useLayoutEffect } from 'react'
import "./MovieList.css"
import Fire from '../../assets/emoji/fire.jpg'
import MovieCard from './MovieCard'
import SearchIcon from '../../assets/emoji/search.jpg' 


function MovieList() {
    const [movies, setMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]); 
    const [minRating, setminRating] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('popularity');
    const [sortOrder, setSortOrder] = useState('desc');


    useLayoutEffect(() => {
        const navbarElement = document.querySelector('.navbar'); 
        if (navbarElement) {
            const height = navbarElement.offsetHeight;
            document.documentElement.style.setProperty('--navbar-height', `${height + 2}px`); 
        }
    }, []); 

    useEffect(() => {
        fetchMovies();
    }, [])

    const fetchMovies = async () => {
        const apiKey = "d5906bcf92a6186262165732eaa5bd6c";
        const totalPagesToFetch = 5; 
        let allResults = [];

        for (let page = 1; page <= totalPagesToFetch; page++) {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${page}`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.results) {
                allResults = allResults.concat(data.results);
            }
        }
        
        const uniqueMoviesMap = new Map();
        for (const movie of allResults) {
            uniqueMoviesMap.set(movie.id, movie);
        }
        const uniqueMovies = Array.from(uniqueMoviesMap.values());
        
        setMovies(uniqueMovies);
        setAllMovies(uniqueMovies);
    }

    const handleSortKeyChange = (e) => {
        const key = e.target.value;
        setSortKey(key);
        
        if (key === 'popularity' || key === 'date' || key === 'rating') {
            const sortedBase = [...allMovies].sort((a, b) => {
                 let valA, valB;
                 if (key === 'rating') {
                    valA = a.vote_average;
                    valB = b.vote_average;
                 } else if (key === 'date') {
                    valA = new Date(a.release_date);
                    valB = new Date(b.release_date);
                 } else {
                    valA = a.popularity;
                    valB = b.popularity;
                 }

                 if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
                 if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
                 return 0;
            });

            let finalMovies;
            if (searchTerm) {
                finalMovies = sortedBase.filter(movie => 
                    movie.original_title.toLowerCase().includes(searchTerm.toLowerCase())
                );
            } else {
                finalMovies = sortedBase.filter(movie => movie.vote_average >= minRating);
            }

            setMovies(finalMovies);
        }
    };


    const handleSortOrderChange = (e) => {
        const order = e.target.value;
        setSortOrder(order);
        
        const sorted = [...movies].sort((a, b) => {
            let valA, valB;
            if (sortKey === 'rating') {
                valA = a.vote_average;
                valB = b.vote_average;
            } else if (sortKey === 'date') {
                valA = new Date(a.release_date);
                valB = new Date(b.release_date);
            } else if (sortKey === 'popularity') {
                valA = a.popularity;
                valB = b.popularity;
            } else {
                return 0;
            }
            
            if (valA < valB) return order === 'asc' ? -1 : 1;
            if (valA > valB) return order === 'asc' ? 1 : -1;
            return 0;
        });

        setMovies(sorted);
    };

    const handleFilter = rate => {
        setminRating(rate);
        setSearchTerm('');

        const filtered = allMovies.filter(movie => movie.vote_average >= rate);
        
        const sortedAndFiltered = filtered.sort((a, b) => {
            let valA, valB;
            if (sortKey === 'rating') {
                valA = a.vote_average;
                valB = b.vote_average;
            } else if (sortKey === 'date') {
                valA = new Date(a.release_date);
                valB = new Date(b.release_date);
            } else if (sortKey === 'popularity') {
                valA = a.popularity;
                valB = b.popularity;
            } else {
                return 0;
            }
            
            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setMovies(sortedAndFiltered);
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setminRating(0);

        const filteredMovies = allMovies.filter(movie => 
            movie.original_title.toLowerCase().includes(term)
        );
        
        const sortedAndSearched = filteredMovies.sort((a, b) => {
             let valA, valB;
             if (sortKey === 'rating') {
                valA = a.vote_average;
                valB = b.vote_average;
             } else if (sortKey === 'date') {
                valA = new Date(a.release_date);
                valB = new Date(b.release_date);
             } else if (sortKey === 'popularity') {
                valA = a.popularity;
                valB = b.popularity;
             } else {
                return 0;
             }
             
             if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
             if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
             return 0;
        });

        setMovies(sortedAndSearched);
    };


    return (
        <section className='align_center movie_list content_below_navbar'>
        <header className='align_center movie_list_header'>
            <h2 className='movie_list_heading'>Popular Movies
            <img className='movielist_emoji' src={Fire} alt="" />
            </h2>

            <div className='align_center movielist_fs'> 

            <div className="align_center search_input_wrapper">
            <img src={SearchIcon} alt="Search" className="search_icon"/>

            <input type="text" placeholder="Search movies..." value={searchTerm}
            onChange={handleSearch} className="movie_search_input"/>
            </div>

            <ul className="align_center movie_filter">
            <li className={minRating === 6 ? "movie_filter_item active" : "movie_filter_item"} 
            onClick={() => handleFilter(6)}>6+ Star</li>

            <li className={minRating === 7 ? "movie_filter_item active" : "movie_filter_item"} 
            onClick={() => handleFilter(7)}>7+ Star </li>

            <li className={minRating === 5 ? "movie_filter_item active" : "movie_filter_item"} 
            onClick={() => handleFilter(5)}> 5+ Star </li>

            <li className={minRating === 0 && searchTerm === '' ? "movie_filter_item active" : "movie_filter_item"} onClick={() => { 
            setMovies(allMovies.sort((a,b) => sortOrder === 'desc' ? b.popularity - a.popularity : a.popularity - b.popularity));
            setminRating(0);
            setSearchTerm('');
            }}> All</li>
            </ul>


            <select name="sortKey" id="sortKey" className='movie_sorting' value={sortKey} onChange={handleSortKeyChange}>
            <option value="popularity">Sort By</option>
            <option value="date">Date</option>
            <option value="rating">Rating</option>
            </select>


            <select name="sortOrder" id="sortOrder" className='movie_sorting' value={sortOrder} onChange={handleSortOrderChange}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
            </select>

            </div>
        </header>

        <div className="movie_cards">
            {movies.map(movie => <MovieCard key={movie.id} movie ={movie} />)}
        </div>

        </section>
    )
}

export default MovieList