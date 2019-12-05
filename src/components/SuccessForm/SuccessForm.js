import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import Router from 'next/router';

import {
  reqLoadCart,
} from '../../actions/cart/actions';
import Cart from '../Cart';

const handleEmptyCart = () => {
  Router.push('/')
}

class SuccessForm extends PureComponent {
  componentDidMount() {
    this.props.reqLoadCart();
  }

  render() {
    const {
      //cart
      closeModal,
      activeModal,
      cart,
      linkTo,
    } = this.props;
    return (
      <React.Fragment>
        <Cart
          closeModal={closeModal}
          active={activeModal}
          handleAdd={this.handleAdd}
          linkTo={linkTo}
          cart={cart}
        />
        <Container>
          <div className="success">
            <h3>Thank you for your order</h3>
            <p>Your order #001 was ordered successfully</p>
            <p>The schedule estimate around 3 - 6 day</p>
            <p>We will contact to you to confirm. The information also sent to email!</p>
            <button className="btn btn-submit" onClick={() => handleEmptyCart()}>Continue shopping</button>
          </div>
        </Container>
      </React.Fragment>

    )
  }

};

SuccessForm.propTypes = {
  // cart
  activeModal: PropTypes.bool,
  closeModal: PropTypes.func,
  reqLoadCart: PropTypes.func,
  linkTo: PropTypes.string,
  cart: PropTypes.array,
};

const mapStateToProps = state => {
  const {
    cartReducer
  } = state;
  return {
    cart: cartReducer.data
  }
};


export default connect(
  mapStateToProps, {
  reqLoadCart
}
)(SuccessForm);
