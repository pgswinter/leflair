import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import createStore from '../src/store'

import Header from '../src/components/Master/Header';
import Footer from '../src/components/Master/Footer';

import '../src/styles/fontawesome/css/all.css';
import '../src/styles/index.less';
import 'bootstrap/dist/css/bootstrap.min.css';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }

    return { pageProps }
  }

  state = {
    activeModal: false
  };

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  // *** CLOSE MODAL ** //
  handleClickOutside = (e) => {
    if (typeof e === 'boolean') {
      this.setState({
        activeModal: e
      })
    } else {
      if (this.node.contains(e.target)) {
        this.setState({
          activeModal: false
        })
      }
    }
  }

  // *** OPEN MODAL ** //
  openModal = () => {
    this.setState({
      activeModal: true
    })
  }

  render() {
    const {
      activeModal,
    } = this.state;
    const { Component, pageProps, store } = this.props
    return <React.Fragment>
      <Header
        openModal={this.openModal}
      />
      <Provider store={store}>
        <Component
          {...pageProps}
          activeModal={activeModal}
          closeModal={this.handleClickOutside}
        />
      </Provider>
      <Footer />
      <div className={`handleModal ${activeModal ? 'active' : ''} cover`} ref={node => this.node = node}></div>
    </React.Fragment>
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp))
