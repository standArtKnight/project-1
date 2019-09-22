# Проект
Работа с Яндекс.карты API


```javascript
myGeoObject.geometry.getCoordinates() // Взять координаты метки

var placemark = new ymaps.Placemark(coords, {
    address: 'АДРЕС'
},
{
    balloonLayout: BalloonLayout
});

ymaps.geocode(coords).then(function (res) {
    var firstGeoObject = res.geoObjects.get(0);
    placemark.properties
        .set({
            // Формируем строку с данными об объекте.
            address: firstGeoObject.getAddressLine()
        });
});


myMap.geoObjects.add(placemark);
placemark.balloon.open();
```

```json
{
    "type": "FeatureCollection",
    "features": [
        {"type": "Feature", "id": 0, "geometry": {"type": "Point", "coordinates": [55.831903, 37.411961]}, "properties": {"balloonContent": "Содержимое балуна", "clusterCaption": "Метка с iconContent", "hintContent": "Текст подсказки", "iconContent": "1"}, "options": {"iconColor": "#ff0000", "preset": "islands#blueCircleIcon"}},
        {"type": "Feature", "id": 1, "geometry": {"type": "Point", "coordinates": [55.763338, 37.565466]}, "properties": {"balloonContent": "Содержимое балуна", "clusterCaption": "Еще одна метка", "hintContent": "Текст подсказки"}, "options": {"preset": "islands#blueSportCircleIcon"}},
        {"type": "Feature", "id": 2, "geometry": {"type": "Point", "coordinates": [55.763338, 37.665466]}, "properties": {"balloonContent": "Содержимое балуна", "clusterCaption": "Еще одна метка", "hintContent": "Текст подсказки"}, "options": {"preset": "islands#blueSportIcon"}},
        {"type": "Feature", "id": 3, "geometry": {"type": "Point", "coordinates": [55.744522, 37.616378]}, "properties": {"balloonContent": "Содержимое балуна", "clusterCaption": "Еще одна метка", "hintContent": "Текст подсказки", "iconContent": "22"}, "options": {"preset": "islands#blueIcon"}},
        {"type": "Feature", "id": 4, "geometry": {"type": "Point", "coordinates": [55.780898, 37.642889]}, "properties": {"balloonContent": "Содержимое балуна", "clusterCaption": "Еще одна метка", "hintContent": "Текст подсказки", "iconContent": "я тут!"}, "options": {"preset": "islands#blueStretchyIcon"}},
        {"type": "Feature", "id": 5, "geometry": {"type": "Point", "coordinates": [55.793559, 37.435983]}, "properties": {"balloonContent": "Содержимое балуна", "clusterCaption": "Еще одна метка", "hintContent": "Текст подсказки"}, "options": {"preset": "islands#blueDotIcon"}},
        {"type": "Feature", "id": 6, "geometry": {"type": "Point", "coordinates": [55.800584, 37.675638]}, "properties": {"balloonContent": "Содержимое балуна", "clusterCaption": "Еще одна метка", "hintContent": "Текст подсказки"}, "options": {"preset": "islands#blueCircleDotIcon"}},
        {"type": "Feature", "id": 7, "geometry": {"type": "Point", "coordinates": [55.716733, 37.589988]}, "properties": {"balloonContent": "Содержимое балуна", "clusterCaption": "Еще одна метка", "hintContent": "Текст подсказки", "iconCaption": "Подпись метки"}, "options": {"preset": "islands#blueGovernmentCircleIcon"}},
        {"type": "Feature", "id": 8, "geometry": {"type": "Point", "coordinates": [55.815724, 37.56084]}, "properties": {"balloonContent": "Содержимое балуна", "clusterCaption": "Еще одна метка", "hintContent": "Текст подсказки", "iconCaption": "Подпись метки"}, "options": {"preset": "islands#blueGovernmentIcon"}},
        {"type": "Feature", "id": 10, "geometry": {"type": "Point", "coordinates": [55.87417, 37.669838]}, "properties": {"balloonContent": "У меня нестандартный курсор", "clusterCaption": "У меня нестандартный курсор", "hintContent": "У меня нестандартный курсор"}, "options": {"iconColor": "#ff0000", "cursor": "help"}},
        {"type": "Feature", "id": 11, "geometry": {"type": "Point", "coordinates": [55.71677, 37.482338]}, "properties": {"balloonContent": "Я не пропадаю, когда балун открыт", "clusterCaption": "Я не пропадаю, когда балун открыт", "hintContent": "Я не пропадаю, когда балун открыт"}, "options": {"preset": "islands#redGovernmentCircleIcon", "hideIconOnBalloonOpen": false}},
        {"type": "Feature", "id": 12, "geometry": {"type": "Point", "coordinates": [55.78085, 37.75021]}, "properties": {"balloonContent": "Содержимое балуна", "clusterCaption": "Еще одна метка", "hintContent": "Мой балун не откроется"}, "options": {"iconColor": "#ff0000", "openBalloonOnClick": false}},
        {"type": "Feature", "id": 13, "geometry": {"type": "Point", "coordinates": [55.810906, 37.654142]}, "properties": {"balloonContent": "Содержимое балуна", "clusterCaption": "Еще одна метка", "hintContent": "Текст подсказки"}, "options": {}}
    ]
```