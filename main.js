ymaps.ready(init);
var myMap, coords, BalloonLayout;
var placemarksCollection;

var placemarkID = 0;

function init() {
    myMap = new ymaps.Map('map', {
        center: [54.71, 55.96],
        zoom: 12,
        controls: ['zoomControl']
    });

    placemarksCollection = new ymaps.GeoObjectCollection();

    mainBalloonLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="my-balloon">' +
        '<div id="header">{{name}}<button id="btn-close">Закрыть</button></div>' +
        '<div id="comments">Коменты</div>' +
        '<h2 class="form-name">Ваш отзыв</h2>' +
        '<input type="text" id="user-name" placeholder="Ваше имя">' +
        '<input type="text" id="place" placeholder="Укажите место">' +
        '<textarea name="comment" id="user-comment" cols="20" rows="2"></textarea>' +
        '<div class="btn-container"><button id="btn-add">Добавить</button></div>' +
        '</div>'
    );

    var clustererContentLayout = ymaps.templateLayoutFactory.createClass(
        // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
        '<h2 class=ballon_header>{{ properties.place|raw }}</h2>' +
        '<div class=ballon_body>{{ properties.address|raw }}</div>' +
        '<div class=ballon_footer>{{ properties.comment|raw }}</div>'
    );
    var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        // Устанавливаем стандартный макет балуна кластера "Карусель".
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        // Устанавливаем собственный макет.
        clusterBalloonItemContentLayout: clustererContentLayout,
        // Устанавливаем режим открытия балуна. 
        // В данном примере балун никогда не будет открываться в режиме панели.
        clusterBalloonPanelMaxMapArea: 0,
        // Устанавливаем размеры макета контента балуна (в пикселях).
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 130,
        // Устанавливаем максимальное количество элементов в нижней панели на одной странице
        clusterBalloonPagerSize: 5
        // Настройка внешнего вида нижней панели.
        // Режим marker рекомендуется использовать с небольшим количеством элементов.
        // clusterBalloonPagerType: 'marker',
        // Можно отключить зацикливание списка при навигации при помощи боковых стрелок.
        // clusterBalloonCycling: false,
        // Можно отключить отображение меню навигации.
        // clusterBalloonPagerVisible: false
    });



    myMap.events.add('click', function (e) {
        console.log(e.get('target'));
        if (!myMap.balloon.isOpen()) {
            coords = e.get('coords');

            createMainBallon(coords);

        } else {
            myMap.balloon.close();
        }
    });

    myMap.events.add('balloonopen', function (e) {
        let closeButton = document.getElementById('btn-close');
        let addButton = document.getElementById('btn-add');

        let closeListener = ymaps.domEvent.manager.group(closeButton)
            .add('click', function (event) {
                myMap.balloon.close();
            });

        let addListener = ymaps.domEvent.manager.group(addButton)
            .add('click', function (event) {

                var placemark = new ymaps.Placemark(myMap.balloon.getPosition(), {
                    place: '<b>МЕСТО</b>',
                    address: '<b>Адрес</b>',
                    comment: placemarkID++
                }, {
                    openBalloonOnClick: false,
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                })

                placemarksCollection.add(placemark);
                clusterer.add(placemark);
                myMap.geoObjects.add(placemarksCollection).add(clusterer);


                // myMap.geoObjects.add(new ymaps.Placemark(myMap.balloon.getData().coords, {
                //     openBalloonOnClick: false
                // }, {
                //     preset: 'islands#icon',
                //     iconColor: '#0095b6'
                // }))
            });

    });
    myMap.events.add('balloonclose', function (e) {
        console.log('hi');
    });

    placemarksCollection.events.add('click', function (e) {
        //e.preventDefault();


    });


    function createMainBallon(coords, address, commentsHtml) {

        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            var myAddress = firstGeoObject.getAddressLine();

            myMap.balloon.open(coords, {
                name: 'HELLO',
                coords: coords
            }, {
                address: myAddress,
                layout: mainBalloonLayout
            });
        });
    }
}