import React, { useState } from "react";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    upiId: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { amount } = formData;
    if (amount) {
      await checkoutHandler(amount);
    } else {
      alert("Please enter a valid amount.");
    }
  };

  const checkoutHandler = async (amount) => {
    try {
      console.log(formData);
      const { data: { key } } = await axios.get("http://localhost:3000/api/getkey");
      const { data: { order } } = await axios.post("http://localhost:3000/api/checkout", {
        amount,
      });

      console.log(order);

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Network Next",
        description: "Tutorial of RazorPay",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,

        prefill: {
          name: formData.name,
          email: "om.rgh098@gmail.com",
          contact: formData.number,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error in payment processing:", error);
    }
  };

  return (
    <Container className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <Row>
        <Col>
          <Card className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: "28rem" }}>
            
            <Card.Body>
              <Card.Title className="text-center mb-4">Payment Form</Card.Title>
              <Form onSubmit={handleSubmit}>
                {/* Name Field */}
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Phone Number Field */}
                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="number"
                    placeholder="Enter your phone number"
                    value={formData.number}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* UPI ID Field */}
                <Form.Group className="mb-3" controlId="formUpiId">
                  <Form.Label>UPI ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="upiId"
                    placeholder="Enter your UPI ID"
                    value={formData.upiId}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Amount Field */}
                <Form.Group className="mb-3" controlId="formAmount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    placeholder="Enter the amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Submit Button */}
                <Button variant="primary" type="submit" className="w-100">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
