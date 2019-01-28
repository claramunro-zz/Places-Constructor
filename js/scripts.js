// Business Logic for LocationBook
function LocationBook() {
  this.locations = [],
  this.currentId = 0
}

LocationBook.prototype.addLocation = function(location) {
  location.id = this.assignId();
  this.locations.push(location);
}

LocationBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

LocationBook.prototype.findLocation = function(id) {
  for (var i=0; i< this.locations.length; i++) {
    if (this.locations[i]) {
      if (this.locations[i].id == id) {
        return this.locations[i];
      }
    }
  };
  return false;
}

LocationBook.prototype.deleteLocation = function(id) {
  for (var i=0; i< this.locations.length; i++) {
    if (this.locations[i]) {
      if (this.locations[i].id == id) {
        delete this.locations[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Location(location, landmark, time, note) {
  this.location = location,
  this.landmark = landmark,
  this.time = time,
  this.note = note
}

Location.prototype.fullName = function() {
  return this.location + " " + this.landmark;
}

// User Interface Logic ---------
var locationBook = new LocationBook();

function displayLocationDetails(locationBookToDisplay) {
  var locationsList = $("ul#locations");
  var htmlForLocationInfo = "";
  locationBookToDisplay.locations.forEach(function(location) {
    htmlForLocationInfo += "<li id=" + location.id + ">" + location.location + " " + location.landmark + "</li>";
  });
  locationsList.html(htmlForLocationInfo);
};

function showLocation (locationId) {
  var location = locationBook.findLocation(locationId);
  $("#show-location").show();
  $(".location").html(location.location);
  $(".landmark").html(location.landmark);
  $(".time").html(location.time);
  $(".note").html(location.note);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + location.id + ">Delete</button>");
}

function attachLocationListeners() {
  $("ul#locations").on("click", "li", function() {
    showLocation(this.id);
  });

  $("#buttons").on("click", ".deleteButton", function() {
    locationBook.deleteLocation(this.id);
    $("#show-location").hide();
    displayLocationDetails(locationBook);
  });

};

$(document).ready(function() {
  attachLocationListeners();

  $("form#new-location").submit(function(event) {
    event.preventDefault();
    var inputtedNewLocation = $("input#new-location").val();
    var inputtedNewLandmark = $("input#new-landmark").val();
    var inputtedNewTime = $("input#new-time").val();
    var inputtedNewNote = $("input#new-note").val();

    $("input#new-location").val("");
    $("input#new-landmark").val("");
    $("input#new-time").val("");
    $("input#new-note").val("");

    var newLocation = new Location(inputtedNewLocation, inputtedNewLandmark, inputtedNewTime, inputtedNewNote);
    locationBook.addLocation(newLocation);
    displayLocationDetails(locationBook);
  })
})
