import React from 'react';
import PropTypes from 'prop-types';
// import Link from 'next/link';
import { connect } from 'react-redux';
import DebounceButton from '../Lib/DebounceButton';
import { USD } from '../../util/convertCurrency';

import { Row, Col } from 'react-bootstrap';

import Router from 'next/router';

const handleRouter = (linkTo, closeModal) => {
  Router.push(linkTo);
  closeModal(false)
}

const Cart = ({
  closeModal,
  active,
  cart,
  handleAscCart,
  handleDescCart,
  handleRemoveCart,
  linkTo
}) => {
  return <div className={`handleModal ${active ? 'active' : ''} myModal cart`}>
    <Row>
      {
        (cart !== null && cart.length > 0) ? cart.map((item, i) =>
          <Col md={12} key={i} className="item">
            <Row>
              <Col md={3}>
                <div className="imgWrap">
                  <img src={item.url} alt="" />
                </div>
              </Col>
              <Col md={2}>
                <h6>{item.name}</h6>
              </Col>
              <Col md={3}>
                <p>Quantity: {item.orderItem}</p>
                <p>Price: {USD(item.price).format(true)}</p>
              </Col>
              <Col md={4}>
                <p>Total: {item.totalPrice ? USD(item.totalPrice).format(true) : USD(item.price).format(true)}</p>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="handleQuantity">
                <DebounceButton
                  value="+"
                  className="btn btn-submit"
                  onClick={() => handleAscCart(item)}
                />
                <DebounceButton
                  value="-"
                  className="btn btn-submit"
                  onClick={() => handleDescCart(item)}
                />
                <DebounceButton
                  value="x"
                  className="btn btn-submit"
                  onClick={() => handleRemoveCart(item)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="alert">
                  {item.message ? item.message : ''}
                </p>
              </Col>
            </Row>
          </Col>)
          : <label>No item available</label>
      }
    </Row>
    {
      (cart !== null && cart.length > 0) ?
        <button onClick={() => handleRouter(linkTo, closeModal)} className="btn btn-submit">Payment</button> :
        <button className="btn btn-submit disabled">Payment</button>
    }

  </div>
}

Cart.propTypes = {
  closeModal: PropTypes.func,
  active: PropTypes.bool,
  cart: PropTypes.array,
  handleAscCart: PropTypes.func,
  handleDescCart: PropTypes.func,
  handleRemoveCart: PropTypes.func,
  linkTo: PropTypes.string,
};

export default connect(state => state)(Cart)
