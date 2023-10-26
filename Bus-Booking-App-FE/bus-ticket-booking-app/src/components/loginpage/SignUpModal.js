import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import './SignUpModal.css';

const SignupModal = ({ show, handleClose }) => {
  const initialFormData = {
    name: "",
    age: "",
    email: "",
    gender: "",
    city: "",
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the customer object with the required structure
    const customerData = {
      customerName: formData.name,
      username: formData.username,
      age: parseInt(formData.age),
      email: formData.email,
      gender: formData.gender,
      city: formData.city,
      password: formData.password,
      role: "USER", // Set role to "USER"
    };

    try {
      // Make a POST request to the API
      const response = await fetch("http://localhost:8002/customer/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      if (response.ok) {
        // If the response is successful, close the modal and reset the form
        console.log("Account created successfully:", customerData);
        handleClose();
        setFormData(initialFormData); // Reset the form data
      } else {
        // Handle any errors here, e.g., display an error message
        console.error("Error creating account:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton={false}>
        <Modal.Title className="modal-title">Create A New Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-center">
            <Button type="submit" variant="primary">
              Create Account
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default SignupModal;
