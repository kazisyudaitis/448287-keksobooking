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

var ApartmentsTypes = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var template = document.querySelector('template article.map__card');

var mapTemplate = document.querySelector('template').content;
var map = document.querySelector('.map');

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

var createPin = function (advert, pinId) {
  var pinElement = mapTemplate.querySelector('.map__pin').cloneNode(true);

  pinElement.style.left = advert.location.x + 24 + 'px';
  pinElement.style.top = advert.location.y + 24 + 'px';

  pinElement.dataset.index = pinId;
  pinElement.querySelector('img').src = advert.author.avatar;

  return pinElement;
};

var onPinClick = function (evt) {
  // renderAdvert(advertOffer);
  var currentTarget = evt.currentTarget;
  var index = currentTarget.dataset.index;
  renderAdvert(allAdverts[index]);
};

var renderPins = function (advertsArray) {
  var docFragmnet = document.createDocumentFragment();

  for (var i = 0; i < advertsArray.length; i++) {
    var newPin = createPin(advertsArray[i], i);
    newPin.addEventListener('click', onPinClick); // .bind(null, advertsArray[i]));
    docFragmnet.appendChild(newPin);
  }

  map.appendChild(docFragmnet);
};

var getFeaturesList = function (featuresArray) {
  var featuresList = '';
  for (var i = 0; i < featuresArray.length; i++) {
    featuresList = '<li class="feature feature--' + featuresArray[i] + '"></li>' + featuresList;
  }
  return featuresList;
};

// Добавляет фотографии PHOTOS
var getPhotosList = function (photosArray) {
  var photosItem = '';
  for (var i = 0; i < photosArray.length; i++) {
    photosItem = '<li>' + '<img src ="' + photosArray[i] + '"  width = "70" height = "70"></li>' + photosItem;
  }
  return photosItem;
};

var closeAdvertCard = function () {
  var opennedCard = map.querySelector('.map__card');
  map.removeChild(opennedCard);
};
// создаем функцю для удаления обработчика
var onPopupCloseBtnClick = function (evt) {
  evt.currentTarget.removeEventListener('click', onPopupCloseBtnClick);
  closeAdvertCard();
};

// Пишем функцию onEscDownOfferCard....
var ESC_KEYCODE = 27;
var onEscDownOfferCard = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.currentTarget.removeEventListener('keydown', onEscDownOfferCard);
    closeAdvertCard();
  }
};

var createCardOffer = function (advert) {
  var cardElement = mapTemplate.querySelector('.map__card').cloneNode(true);
  // Находим элемент и добавляем обработчик
  cardElement.querySelector('.popup__close').addEventListener('click', onPopupCloseBtnClick);
  // Пишем код для установки обработчика keydown.
  document.addEventListener('keydown', onEscDownOfferCard);

  cardElement.querySelector('h3').textContent = advert.offer.title;
  cardElement.querySelector('h3+p').textContent = advert.offer.address;
  cardElement.querySelector('.popup__price').textContent = advert.offer.price + ' \u20bd/ночь ';

  cardElement.querySelector('h4').textContent = ApartmentsTypes[advert.offer.type];

  cardElement.querySelector('h4+p').textContent = 'Комнат: ' + advert.offer.rooms + ' для ' + advert.offer.guests + '  гостей';
  cardElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд: ' + advert.offer.checkin + ', выезд: ' + advert.offer.checkout;

  cardElement.querySelector('.popup__features').innerHTML = getFeaturesList(advert.offer.features);
  cardElement.querySelector('.popup__pictures').innerHTML = getPhotosList(advert.offer.photos);

  cardElement.querySelector('p').textContent = advert.offer.description;


  cardElement.querySelector('.popup__avatar').src = advert.author.avatar;

  return cardElement;
};

var renderAdvert = function (advert) {
  var docFragmnet = document.createDocumentFragment();
  var advertCard = createCardOffer(advert);
  docFragmnet.appendChild(advertCard);

  var anotherArticle = map.querySelector('.map__card');

  if (!anotherArticle) {
    map.appendChild(docFragmnet);
    return;
  }

  map.replaceChild(docFragmnet, anotherArticle);
};

map.classList.remove('map--faded');

var allAdverts = makeAdvertOffers(8);
renderPins(allAdverts);

// renderAdvert(allAdverts[0]);
