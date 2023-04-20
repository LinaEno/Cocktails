import './js/modals/mobileMenu';
import Notiflix from 'notiflix';
import { elementsRef } from './js/elementsRefs/references';
import { renderAlphabet } from './js/elementsRender/renderAlphabet';
import {
  renderGallery,
  createPagination,
} from './js/elementsRender/renderGallery';
import {
  getRandomCocktails,
  getCocktailsByLetter,
  getCocktailByName,
  getCocktailsById,
} from './js/api/api';
import { updateFavBtnContent } from './js/btnComponent/updateBtnContent';
import { constants } from './js/constantsStorage/constants';
import { updateLocalStorage } from './js/localStorage/localStorage';
import { createModal } from './js/modals/createModal';
import { createCocktailModalMarkup } from './js/modals/cocktailModalMarkup';
import { createCocktailCardMarkup } from './js/elementsMarkup/cocktailCard';
import { calcCardsPerPage } from './js/elementsRender/renderGallery';
import { showMsgNotFound } from './js/utils/utils';
import { changeColorTheme } from './js/changeColorTheme';

elementsRef.alphabetListEl.addEventListener('click', alphabetSearchHandler);
elementsRef.cocktailsListEl.addEventListener('click', cocktailCardHandler);
elementsRef.searchFormRef.addEventListener('submit', searchFormHandler);
elementsRef.themeColorToggleEl.addEventListener('change', themeColorHandler);

initAlphabetSearch();
generateRandomCocktails();

function initAlphabetSearch() {
  renderAlphabet();
  elementsRef.selectValue.addEventListener('click', onToggleSelectOptions);
  elementsRef.selectMobileEl.addEventListener(
    'click',
    alphabetSearchMobileHandler
  );
}

async function generateRandomCocktails() {
  try {
    const randomCocktailsData = [];
    for (let i = 1; i <= calcCardsPerPage(); i++) {
      const { drinks } = await getRandomCocktails();
      randomCocktailsData.push(drinks);
    }
    renderGallery(
      randomCocktailsData.flat(),
      elementsRef.cocktailsListEl,
      createCocktailCardMarkup
    );
  } catch (error) {
    console.log(error);
  }
}

async function alphabetSearchHandler(e) {
  if (e.target.nodeName !== 'BUTTON') return;

  await searchCocktails(e.target.value, getCocktailsByLetter);
}

async function alphabetSearchMobileHandler(e) {
  elementsRef.selectValue.firstElementChild.textContent = e.target.textContent;
  onToggleSelectOptions();
  activeFill();

  await searchCocktails(e.target.dataset.value, getCocktailsByLetter);
}

async function searchFormHandler(e) {
  e.preventDefault();
  const searchQuery = e.target.elements.search.value.trim();
  if (!searchQuery) {
    Notiflix.Notify.warning('Please, enter the correct search query');
  } else {
    await searchCocktails(searchQuery, getCocktailByName);
    document.querySelector('.header').classList.remove('menu-active');
  }
}

async function searchCocktails(searchQuery, getCocktail) {
  try {
    const foundCocktail = await getCocktail(searchQuery);

    showMsgNotFound(
      foundCocktail,
      elementsRef.cocktailsListEl,
      elementsRef.paginationEl
    );

    if (foundCocktail) {
      createPagination(
        foundCocktail,
        elementsRef.cocktailsListEl,
        createCocktailCardMarkup
      );

      renderGallery(
        foundCocktail,
        elementsRef.cocktailsListEl,
        createCocktailCardMarkup
      );
    }
  } catch (error) {
    console.log(error);
  }
}

async function cocktailCardHandler(e) {
  if (!e.target.closest('BUTTON')) {
    return;
  }

  const cocktailCardEl = e.target.closest('[data-id]');
  const cocktailId = cocktailCardEl.dataset.id;

  const btnEl = e.target.closest('.js-btn-fav');
  if (btnEl) {
    updateLocalStorage(cocktailId, constants.favCocktailStorageKey);

    btnEl.innerHTML = updateFavBtnContent(
      cocktailId,
      constants.favCocktailStorageKey
    );
  }
  if (e.target.classList.contains('js-btn-more')) {
    const cocktailInfo = await getCocktailsById(cocktailId);

    const cocktailModalContent = createCocktailModalMarkup(cocktailInfo[0]);

    createModal(
      cocktailModalContent,
      cocktailId,
      constants.favCocktailStorageKey
    );
  }
}

function themeColorHandler() {
  console.log('test');
  changeColorTheme();
}

function onToggleSelectOptions() {
  elementsRef.selectOptions.classList.toggle('is-hidden');
}

function activeFill() {
  elementsRef.selectValue.classList.add('active-letter');
  elementsRef.selectValue.childNodes[3].classList.add('active-icon');
}
