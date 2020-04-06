import TablePagination from '@material-ui/core/TablePagination';
import * as PropTypes from 'prop-types';
import { sanitizeListRestProps, translate } from 'ra-core';
import React, { Component } from 'react';
import { Responsive } from 'react-admin';
import { compose, pure } from 'recompose';
import PaginationActions from './PaginationActions';
import PaginationLimit from './PaginationLimit';

const emptyArray = [];

export class Pagination extends Component {
    static propTypes = {
        classes: PropTypes.object,
        className: PropTypes.string,
        ids: PropTypes.array,
        isLoading: PropTypes.bool,
        page: PropTypes.number,
        perPage: PropTypes.number,
        rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
        setPage: PropTypes.func,
        setPerPage: PropTypes.func,
        translate: PropTypes.func.isRequired,
        total: PropTypes.number,
        labelPerPage: PropTypes.string,
        labelLimit: PropTypes.string,
        handlePageChangeCustom: PropTypes.func,
        handlePerPageChangeCustom: PropTypes.func
    };

    static defaultProps = {
        rowsPerPageOptions: [10, 25, 50],
        labelPerPage: 'ra.navigation.page_rows_per_page'
    };

    getNbPages = () => Math.ceil(this.props.total / this.props.perPage) || 1;

    componentDidUpdate() {
        if (this.props.page < 1 || isNaN(this.props.page)) {
            this.props.setPage(1);
        }
    }

    /**
     * Warning: material-ui's page is 0-based
     */
    handlePageChange = (event, page) => {
        if (event) event.stopPropagation();
        if (page < 0 || page > this.getNbPages() - 1) {
            throw new Error(
                this.props.translate('ra.navigation.page_out_of_boundaries', { page: page + 1 })
            );
        }
        this.props.setPage(page + 1);
    };

    handlePerPageChange = (event) => {
        this.props.setPerPage(event.target.value);
    };

    labelDisplayedRows = ({ from, to, count }) => {
        const { translate } = this.props;
        return translate('ra.navigation.page_range_info', {
            offsetBegin: from,
            offsetEnd: to,
            total: count
        });
    };

    render() {
        const {
            isLoading,
            page,
            perPage,
            rowsPerPageOptions,
            total,
            translate,
            labelPerPage,
            labelLimit,
            handlePageChangeCustom,
            handlePerPageChangeCustom,
            ...rest
        } = this.props;

        if (!isLoading && total === 0) {
            return <PaginationLimit labelLimit={labelLimit} />;
        }

        return (
            <Responsive
                small={(
                    <TablePagination
                        count={total}
                        rowsPerPage={perPage}
                        page={page - 1}
                        onChangePage={handlePageChangeCustom || this.handlePageChange}
                        rowsPerPageOptions={emptyArray}
                        component="span"
                        labelDisplayedRows={this.labelDisplayedRows}
                        {...sanitizeListRestProps(rest)}
                    />
                )}
                medium={(
                    <TablePagination
                        count={total}
                        rowsPerPage={perPage}
                        page={page - 1}
                        onChangeRowsPerPage={handlePerPageChangeCustom || this.handlePerPageChange}
                        onChangePage={handlePageChangeCustom || this.handlePageChange}
                        ActionsComponent={PaginationActions}
                        component="div"
                        labelRowsPerPage={translate(labelPerPage)}
                        labelDisplayedRows={this.labelDisplayedRows}
                        rowsPerPageOptions={rowsPerPageOptions}
                        {...sanitizeListRestProps(rest)}
                    />
                )}
            />
        );
    }
}

const enhance = compose(
    pure,
    translate
);

export default enhance(Pagination);
