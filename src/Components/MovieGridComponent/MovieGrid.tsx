import React, { Component, useEffect, useState } from 'react'
import { Grid } from '@material-ui/core';
import MovieCard from './MovieCardComponent/MovieCard';
import MoviePagination from './MoviePaginationComponent/MoviePagination';
import './MovieGrid.css';
import ResultChip from './ResultChipComponent/ResultChip';


interface IMovieState {
    title: (string | null);
    release_date: (Date | null);
    vote_average: (number);
    vote_count:(number|null);
    poster_path:(number|null);
    overview: (string | null);
}

interface IMovieGridProps {
    ReleaseYear: (number | null);
    Genre: (number[] | null);
    SortBy: (string | null);
}

function MovieGrid(props: IMovieGridProps) {
    const [ItemArray, setItemArray] = useState<IMovieState[]>([{ title: null, release_date: null, 
        vote_average: 0, vote_count:null, poster_path:null, overview: null }]);

    const [CurrentPage, setCurrentPage] = useState<number>(1);

    const [MaxPage,setMaxPage] = useState<number>(1);

    const [TotalResults,setTotalResults] = useState<number>(0);
    


 
    useEffect(() => {
        // console.log(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&&sort_by=${props.SortBy}&primary_release_year=${props.ReleaseYear}&&page=${CurrentPage}`);
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&&sort_by=${props.SortBy}&primary_release_year=${props.ReleaseYear}&&page=${CurrentPage}`)
            .then(response => response.json())
            .then(response => {
                setItemArray(response.results);
                setCurrentPage(1)
                setMaxPage(response.total_pages);
                setTotalResults(response.total_results);
            })
            .catch(() => console.log("it didn't work")
            );

    }, [props.ReleaseYear, props.SortBy]);


    useEffect(() => {
        // console.log(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&&sort_by=${props.SortBy}&primary_release_year=${props.ReleaseYear}&&page=${CurrentPage}`);
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&&sort_by=${props.SortBy}&primary_release_year=${props.ReleaseYear}&&page=${CurrentPage}`)
            .then(response => response.json())
            .then(response => {
                setItemArray(response.results);
                setMaxPage(response.total_pages);
            })
            .catch(() => console.log("it didn't work")
            );

    }, [CurrentPage]);


    var Cards: JSX.Element[] = [];
    ItemArray.forEach((el: IMovieState, i: Number) => {
        if (!el || !el.title || !el.release_date) {
            return;
        }
        Cards.push(
            <Grid key={"card_" + i} item sm={6} md={4} lg={3} className="MovieGridCard">
                <MovieCard MovieInfo={el} />
            </Grid>)
    })

    return (
        <div>
         

            <Grid >
            
                <ResultChip  TotalResult={TotalResults}/>
            </Grid>
            <Grid container spacing={3} className="MovieGridContainer">
                {Cards}
            </Grid>
            <Grid className="MoviePagination">
                <MoviePagination SetCurrentPage= { (curPage:number ) => setCurrentPage(curPage)} CurrentPage={CurrentPage }MaxPage = {MaxPage}/>
            </Grid>

        </div>
    )
}

export default MovieGrid
