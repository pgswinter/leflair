import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { reqFetchById } from '../src/actions/leflair/actions';

import InfoProduct from "../src/components/InfoProduct";

class Detail extends React.Component {
    static async getInitialProps(props) {
        const {
            store,
            isServer,
            query
        } = props.ctx;
        store.dispatch(reqFetchById(query.id))

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
        return <div className="detail">
            <InfoProduct
                linkTo="/checkout"
                isServer={isServer}
                activeModal={activeModal}
                closeModal={closeModal}
            />
        </div>
    }
}

Detail.propTypes = {
    closeModal: PropTypes.func,
    activeModal: PropTypes.bool,
    isServer: PropTypes.bool
};

export default connect(state => {
    return state
})(Detail)
