import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { reqFetch } from '../src/actions/leflair/actions'
import Home from '../src/components/Home'
import { Container } from 'react-bootstrap';

class Index extends React.Component {
    static async getInitialProps(props) {
        const {
            store,
            isServer,
        } = props.ctx;
        store.dispatch(reqFetch());
        return {
            isServer
        }
    }

    render() {
        const {
            isServer,
            activeModal,
            closeModal,
        } = this.props;

        return <Container>
            <Home
                linkTo="/checkout"
                isServer={isServer}
                activeModal={activeModal}
                closeModal={closeModal}
            />
        </Container>

    }
}

Index.propTypes = {
    closeModal: PropTypes.func,
    activeModal: PropTypes.bool,
    isServer: PropTypes.bool
};

export default connect(state => {
    return state
})(Index)
