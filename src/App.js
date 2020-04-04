import React, { useEffect, useState } from 'react';

import './App.css';

import Recipe from './Recipe';


const App = () => {

  const APP_ID = 'ec55aeb1';
  const APP_KEY = '46dd6bfebc7ca4806ab8fbb607fae1f7';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('vegan');

  useEffect (() => { getRecipes() }, [query])  // run every time when the element in [] changes, if empty [], only run once it is mounted

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&vegan&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
    const data = await response.json();  // use `await` or `.then` every time use promit
    setRecipes(data.hits);
    console.log(data.hits)
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  return(
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      <div className="Recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>

    </div>
  );
}

export default App;
