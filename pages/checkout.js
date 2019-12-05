import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormData from "../src/components/FormData";

class Index extends React.Component {
    static async getInitialProps(props) {
        const {
            isServer,
        } = props.ctx;
        return {
            isServer
        }
    }

    render() {
        const {
            activeModal,
            closeModal,
        } = this.props;
        return <FormData
            linkTo="/checkout"
            activeModal={activeModal}
            closeModal={closeModal}
        />
    }
}

Index.propTypes = {
    closeModal: PropTypes.func,
    activeModal: PropTypes.bool,
};

export default connect(state => {
    return state
})(Index)
