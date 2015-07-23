var seatPickerApp = {
  planes : []

};
var Plane = function(type) {
  var travelClasses = [];
  this.type = type;
  this.AddTravelClass = function(obj) {
    travelClasses.push(obj);
  };
}
window.onload = function() {
  var settings = {
    rows: 10,
    rowCssPrefix: 'row-',
    seatWidth: 35,
    seatHeight: 35,
    seatCss: 'seat'
  };

  var planes = [];
  function TravelClass(name, css, rows, col) {
    this.name = name;
    this.css = css;
    this.rows = rows;
    this.col = col;
  }
  var sevenfourseven = new Plane('747');
  var cessna = new Plane('cessna');
  var first = new TravelClass('First Class', 'first', 7, 2);
  var business = new TravelClass('Business Class', 'business', 10, 4);
  var economy = new TravelClass('Economy Class', 'economy', 20, 7);
  var single = new TravelClass('Single Class', 'single', 2, 2);


  sevenfourseven.AddTravelClass(first);
  sevenfourseven.AddTravelClass(business);
  sevenfourseven.AddTravelClass(economy);
  cessna.AddTravelClass(single);
  planes.push(sevenfourseven);
  planes.push(cessna);


  function createPlaneSelect() {
    var planeSelectHTML = '';
    for (var i = 0; i < planes.length; i++) {
      planeSelectHTML += '<option value="' + planes[i].type + '">' + planes[i].type + '</options>';
    }
    planeSelectHTML += '</select>';
    return planeSelectHTML
  }
  function createMap(plane) {
    var seatSelect = document.getElementById("seat-select");
    var map = '<table class="seat-map">';
    for (var i = 0; i < plane[0].classes.length; i++) {
      map += '<div class="' + plane[0].classes[i].css + '" style="width: ' + (plane[0].classes[i].rows * 100) + 'px; height: ' + (plane[0].classes[i].col * 100)  + '"></div>'
    }
    map += '</table>'
    seatSelect.innerHTML = map;
  }
  planeSelectHTML = createPlaneSelect();
  var planeWrapper = document.getElementById("plane-select-wrapper");
  var selectedPlane;
  var planeSelect = document.getElementById("plane-options");
  var seat = document.querySelectorAll("#seats .seat");
  function showPrice(event) {
    var priceTag = event.target.childNodes[0];
    var price = event.target.attributes[1].value;
    priceTag.innerHTML = price;
  };

  function removePrice(event) {
    var priceTag = event.target.childNodes[0];
    priceTag.innerHTML = '';

  };

  function addEventsToSeats() {
    for (var i = 0; i < seat.length; i++) {
      seat[i].addEventListener("mouseover",showPrice);
      seat[i].addEventListener("mouseout", removePrice);
    }
  }
  addEventsToSeats();
}


var map = [];


init = function(reservedSeat) {
  var str = [], seatNo, className;
  for (i = 0; i < settings.rows; i++) {
    for (j = 0; j <settings.cols; j++) {
      seatNo = (i + j * settings.rows + 1);
      className = settings.seatCss + ' ' + settings.rowCssPrefix + i.toString() + ' ' + settings.colCssPrefix + j.toString();
    }
  }
}
