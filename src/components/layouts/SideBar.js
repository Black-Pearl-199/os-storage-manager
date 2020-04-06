import React from 'react';
import {Button, Nav} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp, faBars} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import {find} from "lodash";
import * as PropTypes from "prop-types";
import onClickOutside from "react-onclickoutside";
import classNames from 'classnames';
import {translate} from 'react-admin';
import version from "../../version";

const findInSubs = (items, eventKey) => items.filter(item => item.subs !== undefined).find(item => find(item.subs, {eventKey: eventKey}) !== undefined);
const filterInSubs = (items, eventKey) => items.filter(item => item.subs !== undefined).find(item => {
    let filteredSubs = item.subs.filter(sub => eventKey.startsWith(sub.eventKey));
    if (filteredSubs && filteredSubs.length > 0) {
        return true;
    }
    return false;
});

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        let {collapse, items} = this.props.config;
        let expandedKey = this.props.location.pathname;
        if (!find(items, {eventKey: expandedKey})) {
            const menuItem = filterInSubs(items, expandedKey);
            expandedKey = (!!menuItem && menuItem.eventKey) || expandedKey;
        }
        this.state = {collapse, items, expandedKey};
    }

    toggleCollapse = () => {
        this.setState({collapse: !this.state.collapse})
    };

    onResize = undefined;

    checkSideBarCollapse = () => {
        const {collapse} = this.state;
        const isViewer = this.props.location.pathname.startsWith('/viewer');

        if (this.onResize) clearTimeout(this.onResize);
        this.onResize = setTimeout(() => {
            if (isViewer || (!collapse && window.innerWidth <= this.props.resWidthHideSidebar)) {
                this.setState({collapse: true})
            }
            this.onResize = undefined;
        }, 200);
    };

    componentDidMount() {
        window.addEventListener('resize', this.checkSideBarCollapse);
        this.checkSideBarCollapse();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkSideBarCollapse);
    }

    handleClickOutside = this.checkSideBarCollapse;

    menuSelect = (e) => {
        // console.log(e.currentTarget.dataset['eventKey']);
        let eventKey = e.currentTarget.dataset['eventKey'];
        let {items, expandedKey} = this.state;
        let menuItem = find(items, {eventKey: eventKey});
        // console.log('menu select', menuItem);
        if (menuItem) {
            // select primary menu item and it has a subs -> expand sub
            if (menuItem.subs) {
                e.stopPropagation();
                e.preventDefault();
            }
            if (expandedKey === eventKey) {
                this.setState({expandedKey: undefined})
            } else
                this.setState({expandedKey: eventKey})
        } else {
            // find parent of sub -> remove collapse and expand these parent
            let menuItem = findInSubs(items, eventKey);
            this.setState({collapse: false, expandedKey: menuItem ? menuItem.eventKey : undefined});
        }
    };

    toggleExpand = (e) => {
        let eventKey = e.currentTarget.dataset['eventKey'];
        let {expandedKey} = this.state;
        if (expandedKey && expandedKey === eventKey) {
            e.stopPropagation();
            e.preventDefault();
            this.setState({expandedKey: undefined})
        }
    };

    render() {
        let {collapse, items, expandedKey} = this.state;
        let {translate} = this.props;
        let menus = (
            <ul className="sidebar-list">
                {items.map((item, index) => (
                    <li key={`menu-${index}`} title={translate(item.title)}
                        className={classNames("sidebar-list-item", item.subs ? 'with-sub-menu' : '', expandedKey === item.eventKey ? 'ba-sidebar-item-expanded' : '', item.disabled ? "isDisabled" : '')}>
                        <NavLink className="sidebar-list-link" to={item.url} activeClassName="selected"
                                 onClick={this.menuSelect} data-event-key={item.eventKey}>
                            {item.icon ? <FontAwesomeIcon icon={item.icon}/> : ''}
                            <span>{translate(item.title)}</span>
                            {item.subs ?
                                <b onClick={this.toggleExpand} data-event-key={item.eventKey}><FontAwesomeIcon
                                    icon={faAngleUp}/></b> : ''}
                        </NavLink>
                        {item.subs ? (
                            <ul className={['sidebar-sublist', expandedKey === item.eventKey ? 'expanded' : ''].join(' ')}>
                                {
                                    item.subs.map((sub, index1) => (
                                        <li key={`sub-${index1}`} title={translate(sub.title)}>
                                            <NavLink
                                                className={classNames("sidebar-list-link", sub.disabled && 'isDisabled')}
                                                to={sub.url}
                                                activeClassName="selected"
                                                onClick={this.menuSelect}
                                                data-event-key={sub.eventKey}
                                            >
                                                <span>{translate(sub.title)}</span>
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        ) : ''}
                    </li>)
                )}
            </ul>
        );

        return (
            <Nav as="aside" className={["sidebar", "flex-column", (collapse) ? 'collapse' : '']}>
                <div className="w-100">
                    <Button variant="default" onClick={this.toggleCollapse} className="toggle-collapse mx-auto">
                        <FontAwesomeIcon icon={faBars}/>
                    </Button>
                </div>
                {menus}
                <div className="version">
                    {`v${version}`}
                </div>
            </Nav>
        );
    }
}

SideBar.propTypes = {
    resWidthHideSidebar: PropTypes.number
};

SideBar.defaultProps = {
    resWidthHideSidebar: 1366
};

export default translate(onClickOutside(SideBar));
