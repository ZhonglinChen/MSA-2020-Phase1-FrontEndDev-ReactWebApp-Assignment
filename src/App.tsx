import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './Components/SearchBarComponent/SearchBar';
import MovieGrid from './Components/MovieGridComponent/MovieGrid';
import { IUserInput } from './Common/Interface/Interfaces';
import { MuiThemeProvider, createMuiTheme, Container } from '@material-ui/core';
const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})

function App() {

  const [UserInput, setUserInput] = useState<IUserInput>({
    ReleaseYear: 2020,
    Genre:[],
    SortBy:'popularity.desc'
  });
  function SetUserInput(a: IUserInput) {
    setUserInput(a);
  }

  return (
    <Container className="App">

      <MuiThemeProvider theme={theme}>

       <h1>Movie Discover  -  API from TMDB </h1> 
        <SearchBar SetUserInput={(a: IUserInput) => SetUserInput(a)} />
        <MovieGrid ReleaseYear={UserInput.ReleaseYear} Genre={UserInput.Genre} SortBy={UserInput.SortBy} />
      </MuiThemeProvider>
    </Container >
  );
}

export default App;
