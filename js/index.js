'use strict';

$(document).ready(function() {
  var selectedPlane;

  var flights = [];
  this.addFlight = function(flightObj) {
    if (!flightObj) {
      new Error("Error adding flight to list");
    }
    flights.push(flightObj);
  };
  var occupied = {
    'A':['2'],
    'C':['3'],
    'J':['5', '7'],
    'K':['1', '2', '4']
  };
  var planes = [
    {
      name: 'cessna',
      travelClasses: [
      {
        name: 'single',
        rows: 2,
        seats: 2,
        aisles: 1,
        map: 'sas'
      }]
    },
    {
      name: '747',
      travelClasses: [
      {
        name: 'First Class',
        price: 1000,
        rows: 2,
        seats: 2,
        aisles: 1,
        map: 'sas'
      },
      {
        name: 'Business Class',
        price: 500,
        rows: 3,
        seats: 4,
        aisles: 2,
        map: 'sassas'
      },
      {
        name: 'Economy Class',
        price: 200,
        rows: 10,
        seats: 7,
        aisles: 2,
        map: 'ssasssass'
      }]
    }
  ];

  /**
   * On document load it will create a drop down with all plane types available as options
   * @param  {array} planes An array holding plane options
   */
  var selectPopulator = function(planes) {
    var select = '<select class="plane-select"><option disabled="disabled" selected="true" value="">Select a Plane</option>';
    planes.forEach(function(plane) {
      select += '<option value="' + plane.name + '">' + plane.name + '</option>';
    });
    select += '</select>';
    $('#plane-select-wrapper').html(select);
  };

  /**
   * Will take all of classes of the plane and produce HTML markup
   * @param  {obj} plane The plane object to create markup for
   */
  var travelClassesHTML = function(plane) {
    var string = '';
    var rowLetter = 'A';

    for(var i = 0; i < plane.travelClasses.length; i++) {

      var travelClass = plane.travelClasses[i];

      var width = travelClass.map.length;

      var height = travelClass.rows;

      /**
       * Will increment the character for row delegation
       * @param  {string} c The string character to increment
       */
      function nextChar(c) {
        return String.fromCharCode(c.charCodeAt(0) + 1);
      }

      string += '<h3 class="travel-class-heading">' + travelClass.name + '</h3><div class="travel-class" style="width:' + (width*120) + 'px; height: ' + (height*120) + 'px">';

      for (var j = 0; j < height; j++) {

        var seatNumber = 1;

        string += '<ul data-row=' + rowLetter + '><span class="row-letter"';

        if (j !== 0) {
          string += 'style="clear:left"';
        } // If not the first row, clears

        string += '>' + rowLetter + '</span>';

        // Loops through row, creating li for aisles and rows
        for (var k = 0; k < width; k++) {

          // Checks if 's'(seat) or 'a'(aisle)
          if (travelClass.map[k] === 's') {
            string += '<li class="seat';

            // Checks if seats are occupied
            if (occupied[rowLetter] && occupied[rowLetter].indexOf(seatNumber.toString()) > -1) {
              string += ' occupied" data-availability="occupied';
            } else {
              string += '" data-availability="available'
            }

            string += '" data-price="' + travelClass.price + '" data-seat="' + seatNumber + '" data-class="' + travelClass.name + '"><span class="price"></span></li>';

            // Increments seat number for next seat
            seatNumber++;
          } else {
            string += '<li class="aisle"></li>'
          }
        }

        string += '</ul>';

        // Increments rowLetter for the plane
        rowLetter = nextChar(rowLetter);
      }

      string += '</div>';
    }

    // Assigns html to seat-select div
    $('#seat-select').html(string);
  };




  $('#seat-select').on({
    mouseenter: function(e) {
      var price = $(this).attr('data-price');
      $(this).children().html(price);
    },
    mouseleave: function(e) {
      $(e.target).children().html('');
    },
    click: function(e) {
      $('#seat-select .selected').removeClass('selected');
      $(this).addClass('selected');
      $('#seat-info #price').html('$' + $(this).attr('data-price'));
      $('#seat-info #class').html($(this).attr('data-class'));
      $('#seat-info #availability').html($(this).attr('data-availability'));
      $('#seat-info #seat').html($(this).parent().attr('data-row') + $(this).attr('data-seat'));
      $('#seat-info:hidden').show();
    }
  }, '.seat');

  $(document).on({
    change: function() {
      var value = $(this).val();
      selectedPlane = planes.filter(function(plane) {
        if (plane.name === value) {
          return plane;

        }
      })[0];
      travelClassesHTML(selectedPlane);

    }
  }, '#plane-select-wrapper .plane-select');

  selectPopulator(planes);
});
