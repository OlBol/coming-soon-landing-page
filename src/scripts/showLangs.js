import $ from 'jquery';

export default function showLangs() {
  const blocks = $('.js-langs');

  blocks.each(function () {
    const block = $(this);
    const link = $(this).find('.js-langs-link');
    const icon = $(this).find('.js-langs-svg');
    let flag = false;

    $(this).click(function () {
      (link.css('display') === 'none') ? link.slideDown(200) : link.slideUp(200);
      icon.toggleClass('langs__svg_active');
      flag = true;
    });

    document.addEventListener('click', function (e) {
      if (!(block.find($(e.target)).length) && flag === true) {
        link.slideUp(200);
        if (icon.hasClass('langs__svg_active')) icon.toggleClass('langs__svg_active');
        flag = false;
      }
    });
  });
}
