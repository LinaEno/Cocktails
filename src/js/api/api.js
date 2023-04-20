export async function getRandomCocktails() {
  const response = await fetch(
    `https://thecocktaildb.com/api/json/v1/1/random.php`
  );
  const randomCocktails = await response.json();
  return randomCocktails;
}

export async function getCocktailsByLetter(letter) {
  const response = await fetch(
    `https://thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
  );
  const cocktails = await response.json();
  return cocktails.drinks;
}

export async function getCocktailByName(cocktailName) {
  const response = await fetch(
    `https://thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
  );
  const cocktail = await response.json();
  return cocktail.drinks;
}

export async function getCocktailsById(cocktailId) {
  const response = await fetch(
    `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
  );
  const cocktails = await response.json();
  return cocktails.drinks;
}

export async function getIngredientByName(ingredientName) {
  const response = await fetch(
    `https://thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`
  );
  const ingredient = await response.json();
  return ingredient.ingredients;
}

export async function getIngredientById(ingredientId) {
  const response = await fetch(
    `https://thecocktaildb.com/api/json/v1/1/lookup.php?iid=${ingredientId}`
  );
  const ingredient = await response.json();
  return ingredient.ingredients;
}
