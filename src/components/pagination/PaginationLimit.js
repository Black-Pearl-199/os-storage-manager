import React from 'react';
import * as PropTypes from 'prop-types';
import {translate} from 'react-admin';
import {compose, pure} from "recompose";

const PaginationLimit = ({translate, labelLimit}) => (
    <div>
        <p>
            {translate(labelLimit)}
        </p>
    </div>
);

PaginationLimit.propTypes = {
    translate: PropTypes.func.isRequired,
    labelLimit: PropTypes.string
};

PaginationLimit.defaultProps = {
    labelLimit: 'ra.navigation.no_results'
};

const enhance = compose(
    pure,
    translate
);

export default enhance(PaginationLimit);
