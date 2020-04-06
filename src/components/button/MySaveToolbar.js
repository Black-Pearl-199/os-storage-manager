import React from "react";
import {Toolbar} from "react-admin";
import classNames from "classnames";
import {MySaveButton} from "./MySaveButton";
import * as PropTypes from "prop-types";

export const MySaveToolbar = props => {
    let {children, callback, className, beforeSubmit, convertValue, customAction, hideNotification, customNotification, form, ...rest} = props;
    let {invalid, redirect} = rest;
    // console.log(props);
    const childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child, {invalid, ...rest})
    );

    return (
        <Toolbar {...rest} className={classNames("px-3 py-1 d-flex flex-row-reverse mt-0", className)}>
            <MySaveButton redirect={redirect} {...rest} callback={callback} beforeSubmit={beforeSubmit}
                          convertValue={convertValue} action={customAction} hideNotification={hideNotification}
                          customNotification={customNotification} form={form}/>
            {childrenWithProps}
        </Toolbar>
    )
};
MySaveToolbar.propTypes = {
    callback: PropTypes.func,
    convertValue: PropTypes.func,
    customAction: PropTypes.func,
    beforeSubmit: PropTypes.func,
    hideNotification: PropTypes.bool,
    customNotification: PropTypes.object,
    form: PropTypes.string
};
