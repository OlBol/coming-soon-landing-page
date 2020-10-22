import './main.scss';
import anchorScroll from './scripts/anchorScroll';
import addPopupForCity from './scripts/addPopupForCity';
import slider from './scripts/slider';
import showLangs from './scripts/showLangs';
import $ from 'jquery';

anchorScroll();
addPopupForCity();
slider();
showLangs();

setTimeout(() => {
    // document.querySelector('.is-load').style.display = 'block';
    $('.is-load').fadeIn(200);
    // document.querySelector('.js-preloader').classList.remove('is-active');
    $('.js-preloader').fadeOut(200);
}, 3000);
// }, 25);
