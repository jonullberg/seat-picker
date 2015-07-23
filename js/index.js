'use strict';

$(document).ready(function() {
  var selectedFlight;
  var occupied = {
    'A':['2'],
    'C':['3'],
    'J':['5', '7'],
    'K':['1', '2', '4']
  };
  var flights = [
    {
      flightNo: 'CS100',
      planeType: 'cessna',
      travelClasses: [
      {
        name: 'single',
        price: 400,
        rows: 2,
        seats: 2,
        aisles: 1,
        map: 'sas'
      }]
    },
    {
      flightNo: 'OA815',
      planeType: '747',
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
  var selectPopulator = function(flights) {
    var select = '<select class="plane-select"><option disabled="disabled" selected="true" value="">Select a Flight</option>';
    flights.forEach(function(flight) {
      select += '<option value="' + flight.flightNo + '">' + flight.flightNo + ' - ' + flight.planeType + '</option>';
    });
    select += '</select>';
    $('#plane-select-wrapper').html(select);
  };

  /**
   * Will take all of classes of the plane and produce HTML markup
   * @param  {obj} plane The plane object to create markup for
   */
  var travelClassesHTML = function(flight) {
    var string = '';
    var rowLetter = 'A';

    /**
     * Will increment the character for row delegation
     * @param  {string} c The string character to increment
     */
    function nextChar(c) {
      return String.fromCharCode(c.charCodeAt(0) + 1);
    }

    for(var i = 0; i < flight.travelClasses.length; i++) {

      var travelClass = flight.travelClasses[i];

      var width = travelClass.map.length;

      var height = travelClass.rows;

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
              string += ' occupied" data-availability="not available';
            } else {
              string += '" data-availability="available';
            }

            string += '" data-price="' + travelClass.price + '" data-seat="' + seatNumber + '" data-class="' + travelClass.name + '"><span class="price">$' + travelClass.price +'</span></li>';

            // Increments seat number for next seat
            seatNumber++;
          } else {
            string += '<li class="aisle"></li>';
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
      $(this).children().show();
    },
    mouseleave: function(e) {
      $(this).children().hide('');
    },
    click: function() {
      var availability = $(this).attr('data-availability');
      $('#seat-select .selected').removeClass('selected');
      $(this).addClass('selected');
      $('#seat-info #price').html('$' + $(this).attr('data-price'));
      $('#seat-info #class').html($(this).attr('data-class'));
      $('#seat-info #availability').html(availability);
      $('#seat-info #seat').html($(this).parent().attr('data-row') + $(this).attr('data-seat'));
      if (availability === 'not available') {
        $('#seat-info #availability').addClass('not-available');
      } else {
        $('#seat-info #availability').removeClass('not-available');
      }
      $('#seat-info:hidden').show();
    }
  }, '.seat');

  $(document).on({
    change: function() {
      var value = $(this).val();
      selectedFlight = flights.filter(function(flight) {
        if (flight.flightNo === value) {
          return flight;

        }
      })[0];
      travelClassesHTML(selectedFlight);

    }
  }, '#plane-select-wrapper .plane-select');

  selectPopulator(flights);
});
