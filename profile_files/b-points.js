"use strict";


window.mapPoints = [
    {
        "coords": [
            "55.736067332933",
            "37.410228732501"
        ],
        "options": {
            "id": "135725",
            "hintContent": "г. Москва, «СМ-Стоматология» на ул. Ярцевская",
            "balloonContent": "ул. Ярцевская, д. 8",
            "iconLayout": 'default#image',
            "iconImageHref":"/i/geopoint.svg",
            "iconImageSize": [40, 48],
            "iconImageOffset": [-15, -15]
        },

    },
    {
        "coords": [
            "55.708747694591",
            "37.725082949286"
        ],
        "options":
        {
            "id": "135726",
            "hintContent": "г. Москва, «СМ-Стоматология» на Волгоградском проспекте ",
            "balloonContent": "Волгоградский проспект, д. 42, стр. 12",
            "iconLayout": 'default#image',
            "iconImageHref":"/i/geopoint.svg",
            "iconImageSize": [40, 48],
            "iconImageOffset": [-15, -15]
        }
    },
    {
        "coords": [
            "55.795864",
            "37.611069"
        ],
        "options": {
            "id": "135727",
            "hintContent": "г. Москва, «СМ-КЛИНИКА» на 2-й Сыромятнический пер.",
            "balloonContent": "2-й Сыромятнический пер. 11",
            "iconLayout": 'default#image',
            "iconImageHref":"/i/geopoint.svg",
            "iconImageSize": [40, 48],
            "iconImageOffset": [-15, -15]
        },
    },
    {
        "coords": [
            "55.827838",
            "37.514266"
        ],
        "options": {
            "id": "135728",
            "hintContent": "г. Москва, «СМ-КЛИНИКА» на Ивановской.",
            "balloonContent": "ул. Ивановнская, 111",
            "iconLayout": 'default#image',
            "iconImageHref":"/i/geopoint.svg",
            "iconImageSize": [40, 48],
            "iconImageOffset": [-15, -15]
        }
    }
];

class YandexMap {
    _elMap = {}
    _ymap = {}
    _selector = ''
    _center = []
    _zoom = 17
    _once = false

    constructor(selector, center, zoom) {
        if (!selector) return;

        this._selector = selector
        this._center = center
        this._zoom = zoom
        this._elMap = document.querySelector(selector);
        this._points = window.mapPoints;

        this._init();
        this._events();
    }

    _init() {
        this._scroll()
    }

    _events() {
        this._instance = this._scroll.bind(this)

        window.addEventListener("scroll", this._instance)
    }

    _scroll() {
        let obj = this._elMap,
            top = 0,
            winH = (window.innerHeight > 0) ? window.innerHeight : screen.height,
            scrollTop = document.documentElement.scrollTop || document.body && document.body.scrollTop || 0,
            viewPosY2 = scrollTop + winH,
            viewPosY1 = scrollTop - winH,
            self = this;

        if (this._once) return;

        if (obj.offsetParent) {
            while (true) {
                top += obj.offsetTop;
                if (!obj.offsetParent) {
                    break;
                }
                obj = obj.offsetParent;
            }
        } else if (obj.y) {
            top += obj.y;
        }

        if (viewPosY2 >= top && viewPosY1 < top) {
            this._once = true
            const yaMap = () => {
                const elJs = document.createElement('script');
                elJs.type = 'text/javascript';
                elJs.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
                elJs.onload = () => {
                    let iterations = 20
                    const interval = setInterval(() => {
                        if (typeof ymaps !== 'undefined' && typeof ymaps.Map == 'function') {
                            ymaps.load(() => {
                                self._ymap = new ymaps.Map(self._selector.replace(/#/, ''), {
                                    center: self._center,
                                    zoom: self._zoom,
                                })

                                let leyer = self._ymap.layers.get(0).get(0)

                                self._waitForTilesLoad(leyer).then(() => self._map())
                            })
                            clearInterval(interval);
                        } else if (iterations-- === 0) {
                            clearInterval(interval);
                        }
                    }, 100)
                }
                document.body.appendChild(elJs);
            }
            yaMap()

            window.removeEventListener("scroll", this._instance);
        }
    }

    _map() {
        let pointsCol = new ymaps.GeoObjectCollection()
        const bPointsItem = document.querySelectorAll('.b-points__item')
        const self = this;

        for (let prop in this._points) {
          if (!this._points.hasOwnProperty(prop)) continue;

          console.log(this._points[prop].options);
          let marker = new ymaps.Placemark(
              this._points[prop].coords,
              this._points[prop].options,
          );

          pointsCol.add(marker);
        }

        this._ymap.geoObjects.add(pointsCol);
        this._ymap.setBounds(pointsCol.getBounds());
        this._ymap.container.fitToViewport();
        this._ymap.setZoom(this._ymap.getZoom());
        this._ymap.controls.remove('searchControl');
        this._ymap.controls.remove('trafficControl');
        this._ymap.controls.remove('typeSelector');
        this._ymap.controls.remove('fullscreenControl');
        this._ymap.controls.remove('rulerControl');
        this._ymap.controls.remove('geolocationControl');

        setTimeout(() => {
            this._elMap.classList.remove('hide');
        }, 100)

        bPointsItem.forEach((item) => {
          item.addEventListener('click', () => {
              bPointsItem.forEach((item) => {
                item.classList.remove('active');
              })
              // Получаем id кликнатуго элемента
              let id = item.dataset.id;
              item.classList.add('active');
              // Ищем совпадающий маркер по id
              pointsCol.each((marker) => {
                if (marker.properties.get('id') === id) {
                    // Открываем балун этого маркера
                    marker.balloon.open();
                }
            });


          });
      });

    }

    _getTileContainer(layer) {
        for (let k in layer) {
            if (layer.hasOwnProperty(k)) {
                if (
                    layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
                    || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
                ) {
                    return layer[k];
                }
            }
        }
        return null;
    }

    _waitForTilesLoad(layer) {
        const self = this;
        return new ymaps.vow.Promise(function (resolve, reject) {

            let tc = self._getTileContainer(layer),
                readyAll = true;

            tc.tiles.each(function (tile, number) {
                if (!tile.isReady()) {
                    readyAll = false;
                }
            });

            if (readyAll) {
                resolve();
            } else {
                tc.events.once("ready", function () {
                    resolve();
                });
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
  new YandexMap('#b-points', [55.753544, 37.621211], 15);
});
