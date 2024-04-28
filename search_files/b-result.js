"use strict";

document.addEventListener('DOMContentLoaded', function() {
  const module = document.querySelector('.b-result');
  const toggles = module.querySelector('.b-result__toggles');
  const toggleButtons = module.querySelectorAll('.b-result__toggle');
  const lists = module.querySelectorAll('.b-result__list');

  // Обработчик события клика для контейнера с кнопками
  if (module) {
    toggles.addEventListener('click', function(event) {
      const target = event.target;

      // Проверка, является ли элемент, по которому был совершен клик, кнопкой переключения
      if (target.classList.contains('b-result__toggle')) {
        // Удаление класса active со всех кнопок
        toggleButtons.forEach(toggle => toggle.classList.remove('active'));
        // Добавление класса active на нажатую кнопку
        target.classList.add('active');

        // Переключаем вид списка в зависимости от класса активной кнопки
        if (target.classList.contains('b-result__toggle_grid')) {
          lists.forEach((list) => {
            list.classList.remove('active');
          });

        } else if (target.classList.contains('b-result__toggle_rows')) {
          lists.forEach((list) => {
            list.classList.add('active');
          });
        }
      }
    });
  }

  const tabsButtons = module.querySelectorAll('.b-result__tab');
  const tabsBlocks = module.querySelectorAll('.b-result__block');

  // Функция переключения
  const tabsToggle = function(tabsButtons, tabsBlocks) {
    if (tabsButtons.length > 0) {
      for (let i = 0; i < tabsButtons.length; i++) {
        tabsButtons[i].addEventListener('click', function() {
          // Очистка активных классов
          tabsButtons.forEach(item => item.classList.remove('active'));
          tabsBlocks.forEach(block => block.classList.remove('active'));

          // Активация текущего таба и блока
          tabsButtons[i].classList.add('active');
          tabsBlocks[i].classList.add('active');
        });
      }
    }
  };

  // Активация основных табов
  tabsToggle(tabsButtons, tabsBlocks);
});
