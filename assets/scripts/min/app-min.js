$.modal.defaults={overlay:"#000",opacity:.75,zIndex:1,escapeClose:!0,clickClose:!0,closeText:"Close",closeClass:"",showClose:!1,modalClass:"modal",spinnerHtml:null,showSpinner:!0,fadeDuration:250,fadeDelay:1},$(function(){navigator.geolocation.getCurrentPosition(function(e){$("#loadingInfo").text("Fetching your tide information"),$.get("https://api.tide.is/",{lat:e.coords.latitude,lon:e.coords.longitude,time:moment().unix()}).done(function(e){$("#loading").hide(),$("#content").show(),$("#time").html(moment().format("ddd, DD MMM YYYY")),e.extremes.length?e.extremes.forEach(function(e){var t=$("<div>").addClass("row"),a=$("<div>").addClass("wrapper");a.append($("<div>").addClass("cell").text(e.type)),a.append($("<div>").addClass("cell").text(moment.unix(e.time).format("HH[h]mm"))),a.append($("<div>").addClass("cell").text(e.height+"m")),t.append(a),$("#tide").append(t)}):$("#tide").append($("<div>").addClass("wrapper").text("Something went wrong, please try again later.")),e.location&&($("#stationWrapper").show(),$("#station").html(parseFloat(e.location.distance).toFixed(1)+"km away"))}).fail(function(){$("#loading").hide(),$("#content").show(),$("#time").html(moment().format("ddd, DD MMM YYYY")),$("#tide").append($("<div>").addClass("wrapper").text("Something went wrong, please try again later."))})},function(e){switch($("#loading").hide(),$("#content").show(),e.code){case e.PERMISSION_DENIED:$("#tide").append($("<div>").addClass("wrapper").text("Location detection has been denied, please enable Location Services in your device privacy settings."));break;case e.POSITION_UNAVAILABLE:$("#tide").append($("<div>").addClass("wrapper").text("Sorry, location information is unavailable at this time, please try again later."));break;case e.TIMEOUT:$("#tide").append($("<div>").addClass("wrapper").text("Sorry, we timed out trying to get your location, please try again later."));break;case e.UNKNOWN_ERROR:$("#tide").append($("<div>").addClass("wrapper").text("An unknown error occurred trying to get your location, please try again later."))}})});