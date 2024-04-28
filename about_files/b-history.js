"use strict";

document.addEventListener('DOMContentLoaded', function(){
  hiddenItems('.b-history', '.b-history__button', '.b-history__items_hidden', 'data-textshow', 'data-texthidden');
});

function hiddenItems(moduleSelector, toggleButtonSelector, hiddenItemsSelector, buttonTextShowAttr, buttonTextHiddenAttr){
  const module = document.querySelector(moduleSelector);
  const toggleButton = module.querySelector(toggleButtonSelector);
  const block = module.querySelector(hiddenItemsSelector);
  const buttonTextShow = toggleButton.getAttribute(buttonTextShowAttr);
  const buttonTextHidden = toggleButton.getAttribute(buttonTextHiddenAttr);

  if (module && toggleButton && block) {
    toggleButton.textContent = buttonTextShow;

    toggleButton.addEventListener('click', function() {
      block.classList.toggle('active');

      if (block.classList.contains('active')) {
        toggleButton.textContent = buttonTextHidden;
      } else {
        toggleButton.textContent = buttonTextShow;
      }
    });
  }
}
