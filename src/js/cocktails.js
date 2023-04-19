import { getRandomCocktails } from './cocktailsAPI';

const cocktailsCard = document.querySelector('.cocktails');
onLoadDocument();

// const cocktails = getRandomCocktails();
// console.log(cocktails);

export function renderMarkup(cocktails) {
  const markup = cocktails
    .map(cocktail => {
      return `<li class="cocktails__item" data-id=${cocktail.idDrink}> 
          <img 
            class="cocktails__photo" 
            alt="cocktails" 
            src=${cocktail.strDrinkThumb}
            width="280"
            height="502" 
            loading="lazy" 
          /> 
          <h3 class="cards__title">${cocktail.strDrink}</h3> 
            <button>Learn more</button>  
            <button>Add to favorite</button>  
        </li>`;
    })
    .join('');
  cocktailsCard.insertAdjacentHTML('beforeend', markup);
  return markup;
}

export async function onLoadDocument() {
  try {
    const drinks = await getRandomCocktails();
    console.log(drinks);
    renderMarkup(drinks);
  } catch (error) {
    console.log(error);
  }
}

// src=${
//   cocktail.strDrinkThumb
//     ? 'https://www.thecocktaildb.com/' + cocktail.strDrinkThumb
//     : defimg
// }
