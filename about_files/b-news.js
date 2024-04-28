"use strict";

document.addEventListener('DOMContentLoaded', function(){

  const resizableSwiper = (breakpoint, swiperClass, swiperSettings) => {

    let swiper;

    breakpoint = window.matchMedia(breakpoint);

    const enableSwiper = function(className, settings) {
      swiper = new Swiper(className, settings);
    }

    const checker = function() {
      if (breakpoint.matches) {
        return enableSwiper(swiperClass, swiperSettings);
      } else {
        if (swiper !== undefined) swiper.destroy(true, true);
        return;
      }
    };

    breakpoint.addEventListener('change', checker);
    checker();
  }


  resizableSwiper(
    '(max-width: 768px)',
    '.b-news__container',
    {
      loop: true,
      spaceBetween: 0,
      slidesPerGroup: 1,
      slidesPerView: 1,

      navigation: {
        prevEl: '.b-news__arrow_prev',
        nextEl: '.b-news__arrow_next',
      },
      watchOverflow: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
    },
  );



})


