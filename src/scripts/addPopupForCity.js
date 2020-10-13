export default function addPopupForCity() {
  const wrapper = document.querySelector('.js-cities');
  const icons = document.querySelectorAll('[data-icon]');

  for (const icon of icons) {
    const area = document.querySelector(`[data-area="${icon.dataset.icon}"]`);

    function resizeArea() {
      const iconHeight = icon.getBoundingClientRect().bottom - icon.getBoundingClientRect().top;
      const iconWidth = icon.getBoundingClientRect().right - icon.getBoundingClientRect().left;
      area.style.height = iconHeight.toFixed() + 'px';
      area.style.width = iconWidth.toFixed() + 'px';
      area.style.top = icon.getBoundingClientRect().top - wrapper.getBoundingClientRect().top + 'px';
      area.style.left = icon.getBoundingClientRect().left - wrapper.getBoundingClientRect().left + 'px';
    }

    window.addEventListener('scroll', resizeArea);
    window.addEventListener('resize', resizeArea);

    area.addEventListener('click', () => {
      console.log(10)
    });
  }


}
