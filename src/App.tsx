import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './Components/SearchBarComponent/SearchBar';
import MovieGrid from './Components/MovieGridComponent/MovieGrid';
import { IUserInput } from './Common/Interface/Interfaces';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
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
  let apiKey = process.env.REACT_APP_API_KEY;

  const [UserInput, setUserInput] = useState<IUserInput>({
    ReleaseYear: 2020
  });
  function SetUserInput(a: IUserInput) {
    setUserInput(a);
  }
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <SearchBar SetUserInput={(a: IUserInput) => SetUserInput(a)} />
        <MovieGrid ReleaseYear={UserInput.ReleaseYear}  />
      </MuiThemeProvider>
    </div >
  );
}

export default App;
