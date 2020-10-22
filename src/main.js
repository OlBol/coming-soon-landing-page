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

// setTimeout(() => {
//     $('.is-load').fadeIn(200);
//     $('.js-preloader').fadeOut(200);
// }, 3000);


// const images = document.querySelectorAll('img');
// let imagesCount = 0;
//
// for (const image of images) {
//     image.addEventListener('load', () => {
//         console.log(image);
//         imagesCount++;
//     });
// }
// if (imagesCount === images.length) {
//     $('.is-load').fadeIn(200);
//     $('.js-preloader').fadeOut(200);
// }


window.onload = function() {
    // $('.is-load').fadeIn(200);
    $('.is-load').css({'display': 'block'});
    $('.js-preloader').fadeOut(400);
};
