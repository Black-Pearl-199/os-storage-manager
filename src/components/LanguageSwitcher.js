import React, {Component} from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";
import {LOCALE_EN, LOCALE_VI} from "../configurations/messages";
import {changeLocale, translate} from 'react-admin';
import {connect} from "react-redux";
import {compose} from "recompose";

class LanguageSwitcher extends Component {
    onSelectLanguage = (languageKey, event) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.changeLocale(languageKey);
        localStorage.setItem('saveLocale', languageKey);
    };

    fixPropagationEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    render() {
        const {translate, locale, changeLocale, id, variant, size, ...rest} = this.props;
        return (
            <div onClick={this.fixPropagationEvent}>
                <DropdownButton alignRight title={translate('language.name')} id={id} variant={variant} size={size}
                                onSelect={this.onSelectLanguage} {...rest}>
                    <Dropdown.Item as={'button'} eventKey={LOCALE_EN}>English</Dropdown.Item>
                    <Dropdown.Item as={'button'} eventKey={LOCALE_VI}>Tiếng Việt</Dropdown.Item>
                </DropdownButton>
            </div>
        )
    }
}

const enhance = compose(connect(undefined, {changeLocale}), translate);

export default enhance(LanguageSwitcher);