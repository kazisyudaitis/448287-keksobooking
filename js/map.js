'use strict';
var USER_PICTURE_PATH = 'img/avatars/user0';
var USER_PICTURE_EXT = '.png';

var ADVERT_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var ADVERT_TYPES = [
  'flat',
  'house',
  'bungalo'
];

var ADVERT_CHECKIN_OR_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

var ADVERT_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var ADVERT_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var makeRandomNumber = function (minNumber, maxNumber) {
  return Math.floor((maxNumber - minNumber + 1) * Math.random()) + minNumber;
};

var makeRandomArray = function (array) {
  var result = array.sort(function () {
    return 0.5 - Math.random();
  });

  return result.slice(0, makeRandomNumber(1, array.length));
};

var makeAdvertOffers = function (count) {
  var result = [];
  var advertFeauters = ADVERT_FEATURES.slice();
  var advertPhotos = ADVERT_PHOTOS.slice();

  for (var i = 0; i < count; i++) {
    var newAdvert = {};
    newAdvert.author = {};
    newAdvert.author.avatar = USER_PICTURE_PATH + (i + 1) + USER_PICTURE_EXT;

    newAdvert.offer = {};
    newAdvert.offer.title = ADVERT_TITLES[i];

    newAdvert.location = {};
    newAdvert.location.x = makeRandomNumber(300, 900);
    newAdvert.location.y = makeRandomNumber(150, 500);

    newAdvert.offer.address = newAdvert.location.x + ',' + newAdvert.location.y;
    newAdvert.offer.price = makeRandomNumber(1000, 1000000);
    newAdvert.offer.type = ADVERT_TYPES[makeRandomNumber(0, 2)];
    newAdvert.offer.rooms = makeRandomNumber(1, 5);
    newAdvert.offer.guests = makeRandomNumber(1, 10);
    newAdvert.offer.checkin = ADVERT_CHECKIN_OR_CHECKOUT[makeRandomNumber(0, 2)];
    newAdvert.offer.checkout = ADVERT_CHECKIN_OR_CHECKOUT[makeRandomNumber(0, 2)];
    newAdvert.offer.features = makeRandomArray(advertFeauters);
    newAdvert.offer.description = '';
    newAdvert.offer.photos = makeRandomArray(advertPhotos);

    result.push(newAdvert);
  }

  return result;
};


// var advertsObjects = makeAdvertOffers(8);

// advertsObjects.forEach(function (it) {
//   console.log(it);
// });


// Удалить класс у элемента

// 1. Найти элемент

var map = document.querySelector('.map');

// 2. Удалить

map.classList.remove('map--faded');


var createPin = function (advert) {
  for (var i = 0; i < 8; i++) {
    var result = document.createElement('button');
    result.left = advert.location.x + 'px';
    result.top = advert.location.y + 'px';
    result.className = 'map_pins';
    author.avatar = width = '40', height = '40';
    draggable = 'false';

  }
  return result;
}
// var fragment = docment.createDocumentFragment('button');
// var mapPins = document.querySelector('.map_pins');
// mapPin.appendChild(fragment);

//  <button style = "left: {{location.x}}px; top: {{location.y}}px;" class = "map__pin">
//    <img src = "{{author.avatar}}" width = "40" height = "40" draggable = "false"></img>
//  </button>
var template = document.querySelector('template article.map__card');
