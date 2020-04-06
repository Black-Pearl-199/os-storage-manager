import React, {Fragment} from "react";
import {CardActions, REDUX_FORM_NAME, translate, withTranslate} from 'react-admin';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import MyBulkDeleteButton from "./MyBulkDeleteButton";
import {Link} from "react-router-dom";
import TabsManager, {TAB_CONTEXT_MAIN} from "../layouts/TabsManager";
import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import {reset} from 'redux-form';
import {compose} from "recompose";

export const RedirectCreateButton = translate((props) => {
    const {basePath, resource, translate, path = 'create', label} = props;
    return (
        <div className={'my-auto'}>
            <Link to={`${basePath}/${path}`}
                  className='btn btn-sm btn-shadow btn-itech-dark btn-itech-sm text-decoration-none d-block'>
                <FontAwesomeIcon icon={faPlusCircle}/>
                &nbsp;{label ? translate(label) : (`${translate('ra.action.add')} ${translate(`resources.${resource}.name`)}`)}
            </Link>
        </div>)
});

export const BackMainButton = translate((props) => {
    const {translate} = props;
    const redirectToMain = (e) => {
        e.preventDefault();
        TabsManager.tabClick(TAB_CONTEXT_MAIN, 'home');
    };
    return (
        <Button variant={'itech'} className='btn-itech-fixed btn-itech-secondary mr-3'
                onClick={redirectToMain}>{translate('button.back')}</Button>)
});

export const MyBackButton = ({history, basePath}) => {
    const goBack = () => {
        if (history) {
            history.replace(basePath);
        }
    };
    return (
        <button className="btn btn-sm btn-secondary" onClick={goBack}>
            <FontAwesomeIcon icon={faChevronLeft}/>
        </button>
    )
};

const enhanceCancelEditButton = compose(withTranslate, connect(undefined, {reset}));
export const MyBackEditButton = enhanceCancelEditButton((props) => {
    const {translate, reset, changeEditState} = props;
    const goBack = () => {
        // e.preventDefault();
        // if (history) {
        //     history.replace(basePath);
        // }
        changeEditState(false);
        reset(REDUX_FORM_NAME);
    };
    return (
        <Button variant={'itech'} className="btn btn-itech-secondary btn-itech-fixed mr-3"
                onClick={goBack}>{translate('button.back')}
        </Button>
    )
});

export const BulkActionButtons = props => {
    console.log(props);
    return (
        <Fragment>
            {/* Add the default bulk delete action */}
            <MyBulkDeleteButton {...props} undoable={false}/>
        </Fragment>
    )
};

export const ListActionButtons = (props) => {
    const {bulkActions, basePath, displayedFilters, filters, filterValues, onUnselectItems, resource, selectedIds, showFilter} = props;
    // currentSort, exporter, total
    return (
        <CardActions>
            {bulkActions && React.cloneElement(bulkActions, {
                basePath,
                filterValues,
                resource,
                selectedIds,
                onUnselectItems,
                test: '1'
            })}
            {filters && React.cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button',
            })}
            {/*<MyCreateButton basePath={basePath}/>*/}
        </CardActions>
    )
};
