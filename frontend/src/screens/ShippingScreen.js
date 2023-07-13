import React, { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userData,
    cart: { shippingInfo },
  } = state;
  const [fullname, setFullname] = useState(shippingInfo.fullname || '');
  const [address, setAddress] = useState(shippingInfo.address || '');
  const [city, setCity] = useState(shippingInfo.city || '');
  const [country, setCountry] = useState(shippingInfo.country || '');
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || '');

  const submitHandle = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SHIPPING_ADDRESS',
      payload: {
        fullname,
        address,
        city,
        country,
        postalCode,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullname,
        address,
        city,
        country,
        postalCode,
      })
    );
    navigate('/payment');
  };
  useEffect(() => {
    if (!userData) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userData, navigate]);
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandle}>
          <Form.Group className="mb-3" controlId="fullname">
            <Form.Label> Full Name</Form.Label>
            <Form.Control
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label> Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label> City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="country">
            <Form.Label> Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label> Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <div>
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ShippingScreen;
