import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Movie from './Movies/Movie';
import MovieList from './Movies/MovieList';
import SavedList from './Movies/SavedList';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        .then(res => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
          setMovieList(res.data)
        })
        .catch(err => {
          console.error('Server Error', err);
        });
      }
      getMovies();
    }, []);
    

  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
    if (!saved.map(movie => movie.id).includes(Number(id))) {
      const newSaved = [...saved];
      newSaved.push(movieList.find(movie => movie.id == id))
      setSaved(newSaved)
    }
  };

  return (
    <div>
      <SavedList list={saved} />

      <Route exact path='/'>
        <MovieList movies={movieList} />
      </Route>
      <Route path='/movies/:id'>
        <Movie movies={movieList} addToSavedList={addToSavedList} />
      </Route>
    </div>
  );
}
