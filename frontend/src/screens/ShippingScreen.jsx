import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    address: shippingAddress.address || "",
    city: shippingAddress.city || "",
    postalCode: shippingAddress.postalCode || "",
    country: shippingAddress.country || "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ ...shippingInfo }));
    navigate("/payment");
  };
  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>Address :</Form.Label>
          <Form.Control
            name="address"
            type="text"
            value={shippingInfo.address}
            placeholder="Enter Address"
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group controlId="city" className="my-2">
          <Form.Label>City :</Form.Label>
          <Form.Control
            name="city"
            type="text"
            value={shippingInfo.city}
            placeholder="Enter City"
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group controlId="postalcode" className="my-2">
          <Form.Label>Postal Code :</Form.Label>
          <Form.Control
            name="postalCode"
            type="text"
            value={shippingInfo.postalCode}
            placeholder="Enter postal code"
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group controlId="country" className="my-2">
          <Form.Label>Address :</Form.Label>
          <Form.Control
            name="country"
            type="text"
            value={shippingInfo.country}
            placeholder="Enter Country"
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
