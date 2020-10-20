import $ from 'jquery';

export default function addPopupForCity() {
  const wrapper = document.querySelector('.js-cities');
  let selectorIconsWrapper = window.innerWidth >= 768 ? '.js-image-on-desktop' : '.js-image-on-mobile';
  let icons = wrapper.querySelectorAll(selectorIconsWrapper + ' [data-icon]');
  let allAreas = document.querySelectorAll(`[data-area]`);
  const mobilePopup = document.querySelector('.js-city-popup');
  const closePopupBtn =  mobilePopup.querySelector('.js-close-city-popup');
  const mobilePopupImg = mobilePopup.querySelector('img');
  const mobilePopupLink = mobilePopup.querySelector('a');
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

  function recalcCitiesSizes() {
    for (const icon of icons) {
      resizeArea(icon);
    }
  }

  window.addEventListener('scroll', recalcCitiesSizes);

  window.addEventListener("resize", recalcCitiesSizes);

  window.addEventListener("orientationchange", () => {
    mobilePopup.style.top = window.scrollY - 45 + 'px';
    mobilePopup.style.bottom = window.scrollY + window.innerHeight + 45 + 'px';

    recalcCitiesSizes();
  });

  window.addEventListener('click', (event) => {
    const area = event.target;
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      if (area.classList.contains('js-city-area')) {
        const imgSrc =  area.querySelector('img').getAttribute('src');
        const linkSrc =  area.querySelector('a').getAttribute('href');

        cursor.style.display = 'none';
        document.body.style.overflow = 'hidden';
        // mobilePopup.style.display = 'block';
        mobilePopup.style.top = window.scrollY - 45 + 'px';
        mobilePopup.style.bottom = window.scrollY + window.innerHeight + 45 + 'px';
        mobilePopupImg.setAttribute('src', imgSrc);
        mobilePopupLink.setAttribute('href', linkSrc);
        mobilePopupLink.innerText = linkSrc;
        $(mobilePopup).fadeIn(200);
      }
    } else {

      allAreas.forEach(area => {
        area.classList.remove('is-active');
      });

      if (area.classList.contains('js-city-area')) {
        if (!area.classList.contains('is-active')) {
          cursor.style.display = 'none';
          area.classList.add('is-active');
        }
      }
    }
  });

  closePopupBtn.addEventListener('click', () => {
    $(mobilePopup).fadeOut(200, () => mobilePopupImg.setAttribute('src', ''));
    document.body.style.overflow = 'auto';
    // mobilePopupImg.setAttribute('src', '');
  });
}
