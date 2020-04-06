import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {createStyles, withStyles} from '@material-ui/core';
// import ChevronLeft from '@material-ui/icons/ChevronLeft';
// import ChevronRight from '@material-ui/icons/ChevronRight';
import {translate} from 'ra-core';
import {compose, pure} from "recompose";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

const styles = theme => createStyles({
    actions: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: 20,
    },
    hellip: {padding: '1.2em'},
});

export class PaginationActions extends Component {
    /**
     * Warning: material-ui's page is 0-based
     */
    range() {
        const {page, rowsPerPage, count} = this.props;
        const nbPages = Math.ceil(count / rowsPerPage) || 1;
        if (isNaN(page) || nbPages === 1) {
            return [];
        }
        const input = [];
        // display page links around the current page
        if (page > 1) {
            input.push(1);
        }
        if (page === 3) {
            input.push(2);
        }
        if (page > 3) {
            input.push('.');
        }
        if (page > 0) {
            input.push(page);
        }
        input.push(page + 1);
        if (page < nbPages - 1) {
            input.push(page + 2);
        }
        if (page === nbPages - 4) {
            input.push(nbPages - 1);
        }
        if (page < nbPages - 4) {
            input.push('.');
        }
        if (page < nbPages - 2) {
            input.push(nbPages);
        }

        return input;
    }

    getNbPages = () =>
        Math.ceil(this.props.count / this.props.rowsPerPage) || 1;

    prevPage = event => {
        if (this.props.page === 0) {
            throw new Error(
                this.props.translate('ra.navigation.page_out_from_begin')
            );
        }
        this.props.onChangePage(event, this.props.page - 1);
    };

    nextPage = event => {
        if (this.props.page > this.getNbPages() - 1) {
            throw new Error(
                this.props.translate('ra.navigation.page_out_from_end')
            );
        }
        this.props.onChangePage(event, this.props.page + 1);
    };

    gotoPage = event => {
        const page = parseInt(event.currentTarget.dataset.page, 10);
        if (page < 0 || page > this.getNbPages() - 1) {
            throw new Error(
                this.props.translate('ra.navigation.page_out_of_boundaries', {
                    page: page + 1,
                })
            );
        }
        this.props.onChangePage(event, page);
    };

    renderPageNums() {
        const {classes = {}} = this.props;

        return this.range().map((pageNum, index) =>
            pageNum === '.' ? (
                <span key={`hyphen_${index}`} className={classes.hellip}>
                    &hellip;
                </span>
            ) : (
                <li
                    className={`page-number page-item ${pageNum === this.props.page + 1 ? 'active' : ''}`}
                    key={pageNum}
                    data-page={pageNum - 1}
                    onClick={this.gotoPage}
                >
                    <div className="page-link">
                        {pageNum}
                    </div>
                </li>
            )
        );
    }

    render() {
        const {classes = {}, page} = this.props;

        const nbPages = this.getNbPages();
        if (nbPages === 1) return <div className={classes.actions}/>;
        return (
            <ul className='ml-3 my-0 pagination pagination-itech'>
                {page > 0 && (
                    <li
                        // color="primary"
                        key="prev"
                        onClick={this.prevPage}
                        className="previous-page page-item"
                    >
                        <div className="page-link">
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </div>
                        {/*{translate('ra.navigation.prev')}*/}
                    </li>
                )}
                {this.renderPageNums()}
                {page !== nbPages - 1 && (
                    <li
                        // color="primary"
                        key="next"
                        onClick={this.nextPage}
                        className="next-page page-item"
                    >
                        {/*{translate('ra.navigation.next')}*/}
                        <div className="page-link">
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </div>
                    </li>
                )}
            </ul>
        );
    }
}

PaginationActions.propTypes = {
    backIconButtonProps: PropTypes.object,
    count: PropTypes.number.isRequired,
    nextIconButtonProps: PropTypes.object,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const enhance = compose(
    pure,
    translate,
    withStyles(styles)
);

export default enhance(PaginationActions);
