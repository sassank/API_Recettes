import './App.css';
import Recipe from './Recipe';
import { useEffect, useState } from 'react';

const App = () => {
  const APP_ID = "201f914e";
  const APP_KEY = "bfdbd32df9f85f63799f142c191a92c6";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("canard");

  useEffect( () => { 
    getRecipes();
}, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };
  
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} 
        onChange={updateSearch} placeholder="Chercher un plat ou un aliment" />
        <button className="search-button" typeof="submit">
        Rechercher</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
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
};

export default App;
