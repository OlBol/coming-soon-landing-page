import $ from 'jquery';

export default function addPopupForCity() {
  const wrapper = document.querySelector('.js-cities');
  let selectorIconsWrapper = window.innerWidth >= 768 ? '.js-image-on-desktop' : '.js-image-on-mobile';
  let icons = wrapper.querySelectorAll(selectorIconsWrapper + ' [data-icon]');
  let allAreas = document.querySelectorAll(`[data-area]`);
  const popup = document.querySelector('.js-city-popup');
  // const closePopupBtn =  popup.querySelector('.js-close-city-popup');
  const popupImg = popup.querySelector('img');
  const popupAddress = popup.querySelector('.js-address');
  const popupLink = popup.querySelector('a');
  const cursor = wrapper.querySelector('.js-cursor');

  function resizeArea(icon) {
    selectorIconsWrapper = window.innerWidth >= 768 ? '.js-image-on-desktop' : '.js-image-on-mobile';
    icons = wrapper.querySelectorAll(selectorIconsWrapper + ' [data-icon]');

    const area = document.querySelector(`[data-area="${icon.dataset.icon}"]`);
    const iconHeight = icon.getBoundingClientRect().bottom - icon.getBoundingClientRect().top;
    const iconWidth = icon.getBoundingClientRect().right - icon.getBoundingClientRect().left;

    area.style.height = iconHeight.toFixed() + 'px';
    area.style.width = iconWidth.toFixed() + 'px';
    area.style.top = icon.getBoundingClientRect().top - wrapper.getBoundingClientRect().top + 'px';
    area.style.left = icon.getBoundingClientRect().left - wrapper.getBoundingClientRect().left + 'px';


  }

  for (const area of allAreas) {
    area.addEventListener('mouseover', (event) => {
      const dataAttr = event.target.dataset.area;
      const icon = wrapper.querySelector(`${selectorIconsWrapper} [data-icon="${dataAttr}"]`);
      icon.classList.add('is-active');
    });
    area.addEventListener('mouseout', (event) => {
      const dataAttr = event.target.dataset.area;
      const icon = wrapper.querySelector(`${selectorIconsWrapper} [data-icon="${dataAttr}"]`);
      icon.classList.remove('is-active');
    });
  }

  function recalcCitiesSizes() {
    for (const icon of icons) {
      resizeArea(icon);
    }
  }

  function changePopupPosition(isMobile) {
    if (isMobile) {
      // popup.style.top = window.scrollY - 45 + 'px';
      // popup.style.bottom = window.scrollY + window.innerHeight + 45 + 'px';
    //   popup.style.height = 'calc(100vh + 90px)';
    //   cursor.style.display = 'none';
    //   popupImg.style.height = 'auto';
      popup.style.top = '0px';
      popup.style.height = '100vh';
      popupImg.style.height = 'auto';
    } else {
      popup.style.top = wrapper.offsetTop + wrapper.offsetHeight * 0.1 + 'px';
      popup.style.height = wrapper.offsetHeight * 0.8 + 'px';
      popupImg.style.height = wrapper.offsetHeight * 0.8 + 'px';
      document.body.classList.remove('open-popup');
      // popup.style.top = window.scrollY - 45 + 'px';
      // popup.style.bottom = window.scrollY + window.innerHeight + 45 + 'px';
    //   document.body.style.overflow = 'auto';
    }
  }

  window.addEventListener('scroll', recalcCitiesSizes);

  window.addEventListener("resize", () => {
    const isMobile = window.innerWidth < 768;

    changePopupPosition(isMobile);
    recalcCitiesSizes();
  });

  window.addEventListener("orientationchange", () => {
    // popup.style.top = window.scrollY - 45 + 'px';
    // popup.style.bottom = window.scrollY + window.innerHeight + 45 + 'px';

    recalcCitiesSizes();
  });

  window.addEventListener('click', (event) => {
    if (popup.style.display === 'block'
        && (!event.target.closest('.city-popup__wrapper') || event.target.closest('.js-close-city-popup'))) {
      $(popup).fadeOut(200, () => popupImg.setAttribute('src', ''));
      document.body.style.overflow = 'auto';
      document.body.classList.remove('open-popup');
    }

    const area = event.target;
    const isMobile = window.innerWidth < 768;

    if (wrapper.classList.contains('is-active') && (!event.target.closest('.city-popup__wrapper') || event.target.closest('.js-close-city-popup'))) wrapper.classList.remove('is-active');

    if (area.classList.contains('js-city-area')) {
      const imgSrc =  area.querySelector('img').getAttribute('src');
      const linkSrc =  area.querySelector('a').getAttribute('href');
      const shortenedLink = linkSrc.split('https://')[1];

      if (isMobile) {
        document.body.style.overflow = 'hidden';
        document.body.classList.add('open-popup');
        // document.querySelector('.is-load').style.overflow = 'hidden';
      } else {
        wrapper.classList.add('is-active');
      }

      popupImg.setAttribute('src', imgSrc);
      popupLink.setAttribute('href', linkSrc);
      popupAddress.innerText = shortenedLink;
      $(popup).fadeIn(200);

      if (event.target.dataset.area === 'budapest') {
        popupLink.style.display = 'none';
        document.querySelector('.js-budapest-popup').style.display = 'block';
      } else {
        popupLink.style.display = 'block';
        document.querySelector('.js-budapest-popup').style.display = 'none';
      }
      changePopupPosition(isMobile);
    }
  });
}
