import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import SuccessForm from '../src/components/SuccessForm';

class Success extends React.Component {
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
        return <SuccessForm
            linkTo="/"
            activeModal={activeModal}
            closeModal={closeModal}
        />
    }
}

Success.propTypes = {
    closeModal: PropTypes.func,
    activeModal: PropTypes.bool,
    isServer: PropTypes.bool
};

export default connect(state => {
    return state
})(Success)
