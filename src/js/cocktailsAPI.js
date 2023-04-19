import axios from 'axios';

const cocktails = axios.create({
  baseURL: 'https://thecocktaildb.com/api/json/v1/1/',
});

// Get random cocktails
export async function getRandomCocktails() {
  try {
    const { data } = await cocktails.get(`random.php`);
    console.log(data);
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
}

// Get cocktail by letter
export async function getCocktailsByLetter(letter) {
  try {
    const { data } = await cocktails.get(`search.php?f=${letter}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Get cocktail by name
export async function getCocktailByName(cocktailName) {
  try {
    const { data } = await cocktails.get(`search.php?s=${cocktailName}`);
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
}

// Get cocktail by id
export async function getCocktailsById(cocktailId) {
  try {
    const { data } = await fetch(`lookup.php?i=${cocktailId}`);
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
}

// Get ingredient by Name
export async function getIngredientByName(ingredientName) {
  try {
    const { data } = await fetch(`search.php?i=${ingredientName}`);
    return data.ingredients;
  } catch (error) {
    console.log(error);
  }
}

// Get ingredient by id
export async function getIngredientById(ingredientId) {
  try {
    const { data } = await fetch(`lookup.php?iid=${ingredientId}`);
    return data.ingredients;
  } catch (error) {
    console.log(error);
  }
}
