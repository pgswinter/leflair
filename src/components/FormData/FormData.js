import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import DebounceButton from '../Lib/DebounceButton';
import PropTypes from 'prop-types';
import Router from 'next/router';

import {
  formState,
  fieldValidation
} from '../../validation/validationForm';
import {
  textareaErrorText,
  textareaRegex,
  phoneErrorText,
  phoneErrorRegex,
  emailErrorText,
  emailErrorRegex
} from '../../validation/validateEntry';

import {
  reqSaveUser
} from '../../actions/user/actions';
import {
  reqLoadCart,
  reqRemoveCart,
  reqAscCart,
  reqDescCart
} from '../../actions/cart/actions';

import { Container, Row, Col } from 'react-bootstrap';

import Cart from '../Cart';


class FormData extends PureComponent {
  state = formState;

  componentDidMount() {
    this.props.reqLoadCart();
  }

  // *** VALIDATION FIELD ***//
  onChangeField = (e, fieldRegex, fieldName, fieldError) => {
    const validatedField = fieldValidation(e, fieldRegex, fieldError);
    this.setState(prevState => {
      const { formValidate } = prevState;
      return {
        formValidate: {
          ...formValidate,
          [fieldName]: validatedField
        },
      }
    })
  }
  // *** ADD USER INFO *** //
  onHandleAdd = () => {
    const { formValidate: { name, address, phone, email } } = this.state;
    if (
      name.text === null || name.text === '' ||
      address.text === null || address.text === '' ||
      phone.text === null || phone.text === '' ||
      email.text === null || email.text === ''
    ) {
      this.setState({
        submitError: 'Any field is not allow empty'
      })
    } else {
      if (name.error || address.error || phone.error || email.error) {
        this.setState({
          submitError: 'Please typing like as error message'
        })
      } else {
        const params = {
          name: name.text,
          address: address.text,
          phone: phone.text,
          email: email.text
        }
        this.props.reqSaveUser(params);
        // Return field data null
        this.setState(() => {
          return formState
        });
        Router.push('/confirm');
      }
    }
  }
  render() {
    const {
      formValidate: {
        name,
        address,
        phone,
        email
      },
      submitError
    } = this.state;
    const {
      //cart
      closeModal,
      activeModal,
      cart,
      linkTo,
      // function
      reqRemoveCart,
      reqAscCart,
      reqDescCart
    } = this.props;

    const nameEntry = name.text;
    const addressEntry = address.text;
    const phoneEntry = phone.text;
    const emailEntry = email.text;

    const nameError = name.error;
    const addressError = address.error;
    const phoneError = phone.error;
    const emailError = email.error;
    return (
      <React.Fragment>
        <Cart
          closeModal={closeModal}
          active={activeModal}
          handleAdd={this.handleAdd}
          linkTo={linkTo}
          cart={cart}
          handleAscCart={reqAscCart}
          handleDescCart={reqDescCart}
          handleRemoveCart={reqRemoveCart}
        />
        <Container>
          <div className="form">
            <Row>
              <Col md={3}>
                <label>Name</label>
              </Col>
              <Col md={9}>
                <input
                  onChange={(e) => this.onChangeField(e, textareaRegex, 'name', textareaErrorText)}
                  type="text"
                  value={nameEntry}
                />
              </Col>
            </Row>
            <Row className="errorField">
              <Col md={3}></Col>
              <Col md={9}>
                <label className="alert">{nameError}</label>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <label>Address</label>
              </Col>
              <Col md={9}>
                <input
                  onChange={(e) => this.onChangeField(e, textareaRegex, 'address', textareaErrorText)}
                  type="text"
                  value={addressEntry}
                />
              </Col>
            </Row>
            <Row className="errorField">
              <Col md={3}></Col>
              <Col md={9}>
                <label className="alert">{addressError}</label>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <label>Phone</label>
              </Col>
              <Col md={9}>
                <input
                  onChange={(e) => this.onChangeField(e, phoneErrorRegex, 'phone', phoneErrorText)}
                  type="text"
                  value={phoneEntry}
                />
              </Col>
            </Row>
            <Row className="errorField">
              <Col md={3}></Col>
              <Col md={9}>
                <label className="alert">{phoneError}</label>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <label>Email</label>
              </Col>
              <Col md={9}>
                <input
                  onChange={(e) => this.onChangeField(e, emailErrorRegex, 'email', emailErrorText)}
                  type="text"
                  value={emailEntry}
                />
              </Col>
            </Row>
            <Row className="errorField">
              <Col md={3}></Col>
              <Col md={9}>
                <label className="alert">{emailError}</label>
              </Col>
            </Row>
            <button
              className="btn btn-submit"
              onClick={() => this.onHandleAdd()}
            >Submit</button>
            <label className="alert">{submitError}</label>
          </div>
        </Container>
      </React.Fragment>
    )
  }
}

FormData.propTypes = {
  handleAdd: PropTypes.func,
  reqSaveUser: PropTypes.func,
  // cart
  activeModal: PropTypes.bool,
  closeModal: PropTypes.func,
  reqLoadCart: PropTypes.func,
  reqAscCart: PropTypes.func,
  reqDescCart: PropTypes.func,
  reqRemoveCart: PropTypes.func,
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
}

export default connect(mapStateToProps, {
  reqSaveUser,
  reqLoadCart,
  reqRemoveCart,
  reqAscCart,
  reqDescCart
})(FormData)
