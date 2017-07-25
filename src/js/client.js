// var menuApp = menuApp || {};

/* global google:ignore */

function init() {
  initMap();

  $('input[type="radio"]').on('click', () => {
    if ($('#showUpvote').is(':checked')) {
      $('#upvotes').val(1);
      $('#downvotes').val(0);
    } else if ($('#showDownvote').is(':checked')) {
      $('#upvotes').val(0);
      $('#downvotes').val(1);
    }
  });

  $('.votes').one('click', updateVotes);
}

function updateVotes(e) {
  // if (there is a logout div) {
  //  run the whole function
  // } else {
  //  add a message on the top saying that you have to be logged in to perform the action
  // }

  const newValue = parseInt($(e.target).text()) + 1;
  var restID = $('#restId')[0].innerHTML;
  var elmID = $(e.target).siblings('div')[0].innerHTML;
  var upvts = parseInt($(e.target).siblings('div')[1].innerHTML);
  var dwnvts = parseInt($(e.target).siblings('div')[2].innerHTML);
  if ($(e.target).attr('id') === 'upvote') {
    var objToSend = {
      id: elmID,
      upvotes: parseInt(upvts + 1)
    };
  } else if ($(e.target).attr('id') === 'downvote') {
    var objToSend = {
      id: elmID,
      downvotes: parseInt(dwnvts + 1)
    };
  }
  // console.log(objToSend);
  // console.log(window.location.origin);
  $
  .ajax({
    url: `${window.location.origin}/restaurants/${restID}`,
    type: 'PUT',
    data: objToSend,
    success: function(data) {
      // console.log(data);
    }
  });
  $(e.target).text(newValue);
}

function initMap() {
  // console.log(this);
  const input = document.getElementById('pac-input');


  const autocomplete = new google.maps.places.Autocomplete(input, { types: [ 'establishment' ]});

  // Set initial restrict to the greater list of countries.
  autocomplete.setComponentRestrictions({
    'country': ['uk']
  });

  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert('Select a restaurant');
      return;
    }
    // console.log(place);
    var newVenue = { name: place.name, restaurantId: place.place_id, websiteURL: place.website, types: place.types, priceLevel: place.price_level, rating: place.rating, address: place.formatted_address, phoneNumber: place.international_phone_number };
    // console.log(newVenue);
    $.post( `http://localhost:3000/restaurants/new`, newVenue);

    $('#pac-input').attr('value',`${place.name}`);

    $('#searchForm').on('submit', () => {
      $('#searchForm').attr('action', `/restaurants/${place.place_id}`);
    });
  });
}


$(init);
