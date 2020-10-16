import './main.scss';
import anchorScroll from './scripts/anchorScroll';
import addPopupForCity from './scripts/addPopupForCity';
import slider from './scripts/slider';
import showLangs from './scripts/showLangs';

anchorScroll();
addPopupForCity();
slider();
showLangs();

// setTimeout(() => {
//     document.querySelector('.is-load').style.display = 'block';
//     document.querySelector('.js-preloader').classList.remove('is-active');
// }, 2500);