import React, { Component, useEffect, useState } from 'react'
import { Grid } from '@material-ui/core';
import MediaCard from '../MovieCardComponent/MovieCard';

interface IMovieState {
    title:(string |null);
    release_date:(Date|null);
    vote_average:(number|null);
    overview:(string|null);
}

interface IMovieGridProps{
    ReleaseYear:(number|null);
}

function MovieGrid(props: IMovieGridProps){
    const [ItemArray, setItemArray] = useState<IMovieState[]>([{ title: null, release_date:null, vote_average:null,overview:null}]);

    

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&primary_release_year=${props.ReleaseYear}`)
            .then(response => response.json())
            .then(response => {
                setItemArray(response.results)
            })
            .catch(() => console.log("it didn't work")
            );

    }, [props.ReleaseYear]);


    var Cards: JSX.Element[] = [];
    ItemArray.forEach((el: IMovieState, i: Number) => {
        if (!el || !el.title || !el.release_date) {
            return;
        }
        Cards.push(
            <Grid key={"card_"+i} item sm={6} md={4} lg={3} className="MediaGridCard">
                <MediaCard MovieInfo={el} />
            </Grid>)
    })

    return (
        <div>
            <Grid container spacing={3} className="MediaGridContainer">
                {Cards}
            </Grid>
        </div>
    )
}

export default MovieGrid
