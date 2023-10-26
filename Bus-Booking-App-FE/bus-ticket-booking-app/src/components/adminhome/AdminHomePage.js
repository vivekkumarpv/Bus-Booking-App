import React, { useState, useEffect } from "react";
import { Container, Row, Button, Modal, Toast } from "react-bootstrap";
import BusForm from "../busform/BusForm";
import styles from "./AdminHomePage.css"; // Import the CSS file; // Import the CSS module
import "bootstrap/dist/css/bootstrap.min.css";
import AdminBusCard from "../cards/AdminBusCard";

const AdminHomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("add"); // "add", "update", or "delete"
  const [showSuccessToast, setShowSuccessToast] = useState(false); // State for success message
  const [buses, setBuses] = useState([]); // State to store the list of buses
  const [showBusList, setShowBusList] = useState(false); // State to control visibility of bus list

  const [searchOption, setSearchOption] = useState("busName"); // Default search option
  const [searchValue, setSearchValue] = useState(""); // User input for search value
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const [showSearchResults, setShowSearchResults] = useState(false); // State to control visibility of search results

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Handle success for both "Add Bus" and "Update Bus" actions
  const handleAddOrUpdateBusSuccess = () => {
    setShowSuccessToast(true); // Show the success toast
    closeModal(); // Close the modal
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShowSuccessToast(false); // Close the success toast when the modal is closed
  };

  const handleSearch = async () => {
    try {
      setShowSearchResults(false); // Hide search results initially
      let apiUrl = "";

      if (searchOption === "busId") {
        apiUrl = `http://localhost:8080/admin/businfo/busid/${searchValue}`;
      } else if (searchOption === "busNumber") {
        apiUrl = `http://localhost:8080/admin/businfo/busnumber/${searchValue}`;
      }

      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();

        if (typeof data === "object" && data !== null) {
          // Check if data is an object (single result)
          setSearchResults([data]); // Wrap the single result in an array
          handleCloseViewBusesCard();
          setShowSearchResults(true); // Show search results
        } else {
          // Handle unexpected response formats here
          console.error("API response has an unexpected format.");
        }
      } else {
        // Handle error responses here
        console.error("An error occurred while fetching search results.");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("An error occurred:", error.message);
    }
  };

  // Fetch buses from the API
  const fetchBuses = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/businfo/getall");
      if (response.ok) {
        const data = await response.json();
        setBuses(data);
        console.log(buses);
      } else {
        // Handle HTTP error responses
        if (response.status === 404) {
          // Handle 404 Not Found error
          console.error("Buses not found.");
        } else if (response.status === 500) {
          // Handle 500 Internal Server Error
          console.error("Internal Server Error.");
        } else {
          // Handle other HTTP errors
          console.error("An error occurred while fetching buses.");
        }
      }
    } catch (error) {
      // Handle network or other errors
      console.error("An error occurred:", error.message);
    }
  };

  useEffect(() => {
    console.log(buses); // Log the updated value of buses
  }, [buses]);

  const handleModalAction = (action) => {
    setModalAction(action);
    setShowModal(true);
  };

  // Function to handle "View Buses" button click
  const handleViewBusesClick = async () => {
    await fetchBuses(); // Fetch the buses first
    handleCloseSearchBusCard();
    setShowBusList(true); // Show the bus list
  };

  const handleCloseViewBusesCard = () => {
    setShowBusList(false); // Hide the "View Buses" card
  };

  const handleCloseSearchBusCard = () => {
    setShowSearchResults(false); // Hide the "View Buses" card
  };

  return (
    <div className="backgroundimage">
      <Container className={`adminHomePageContainer ${styles.adminHomePageContainer}`}>
        <Row>
          <div className={`text-center ${styles.buttonContainer}`}>
            <h2 className={`heading-style ${styles.headingStyle}`}>Hai Admin, Welcome to the bus management system</h2>
            <Button className={`admin-button ${styles.adminButton}`} onClick={() => handleModalAction("add")}>
              Add Bus
            </Button>
            <Button className={`admin-button ${styles.adminButton}`} onClick={() => handleModalAction("update")}>
              Update Bus
            </Button>
            <Button className={`admin-button ${styles.adminButton}`} onClick={() => handleModalAction("delete")}>
              Delete Bus
            </Button>
            <Button className={`admin-button ${styles.adminButton}`} onClick={handleViewBusesClick}>
              View Buses
            </Button>

            {/* Add Search Dropdown */}
            <select
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
              className={`search-dropdown ${styles.searchDropdown}`}
            >
              <option value="busId">Search by Bus Id</option>
              <option value="busNumber">Search by Bus Number</option>
            </select>
            {/* Add Input Box */}
            <input
              type="number"
              placeholder={`Enter ${searchOption === "busNumber" ? "Bus Number" : "Bus Id"}`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={`search-input ${styles.searchInput}`}
              required
              min="1"
            />
            {/* Add Search Button */}
            <Button className={`admin-button ${styles.adminButton} ${styles.searchButton}`} onClick={handleSearch}>
              Search
            </Button>
          </div>
        </Row>
        {showBusList && (
          <div className={`bus-view-results ${styles.busViewResults}`}>
            <div className={`bus-cards-container ${styles.busCardsContainer}`}>
              {buses.map((bus) => (
                <div key={bus.busId}>
                  <AdminBusCard bus={bus} />
                </div>
              ))}
            </div>
            <Button className={`close-button ${styles.closeButton}`} onClick={handleCloseViewBusesCard}>
              Close
            </Button>{" "}
            {/* Close button */}
          </div>
        )}

        {showSearchResults && (
          <div className={`bus-search-results ${styles.busViewResults}`}>
            <div className={`search-cards-container ${styles.busCardsContainer}`}>
              {searchResults.map((bus) => (
                <div key={bus.busId}>
                  <AdminBusCard bus={bus} />
                </div>
              ))}
            </div>
            <Button className={`close-button ${styles.closeButton}`} onClick={handleCloseSearchBusCard}>
              Close
            </Button>{" "}
          </div>
        )}

        {/* Modal and content */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {modalAction === "add" ? "Add Bus" : modalAction === "update" ? "Update Bus" : "Delete Bus"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BusForm
              action={modalAction}
              onAddOrUpdateBus={handleAddOrUpdateBusSuccess} // Pass the success handler
              closeModal={closeModal} // Pass the closeModal function
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      {/* Success Toast */}
      <Toast
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>
          {modalAction === "add" ? "Bus Added Successfully" : modalAction === "update" ? "Bus Updated Successfully" : "Bus Deleted Successfully"}
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default AdminHomePage;
