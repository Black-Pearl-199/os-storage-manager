import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { searchInDataTable } from '../../utils';
import { MyExportButton } from '../button';
import { tableStyles } from '../MyCustomStyles';
import MyDatagrid from './MyDatagrid';

class CustomDataGrid extends Component {
    static propTypes = {
        data: PropTypes.object,
        ids: PropTypes.array,
        searchEnable: PropTypes.bool,
        classes: PropTypes.object,
        exportable: PropTypes.bool,
        exporter: PropTypes.func,
        customAction: PropTypes.any,
        translate: PropTypes.func,
        currentSort: PropTypes.object,
        filterValues: PropTypes.object,
        total: PropTypes.number,
        resource: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = { textSearch: '' };
    }

    onSearch = (e) => {
        this.setState({ textSearch: e.currentTarget.value });
    };

    render() {
        const { textSearch } = this.state;
        const {
            data, ids, searchEnable, classes, exportable, exporter, customAction, ...rest
        } = this.props;
        const { translate } = this.props;
        const {
            currentSort, filterValues, total, resource
        } = this.props;
        let newData = data;
        let newIds = ids;
        if (textSearch.trim().length > 0) {
            newData = searchInDataTable(data, textSearch);
            newIds = Object.keys(newData);
            // console.log('new data after filter', newData, newIds);
        }

        return (
            <>
                {/* <div className='container-fluid my-2'> */}
                <div className="d-flex flex-row-reverse">
                    {customAction}
                    {exportable && (
                        <div className="ml-4">
                            <MyExportButton
                                exporter={exporter}
                                filter={filterValues}
                                sort={currentSort}
                                total={total}
                                resource={resource}
                            />
                        </div>
                    )}
                    {searchEnable
                        ? (
                            <div className="input-group input-group-sm input-group-itech-search mb-1">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputSearchAddon">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={translate('button.search')}
                                    value={textSearch}
                                    aria-label="Search study"
                                    aria-describedby="inputSearchAddon"
                                    onChange={this.onSearch}
                                />
                            </div>
                        )
                        : ''}
                </div>
                <div className="table-responsive">
                    <MyDatagrid
                        {...rest}
                        data={newData}
                        ids={newIds}
                        classes={classes}
                        className={classNames('mb-0', 'table-striped', 'table-bordered', 'table', 'table-sm')}
                    />
                </div>
                {/* </div> */}
            </>
        );
    }
}

export const MySearchableDataGrid = withStyles(tableStyles)(CustomDataGrid);
MySearchableDataGrid.propTypes = {
    searchEnable: PropTypes.bool,
    exportable: PropTypes.bool,
    exporter: PropTypes.func,
    customAction: PropTypes.any
};

MySearchableDataGrid.defaultProps = {
    searchEnable: true,
    exportable: false
};
