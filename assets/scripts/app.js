$(function () {
	function showTide(position) {
    $.ajax({
      url: 'https://tide-api.herokuapp.com/' + 
        position.coords.latitude.toFixed(2) + 'N/' + 
        position.coords.longitude.toFixed(2) + 'E'
    }).done(function(result) {

      $("#loading").hide();
      $("#content").show();

      $('#time').html(moment().format('ddd, DD MMM YYYY'));

      if (result.tides.length) {
        result.tides.forEach(function (tide) {
          var row = $('<div>').addClass('row');
          var wrapper = $('<div>').addClass('wrapper');

          wrapper.append($('<div>').addClass('cell').text(tide.type));
          wrapper.append($('<div>').addClass('cell').text(moment(tide.time, 'h:mm a').format('HH\\hmm')));
          
          var tideHeight = parseFloat(tide.height).toFixed(1);
          wrapper.append($('<div>').addClass('cell').text(tideHeight + 'm'));

          row.append(wrapper);

          $('#tide').append(row);
        });

      } else {
        $('#tide').append($('<div>').addClass('wrapper').text('Sorry, your location is not near a known tide station'));
      }
      
      
      if (result.station) {
        $('#stationWrapper').show();
        $('#station').html(result.station.location + ' - ' + result.station.distance + ' away');
      }
    });
  }

  function showError(error) {
    $("#loading").hide();
    $("#content").show();
      
    switch(error.code) {
      case error.PERMISSION_DENIED:
        $('#tide').append($('<div>').addClass('wrapper').text('Location detection has been denied, please enable location services in your device settings.'));
        break;
      case error.POSITION_UNAVAILABLE:
        $('#tide').append($('<div>').addClass('wrapper').text('Sorry, location information is unavailable at this time, please try again later.'));
        break;
      case error.TIMEOUT:
        $('#tide').append($('<div>').addClass('wrapper').text('Sorry, we timed out trying to get your location, please try again later.'));
        break;
      case error.UNKNOWN_ERROR:
        $('#tide').append($('<div>').addClass('wrapper').text('An unknown error occurred trying to get your location, please try again later.'));
        break;
    }
  }

  navigator.geolocation.getCurrentPosition(showTide, showError);
});