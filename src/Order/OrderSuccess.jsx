import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

OrderSuccess.propTypes = {
    
};

function OrderSuccess(props) {

    useEffect(() => {

        setTimeout(() => {
            window.location.href = '/history'
        }, 2500)

    }, [])

    return (
        <div className="container fix_order">
            <h1>You Have Ordered Successfully</h1>
            <span style={{ fontSize: '1.2rem' }}>Please Wait A Few Seconds!</span>
        </div>
    );
}

export default OrderSuccess;