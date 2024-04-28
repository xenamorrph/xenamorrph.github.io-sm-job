"use strict";

document.addEventListener('DOMContentLoaded', function(){

  console.log(3456);
  const swiperVideoGallery = new Swiper('.b-offers__container', {
    slidesPerGroup: 1,
    spaceBetween: 24,


    navigation: {
      prevEl: '.b-offers__arrow_prev',
      nextEl: '.b-offers__arrow_next',
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    watchOverflow: true,
    loop: true,

    breakpoints: {
      // when window width is >= 320px
      580: {
        // Отображение кол-ва слайдов
        slidesPerView: 2,
        spaceBetween: 12,
      },

      1024: {
        slidesPerView: 3,
        spaceBetween: 22,
      },

      1250: {
        slidesPerView: 4,
      },
    },
  });
})
