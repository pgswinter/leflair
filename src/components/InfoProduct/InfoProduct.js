import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import { USD } from '../../util/convertCurrency';
import { Container, Col, Row } from 'react-bootstrap';
import DebounceButton from '../Lib/DebounceButton';

import Cart from '../Cart';
import {
  reqLoadCart,
  reqAddCart,
  reqRemoveCart,
  reqAscCart,
  reqDescCart
} from '../../actions/cart/actions';

const renderData = (item, props) => {
  const { isLoaded } = item;

  if (!isLoaded) {
    return <Loading />
  } else {
    const { data } = item;

    return <Container>
      <Row>
        <Col md={7}>
          <div className="imgWrap">
            <img src={data.url} alt="_img" />
          </div>
        </Col>
        <Col md={5} className="bodyRight">
          <h3>{data.name}</h3>
          <Row>
            <Col md={4}><label>Price: </label></Col>
            <Col md={5}><p>{USD(data.price).format(true)}</p></Col>
          </Row>
          <Row>
            <Col md={4}><label>Category: </label></Col>
            <Col md={5}><p>{data.kind_of}</p></Col>
          </Row>
          <Row>
            <Col md={4}><label>Quantity: </label></Col>
            <Col md={5}><p>{data.quantity}</p></Col>
          </Row>
          <Row>
            <Col md={4}><label>Rate star: </label></Col>
            <Col md={5}><p>{data.rate}/5</p></Col>
          </Row>
          {
            data.quantity > 0 ?
              <DebounceButton
                value="Buy now"
                onClick={() => props.reqAddCart(data)}
              /> :
              <button className="btn disabled">EMPTY</button>
          }
        </Col>
      </Row>
      <Row className="detail-desc">
        <label>Description: </label>
        <p>{data.description}</p>
        <p>
          <Link href="/">
            <a className="btn btn-submit" title="back home">Continue shopping</a>
          </Link>
        </p>
      </Row>
    </Container>
  }
}

const InfoProduct = (props) => {

  const {
    leflairById,
    //cart
    linkTo,
    closeModal,
    activeModal,
    cart,
    // function
    reqRemoveCart,
    reqEmptyCart,
    reqAscCart,
    reqDescCart
  } = props;
  return <div className="card">
    <Cart
      closeModal={closeModal}
      active={activeModal}
      linkTo={linkTo}
      cart={cart}
      handleAscCart={reqAscCart}
      handleDescCart={reqDescCart}
      handleRemoveCart={reqRemoveCart}
      handleEmptyCart={reqEmptyCart}
    />
    {renderData(leflairById, props)}
  </div>
}

InfoProduct.propTypes = {
  leflairById: PropTypes.object,
  // cart
  activeModal: PropTypes.bool,
  closeModal: PropTypes.func,
  reqLoadCart: PropTypes.func,
  reqAddCart: PropTypes.func,
  reqAscCart: PropTypes.func,
  reqDescCart: PropTypes.func,
  reqRemoveCart: PropTypes.func,
  reqEmptyCart: PropTypes.func,
  linkTo: PropTypes.string,
  cart: PropTypes.array,
};

const mapStateToProps = state => {
  const {
    cartReducer,
    leflairByIdReducer,
  } = state;
  return {
    leflairById: leflairByIdReducer,
    cart: cartReducer.data
  }
}

export default connect(mapStateToProps, {
  reqLoadCart,
  reqAddCart,
  reqRemoveCart,
  reqAscCart,
  reqDescCart
})(InfoProduct);
