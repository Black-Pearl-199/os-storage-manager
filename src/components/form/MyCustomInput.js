import React, {Fragment} from "react";
import classNames from 'classnames';
import {Field, FieldArray} from "redux-form";
import * as PropTypes from "prop-types";
import {BooleanInput, REDUX_FORM_NAME, translate} from 'react-admin';
import {inputStyles} from "../MyCustomStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import {compose} from "recompose";
import isReact from 'is-react';
import DatePicker from "react-datepicker";
import moment from "moment";
import {dateShowFormat, dateStoreFormat} from "../../utils";
import MaskedInput from "react-maskedinput";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        loading: state.admin.loading > 0,
        recordForm: state.form[REDUX_FORM_NAME] ? state.form[REDUX_FORM_NAME] : {}
    }
};
const enhance = compose(connect(mapStateToProps, {}), translate);

export const MyTextInput = (props) => {
    return <MyCustomInput {...props} component={'input'}/>
};

//TODO pagination
export const MySelectInput = translate((props) => {
    const {isRequired, pagination, setPagination, setSort, translateChoice, setFilter, ...rest} = props;
    return <MyCustomInput disabled={props['readOnly']} {...rest} component={'select'}/>
});
MySelectInput.propTypes = {
    choices: PropTypes.array
};

const RadioGroup = (props) => {
    // console.log('radio group props', props);
    const {choices, source, loading, translate, input: {value, onChange}, disabled} = props;

    return (
        <Fragment>
            {choices.map(choice =>
                <div className='form-check form-check-inline' key={choice.id}>
                    <input name={source} type="radio" disabled={loading || disabled}
                           className='form-check-input' value={choice.id} onChange={onChange}
                           checked={choice.id === parseInt(value)}/>
                    <label className='form-check-label'>
                        {translate(choice.name)}
                    </label>
                </div>)}
        </Fragment>
    )
};
export const MyRadioInput = enhance((props) => {
    const {translate, recordForm, loading, label, source, labelClasses, inputClasses, groupClasses, choices, required, disabled, ...rest} = props;
    const {resource} = rest;
    const translatedLabel = label ? translate(label) : translate(`resources.${resource}.fields.${source}`);
    // console.log(props);
    return (
        <div className={classNames("form-group", groupClasses)}>
            <label
                className={classNames('col-form-label', labelClasses, required ? 'label-required' : null)}>{translatedLabel}</label>
            <div className={classNames('d-flex', inputClasses)}>
                <Field name={source} source={source} choices={choices} translate={translate}
                       component={RadioGroup}
                       disabled={loading || disabled}/>
            </div>
        </div>
    )
});
MyRadioInput.propTypes = {
    disabled: PropTypes.bool
};

// TODO ; need implement
const Checkbox = (props) => {
    console.log(props);
    const {choice, source, loading, label, resource, translate, labelClasses, inputClasses, optionValue, optionText, skipFormat, input: {value, onChange}} = props;
    const translatedLabel = label ? translate(label) : translate(`resources.${resource}.fields.${source}`);
    return (<div className="form-check mx-2" key={choice[optionValue]}>
        <input name={source} type="checkbox" disabled={loading} onChange={onChange}
               className={classNames('form-check-input', inputClasses)}
               value={choice} checked={value[optionValue] === choice[optionValue]}/>
        <label
            className={classNames('form-check-label', labelClasses)}>{choice ? (skipFormat ? choice[optionText] : translate(choice[optionText])) : translatedLabel}</label>
    </div>)
};
const CheckboxGroup = (props) => {
    console.log('checkbox group', props);
    const {fields, choices, source} = props;
    return (<Fragment>
        {fields.map((field, index) => {
            console.log(field, index, choices[index]);
            return (<Field name={source} key={field} component={Checkbox} {...props} choice={choices[index]}/>)
        })}
    </Fragment>)
};
export const MyCheckInput = enhance((props) => {
    const {source, groupClasses, choices} = props;
    return (
        <div className={groupClasses}>
            {choices ?
                <FieldArray name={source} component={CheckboxGroup} choices={choices} {...props} fields={choices}/> :
                <Field name={source} source={source} component={Checkbox} {...props}/>
            }
        </div>
    )
});
MyCheckInput.propTypes = {
    optionValue: PropTypes.string,
    optionText: PropTypes.string,
};
MyCheckInput.defaultProps = {
    optionValue: 'id',
    optionText: 'name'
};

function onChangeRaw(e) {
    // console.log(this);
    const rawVal = e.target.value;
    // console.log('new raw', rawVal);
    try {
        let date = moment(rawVal, 'DD-MM-YYYY', true);
        if (date.isValid()) {
            // console.log('user input date', date.toDate());
            this.setSelected(date.toDate(), e, true);
        } else {
            this.setSelected(null, e, true);
        }
    } catch (e) {
        console.error(e);
    }
}

const renderDatePicker = (props) => {
    // console.log(props);
    const {className, input: {value, onChange}, placeholder, defaultValue = null, meta: {touched, error}, ...rest} = props;

    const onChangeDate = dateString => {
        // console.log('change date', dateString);
        const date = moment(dateString);
        if (date.isValid()) onChange(date.format(dateStoreFormat));
        else onChange(null);
    };
    // console.log(value);
    const inputValue = (typeof value === 'string' && (value.toLowerCase() === 'invalid date' || value === '')) ? defaultValue : value;
    // console.log(rest);
    return (
        <Fragment>
            <DatePicker locale='vi' dateFormat={dateShowFormat} showYearDropdown={true} strictParsing={true}
                        selected={inputValue ? moment(inputValue, dateStoreFormat).toDate() : defaultValue}
                        onChange={onChangeDate} className={className} placeholderText={placeholder} {...rest}
                        onChangeRaw={onChangeRaw}
                        autoComplete={'off'}
                        customInput={<MaskedInput mask={'11-11-1111'}/>}
            />
            {touched && error && <span>{error}</span>}
        </Fragment>
    )
};

export const MyDateInput = enhance(({translate, recordForm, loading, disabled, required, label, source, labelClasses, inputClasses, groupClasses, className, ...rest}) => {
    const {resource} = rest;
    return (
        <div className={classNames("form-group", groupClasses)}>
            <label className={classNames("col-form-label", labelClasses, required ? 'label-required' : null)}>
                {label ? translate(label) : translate(`resources.${resource}.fields.${source}`)}
            </label>
            <div className={inputClasses}>
                <Field name={source} source={source} component={renderDatePicker} disabled={loading || disabled}
                       className={classNames("form-control", "form-control-sm", "w-100", className)} {...rest}/>
            </div>
        </div>
    )
});

// tạm thời bỏ style={{padding: "0.375rem 0"}} của boolean input
export const MyBooleanInput = compose(withStyles(inputStyles), translate)(({translate, disabled, required, label, source, labelClasses, inputClasses, groupClasses, className, classes, hideLabel = false, ...rest}) => {
    const { resource } = rest;
    return (
        <div className={classNames("form-group", groupClasses)}>
            {!hideLabel ? <label className={classNames("col-form-label", labelClasses, required ? 'label-required' : null)}>
                {label ? translate(label) : translate(`resources.${resource}.fields.${source}`)}
            </label> : ''}
            <div className={inputClasses}>
                <BooleanInput source={source}
                              className={classNames("w-100", className, classes.boolean)} {...rest}/>
            </div>
        </div>
    )
});

//formClassName ->> class name for wrapper of this input, default by react-admin -> remove it to not attach on children

export const MyCustomInput = enhance((props) => {
    let {optionText = 'name', optionValue = 'id', hidden, translate, recordForm, loading, disabled, required, skipFormat, label, placeholder, source, labelClasses, inputClasses, groupClasses, className, basePath, hideLabel, component, choices, type, allowEmpty, original, formClassName, small, ...rest} = props;
    const {resource} = rest;
    const translatedLabel = label ? translate(label) : translate(`resources.${resource}.fields.${source}`);
    return (
        <div className={classNames("form-group", groupClasses, hidden ? 'd-none' : null)}>
            {!hideLabel ?
                <label className={classNames("col-form-label", labelClasses, required ? 'label-required' : null)}>
                    {translatedLabel}
                </label> : null}
            <div className={inputClasses}>
                {
                    (isReact.component(component) || isReact.element(component)) ? (React.cloneElement(component, {resource}))
                        :
                        <Field name={source} source={source} component={component} type={type}
                               disabled={loading || disabled}
                               required={required}
                               className={classNames(type !== 'checkbox' ? ["form-control", small ? "form-control-sm" : '', "w-100"] : '', className)}
                               title={translatedLabel}
                               placeholder={!!hideLabel ? translatedLabel : null} {...rest}>
                            {component === 'select' ?
                                <Fragment>
                                    {!required && <option value="">{hideLabel ? translatedLabel : null}</option>}
                                    {choices.map((choice, index) => (<option value={choice[optionValue]}
                                                                             key={index}>{translate && !skipFormat ? translate(choice[optionText]) : choice[optionText]}</option>))}
                                </Fragment> : null}
                        </Field>
                }
            </div>
        </div>
    )
});
MyCustomInput.propTypes = {
    allowEmpty: PropTypes.any,
    alwaysOn: PropTypes.any,
    component: PropTypes.any,
    type: PropTypes.string,
    hideLabel: PropTypes.bool,
    skipFormat: PropTypes.bool,
    choices: PropTypes.arrayOf(PropTypes.object),
    original: PropTypes.bool,
    formClassName: PropTypes.string,
    small: PropTypes.bool
};
MyCustomInput.defaultProps = {
    skipFormat: true,
    hideLabel: false,
    original: false,
    small: true
};

// div tag alternator
export const InputWrapper = ({children, basePath, className, style, allowEmpty, alwaysOn, formClassName, ...props}) => {
    // console.log('input wrapper props', props.record);
    return (
        <div className={className} style={style}>
            {React.Children.map(children, child =>
                React.cloneElement(child, {...props})
            )}
        </div>
    )
};

InputWrapper.propTypes = {
    allowEmpty: PropTypes.any,
    alwaysOn: PropTypes.any,
    onInputChange: PropTypes.any,
    inputValue: PropTypes.any,
    formClassName: PropTypes.any
};

export const MyDisabledInput = (props) => {
    let newProps = Object.assign({}, props, {disabled: true});
    return <MyTextInput {...newProps}/>
};

export const MyCustomInputGroup = translate(
    ({translate, skipFormat, label, placeholder, source, labelClasses, inputClasses, groupClasses, className, basePath, component, choices, allowEmpty, ...rest}) => {
        const {resource} = rest;
        // console.log(resource, label);
        return (
            <div className={classNames("input-group", "input-group-sm", groupClasses)}>
                <div className="input-group-prepend">
                <span className="input-group-text"
                      id={`addon-${source}`}>{label !== undefined ? translate(label) : translate(`resources.${resource}.fields.${source}`)}
                </span>
                </div>
                <Field name={source} source={source} component={component} aria-describedby={`addon-${source}`}
                       className={classNames("form-control", "form-control-sm", className)}
                       {...rest}>
                    {component === 'select' ?
                        <Fragment>
                            {allowEmpty ? <option/> : ''}
                            {choices.map(choice => (<option value={choice.id}
                                                            key={choice.id}>{translate && skipFormat === false ? translate(choice.name) : choice.name}</option>))}
                        </Fragment> : null}
                </Field>
            </div>
        )
    }
);

MyCustomInputGroup.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.node]).isRequired,
    choices: PropTypes.array,
    allowEmpty: PropTypes.bool,
    labelClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    inputClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    groupClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    skipFormat: PropTypes.bool
};
MyCustomInputGroup.defaultProps = {
    component: 'input',
    allowEmpty: true,
    skipFormat: true
};
