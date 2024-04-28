"use strict";

document.addEventListener('DOMContentLoaded', function(){
  tabsSwap('.b-gallery-tabs', '.b-gallery-tabs__toggle', '.b-gallery-tabs__block');
  initSlider('.b-gallery-tabs__container', '.b-gallery-tabs__button_prev', '.b-gallery-tabs__button_next');

  resizableSwiper(
    '(max-width: 768px)',
    '.b-gallery-tabs__header',
    {
      spaceBetween: 6,
      slidesPerView: 'auto',
      slidesPerGroup: 1,
    },
  );
});

const tabsSwap = (section, toggle, tab) => {
  const sectionElements = document.querySelectorAll(section);
  sectionElements.forEach(element => {
    const toggles = element.querySelectorAll(toggle);
    const tabs = element.querySelectorAll(tab);

    if (toggles.length && tabs.length) {
      toggles.forEach((toggle, index) => {
        toggle.addEventListener('click', () => {
          toggles.forEach(button => button.classList.remove('active'));
          tabs.forEach(tab => tab.classList.remove('active'));

          toggle.classList.add('active');
          tabs[index].classList.add('active');
        });
      });
    }
  });
};

const initSlider = (sliderClass, prevClass, nextClass) => {
  const sliderArr = document.querySelectorAll(sliderClass);

  if (sliderArr.length){
    sliderArr.forEach((element, index) => {
      let id = sliderClass.replace('.', '') + '_' + index;
      let prev = prevClass.replace('.', '') + '_' + index;
      let next = nextClass.replace('.', '') + '_' + index;

      element.classList.add(id);
      element.querySelector(prevClass).classList.add(prev);
      element.querySelector(nextClass).classList.add(next);

      const swiperBroad = new Swiper('.' + id, {
        breakpoints: {
          280: {
            slidesPerView: 1,
            spaceBetween: 0,
          },

          480: {
            slidesPerView: 2,
            spaceBetween: 12,
          },

          768: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },

        },

        slidesPerGroup: 1,

        navigation: {
          prevEl: '.' + prev,
          nextEl: '.' + next,
        },

        loop: true,
        watchOverflow: true,
      });
    });
  }
};

const resizableSwiper = (breakpoint, swiperClass, swiperSettings) => {
  let swiper;

  const enableSwiper = function(className, settings) {
    swiper = new Swiper(className, settings);
  }

  breakpoint = window.matchMedia(breakpoint);

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
