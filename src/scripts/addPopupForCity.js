export default function addPopupForCity() {
  const wrapper = document.querySelector('.js-cities');
  let selectorIconsWrapper = window.innerWidth >= 768 ? '.js-image-on-desktop' : '.js-image-on-mobile';
  let icons = wrapper.querySelectorAll(selectorIconsWrapper + ' [data-icon]');

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

  window.addEventListener("orientationchange", recalcCitiesSizes);
}
