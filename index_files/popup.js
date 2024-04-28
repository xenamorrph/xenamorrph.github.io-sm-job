$(document).ready(function () {

    $('body').on('submit', '.js-feedback-submit', function (e) {
        e.preventDefault();
        let err = 0;

        if ($(this).find('input[name="phone"]').length) {
            if ($(this).find('input[name="phone"]').val().replace(/[^\d]/ig, '').length < 10) {
                $(this).find('input[name="phone"]').addClass('error');
                err++;
            } else {
                $(this).find('input[name="phone"]').removeClass('error');
            }
        }
        if ($(this).find('textarea._message').length) {
            if ($(this).find('textarea._message').val().length < 10) {
                $(this).find('textarea._message').addClass('error');
                err++;
            } else {
                $(this).find('textarea._message').removeClass('error');
            }
        }

        if (!err) {
            let form = $(this),
                params = $(this).serialize();

            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: '/ajax/process/index.php',
                data: params,
                beforeSend: function (xhr) {
                    //form.find('button').prop('disabled');
                },
                success: function (data) {
                    form.html('<div class="form-success">' + data.message + '</div>');
                }
            });

        }
    })

  window.popup = {
    url: '/ajax/loadform.php',
    locker: false,
    addInput: {},
    params: {},
    init: function () {
      let self = this;

      $('body').on('click', '.js-open-popup', function (e) {
        e.preventDefault();

        self.addInput.analytics = $(this).data('analytics');
        self.showWin($('.popup-win'));
        self.showForm($(this).data('target'));
      });
      $('body').on('click', '.js-popup-close', function (e) {
        e.preventDefault();

        self.showWin($('.popup-win'), true);
        $('.popup-form.active').find('input[name="analytics"]').remove();
        $('.popup-form').removeClass('active');
      });
    },
    showWin: function (el, close) {
      var close = close ? true : false;

      if (el.hasClass('active') && !close) return;

      if (el.hasClass('active')) {
        $('body').removeClass('pop-up-enabled');

        $('body').scrollTop($('body').data('scrolltop'));
        $(window).scrollTop($('body').data('scrolltop'));

        el.removeClass('active').addClass('unactive');
        setTimeout(function () {
          el.removeClass('unactive');
        }, 200);
      } else {
        var scrolltop = $('body').scrollTop() ? $('body').scrollTop() : $(window).scrollTop();
        $('body').data('scrolltop', scrolltop);
        $('body').css('top', -scrolltop);

        el.removeClass('unactive');
        el.addClass('active');
        $('body').addClass('pop-up-enabled');
      }
    },
    showForm: function (selector) {
      var self = this,
        el = $('.popup-win').find(selector);

      // если формы нет в теле страницы, пробуем ее подгрузить
      if (!el.length) {
        self.get(selector);
      } else {
        self.addParams(selector);

        if ($('.popup-form.active').length) {
          if ($('.popup-form.active').hasClass(selector)) {
            $('.popup-form.active').removeClass('active');
          } else {
            $('.popup-form.active').removeClass('active');
            el.addClass('active');
          }
        } else {
          el.addClass('active');
        }
      }
    },
    get: function (selector) {
      var self = this,
        container = $('.popup-win');

      if (container.find(selector).length) return;
      if (self.locker) return;

      self.params.target = selector;

      $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: self.url,
        data: self.params,
        beforeSend: function (xhr) {
          container.addClass('sending');
          self.locker = true;
          setTimeout(function () {
            self.locker = false;
          }, 5000);
        },
        success: function (data) {
          if (data.success) {
            $('.popup-win__box').append(data.html);
            self.showForm(selector);

            // после добавления формы на страницу, вешаем маску на телефон
            if ($('.popup-win').find(selector + ' input[name="phone"]').length) {
              $('.popup-win').find(selector + ' input[name="phone"]').mask('+7 (999) 999-99-99', {
                placeholder: "+7 (___) ___-__-__",
                autoclear: false
              });
            }

            // если у кнопки вызвавшей попап были data параметры, добавляем их в форму после загрузки
            self.addParams(selector);
          } else {

          }

          container.removeClass('sending');
          self.locker = false;
        }
      });
    },
    open: function (selector) {
      this.showWin($('.popup-win'));
      this.showForm(selector);
    },
    addParams: function (selector) {
      var self = this,
        el = $('.popup-win').find(selector).find('form');

      if (self.addInput != false) {
        for (var prop in self.addInput) {
          if (el.find('input[name="' + prop + '"]').length) {
            el.find('input[name="' + prop + '"]').val(self.addInput[prop]);
          } else {
            el.append('<input type="hidden" name="' + prop + '" value="' + self.addInput[prop] + '">');
          }
        }
      }
    }
  }
    window.popup.init();

});
