import './main.scss';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import $ from 'jquery';
import anchorScroll from './scripts/anchorScroll';

$('.owl-carousel').owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    responsive: {
        0: {
            items:1
        }
    }
});

anchorScroll();