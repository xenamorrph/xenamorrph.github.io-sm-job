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
    '.b-gallery__container',
    {
      loop: true,
      spaceBetween: 32,
      slidesPerGroup: 1,
      slidesPerView: 1,

      navigation: {
        prevEl: '.b-gallery__button_prev',
        nextEl: '.b-gallery__button_next',
      },

      autoplay: {
        delay: 7000,
      },

      watchOverflow: true,

      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
    },
  );


})
