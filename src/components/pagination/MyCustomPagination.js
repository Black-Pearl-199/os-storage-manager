import { withStyles } from '@material-ui/core';
import React from 'react';
import { paginationStyles } from '../MyCustomStyles';
import { Pagination } from './Pagination';
import { RedirectCreateButton } from '../button';

const sanitizeProps = ({
    setPage, setPerPage, perPage, page, total, ...rest
}) => rest;

export const MyCustomPagination = withStyles(paginationStyles)((props) => {
    // console.log('custom pagination', props)
    const {
        children, basePath, createBtn, classes, ...rest
    } = props;

    const childrenWithProps = React.Children.map(children, (child) => React.cloneElement(child, { ...sanitizeProps(rest) }));

    return (
        <div
            className="d-flex flex-row-reverse flex-nowrap flex-grow-1 flex-shrink-1 justify-content-between px-0 py-1"
        >
            <Pagination {...rest} className={classes.pagination} />
            <div className="d-flex flex-column justify-content-around my-auto">
                {childrenWithProps}
                {createBtn ? <RedirectCreateButton basePath={basePath} /> : null}
            </div>
        </div>
    );
});
