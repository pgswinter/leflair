import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import { USD } from '../../util/convertCurrency';
import { message } from '../../const/alert';
import Loading from '../Loading';
import DebounceButton from '../Lib/DebounceButton';

import { Row, Col } from 'react-bootstrap';

import Cart from '../Cart';
import {
  reqLoadCart,
  reqAddCart,
  reqRemoveCart,
  reqEmptyCart,
  reqAscCart,
  reqDescCart
} from '../../actions/cart/actions';

class Home extends PureComponent {
  componentDidMount() {
    this.props.reqLoadCart();
  }

  renderData = (listData) => {
    const { isLoaded } = listData;
    if (!isLoaded) {
      return <Loading />
    } else {
      const { data: { data } } = listData;
      return <Row>
        {
          data.length > 0 ?
            data.map((item, i) =>
              <Col md={4} sm={6} xs={12} key={i}>
                <div className="imgWrap article">
                  <Link href={`/detail?id=${item.id}`}>
                    <a>
                      <img src={item.url} alt="" />
                    </a>
                  </Link>
                </div>
                <div className="split">
                  <div className="left__split">
                    <h4 className="title">{item.name}</h4>
                    <p className="boldTxt">{USD(item.price).format(true)}</p>
                    <p>
                      <label>Quantity: </label>
                      {
                        item.quantity < 1 ? message.outOfStock : (item.quantity < 3 ? message.lowStock : item.quantity)
                      }
                    </p>
                  </div>
                  <div className="right__split">
                    {
                      item.quantity > 0 ?
                        <DebounceButton
                          value="Buy"
                          className="btn btn-submit"
                          onClick={() => this.props.reqAddCart(item)}
                        /> :
                        <button className="btn disabled">Buy</button>
                    }
                  </div>
                </div>
              </Col>
            ) :
            ''
        }
      </Row>
    }
  }

  render() {
    const {
      closeModal,
      activeModal,
      error,
      linkTo,
      leflair,
      cart,
      // function
      reqRemoveCart,
      reqEmptyCart,
      reqAscCart,
      reqDescCart
    } = this.props;

    return <React.Fragment>
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
      <div className="list">
        {this.renderData(leflair)}
      </div>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </React.Fragment>
  }
}

Home.propTypes = {
  activeModal: PropTypes.bool,
  closeModal: PropTypes.func,
  reqLoadCart: PropTypes.func,
  reqAddCart: PropTypes.func,
  reqAscCart: PropTypes.func,
  reqDescCart: PropTypes.func,
  reqRemoveCart: PropTypes.func,
  reqEmptyCart: PropTypes.func,
  error: PropTypes.string,
  linkTo: PropTypes.string,
  NavigateTo: PropTypes.string,
  title: PropTypes.string,
  leflair: PropTypes.object,
  cart: PropTypes.array,
};

const mapStateToProps = state => {
  const {
    leflairReducer,
    cartReducer
  } = state;
  return {
    leflair: leflairReducer,
    cart: cartReducer.data
  }
}

export default connect(mapStateToProps, {
  reqLoadCart,
  reqAddCart,
  reqRemoveCart,
  reqEmptyCart,
  reqAscCart,
  reqDescCart
})(Home)
