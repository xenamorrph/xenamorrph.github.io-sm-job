"use strict";

document.addEventListener('DOMContentLoaded', function(){
  let menuToggle = document.querySelector('.header__nav');

  menuToggle.addEventListener('click', function(){
    menuToggle.classList.toggle('active');
  })
});
