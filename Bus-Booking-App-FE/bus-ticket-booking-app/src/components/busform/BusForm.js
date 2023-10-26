// import React, { useState, useEffect } from "react";
// import { Form, Button, Modal, Toast } from "react-bootstrap";

// const BusForm = ({ onAddOrUpdateBus, action, closeModal }) => {
//   const [busData, setBusData] = useState({});
//   const [showSuccessToast, setShowSuccessToast] = useState(false);

//   const handleAddSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8080/admin/businfo/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(busData), // Wrap bus data in a 'bus' object
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Bus added successfully:", data);
//         onAddOrUpdateBus(data);
//         setBusData({});
//         setShowSuccessToast(true); // Show the success message
//       } else {
//         console.error("Failed to add bus:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error adding bus:", error);
//     }
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const apiUrl = "http://localhost:8080/admin/businfo/update";

//       const response = await fetch(apiUrl, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ bus: busData }), // Wrap bus data in a 'bus' object
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Bus updated successfully:", data);
//         onAddOrUpdateBus(data);
//         setBusData({});
//         setShowSuccessToast(true); // Show the success message
//       } else {
//         console.error("Failed to update bus:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error updating bus:", error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (action === "add") {
//       handleAddSubmit(e);
//     } else if (action === "update") {
//       handleUpdateSubmit(e);
//     }
//     closeModal(); // Close the modal on submission
//   };

//   useEffect(() => {
//     setBusData({});
//   }, [action]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBusData({ ...busData, [name]: value });
//   };

//   return (
//     <>
//       <Form onSubmit={handleSubmit}>
//         {/* Bus Number */}
//         <Form.Group className="mb-3">
//           <Form.Label>Bus Number</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter bus number"
//             name="busNumber"
//             value={busData.busNumber || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         {/* Rest of the form fields... */}

//         {/* Bus Name */}
//         <Form.Group className="mb-3">
//           <Form.Label>Bus Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter bus name"
//             name="busName"
//             value={busData.busName || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         {/* No. of Seats */}
//         <Form.Group className="mb-3">
//           <Form.Label>No. of Seats</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter number of seats"
//             name="noOfSeats"
//             value={busData.noOfSeats || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         {/* Category */}
//         <Form.Group className="mb-3">
//           <Form.Label>Category</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter category"
//             name="category"
//             value={busData.category || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         {/* Drop Time */}
//         <Form.Group className="mb-3">
//           <Form.Label>Drop Time</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter drop time"
//             name="dropTime"
//             value={busData.dropTime || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         {/* Departure Time */}
//         <Form.Group className="mb-3">
//           <Form.Label>Departure Time</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter departure time"
//             name="departureTime"
//             value={busData.departureTime || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         {/* Origin */}
//         <Form.Group className="mb-3">
//           <Form.Label>Origin</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter origin"
//             name="origin"
//             value={busData.origin || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         {/* Destination */}
//         <Form.Group className="mb-3">
//           <Form.Label>Destination</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter destination"
//             name="destination"
//             value={busData.destination || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         {/* Runs On Weekdays */}
//         <Form.Group className="mb-3">
//           <Form.Label>Runs On Weekdays (comma-separated)</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter weekdays"
//             name="runsOnWeekDays"
//             value={busData.runsOnWeekDays ? busData.runsOnWeekDays.join(", ") : ""}
//             onChange={(e) => {
//               const weekdaysArray = e.target.value.split(",").map((day) => day.trim());
//               setBusData({ ...busData, runsOnWeekDays: weekdaysArray });
//             }}
//             required
//           />
//         </Form.Group>

//         {/* Ticket Price */}
//         <Form.Group className="mb-3">
//           <Form.Label>Ticket Price</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter ticket price"
//             name="ticketPrice"
//             value={busData.ticketPrice || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           {action === "add" ? "Add Bus" : "Update Bus"}
//         </Button>
//       </Form>

//       {/* Success Toast */}
//       <Toast
//         show={showSuccessToast}
//         onClose={() => {
//           setShowSuccessToast(false);
//           closeModal(); // Close the modal when the toast is closed
//         }}
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//         }}
//       >
//         <Toast.Header>
//           <strong className="me-auto">Success</strong>
//         </Toast.Header>
//         <Toast.Body>
//           {action === "add" ? "Bus added successfully." : action === "update" ? "Bus updated successfully." : ""}
//         </Toast.Body>
//       </Toast>
//     </>
//   );
// };

// export default BusForm;

// import React, { useState, useEffect } from "react";
// import { Form, Button, Modal, Toast } from "react-bootstrap";

// const BusForm = ({ onAddOrUpdateBus, action, closeModal }) => {
//   const [busData, setBusData] = useState({});
//   const [showSuccessToast, setShowSuccessToast] = useState(false);

//   const handleAddSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8080/admin/businfo/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(busData), // Wrap bus data in a 'bus' object
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Bus added successfully:", data);
//         onAddOrUpdateBus(data);
//         setBusData({});
//         setShowSuccessToast(true); // Show the success message
//       } else {
//         console.error("Failed to add bus:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error adding bus:", error);
//     }
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const apiUrl = "http://localhost:8080/admin/businfo/update";

//       const response = await fetch(apiUrl, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ bus: busData }), // Wrap bus data in a 'bus' object
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Bus updated successfully:", data);
//         onAddOrUpdateBus(data);
//         setBusData({});
//         setShowSuccessToast(true); // Show the success message
//       } else {
//         console.error("Failed to update bus:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error updating bus:", error);
//     }
//   };

//   const handleDeleteSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const apiUrl = `http://localhost:8080/admin/businfo/delete/${busData.busId}`;

//       const response = await fetch(apiUrl, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         console.log("Bus deleted successfully");
//         onAddOrUpdateBus({}); // You can pass data as needed to indicate successful deletion
//         setShowSuccessToast(true); // Show the success message
//       } else {
//         console.error("Failed to delete bus:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error deleting bus:", error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (action === "add") {
//       handleAddSubmit(e);
//     } else if (action === "update") {
//       handleUpdateSubmit(e);
//     } else if (action === "delete") {
//       handleDeleteSubmit(e);
//       closeModal(); // Close the modal after the delete action
//     }
//   };

//   useEffect(() => {
//     setBusData({});
//   }, [action]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBusData({ ...busData, [name]: value });
//   };

//   return (
//     <>
//       <Form onSubmit={handleSubmit}>
//         {/* Bus Number */}
//         <Form.Group className="mb-3">
//           <Form.Label>Bus Number</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter bus number"
//             name="busNumber"
//             value={busData.busNumber || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         {/* Rest of the form fields... */}

//         {/* Bus Name */}
//         <Form.Group className="mb-3">
//           <Form.Label>Bus Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter bus name"
//             name="busName"
//             value={busData.busName || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         {/* No. of Seats */}
//         <Form.Group className="mb-3">
//           <Form.Label>No. of Seats</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter number of seats"
//             name="noOfSeats"
//             value={busData.noOfSeats || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         {/* Category */}
//         <Form.Group className="mb-3">
//           <Form.Label>Category</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter category"
//             name="category"
//             value={busData.category || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         {/* Drop Time */}
//         <Form.Group className="mb-3">
//           <Form.Label>Drop Time</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter drop time"
//             name="dropTime"
//             value={busData.dropTime || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         {/* Departure Time */}
//         <Form.Group className="mb-3">
//           <Form.Label>Departure Time</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter departure time"
//             name="departureTime"
//             value={busData.departureTime || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         {/* Origin */}
//         <Form.Group className="mb-3">
//           <Form.Label>Origin</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter origin"
//             name="origin"
//             value={busData.origin || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         {/* Destination */}
//         <Form.Group className="mb-3">
//           <Form.Label>Destination</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter destination"
//             name="destination"
//             value={busData.destination || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         {/* Runs On Weekdays */}
//         <Form.Group className="mb-3">
//           <Form.Label>Runs On Weekdays (comma-separated)</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter weekdays"
//             name="runsOnWeekDays"
//             value={busData.runsOnWeekDays ? busData.runsOnWeekDays.join(", ") : ""}
//             onChange={(e) => {
//               const weekdaysArray = e.target.value.split(",").map((day) => day.trim());
//               setBusData({ ...busData, runsOnWeekDays: weekdaysArray });
//             }}
//             required
//           />
//         </Form.Group>

//         {/* Ticket Price */}
//         <Form.Group className="mb-3">
//           <Form.Label>Ticket Price</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter ticket price"
//             name="ticketPrice"
//             value={busData.ticketPrice || ""}
//             onChange={handleInputChange}
//             required
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           {action === "add" ? "Add Bus" : action === "update" ? "Update Bus" : "Delete Bus"}
//         </Button>

//         {action === "delete" && (
//           <Button variant="danger" onClick={handleDeleteSubmit} style={{ marginLeft: "10px" }}>
//             Confirm Delete
//           </Button>
//         )}
//       </Form>

//       {/* Success Toast */}
//       <Toast
//         show={showSuccessToast}
//         onClose={() => {
//           setShowSuccessToast(false);
//           closeModal(); // Close the modal when the toast is closed
//         }}
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//         }}
//       >
//         <Toast.Header>
//           <strong className="me-auto">Success</strong>
//         </Toast.Header>
//         <Toast.Body>
//           {action === "add" ? "Bus added successfully." : action === "update" ? "Bus updated successfully." : "Bus deleted successfully."}
//         </Toast.Body>
//       </Toast>
//     </>
//   );
// };

// export default BusForm;
import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Toast } from "react-bootstrap";

const BusForm = ({ onAddOrUpdateBus, action, closeModal }) => {
  const [busData, setBusData] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  console.log(action);

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/admin/businfo/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(busData), // Wrap bus data in a 'bus' object
        
      });

      if (response.ok) {
        const data = await response.json();
        console.log(busData);
        console.log("Bus added successfully:", data);
        onAddOrUpdateBus(data);
        setBusData({});
        setShowSuccessToast(true); // Show the success message
      } else {
        console.error("Failed to add bus:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding bus:", error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = "http://localhost:8080/admin/businfo/update";

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(busData), // Wrap bus data in a 'bus' object
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Bus updated successfully:", data);
        onAddOrUpdateBus(data);
        setBusData({});
        setShowSuccessToast(true); // Show the success message
      } else {
        console.error("Failed to update bus:", response.statusText);
        console.log(busData);
      }
    } catch (error) {
      console.error("Error updating bus:", error);
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = `http://localhost:8080/admin/businfo/delete/${busData.busId}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Bus deleted successfully");
        onAddOrUpdateBus({}); // You can pass data as needed to indicate successful deletion
        setShowSuccessToast(true); // Show the success message
      } else {
        console.error("Failed to delete bus:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting bus:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === "add") {
      handleAddSubmit(e);
    } else if (action === "update") {
      handleUpdateSubmit(e);
    } else if (action === "delete") {
      handleDeleteSubmit(e);
      closeModal(); // Close the modal after the delete action
    }
  };

  useEffect(() => {
    setBusData({});
  }, [action]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusData({ ...busData, [name]: value });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

       {/* Delete Bus and also for update (Add this section only for "delete" action) */}
       {action === "delete"  && (
          <Form.Group className="mb-3">
            <Form.Label>Bus ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Bus ID to delete "
              name="busId"
              value={busData.busId || ""}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        )}

      {action === "update"  && (
          <Form.Group className="mb-3">
            <Form.Label>Bus ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Bus ID to update"
              name="busId"
              value={busData.busId || ""}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        )}

        {(action === "add" || action === "update") && (
          <>
            {/* Bus Number */}
            <Form.Group className="mb-3">
              <Form.Label>Bus Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter bus number"
                name="busNumber"
                value={busData.busNumber || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
  
            {/* Rest of the form fields... */}
  
            {/* Bus Name */}
            <Form.Group className="mb-3">
              <Form.Label>Bus Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter bus name"
                name="busName"
                value={busData.busName || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
  
            {/* No. of Seats */}
            <Form.Group className="mb-3">
              <Form.Label>No. of Seats</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of seats"
                name="noOfSeats"
                value={busData.noOfSeats || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
  
            {/* Category */}
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                name="category"
                value={busData.category || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
  
            {/* Drop Time */}
            <Form.Group className="mb-3">
              <Form.Label>Drop Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter drop time"
                name="dropTime"
                value={busData.dropTime || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
  
            {/* Departure Time */}
            <Form.Group className="mb-3">
              <Form.Label>Departure Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter departure time"
                name="departureTime"
                value={busData.departureTime || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
  
            {/* Origin */}
            <Form.Group className="mb-3">
              <Form.Label>Origin</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter origin"
                name="origin"
                value={busData.origin || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
  
            {/* Destination */}
            <Form.Group className="mb-3">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter destination"
                name="destination"
                value={busData.destination || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
  
            {/* Runs On Weekdays */}
            <Form.Group className="mb-3">
              <Form.Label>Runs on which days (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter weekdays"
                name="runsOnWeekDays"
                value={busData.runsOnWeekDays ? busData.runsOnWeekDays.join(", ") : ""}
                onChange={(e) => {
                  const weekdaysArray = e.target.value.split(",").map((day) => day.trim());
                  setBusData({ ...busData, runsOnWeekDays: weekdaysArray });
                }}
                required
              />
            </Form.Group>
  
            {/* Ticket Price */}
            <Form.Group className="mb-3">
              <Form.Label>Ticket Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter ticket price"
                name="ticketPrice"
                value={busData.ticketPrice || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </>
        )}
  
       
  
        <Button variant="primary" type="submit">
          {action === "add" ? "Add Bus" : action === "update" ? "Update Bus" : "Delete Bus"}
        </Button>
      </Form>
  
      {/* Success Toast */}
      <Toast
        show={showSuccessToast}
        onClose={() => {
          setShowSuccessToast(false);
          closeModal(); // Close the modal when the toast is closed
        }}
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
          {action === "add" ? "Bus added successfully." : action === "update" ? "Bus updated successfully." : "Bus deleted successfully."}
        </Toast.Body>
      </Toast>
    </>
  );
  
};

export default BusForm;


