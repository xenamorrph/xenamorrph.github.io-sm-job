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
    '(max-width: 1024px)',
    '.b-rating__container',
    {
      spaceBetween: 24,
      slidesPerGroup: 1,

      watchOverflow: true,

      breakpoints: {
        // when window width is >= 320px
        320: {
          // Отображение кол-ва слайдов
          slidesPerView: 1,
          spaceBetween: 0,
        },

        480: {
          slidesPerView: 1,
          // Отступ между слайдами
          spaceBetween: 20,
        },

        768: {
          slidesPerView: 2,
          spaceBetween: 35,
        },
      },

      navigation: {
        prevEl: '.b-rating__button_prev',
        nextEl: '.b-rating__button_next',
      },

    },
  );


})


