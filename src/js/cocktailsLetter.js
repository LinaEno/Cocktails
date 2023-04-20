import { getCocktailsByLetter } from './cocktailsAPI';
import { alphabet } from '../data/alphabet';
import { renderMarkup } from './cocktails';

const alphabetList = document.querySelector('.search-bar__alphabet-list');

const alphabetItemsMarkup = alphabet
  .map(letter => {
    return `
    <li class="search-bar__alphabet-item">
          <a class="search-bar__alphabet-link" href="#" data-letter="${letter}">${letter}</a>
        </li>
    `;
  })
  .join('');

alphabetList.innerHTML = alphabetItemsMarkup;

const letterLinks = document.querySelectorAll('.search-bar__alphabet-list');
const cocktailsByLetters = document.querySelector('.cocktails');
const cocktailsCard = document.querySelector('.cocktails');

function clearMarkup() {
  cocktailsCard.innerHTML = '';
}

letterLinks.forEach(link => {
  link.addEventListener('click', async event => {
    event.preventDefault();
    const letter = event.target.dataset.letter;
    clearMarkup();
    const cocktails = await getCocktailsByLetter(letter);
    cocktailsByLetters.innerHTML = renderMarkup(cocktails);
  });
});
