import React, { useContext } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';

const PlaceOrderScreen = (props) => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispach } = useContext(Store);
  const {
    cart: { cartItems, shippingInfo, paymentMethod },
  } = state;
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: </strong>
                {shippingInfo.fullname}
                <br />
                <strong>Address: </strong>
                {shippingInfo.address} , {shippingInfo.city},
                {shippingInfo.postalCode},{shippingInfo.country}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: </strong>
                {paymentMethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col md={6}>
                      <b>Name</b>
                    </Col>
                    <Col md={3}>
                      <b>Quantity</b>
                    </Col>
                    <Col md={3}>
                      <b>Price</b>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-item-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        />
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
