      
  <!-- Search Form -->
     <style>
      ::placeholder {
        color: red;
        opacity: 1; /* Firefox */
      }

      ::-ms-input-placeholder { /* Edge 12 -18 */
        color: red;
      }
     </style>
     <form action="search" method="GET">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div class="search-wrap bg-white rounded-3 p-3">
              <div class="search-upper">
                  <div class="d-flex align-items-center justify-content-between flex-wrap">
                    <div class="flx-start mb-sm-0 mb-2">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" id="return" type="radio" name="trip" value="2" >
                        <label class="form-check-label" for="return">Return</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" id="oneway" type="radio" name="trip"  value="1" >
                        <label class="form-check-label" for="oneway">One Way</label>
                      </div>
                    </div>

                    <input type="hidden" name="adult" id="adults-count" name="adults-count" readonly>
                    <input type="hidden" name="childeren" id="children-count" name="children-count" readonly>
                    <input type="hidden" name="infant" id="infants-count" name="infants-count" readonly>
                    <input type="hidden" name="class" id="selected-input">

                  <div class="flx-end d-flex align-items-center flex-wrap">
                    <div class="px-sm-2 pb-3 pt-0 ps-0 mob-full">
                      <div class="booking-form__input guests-input">
                        <i class="fa-solid fa-user-clock text-success me-2"></i><button name="guests-btn"
                          id="guests-input-btn">1
                          Guest</button>
                        <div class="guests-input__options" id="guests-input-options">
                          <div>
                            <span class="guests-input__ctrl minus" id="adults-subs-btn"><i
                                class="fa-solid fa-minus"></i></span>
                            <span class="guests-input__value"><span id="guests-count-adults">1</span>Adults</span>
                            <span class="guests-input__ctrl plus" id="adults-add-btn"><i
                                class="fa-solid fa-plus"></i></span>
                          </div>
                          <div>
                            <span class="guests-input__ctrl minus" id="children-subs-btn"><i
                                class="fa-solid fa-minus"></i></span>
                            <span class="guests-input__value"><span id="guests-count-children">0</span>Children</span>
                            <span class="guests-input__ctrl plus" id="children-add-btn"><i
                                class="fa-solid fa-plus"></i></span>
                          </div>
                          <div>
                            <span class="guests-input__ctrl minus" id="room-subs-btn"><i
                                class="fa-solid fa-minus"></i></span>
                            <span class="guests-input__value"><span id="guests-count-room">0</span>Infants</span>
                            <span class="guests-input__ctrl plus" id="room-add-btn"><i
                                class="fa-solid fa-plus"></i></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="ps-1 pb-3 pt-0 mob-full">
                      <div class="dropdowns">
                        <div class="selections">
                          <i class="fa-solid fa-basket-shopping text-success me-2"></i><span id="selected-value"  
                            class="selected">Economy</span>
                          <div class="caret"></div>
                        </div>
                        <ul class="menu">
                          <li class="active">Economy</li>
                          <li>Premium Economy</li>
                          <li>Premium Economy</li>
                          <li>Business/First</li>
                          <li>Business</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row gx-lg-2 g-3">

                <div class="col-xl-6 col-lg-6 col-md-12">
                  <div class="row gy-3 gx-lg-2 gx-3">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 position-relative">
                      <div class="form-group hdd-arrow mb-0">
                         <input type="text" name="origin" class="form-control" id="sourceAirport" placeholder="Enter Origin Airport" autocomplete="off">
                                 <div id="sourceSuggestions" class="suggestions"></div>


                      </div>
                     <!--  <div class="btn-flip-icon mt-md-0">
                        <button class="p-0 m-0 text-primary"><i class="fa-solid fa-right-left"></i></button>
                      </div> -->
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                      <div class="form-groupp hdd-arrow mb-0">
                        <input type="text" name="destination" class="form-control" id="destinationAirport" placeholder="Enter Destination Airport" autocomplete="off">
                                <div id="destinationSuggestions" class="suggestions"></div>
                      </div>
                    </div>
                  </div>
                </div>
            <div class="col-xl-4 col-lg-4 col-md-12">
                <div class="row gy-3 gx-lg-2 gx-3">
                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-group mb-0">
                            <input class="form-control fw-bold choosedate" name="departure_date" type="text" value="<?=mdate('%Y-%m-%d',(time()+86400*1))?>" readonly="readonly">
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12" id="returndate">
                        <div class="form-group mb-0">
                            <input class="form-control fw-bold choosedate" name="return_date" type="text" value="<?=mdate('%Y-%m-%d',(time()+86400*15))?>" readonly="readonly">
                        </div>
                    </div>
                </div>
            </div>
                <div class="col-xl-2 col-lg-2 col-md-12">
                  <div class="form-group mb-0">
                    <input  type="submit" value="Search" class="btn btn-primary full-width fw-medium"/>
                  </div>
                </div>

              </div>
            </div>
          </div>

      </form>


      <script>

// Get the elements

// Get the selected value element and input field
const selectedValueElement = document.getElementById("selected-value");
const selectedInputElement = document.getElementById("selected-input");

// Set the default value of the input field
selectedInputElement.value = selectedValueElement.textContent;

// Add click event listener to each list item
const listItems = document.querySelectorAll(".menu li");
listItems.forEach(item => {
  item.addEventListener("click", () => {
    // Update the selected value element text
    selectedValueElement.textContent = item.textContent;
    // Update the input field value
    selectedInputElement.value = item.textContent;
  });
});




const adultsAddBtn = document.getElementById("adults-add-btn");
const adultsSubsBtn = document.getElementById("adults-subs-btn");
const childrenAddBtn = document.getElementById("children-add-btn");
const childrenSubsBtn = document.getElementById("children-subs-btn");
const roomAddBtn = document.getElementById("room-add-btn");
const roomSubsBtn = document.getElementById("room-subs-btn");

const guestsCountAdults = document.getElementById("guests-count-adults");
const guestsCountChildren = document.getElementById("guests-count-children");
const guestsCountRoom = document.getElementById("guests-count-room");

// Get the input elements for counts
const adultsInput = document.getElementById("adults-count");
const childrenInput = document.getElementById("children-count");
const infantsInput = document.getElementById("infants-count");

// Maximum total count of guests
const MAX_GUESTS = 15;

// Add event listeners for plus and minus buttons for adults
adultsAddBtn.addEventListener("click", () => {
  if (getTotalCount() < MAX_GUESTS) {
    guestsCountAdults.textContent = parseInt(guestsCountAdults.textContent) + 1;
    adultsInput.value = guestsCountAdults.textContent;
  }
});

adultsSubsBtn.addEventListener("click", () => {
  const count = parseInt(guestsCountAdults.textContent);
  if (count > 1) {
    guestsCountAdults.textContent = count - 1;
    adultsInput.value = guestsCountAdults.textContent;
  }
});

// Add event listeners for plus and minus buttons for children
childrenAddBtn.addEventListener("click", () => {
  if (getTotalCount() < MAX_GUESTS) {
    guestsCountChildren.textContent = parseInt(guestsCountChildren.textContent) + 1;
    childrenInput.value = guestsCountChildren.textContent;
  }
});

childrenSubsBtn.addEventListener("click", () => {
  const count = parseInt(guestsCountChildren.textContent);
  if (count > 0) {
    guestsCountChildren.textContent = count - 1;
    childrenInput.value = guestsCountChildren.textContent;
  }
});

// Add event listeners for plus and minus buttons for infants
roomAddBtn.addEventListener("click", () => {
  if (getTotalCount() < MAX_GUESTS) {
    guestsCountRoom.textContent = parseInt(guestsCountRoom.textContent) + 1;
    infantsInput.value = guestsCountRoom.textContent;
  }
});

roomSubsBtn.addEventListener("click", () => {
  const count = parseInt(guestsCountRoom.textContent);
  if (count > 0) {
    guestsCountRoom.textContent = count - 1;
    infantsInput.value = guestsCountRoom.textContent;
  }
});

// Function to get the total count of guests
function getTotalCount() {
  const adults = parseInt(guestsCountAdults.textContent);
  const children = parseInt(guestsCountChildren.textContent);
  const room = parseInt(guestsCountRoom.textContent);
  return adults + children + room;
}

// Initialize default values
guestsCountAdults.textContent = 1;
adultsInput.value = 1;




window.addEventListener("DOMContentLoaded", function() {
    // Retrieve data from GET request or any other source
    // For demonstration purposes, let's assume the data is received in a variable called 'data'
    var data = '<?php echo isset($_GET['trip']) ? $_GET['trip'] : 'return'; ?>';

    // Select the radio button based on the received data
    if (data === 'return') {
        document.getElementById('return').checked = true;
    } else if (data === 'oneway') {
        document.getElementById('oneway').checked = true;
    }
});
</script>

<style type="text/css">
	.suggestions {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  max-height: 150px;
  overflow-y: auto;
  z-index: 999;
}

.suggestions ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.suggestions ul li {
  padding: 8px 12px;
  cursor: pointer;
  font-weight: bold; /* Make the text bold */
  text-align: left; /* Align text to the right */
}

.suggestions ul li:hover {
  background-color: #ddd;
}

</style>
  <script>

  	   document.addEventListener("DOMContentLoaded", function() {
        var returnRadio = document.getElementById("return");
        var onewayRadio = document.getElementById("oneway");
        var returnDateDiv = document.getElementById("returndate");
        var departureDateInput = document.querySelector('.choosedate[placeholder="Departure.."]');
        
        // Initially show the return date input field
        returnDateDiv.style.display = "block";

        // Add event listeners to radio buttons
        returnRadio.addEventListener("click", function() {
            returnDateDiv.style.display = "block"; // Show return date input field
            departureDateInput.parentElement.parentElement.parentElement.style.flexBasis = "50%"; // Adjust width of departure date input field
        });

        onewayRadio.addEventListener("click", function() {
            returnDateDiv.style.display = "none"; // Hide return date input field
            departureDateInput.parentElement.parentElement.parentElement.style.flexBasis = "100%"; // Adjust width of departure date input field
        });
    });


     document.addEventListener("DOMContentLoaded", function() {
      var sourceAirportInput = document.getElementById("sourceAirport");
      var destinationAirportInput = document.getElementById("destinationAirport");

      function fetchAirports(keyword, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '<?= apiurl;?>/v1/reference-data/locations?keyword=' + keyword + '&subType=AIRPORT&subType=CITY', true);
        xhr.setRequestHeader('Authorization', 'Bearer <?= $access_token; ?>');
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);
              if (response.data && response.data.length > 0) {
                var airports = response.data.filter(function(item) {
                  return item.iataCode && item.name;
                }).map(function(item) {
                  
                  return {
                    label: item.name + ' (' + item.iataCode + '),'+item.address.cityName,
                    value: item.iataCode
                  };
                });
                callback(airports);
              } else {
                console.log('No airports found for keyword:', keyword);
                callback([]);
              }
            } else {
              console.error('Error fetching airports:', xhr.status);
            }
          }
        };
        xhr.send();
      }

function initializeAutocomplete(inputElement, suggestionsDiv) {
  inputElement.addEventListener("input", function() {
    var keyword = this.value.trim(); // Trim whitespace
    if (keyword.length < 2) { // Check if at least 2 characters are entered
      suggestionsDiv.style.display = "none";
      return;
    }
    fetchAirports(keyword, function(airports) {
      displaySuggestions(airports, suggestionsDiv, inputElement);
    });
  });
}

function displaySuggestions(airports, suggestionsDiv, inputElement) {
  suggestionsDiv.innerHTML = "";
  if (airports.length === 0) {
    var noResults = document.createElement("div");
    noResults.textContent = "No results found";
    suggestionsDiv.appendChild(noResults);
    suggestionsDiv.style.display = "block";
    return;
  }
  var ul = document.createElement("ul");
  airports.forEach(function(airport) {
    var li = document.createElement("li");
    li.textContent = airport.label;
    li.addEventListener("click", function() {
      inputElement.value = airport.value; // Set the entire suggestion as input value
      suggestionsDiv.style.display = "none";
    });
    ul.appendChild(li);
  });
  suggestionsDiv.appendChild(ul);
  suggestionsDiv.style.display = "block";
}


      // Initialize autocomplete for source and destination airports
      var sourceSuggestionsDiv = document.getElementById("sourceSuggestions");
      initializeAutocomplete(sourceAirportInput, sourceSuggestionsDiv);

      var destinationSuggestionsDiv = document.getElementById("destinationSuggestions");
      initializeAutocomplete(destinationAirportInput, destinationSuggestionsDiv);

      // Show/hide return date field based on trip type selection
      var tripTypeSelect = document.getElementById("tripType");
      var returnDateDiv = document.getElementById("returnDateDiv");

      tripTypeSelect.addEventListener("change", function() {
        if (this.value === 'round-trip') {
          returnDateDiv.style.display = "block";
        } else {
          returnDateDiv.style.display = "none";
        }
      });

      // Form submission handling
      var flightBookingForm = document.getElementById("flightBookingForm");

      flightBookingForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        // Fetch form data
        var tripType = tripTypeSelect.value;
        var sourceAirport = sourceAirportInput.value;
        var destinationAirport = destinationAirportInput.value;
        var departureDate = document.getElementById("departureDate").value;
        var returnDate = document.getElementById("returnDate").value;
        var passengerCount = document.getElementById("passengerCount").value;

        // Do something with the form data (e.g., submit via AJAX or perform validation)
        console.log('Trip Type:', tripType);
        console.log('Source Airport:', sourceAirport);
        console.log('Destination Airport:', destinationAirport);
        console.log('Departure Date:', departureDate);
        console.log('Return Date:', returnDate);
        console.log('Passenger Count:', passengerCount);
      });
    });
  </script>