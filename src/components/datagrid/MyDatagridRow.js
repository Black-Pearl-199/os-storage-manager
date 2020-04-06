import React, {Component, Fragment, isValidElement} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import {linkToRecord} from 'ra-core';

import {DatagridCell} from 'react-admin';
import ExpandRowButton from "./ExpandRowButton";

export const ROW_CLICK = {
    SELECT_ONE: 'selectOne',
    UN_SELECT_ONE: 'unSelectOne',
    EDIT: 'edit',
    SHOW: 'show',
    EXPAND: 'expand',
    TOGGLE: 'toggle'
};

const sanitizeRestProps = ({
                               basePath,
                               children,
                               classes,
                               className,
                               rowClick,
                               id,
                               isLoading,
                               onToggleItem,
                               push,
                               record,
                               resource,
                               selected,
                               style,
                               styles,
                               ...rest
                           }) => rest;

class MyDatagridRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            colSpan: this.computeColSpan(props),
        };
    }

    componentDidUpdate = (prevProps, prevState) => {
        const colSpan = this.computeColSpan(this.props);
        if (colSpan !== prevState.colSpan) {
            this.setState({colSpan});
        }
    };

    handleToggleExpanded = event => {
        this.setState(state => ({expanded: !state.expanded}));
        event.stopPropagation();
    };

    handleToggle = event => {
        this.props.onToggleItem(this.props.id);
        if (event) event.stopPropagation();
    };

    handleClick = async event => {
        const {basePath, rowClick, id, record} = this.props;

        if (!rowClick) return;

        if (typeof rowClick === 'function') {
            const path = await rowClick(id, basePath, record);
            this.handleRedirection(path, event);
            return;
        }

        this.handleRedirection(rowClick, event);
    };

    handleRedirection = (path, event) => {
        const {basePath, id, push} = this.props;

        if (path === ROW_CLICK.EDIT) {
            push(linkToRecord(basePath, id));
            return;
        }
        if (path === ROW_CLICK.SHOW) {
            push(linkToRecord(basePath, id, 'show'));
            return;
        }
        if (path === ROW_CLICK.EXPAND) {
            this.handleToggleExpanded(event);
            return;
        }
        if (path === ROW_CLICK.SELECT_ONE) {
            this.props.onSelect([this.props.id]);
            return;
        }
        if (path === ROW_CLICK.UN_SELECT_ONE) {
            this.props.onSelect([]);
            return;
        }
        if (path === ROW_CLICK.TOGGLE) {
            this.handleToggle();
            return;
        }
        if (!path) return;

        push(path);
    };

    computeColSpan = props => {
        const {children, hasBulkActions} = props;
        return (
            1 + // show expand button
            (hasBulkActions ? 1 : 0) + // checkbox column
            React.Children.toArray(children).filter(child => !!child).length // non-null children
        );
    };

    render() {
        const {
            basePath,
            children,
            classes,
            className,
            expand,
            hasBulkActions,
            hover,
            id,
            record,
            resource,
            selected,
            style,
            styles,
            ...rest
        } = this.props;
        const {expanded, colSpan} = this.state;
        return (
            <Fragment>
                <TableRow
                    className={classNames(className, selected ? 'active' : '')}
                    key={id}
                    style={style}
                    hover={hover}
                    onClick={this.handleClick}
                    {...sanitizeRestProps(rest)}
                >
                    {expand && (
                        <TableCell
                            padding="none"
                            className={classes.expandIconCell}
                        >
                            <ExpandRowButton
                                classes={classes}
                                expanded={expanded}
                                expandContentId={`${id}-expand`}
                                onClick={this.handleToggleExpanded}
                            />
                        </TableCell>
                    )}
                    {hasBulkActions && (
                        <TableCell padding="none">
                            <Checkbox
                                color="primary"
                                className={`select-item ${classes.checkbox}`}
                                checked={selected}
                                onClick={this.handleToggle}
                            />
                        </TableCell>
                    )}
                    {React.Children.map(children, (field, index) =>
                        isValidElement(field) ? (
                            <DatagridCell
                                key={`${id}-${field.props.source || index}`}
                                className={classNames(
                                    `column-${field.props.source}`,
                                    classes.rowCell
                                )}
                                record={record}
                                {...{field, basePath, resource}}
                            />
                        ) : null
                    )}
                </TableRow>
                {expand && expanded && (
                    <TableRow key={`${id}-expand`} id={`${id}-expand`}>
                        <TableCell colSpan={colSpan}>
                            {React.cloneElement(expand, {
                                record,
                                basePath,
                                resource,
                                id: String(id),
                            })}
                        </TableCell>
                    </TableRow>
                )}
            </Fragment>
        );
    }
}

MyDatagridRow.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    expand: PropTypes.node,
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    id: PropTypes.any,
    onToggleItem: PropTypes.func,
    onSelect: PropTypes.func,
    push: PropTypes.func,
    record: PropTypes.object.isRequired,
    resource: PropTypes.string,
    rowClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    selected: PropTypes.bool,
    style: PropTypes.object,
    styles: PropTypes.object,
};

MyDatagridRow.defaultProps = {
    hasBulkActions: false,
    hover: true,
    record: {},
    selected: false,
};

// wat? TypeScript looses the displayName if we don't set it explicitly
MyDatagridRow.displayName = 'DatagridRow';

export default connect(
    null,
    {push}
)(MyDatagridRow);
