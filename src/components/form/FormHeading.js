import {translate} from "ra-core";
import React, {Fragment} from "react";
import {MyBackButton} from "../button";

export const FormHeading = translate((props) => {
    const {title, hasBack, history, basePath, children, ...rest} = props;
    const {translate} = rest;
    // console.log('form heading props', props);
    return (
        <div className="d-flex flex-row flex-nowrap">
            <div className='d-flex flex-row'>
                {hasBack === false ? '' :
                    <Fragment>
                        <div><MyBackButton history={history} basePath={basePath}/></div>
                        &nbsp;&nbsp;
                    </Fragment>
                }
                <h3>{translate(title)}</h3>
            </div>
            <div className='d-flex flex-row-reverse ml-auto'>
                {children}
            </div>
        </div>
    )
});