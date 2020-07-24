import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

import './SearchBar.css';
import { IUserInput } from '../../Common/Interface/Interfaces';

import OrderByRadio from './OrderByRadioComponent/OrderByRadio';
import YearSlider from './YearSliderComponent/YearSlider';



//usesd for checkbox in Material-UI
const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

//SearchBar Object Interfaces
interface ISearchBarProps {
    SetUserInput: (a: IUserInput) => void;
}

interface IGenre {
    id: (number | null),
    name: (string | null)
}
function SearchBar(props: ISearchBarProps) {

    //State: ReleaseYear
    const [ReleaseYear, setReleaseYear] = useState<number | null>(2020);
    const handleReleaseYear = (year: number | null) => {
        setReleaseYear(year);
        let UserInput: IUserInput = {
            ReleaseYear: year,
            Genre: [],
            SortBy:SortBy
        }
        props.SetUserInput(UserInput);

    };

    //State: SortBy
    const [SortBy, setSortBy] = useState<string |null>('popularity.desc');
    const handleSortByChange = (sort: string |null) => {
        setSortBy(sort);

        let UserInput: IUserInput = {
            ReleaseYear: ReleaseYear,
            Genre: [],
            SortBy:sort
        }
        props.SetUserInput(UserInput);

    };


    const [GenreArray, SetGenreArray] = useState(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=b07d9ab3b3c956c4da63be41d5120df9&language=en-US')
            .then(response => response.json())
            .then(response => {
                SetGenreArray(response.genres)
            })
            .catch(() => console.log("it didn't work")
            );
    })

    const [GenreIdArray, setGenreIdArray] = useState<number[] | null>([]);
    //State: Genre
    const [Genre, setGenre] = React.useState({
        Action: true,
        Adventure: true,
        Animation: true,
        Comedy: true,
    });
    //for checkbox in Material-UI
    const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGenre({ ...Genre, [event.target.name]: event.target.checked });
        console.log(Genre);
    };


    return <div className="SearchBarContainer">

        <Grid container  spacing={3}>
           <Grid item xs={12} sm={12}>
               <YearSlider SetYearRelease = { (year:number) => handleReleaseYear(year)}/>
           </Grid>

            <Grid item xs={12} sm={12}>
                <FormGroup row>
                    <FormControlLabel
                        control={<GreenCheckbox checked={Genre.Action} onChange={handleGenreChange} name="Action" />}
                        label="Action" value="28"
                    />
                    <FormControlLabel
                        control={<GreenCheckbox checked={Genre.Adventure} onChange={handleGenreChange} name="Adventure" />}
                        label="Adventure" value="12"
                    />
                    <FormControlLabel
                        control={<GreenCheckbox checked={Genre.Animation} onChange={handleGenreChange} name="Animation" />}
                        label="Animation" value="16"
                    />
                    <FormControlLabel
                        control={<GreenCheckbox checked={Genre.Comedy} onChange={handleGenreChange} name="Comedy" />}
                        label="Comedy" value="35"
                    />
                </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
                <OrderByRadio SetOrderBy= {(orderby:string)=> handleSortByChange(orderby)} />
            </Grid>


        </Grid>
    </div>

}

export default SearchBar;
