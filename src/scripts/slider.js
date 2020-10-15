import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import $ from 'jquery';

$('.owl-carousel').owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  responsive: {
    0: {
      items: 1
    }
  }
});

export default function addSliderBackground() {
  console.log(1)
  const target = document.querySelector('.owl-stage');
  const pseudoImages = document.querySelectorAll('.js-pseudo-img');

  const observer = new MutationObserver(mutationList => {
    for (const item of mutationList) {
      if (item.target.classList.contains('owl-item') && item.target.classList.contains('owl-item')) {
        const img = item.target.querySelector('.slider__img');
        const imgSource = img && img.getAttribute('src');

        for (const img of pseudoImages) img.setAttribute('src', imgSource);
      }
    }
  });

  observer.observe(target, {
    attributes: true,
    subtree: true
  });
};
