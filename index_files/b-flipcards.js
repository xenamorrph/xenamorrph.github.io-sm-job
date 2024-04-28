"use strict";

document.addEventListener('DOMContentLoaded', function() {
  const flipcards = document.querySelector('.b-flipcards');

  flipcards.querySelectorAll('.b-flipcards__card').forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('js-flipped');
    });
  });


});
