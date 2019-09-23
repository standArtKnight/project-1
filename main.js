ymaps.ready(init);
var myMap, coords, BalloonLayout;
var placemarksCollection, objectManager;

var placemarkID = 0;

function init() {
    myMap = new ymaps.Map('map', {
        center: [54.71, 55.96],
        zoom: 12,
        controls: ['zoomControl']
    });


    var clustererContentLayout = ymaps.templateLayoutFactory.createClass(
        // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
        '<h2 class="clusterer_header"><b>{{ properties.place }}</b></h2>' +
        '<div class="clusterer_body"><a href="/" id="adress-link">{{ properties.address }}</a><br><p>{{ properties.comment }}</p></div>' +
        '<div class="clusterer_footer">{{ properties.date }}</div>', {
            build: function () {
                clustererContentLayout.superclass.build.call(this);
                const link = document.getElementById("adress-link");
                link.addEventListener('click', this.openMarkBallon);
            },
            clear: function () {
                const link = document.getElementById("adress-link");
                link.removeEventListener('click', this.openMarkBallon);
                clustererContentLayout.superclass.clear.call(this);
            },
            openMarkBallon: function (e) {
                e.preventDefault();
                console.log(e.target.textContent);
                let commentsHtml = '';
                const marksArray = objectManager.objects.getAll();
                let coords = myMap.getCenter();
                marksArray
                    .filter(element => element.properties.address == e.target.textContent)
                    .forEach(element => {
                        coords = element.geometry.coordinates;
                        commentsHtml += `<p><b>${element.properties.name}</b> ${element.properties.place} ${element.properties.date}<br>${element.properties.comment}</p>`;
                    });

                createMainBallon(coords, commentsHtml);
            }
        });

    objectManager = new ymaps.ObjectManager({
        // Чтобы метки начали кластеризоваться, выставляем опцию.
        clusterize: true,
        // ObjectManager принимает те же опции, что и кластеризатор.
        gridSize: 32,
        geoObjectPreset: 'islands#yellowIcon',
        geoObjectOpenBalloonOnClick: false,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonItemContentLayout: clustererContentLayout,
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        // Балун никогда не будет открываться в режиме панели.
        clusterBalloonPanelMaxMapArea: 0,
        // Устанавливаем размеры макета контента балуна (в пикселях).
        // clusterBalloonContentLayoutWidth: 200,
        // clusterBalloonContentLayoutHeight: 130
    });

    objectManager.clusters.options.set({
        preset: 'islands#redClusterIcons',
    });

    myMap.geoObjects.add(objectManager);


    mainBalloonLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="my-balloon">' +
        '<div id="header">{{address}}<button id="btn-close">Закрыть</button></div>' +
        '<div id="comments">{{comments | raw}}</div>' +
        '<h2 class="form-name">Ваш отзыв</h2>' +
        '<input type="text" id="user-name" placeholder="Ваше имя">' +
        '<input type="text" id="place" placeholder="Укажите место">' +
        '<textarea name="comment" id="user-comment" cols="20" rows="2"></textarea>' +
        '<div class="btn-container"><button id="btn-add">Добавить</button></div>' +
        '</div>', {
            // Определяем метод getShape, который
            // будет возвращать размеры макета хинта.
            // Это необходимо для того, чтобы хинт автоматически
            // сдвигал позицию при выходе за пределы карты.
            getShape: function () {
                var el = this.getElement(),
                    result = null;
                if (el) {
                    var firstChild = el.firstChild;
                    result = new ymaps.shape.Rectangle(
                        new ymaps.geometry.pixel.Rectangle([
                            [0, 0],
                            [firstChild.offsetWidth, firstChild.offsetHeight]
                        ])
                    );
                }
                return result;
            }
        }
    );

    myMap.events.add('click', function (e) {
        coords = e.get('coords');
        if (!myMap.balloon.isOpen()) {
            createMainBallon(coords);
        } else {
            myMap.balloon.close();
        }
    });

    myMap.balloon.events.add('open', function (e) {
        const balloonContainer = document.querySelector('.my-balloon');
        if (balloonContainer !== null) {
            const closeButton = balloonContainer.querySelector('#btn-close');
            const addButton = balloonContainer.querySelector('#btn-add');
            const userName = document.getElementById('user-name');
            const place = balloonContainer.querySelector('#place');
            const userComment = balloonContainer.querySelector('#user-comment');
            const comments = balloonContainer.querySelector('#comments');
            let coordinates = myMap.balloon.getPosition();
            const myDate = new Date().toLocaleString();

            ymaps.domEvent.manager.group(closeButton)
                .add('click', function () {
                    myMap.balloon.close();
                });
            ymaps.domEvent.manager.group(addButton)
                .add('click', function () {
                    objectManager.add({
                        type: 'Feature',
                        id: placemarkID++,
                        geometry: {
                            type: 'Point',
                            coordinates: coordinates
                        },
                        properties: {
                            name: userName.value,
                            address: myMap.balloon.getData().address,
                            place: place.value,
                            comment: userComment.value,
                            date: myDate
                        },
                        options: {
                            preset: "islands#redDotIcon"
                        }
                    });

                    comments.innerHTML += `<p><b>${userName.value}</b> ${place.value} ${myDate}<br>${userComment.value}</p>`;

                    userName.value = '';
                    place.value = '';
                    userComment.value = '';
                });
        }
    });

    objectManager.objects.events.add('click', openMarkBallon);

    function openMarkBallon(e) {
        const objectId = e.get('objectId');
        const mark = objectManager.objects.getById(objectId);
        let commentsHtml = `<p><b>${mark.properties.name}</b> ${mark.properties.place} ${mark.properties.date}<br>${mark.properties.comment}</p>`;

        if (myMap.balloon.isOpen()) {
            myMap.balloon.close();
        }

        createMainBallon(mark.geometry.coordinates, commentsHtml);
    }

    // objectManager.clusters.balloon.events.add('open', (e) => {
    //     let clusterId = e.get('objectId');
    //     let commentsHtml = '';
    //     let cluster = objectManager.clusters.getById(clusterId);
    //     // cluster.features
    //     //     .filter(element => element.geometry.coordinates == mark.geometry.coordinates)
    //     //     .forEach(element => {
    //     //         commentsHtml += `<p><b>${element.properties.name}</b> ${element.properties.place} ${element.properties.date}<br>${element.properties.comment}</p>`;
    //     //     });
    //     console.log('ОКРЫТО');
    //     console.log(document.getElementById('adress-link'));
    // })

    function createMainBallon(coords, commentsHtml) {
        commentsHtml = commentsHtml || '';
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);

            myMap.balloon.open(coords, {
                comments: commentsHtml,
                coords: coords,
                address: firstGeoObject.getAddressLine(),

            }, {
                layout: mainBalloonLayout,
                autoPan: true,
                autoPanCheckZoomRange: false,
                autoPanDuration: 500
            });
        });
    }
}