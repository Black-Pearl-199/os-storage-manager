import React, {Children, Fragment} from "react";
import * as PropTypes from "prop-types";
import {FormInput} from "react-admin";
import classNames from 'classnames';

export const MyGroupingInput = (props) => {
    let {basePath, record, resource, children, heading, groupClasses, innerClasses, border} = props;
    // console.log('grouping input record', JSON.parse(JSON.stringify(record)));

    const inner = React.createElement(Fragment, {}, Children.map(children, function (input) {
        return (React.createElement(FormInput, {
            basePath: basePath,
            input: input,
            record: record,
            resource: resource
        }));
    }));

    return (
        <Fragment>
            {border ?
                <div className={groupClasses}>
                    {heading ?
                        <label className='info-title-label mb-0'>{heading}</label> : null}
                    <div className="card panel-itech">
                        <div className={classNames("card-body", innerClasses)}>
                            {inner}
                        </div>
                    </div>
                </div>
                :
                <div className={groupClasses}>
                    {heading ? <label className='info-title-label mb-0'>{heading}</label> : null}
                    <div className={innerClasses}>
                        {inner}
                    </div>
                </div>
            }
        </Fragment>
    );
};

MyGroupingInput.propTypes = {
    groupClasses: PropTypes.string,
    innerClasses: PropTypes.string,
    basePath: PropTypes.string,
    children: PropTypes.node,
    record: PropTypes.object,
    resource: PropTypes.string,
    border: PropTypes.bool,
    heading: PropTypes.string
};
MyGroupingInput.defaultProps = {
    border: true
};
