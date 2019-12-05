import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import InfoCard from "../src/components/InfoCard";

class Confirm extends React.Component {
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
            isServer,
            activeModal,
            closeModal,
        } = this.props;
        return <InfoCard
            linkTo="/checkout"
            isServer={isServer}
            activeModal={activeModal}
            closeModal={closeModal}
        />
    }
}

Confirm.propTypes = {
    closeModal: PropTypes.func,
    activeModal: PropTypes.bool,
    isServer: PropTypes.bool
};

export default connect(state => {
    return state
})(Confirm)
