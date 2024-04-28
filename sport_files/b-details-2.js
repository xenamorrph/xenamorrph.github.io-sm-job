"use strict";

document.addEventListener('DOMContentLoaded', function(){
  initSliderDetails2('.b-details-2__box', '.b-details-2__arrow_prev', '.b-details-2__arrow_next');
});

const initSliderDetails2 = (sliderClass, prevClass, nextClass) => {
  const sliderArr = document.querySelectorAll(sliderClass);

  if (sliderArr.length){
    sliderArr.forEach((element, index) => {
      let id = sliderClass.replace('.', '') + '_' + index;
      let prev = prevClass.replace('.', '') + '_' + index;
      let next = nextClass.replace('.', '') + '_' + index;
      let parent = element.parentNode;

      element.classList.add(id);
      parent.querySelector(prevClass).classList.add(prev);
      parent.querySelector(nextClass).classList.add(next);

      const swiperBroad = new Swiper('.' + id, {
        slidesPerGroup: 1,
        variableWidth: true,
        navigation: {
          prevEl: '.' + prev,
          nextEl: '.' + next,
        },
        breakpoints: {
          280: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          480: {
            slidesPerView: 'auto',
            spaceBetween: 16,
          },
        },
      });
    });
  }
};
