import React, { useState, useRef, useEffect } from 'react';
import FlightCard from '../cards/FlightCard';
import './UserHomePage.css';
import { useNavigate } from 'react-router-dom';
import BookingPage from '../bookingpage/BookingPage';

const UserHomePage = () => {
  const [tripType, setTripType] = useState('oneWay');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [journeyDate, setJourneyDate] = useState('');

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [flights, setFlights] = useState([]); // State to store flight search results
  const [selectedFlight, setSelectedFlight] = useState(null); // State to store selected flight details
  const [showFlightDetails, setShowFlightDetails] = useState(false); // New state
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const [showFlightSearchResults, setShowFlightResults] = useState(false); // Initially set to true
  const [isLoading, setIsLoading] = useState(false);

  const [returnDate, setReturnDate] = useState('');
  const classOptions = [
    { text: 'AC Sleeper', value: 'AC SL' },
    { text: 'Non AC Seater', value: '2S' },
    { text: 'AC Semi Sleeper', value: 'AC Semi SL' },
  ];

  const navigate = useNavigate();

  const [selectedClass, setSelectedClass] = useState(''); // State to store selected class option
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleRadioChange = (e) => {
    setTripType(e.target.value);
  };
  const handleFromInputChange = async (e) => {
    const inputValue = e.target.value;
    setFrom(inputValue);

    if (inputValue.trim() !== '') {
      try {
        const response = await fetch(
          `http://localhost:8080/admin/businfo/fromSuggestion?city=${inputValue}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ starting: inputValue }),
          }
        );

        if (!response.ok) {
          throw new Error('Request failed with status code ' + response.status);
        }

        const airportSuggestions = await response.json();
        const limitedSuggestions = airportSuggestions.slice(0, 10);
        console.log(response);

        setFromSuggestions(limitedSuggestions);
      } catch (error) {
        console.error('Error fetching airport suggestions for "From":', error);
      }
    } else {
      setFromSuggestions([]);
    }
  };

  const handleToInputChange = async (e) => {
    const inputValue = e.target.value;
    setTo(inputValue);

    if (inputValue.trim() !== '') {
      try {
        const response = await fetch(
          `http://localhost:8080/admin/businfo/toSuggestion?city=${inputValue}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ starting: inputValue }),
          }
        );

        if (!response.ok) {
          throw new Error('Request failed with status code ' + response.status);
        }
        console.log(response);
        const airportSuggestions = await response.json();
        const limitedSuggestions = airportSuggestions.slice(0, 10);

        setToSuggestions(limitedSuggestions);
      } catch (error) {
        console.error('Error fetching airport suggestions for "To":', error);
      }
    } else {
      setToSuggestions([]);
    }
  };

  const handleAirportClick = (airport, inputRef, suggestionsStateSetter) => {
    inputRef.current.value = airport;
    suggestionsStateSetter([]);

    if (inputRef === fromInputRef) {
      setFrom(airport);
      setFromIata(airport); // Save IATA code for From
    } else if (inputRef === toInputRef) {
      setTo(airport);
      setToIata(airport); // Save IATA code for To
    }
  };

  const [fromIata, setFromIata] = useState(''); // State to store From IATA code
  const [toIata, setToIata] = useState(''); // State to store To IATA code

  const handleBookNow = (bus) => {
    // Redirect to the BookingPage and pass the bus data as state
    navigate('/booking', { state: { selectedBus: bus, selectedDate: journeyDate } });
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const startTime = performance.now();
    console.log('Trip Type:', tripType);
    console.log('From:', from);
    console.log('To:', to);
    console.log('Journey Date:', journeyDate);
    console.log('Selected Classes:', selectedClass);

    // Construct the URL for the POST request
    const apiUrl = 'http://localhost:8001/customer/search';

    // Create the request body
    const routeDetailList = [
      {
        date: journeyDate,
        destination: to,
        origin: from,
      },
    ];

    if (tripType === 'roundTrip') {
      routeDetailList.push({
        date: returnDate,
        destination: from,
        origin: to,
      });
    }

    const requestBody = {
      routeDetailList,
      category: selectedClass,
    };

    console.log(requestBody);

    try {
      console.log('Sending API request...');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error('API request failed with status ' + response.status);
        // Handle the error here, e.g., show an error message to the user
        return;
      }

      const searchData = await response.json();
      const endTime = performance.now();
      console.log('Received search results:', searchData);
      // Update the state with the fetched search results
      setFlights(searchData);

      // Reset the selected flight details
      setSelectedFlight(null);

      const elapsedTime = endTime - startTime;
      console.log(`Response time: ${elapsedTime} ms`);
      // Print the search results to the console
      console.log('Search Results:', searchData);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false); // Set loading state back to false after receiving the response
    }
  };

  function getClassText(classValue) {
    const foundOption = classOptions.find((option) => option.value === classValue);
    return foundOption ? foundOption.text : classValue;
  }

  const handleCloseDetails = () => {
    setShowFlightDetails(false);
  };

  const handleCloseFlightResults = () => {
    setShowFlightResults(false);
  };
  const handleOpenFlightResults = () => {
    setShowFlightResults(true);
  };
  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="homepage-container">
      <div className="homepage">
        <h2>Search Bus</h2>
        <div className="trip-type">
          <label className="radio-label">
            <input
              type="radio"
              name="tripType"
              value="oneWay"
              checked={tripType === 'oneWay'}
              onChange={handleRadioChange}
            />
            One Way
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="tripType"
              value="roundTrip"
              checked={tripType === 'roundTrip'}
              onChange={handleRadioChange}
            />
            Round Trip
          </label>
        </div>

        <div className="input-fields">
          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={handleFromInputChange}
            id="from"
            ref={fromInputRef}
          />
          {fromSuggestions.length > 0 && (
            <div className="suggestions">
              {fromSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() =>
                    handleAirportClick(suggestion, fromInputRef, setFromSuggestions)
                  }
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          <input
            type="text"
            placeholder="To"
            value={to}
            onChange={handleToInputChange}
            id="to"
            ref={toInputRef}
          />
          {toSuggestions.length > 0 && (
            <div className="suggestions">
              {toSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() =>
                    handleAirportClick(suggestion, toInputRef, setToSuggestions)
                  }
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          <div className="date-input">
            <label htmlFor="journeyDate">Journey Date:</label>
            <input
              type="date"
              id="journeyDate"
              value={journeyDate}
              onChange={(e) => setJourneyDate(e.target.value)}
              min={getCurrentDate()}
            />
          </div>
          {tripType === 'roundTrip' && (
            <div className="date-input">
              <label htmlFor="returnDate">Return Date:</label>
              <input
                type="date"
                id="returnDate"
                placeholder="Return Date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={getCurrentDate()}
              />
            </div>
          )}

          <div className="category-dropdown">
            <select value={selectedClass} onChange={handleClassChange}>
              <option value="">Select a class</option>
              {classOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn-search"
            onClick={() => {
              handleSearch();
              handleOpenFlightResults();
            }}
          >
            Search
          </button>
        </div>
      </div>

      {isLoading ? (
        <h4 className='loading'>Loading...</h4>

      ) : showFlightSearchResults ? (
        <div className="flight-search-results">
          <div className="flight-cards-container">
            <span>
              <h3 style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', color: 'black' }}>
                Bus Search Results
              </h3>
            </span>

            {flights.length > 0 && flights[0].searchResults.length > 0 ? (
              <>
                {flights[0].searchResults.map((bus) => (
                  <FlightCard
                    key={bus.busId}
                    flight={{
                      date: flights[0].date,
                      origin: flights[0].origin,
                      destination: flights[0].destination,
                      searchResults: [bus], // Wrap the bus in an array for FlightCard
                    }}
                    from={flights[0].origin}
                    to={flights[0].destination}
                    flightClass={getClassText(selectedClass)}
                    onBookNow={() => handleBookNow(bus)}
                  />
                ))}
              </>
            ) : (
              <p style={{ color: 'red', fontSize: '18px' }}>No Buses available for the selected criteria.</p>
            )}
          </div>

          <button className="close-button" onClick={handleCloseFlightResults}>
            Close Bus Results
          </button>
        </div>
      ) : null}

      {showFlightSearchResults && tripType === 'roundTrip' ? (
        <div className="flight-search-results">
          <div className="flight-cards-container">
            <span>
              <h3 style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', color: 'black' }}>
                Return Bus Search Results
              </h3>
            </span>

            {flights && flights.length > 1 && flights[1].searchResults.length > 0 ? (
              <>
                {flights && flights[1].searchResults.map((bus) => (
                  <FlightCard
                    key={bus.busId}
                    flight={{
                      date: flights[1].date,
                      origin: flights[1].origin,
                      destination: flights[1].destination,
                      searchResults: [bus], // Wrap the bus in an array for FlightCard
                    }}
                    from={flights[1].origin}
                    to={flights[1].destination}
                    flightClass={selectedClass}
                    onBookNow={() => handleBookNow(bus.busId)}
                  />
                ))}
              </>
            ) : (
              <p style={{ color: 'red', fontSize: '18px' }}>No Buses available for the selected criteria.</p>
            )}
          </div>

          <button className="close-button" onClick={handleCloseFlightResults}>
            Close Bus Results
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UserHomePage;
