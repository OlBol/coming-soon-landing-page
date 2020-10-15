export default function addPopupForCity() {
  const wrapper = document.querySelector('.js-cities');
  let selectorIconsWrapper = window.innerWidth >= 768 ? '.js-image-on-desktop' : '.js-image-on-mobile';
  let icons = wrapper.querySelectorAll(selectorIconsWrapper + ' [data-icon]');

  function resizeArea(icon) {
    const area = document.querySelector(`[data-area="${icon.dataset.icon}"]`);
    const iconHeight = icon.getBoundingClientRect().bottom - icon.getBoundingClientRect().top;
    const iconWidth = icon.getBoundingClientRect().right - icon.getBoundingClientRect().left;

    area.style.height = iconHeight.toFixed() + 'px';
    area.style.width = iconWidth.toFixed() + 'px';
    area.style.top = icon.getBoundingClientRect().top - wrapper.getBoundingClientRect().top + 'px';
    area.style.left = icon.getBoundingClientRect().left - wrapper.getBoundingClientRect().left + 'px';
  }

  for (const icon of icons) {
    resizeArea(icon);

    window.addEventListener('scroll', resizeArea.bind(this, icon));
  }

  window.addEventListener("resize", () => {
    selectorIconsWrapper = window.innerWidth >= 768 ? '.js-image-on-desktop' : '.js-image-on-mobile';
    icons = wrapper.querySelectorAll(selectorIconsWrapper + ' [data-icon]');

    for (const icon of icons) {
      resizeArea(icon);
    }
  });
}
