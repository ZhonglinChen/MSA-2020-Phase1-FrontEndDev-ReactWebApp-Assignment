import React, { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

import './SearchBar.css';
import { IUserInput } from '../../Common/Interface/Interfaces';

interface ISearchBarProps {
    SetUserInput: (a: IUserInput) => void;
}

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

function SearchBar(props: ISearchBarProps) {
    const [SortBy, setSortBy] = useState<string | null>('popularity.desc');
    const handleSortByChange = (sort: string | null) => {
        setSortBy(sort);
    };

    const [ReleaseYear, setReleaseYear] = useState<number | null>(2020);
    const handleReleaseYear = (year: number | null) => {
        setReleaseYear(year);
    };

    const [Genre, setGenre] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
        checkedD: true,
    });

    const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGenre({ ...Genre, [event.target.name]: event.target.checked });
    };


    const [SearchQuery, setSearchQuery] = useState<string | null>("");
    const handleSearchQueryChange = (s: string | null) => {
        setSearchQuery(s);
    }
    const [HasFocus, setHasFocus] = useState<boolean>(false);
    const handleSubmit = () => {
        console.log(SearchQuery);

        if (SearchQuery?.length !== 0 && SearchQuery !== null && SearchQuery !== "") {
            let UserInput: IUserInput = {
               ReleaseYear:parseInt(SearchQuery)
            }
            props.SetUserInput(UserInput);
            // console.log(UserInput);
        } else {
            setHasFocus(true);
        }
    }

    return <div className="SearchBarContainer">

        <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
                <TextField
                    required
                    id="outlined-required"
                    label="Search"
                    variant="outlined"
                    error={HasFocus && SearchQuery === ""}
                    onClick={() => setHasFocus(true)}
                    value={SearchQuery}
                    onChange={e => handleSearchQueryChange(e.target.value)}
                />
            </Grid>

            <Grid item xs={6} sm={3}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                         Submit
                 </Button>
            </Grid>

            <Grid item xs={12} sm={12}>
                <FormGroup row>
                    <FormControlLabel
                        control={<GreenCheckbox checked={Genre.checkedA} onChange={handleGenreChange} name="checkedA" />}
                        label="1"
                    />
                    <FormControlLabel
                        control={<GreenCheckbox checked={Genre.checkedB} onChange={handleGenreChange} name="checkedB" />}
                        label="2"
                    />
                    <FormControlLabel
                        control={<GreenCheckbox checked={Genre.checkedC} onChange={handleGenreChange} name="checkedC" />}
                        label="3"
                    />
                    <FormControlLabel
                        control={<GreenCheckbox checked={Genre.checkedD} onChange={handleGenreChange} name="checkedD" />}
                        label="4"
                    />


                </FormGroup>
            </Grid>

           
        </Grid>
    </div>

    // const [StartDate, setStartDate] = useState<Date | null>(
    //     new Date('2014-08-18'),
    // );
    // const handleStartDateChange = (date: Date | null) => {
    //     setStartDate(date);
    // };

    // const [EndDate, setEndDate] = useState<Date | null>(
    //     new Date('2020-05-18'),
    // );

    // const handleEndDateChange = (date: Date | null) => {
    //     setEndDate(date);
    // };

    // const [SearchQuery, setSearchQuery] = useState<string | null>("");
    // const handleSearchQueryChange = (s: string | null) => {
    //     setSearchQuery(s);
    // }
    // const [HasFocus, setHasFocus] = useState<boolean>(false);

    // const handleSubmit = () => {
    //     console.log(SearchQuery);

    //     if (SearchQuery?.length !== 0 && SearchQuery !== null && SearchQuery !== "") {
    //         let UserInput: IUserInput = {
    //             SearchQuery: SearchQuery,
    //             StartDate: StartDate,
    //             EndDate: EndDate
    //         }
    //         props.SetUserInput(UserInput);
    //     } else {
    //         setHasFocus(true);
    //     }
    // }

    // return <div className="SearchBarContainer">
    //     <Grid container spacing={3}>
    //         <Grid item xs={6} sm={3}>
    //             <TextField
    //                 required
    //                 id="outlined-required"
    //                 label="Search"
    //                 variant="outlined"
    //                 error={HasFocus && SearchQuery === ""}
    //                 onClick={() => setHasFocus(true)}
    //                 value={SearchQuery}
    //                 onChange={e => handleSearchQueryChange(e.target.value)}
    //             />
    //         </Grid>

    //         <MuiPickersUtilsProvider utils={DateFnsUtils}>
    //             <Grid item xs={6} sm={3}>
    //                 <KeyboardDatePicker
    //                     disableToolbar
    //                     variant="inline"
    //                     format="MM/dd/yyyy"
    //                     margin="normal"
    //                     id="StartDate"
    //                     label="Start Date (optional)"
    //                     value={StartDate}
    //                     onChange={handleStartDateChange}
    //                     KeyboardButtonProps={{
    //                         'aria-label': 'change date',
    //                     }}
    //                 />
    //             </Grid>
    //             <Grid item xs={6} sm={3}>
    //                 <KeyboardDatePicker
    //                     disableToolbar
    //                     variant="inline"
    //                     format="MM/dd/yyyy"
    //                     margin="normal"
    //                     id="EndData"
    //                     label="End Date (optional)"F
    //                     value={EndDate}
    //                     onChange={handleEndDateChange}
    //                     KeyboardButtonProps={{
    //                         'aria-label': 'change date',
    //                     }}
    //                 />
    //             </Grid>F
    //         </MuiPickersUtilsProvider>

    //         <Grid item xs={6} sm={3}>
    //             <Button variant="contained" color="primary" onClick={handleSubmit}>
    //                 Submit
    //             </Button>
    //         </Grid>
    //     </Grid>
    // </div>

}

export default SearchBar;
