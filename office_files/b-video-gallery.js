"use strict";

document.addEventListener('DOMContentLoaded', function(){
  const swiperVideoGallery = new Swiper('.b-video-gallery__container', {
    slidesPerGroup: 1,
    spaceBetween: 24,

    navigation: {
      prevEl: '.b-video-gallery__arrow_prev',
      nextEl: '.b-video-gallery__arrow_next',
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    watchOverflow: true,
    loop: true,


    breakpoints: {
      // when window width is >= 320px
      480: {
        // Отображение кол-ва слайдов
        slidesPerView: 2,
        spaceBetween: 12,
      },

      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },

      1250: {
        slidesPerView: 4,
      },
    },
  });
})
