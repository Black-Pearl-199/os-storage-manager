import classNames from "classnames";
import { debounce, isEmpty } from "lodash";
import * as PropTypes from "prop-types";
import { stringify } from "query-string";
import { changeListParams, showNotification, translate } from "ra-core";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "recompose";
import { ITCrudGetList } from "../../configurations/actions";
import { SORT_DESC } from "../../configurations/resources";
import { inputValidate } from "../../configurations/validation";
import { hasCustomParams, selectQuery } from "../../utils";

function mapStateToProps(state, props) {
    const resourceState = state.admin.resources[props.resource];
    // console.log(state);
    return {
        query: props.location && selectQuery(props),
        params: resourceState && resourceState.list.params,
        ids: resourceState && resourceState.list.ids,
        loadedOnce: resourceState && resourceState.list.loadedOnce,
        selectedIds: resourceState && resourceState.list.selectedIds,
        total: resourceState && resourceState.list.total,
        data: resourceState && resourceState.data,
        isLoading: state.admin.loading > 0,
        version: state.admin.ui.viewVersion,
    };
}

const enhance = compose(
    connect(mapStateToProps, {
        ITCrudGetList,
        showNotification,
        changeListParams,
    }),
    translate
);

const sanitizeRestProps = ({
    showNotification,
    initFilter,
    permissions,
    pagination,
    options,
    query,
    params,
    ids,
    data,
    total,
    version,
    location,
    history,
    match,
    basePath,
    hasList,
    hasCreate,
    hasEdit,
    hasShow,
    loadedOnce,
    selectedIds,
    isLoading,
    ITCrudGetList,
    defaultSort,
    changeListParams,
    ...rest
}) => rest;

class FilterBox extends Component {
    static propTypes = {
        history: PropTypes.object,
        location: PropTypes.object,
        query: PropTypes.object,
        params: PropTypes.object,
        initFilter: PropTypes.object,
        showNotification: PropTypes.func,
        translate: PropTypes.func,
        initData: PropTypes.bool,
        resource: PropTypes.string,
        ITCrudGetList: PropTypes.func,
        permanentFilter: PropTypes.object,
        defaultSort: PropTypes.object,
        convertValue: PropTypes.func,
        changeListParams: PropTypes.func,
        hasClear: PropTypes.bool,
        buttonClasses: PropTypes.string,
        isLoading: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        console.log("construct my filterbox", props);
        // this.setState({form: filter});
        const query =
            Object.keys(props.query).length > 0
                ? props.query
                : hasCustomParams(props.params)
                ? { ...props.params }
                : { filter: props.initFilter || {} };
        const { filter } = query;

        this.formRef = React.createRef();
        if (filter) {
            this.state = { form: filter };
        } else {
            this.state = { form: props.initFilter };
        }
    }

    onChange = (e, component, type) => {
        // console.log('my filter box update', e, component, type);
        const { form } = this.state;
        this.setState({ form: { ...form, ...e } });
        if (component !== "input" || type !== "text") this.onSubmit();
    };

    checkFormValidate = () => {
        const { showNotification, translate } = this.props;
        const { form } = this.state;
        if (!form) {
            return false;
        }

        const names = Object.keys(form);
        const invalid = {};
        try {
            for (const name of names) {
                const value = form[name];
                if (
                    value &&
                    typeof value === "string" &&
                    value.length > 0 &&
                    inputValidate[name] !== undefined &&
                    inputValidate[name].pattern
                ) {
                    const { pattern } = inputValidate[name];
                    if (value.match(pattern)) {
                        //
                    } else {
                        invalid[name] = `commons.message.invalid.${name}`;
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }

        const formValidated = isEmpty(invalid);
        if (!formValidated) {
            const message = Object.values(invalid)
                .map((msg) => translate(msg))
                .join("\n");
            showNotification("commons.message.error", "warning", {
                messageArgs: { error: message },
            });
        }
        return formValidated;
    };

    componentDidMount() {
        const { props } = this;
        const query =
            Object.keys(props.query).length > 0
                ? props.query
                : hasCustomParams(props.params)
                ? { ...props.params }
                : { filter: props.initFilter || {} };
        const { filter } = query;
        // console.log('my filter box props', filter);
        this.setState({ form: filter });
        if (this.props.initData) {
            this.onSubmit(undefined, true);
        }
    }

    onSubmit = debounce((e, firstInit) => {
        if (e) e.preventDefault();
        if (!this.checkFormValidate()) return;
        const {
            resource,
            ITCrudGetList,
            initFilter,
            permanentFilter,
            defaultSort,
            convertValue,
            changeListParams,
        } = this.props;
        let filter = {};
        let { form } = this.state;
        form = convertValue ? convertValue(form) : form;

        Object.keys(form).forEach((field) => {
            const value = form[field];
            if (value) filter[field] = value;
        });

        if (isEmpty(filter) && firstInit) filter = initFilter;
        filter = { ...filter, ...permanentFilter };
        const {
            field: defaultSortField,
            order: defaultSortOrder,
        } = defaultSort;

        const { query } = this.props;
        const {
            page = 1,
            perPage = 10,
            sort = defaultSortField,
            order = defaultSortOrder,
        } = query;
        const pagination = {
            page,
            perPage,
        };
        const sortQuery = {
            field: sort,
            order,
        };

        const newParams = {
            ...pagination,
            sort,
            order,
            filter,
        };
        const search = stringify({
            filter: JSON.stringify(filter),
            ...pagination,
            sort,
            order,
        });
        const { history, location } = this.props;
        if (history && location) {
            const currentSearchStr = JSON.parse(JSON.stringify(location))
                .search;
            const searchEqual = currentSearchStr === `?${search}`;
            const newLocation = Object.assign(location, { search });
            history.push(newLocation);
            changeListParams(resource, newParams);

            // search ko update thì là refresh page
            if (searchEqual) {
                const crudGetListParams = {
                    resource,
                    pagination,
                    sort: sortQuery,
                    filter,
                };
                ITCrudGetList(crudGetListParams);
            }
        }
    }, 500);

    formEnter = (e) => {
        e.preventDefault();
        this.onSubmit();
    };

    resetFilter = () => {
        const resetState = {};
        const { form } = this.state;
        Object.keys(form).forEach((name) => {
            resetState[name] = undefined;
        });
        this.setState({ form: { ...resetState } });
    };

    resetInput = (name, value) => {
        const { form } = this.state;
        this.setState({ form: { ...form, [name]: value } });
    };

    onKeyPressed = (e) => {
        const { charCode } = e;
        if (charCode === 13) {
            e.preventDefault();
            this.onSubmit();
        }
    };

    render = () => {
        const {
            hasClear,
            hasSearch,
            children,
            translate,
            className,
            buttonClasses,
            initData,
            defaultSort,
            permanentFilter,
            isLoading,
            ...rest
        } = this.props;
        const sanitizeProps = {
            ...sanitizeRestProps(rest),
            onInputChange: this.onChange,
        };
        // console.log('sanitizeProps', sanitizeProps);
        const { form } = this.state;
        const renderChildren = React.Children.map(children, (child) =>
            React.cloneElement(child, {
                ...sanitizeProps,
                submit: this.onSubmit,
                inputValue: form,
                onKeyPress: this.onKeyPressed,
            })
        );
        // 'card', 'panel-itech',
        return (
            <form
                onSubmit={this.formEnter}
                ref={this.formRef}
                className={classNames("row", "my-1", className)}
            >
                <div className="d-flex flex-wrap w-100">
                    {renderChildren}
                    <div
                        className={
                            buttonClasses ||
                            `col align-self-sm-center ${
                                hasClear ? "justify-content-around" : ""
                            } row`
                        }
                    >
                        {hasClear ? (
                            <div className="col-form-label mr-3">
                                <Button
                                    variant="itech"
                                    className="btn-itech-secondary btn-itech-fixed"
                                    type="reset"
                                    disabled={isLoading}
                                    size="sm"
                                    onClick={this.resetFilter}
                                >
                                    <i className="icon-clear" />
                                    {translate("button.clear")}
                                </Button>
                            </div>
                        ) : (
                            ""
                        )}
                        {hasSearch && (
                            <div className="col-form-label">
                                <Button
                                    variant="itech"
                                    disabled={isLoading}
                                    size="sm"
                                    onClick={this.formEnter}
                                    className="btn-itech-primary btn-itech-fixed float-md-right float-lg-none"
                                >
                                    <i className="icon-search" />
                                    {translate("button.search")}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        );
    };
}

export const MyFilterBox = enhance(FilterBox);

MyFilterBox.propTypes = {
    initFilter: PropTypes.object,
    permanentFilter: PropTypes.object,
    buttonClasses: PropTypes.string,
    initData: PropTypes.bool,
    defaultSort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.oneOf(["ASC", "DESC"]),
    }),
    convertValue: PropTypes.func,
    resource: PropTypes.string.isRequired,
    hasSearch: PropTypes.bool,
};

MyFilterBox.defaultProps = {
    initFilter: {},
    permanentFilter: {},
    initData: false,
    defaultSort: { field: "id", order: SORT_DESC },
    hasSearch: true,
};
