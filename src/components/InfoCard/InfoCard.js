import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-bootstrap';
import Router from 'next/router';

import { reqLoadUser } from '../../actions/user/actions';
import {
  reqLoadCart,
  reqRemoveCart,
  reqAscCart,
  reqDescCart,
  reqEmptyCart
} from '../../actions/cart/actions';
import { imgPath, confirmPage } from '../../const/alert';
import Link from 'next/link';

import { USD } from '../../util/convertCurrency';

import Loading from '../Loading';
import Cart from '../Cart';

class InfoCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.reqLoadUser();
    this.props.reqLoadCart();
  }

  renderUser = (user) => {
    const { isLoaded } = user;
    if (!isLoaded) {
      return <Loading />
    } else {
      const { data } = user;
      return <div className="info__card">
        <Row>
          <Col md={12}>
            <h3>Review information</h3>
            <p>{confirmPage.text1}</p>
          </Col>
        </Row>
        <Row>
          <Col className="leftLayout" md={6}>
            <Row>
              <Col md={3}>
                <label>Name: </label>
              </Col>
              <Col md={5}>
                <span>{data.name}</span>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <label>Addess: </label>
              </Col>
              <Col md={5}>
                <span>{data.address}</span>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <label>Phone: </label>
              </Col>
              <Col md={5}>
                <span>{data.phone}</span>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <label>Email: </label>
              </Col>
              <Col md={5}>
                <span>{data.email}</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    }
  }

  renderCartTable = (cart) => {
    const { isLoaded } = cart;
    if (!isLoaded) {
      return <Loading />
    } else {
      const { data } = cart;
      const newData = data.map(item => {
        item['totalPrice'] = item.quantity * item.price
        return item.totalPrice;
      })
      const totalAll = newData.length > 0 ? newData.reduce((acc, cur) => {
        return acc + cur
      }) : 0;

      return <div className="table__cart">
        <h3>Your cart</h3>
        <table>
          <thead>
            <tr>
              <th>IMG</th>
              <th>Name</th>
              <th>Category</th>
              <th>Ordered</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, i) => <tr key={i}>
                <td className="imgWrap"><img src={item.url} alt={`_image${i}`} /></td>
                <td>{item.name}</td>
                <td>{item.kind_of}</td>
                <td>{item.orderItem}</td>
                <td>{USD(item.price).format(true)}</td>
                <td>{item.totalPrice ? USD(item.totalPrice).format(true) : USD(item.price).format(true)}</td>
              </tr>)
            }
          </tbody>
          <tfoot>
            <tr>
              <td>Total all: </td>
              <td>{USD(totalAll).format(true)}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    }
  }

  handleSuccess = () => {
    this.props.reqEmptyCart();
    Router.push('/success');
  }

  render() {
    const {
      user,
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

    return (
      <div className="card">
        <Cart
          closeModal={closeModal}
          active={activeModal}
          handleAdd={this.handleAdd}
          linkTo={linkTo}
          cart={cart.data}
          handleAscCart={reqAscCart}
          handleDescCart={reqDescCart}
          handleRemoveCart={reqRemoveCart}
        />
        <Container>
          {this.renderUser(user)}
          {this.renderCartTable(cart)}
          <div className="payment-method__card">
            <h3>Payment method:</h3>
            <p>{confirmPage.text2}</p>
            <ul className="list">
              <li className="imgWrap">
                <button className="btn" onClick={() => this.handleSuccess()}>
                  <img src={imgPath.byCash} alt="_visa" />
                </button>
              </li>
              <li className="imgWrap">
                <button className="btn" onClick={() => this.handleSuccess()}>
                  <img src={imgPath.visa} alt="_visa" />
                </button>
              </li>
              <li className="imgWrap">
                <button className="btn" onClick={() => this.handleSuccess()}>
                  <img src={imgPath.paypal} alt="_paylpal" />
                </button>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    );
  }
}

InfoCard.propTypes = {
  reqLoadUser: PropTypes.func,
  user: PropTypes.object,
  // cart
  activeModal: PropTypes.bool,
  closeModal: PropTypes.func,
  reqLoadCart: PropTypes.func,
  reqAscCart: PropTypes.func,
  reqDescCart: PropTypes.func,
  reqRemoveCart: PropTypes.func,
  reqEmptyCart: PropTypes.func,
  linkTo: PropTypes.string,
  cart: PropTypes.object,
};

const mapStateToProps = state => {
  const {
    userReducer,
    cartReducer
  } = state;
  return {
    user: userReducer,
    cart: cartReducer
  }
}

export default connect(mapStateToProps, {
  reqLoadUser,
  reqLoadCart,
  reqRemoveCart,
  reqAscCart,
  reqDescCart,
  reqEmptyCart
})(InfoCard)
