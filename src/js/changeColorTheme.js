import { elementsRef } from './elementsRefs/references';

const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    elementsRef.themeColorToggleEl.checked = true;
  }
}

export function changeColorTheme() {
  if (elementsRef.themeColorToggleEl.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}

elementsRef.themeColorToggleEl.addEventListener(
  'change',
  changeColorTheme,
  false
);
