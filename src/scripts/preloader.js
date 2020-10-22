import $ from "jquery";

export default function preloader() {
    window.onload = function() {
        setTimeout(() => {
            document.querySelector('.is-load').style.display = 'block'
            $('.js-preloader').fadeOut(200);
        }, 1000);
    };
}
