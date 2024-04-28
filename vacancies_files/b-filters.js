"use strict";

document.addEventListener("DOMContentLoaded", function() {

  const tabs = document.querySelectorAll(".b-filters__tab");
  const blocks = document.querySelectorAll(".b-filters__block");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabs.forEach(tab => tab.classList.remove("active"));
      tab.classList.add("active");

      blocks.forEach(block => block.classList.remove("active"));
      blocks[index].classList.add("active");
    });

    // Обработчики событий для фильтрации ссылок в текущем блоке
    const buttonsContainer = blocks[index].querySelector('.b-filters__filters');
    const allLinks = blocks[index].querySelectorAll(".b-filters__link");
    const items = blocks[index].querySelectorAll(".b-filters__item");

    buttonsContainer.addEventListener("click", function(event) {
      const targetButton = event.target.closest('.b-filters__filter');
      if (!targetButton) return;

      const dataAttribute = targetButton.dataset.type;

      // Удаление класса "active" у всех кнопок фильтрации в текущем блоке
      blocks[index].querySelectorAll(".b-filters__filter").forEach((button) => {
        button.classList.remove("active");
      });

      // Добавление класса "active" к выбранной кнопке
      targetButton.classList.add("active");

      allLinks.forEach(function(link) {
        if (!dataAttribute || link.dataset.type === dataAttribute) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      // Скрытие пустых ссылок в текущем алфавитном блоке
      items.forEach((item) => {
        const links = item.querySelectorAll(".b-filters__link.active");
        item.classList.toggle("active", links.length !== 0);
      });
    });
  });

});
