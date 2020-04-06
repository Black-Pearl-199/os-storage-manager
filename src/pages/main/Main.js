import React, {Fragment} from 'react';
import {Container, Image, Nav, Navbar, OverlayTrigger, Row, Tab, Tooltip} from "react-bootstrap";
import {clone, find, findIndex, remove} from "lodash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import Home, { URL_PROFILE } from "../home/Home";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router";
import {Authenticated, registerResource, Resource, translate, userLogout} from 'react-admin';
import logoMedium from '../../assets/images/logo-small.png';
import {LOCALE_EN, LOCALE_VI} from "../../configurations/messages";
import {RESOURCES} from "../../configurations/resources";
import {compose} from "recompose";
import {TAB_CONTEXT_MAIN} from "../../components";
import TabsManager from "../../components/layouts/TabsManager";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import {generateTab, getStaff} from "../../utils";
import { NavLink } from 'react-router-dom';

function ClosableTitle(key, title, onClose) {
    return (
        <OverlayTrigger placement={'bottom'} overlay={<Tooltip style={{wordWrap: 'break-word'}}>{title}</Tooltip>}>
            <div className="tab-close">
                <div className="tab-title">
                    {title}
                </div>
                <FontAwesomeIcon className='my-auto' icon={faTimesCircle} onClick={onClose} data-key={key}/>
            </div>
        </OverlayTrigger>
    );
}

const LogoutButton = translate(({userLogout, translate}) => (
    <button className="btn"
            onClick={() => {
                userLogout('/')
            }}>
        {translate('button.logout')}
    </button>
));

class Main extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            tabKey: 'home',
            tabs: [],
            // nextPatientId: 1
            lastHomeUrl: '/'
        }
    }

    componentDidMount() {
        TabsManager.register(TAB_CONTEXT_MAIN, this);

        let state = localStorage.getItem('mainState');
        if (state) {
            try {
                this.setState(JSON.parse(state));
            } catch (e) {
                console.log(e)
            }
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        localStorage.setItem('mainState', JSON.stringify(nextState));
        // console.log('%cSave main state', 'color:red', nextState);
    }

    tabSelect = (key) => {
        // console.log('tab select', key);
        const {tabKey} = this.state;
        if (tabKey === key) {
            return;
        }
        this.setState({tabKey: key});
    };

    tabClick = (key) => {
        if (key === LOCALE_VI || key === LOCALE_EN) return;
        this.tabSelect(key);
        const {tabKey, tabs, lastHomeUrl} = this.state;
        if (tabKey === key) return;
        if (key === 'home') {
            this.props.history.push(lastHomeUrl);
        } else if (key === 'exit') {
        } else {
            let tab = find(tabs, {'key': key});
            if (tab) {
                if (tabKey === 'home') {
                    this.setState({lastHomeUrl: this.props.location.pathname});
                }

                // console.log(`user select tab ${key}, redirect to`, `${tab.url}`);
                this.props.history.push(`${tab.url}`);
            }
        }
    };

    activeTab = (key, tab) => {
        // let newState = Object.assign({}, this.state, {tabkey});
        const {tabKey} = this.state;
        // console.log('active tab, current tab =', tabKey);
        if (tabKey === 'home')
            this.setState({lastHomeUrl: this.props.location.pathname});
        this.setState({tabKey: key});
        // Object.assign(newState, {lastHomeUrl: this.props.location.pathname});
        // console.log(`user select tab ${key}, redirect to`, `${tab.url}`);
        // console.log('active tab')
        this.props.history.push(`${tab.url}`);
        // localStorage.setItem('mainState', JSON.stringify(newState));
    };

    tabRemoveOnClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let key = e.currentTarget.dataset['key'];
        this.closeTab(key);
    };

    closeTab = (key) => {
        let newTabs = clone(this.state.tabs);
        remove(newTabs, tab => tab.key === key);
        // close current tab, switch to home tab
        console.log('tab need remove', key, 'current tab', this.state.tabKey);
        if (key === this.state.tabKey) {
            this.tabClick('home');
        }
        this.setState({tabs: newTabs});
    };

    replaceTab = (key, newTabData) => {
        let newTabs = clone(this.state.tabs);
        const newTab = generateTab(newTabData, this.props.translate, this.props.match.url);
        const dupTab = find(newTabs, {key: newTab.key});
        if (dupTab) {
            const currentTabIndex = findIndex(newTabs, {key});
            newTabs.splice(currentTabIndex, 1, newTab);
            this.setState({tabs: newTabs});
            this.activeTab(dupTab.key, dupTab);
        } else {
            const currentTabIndex = findIndex(newTabs, {key});
            newTabs[currentTabIndex] = newTab;
            this.setState({
                tabs: newTabs,
                tabKey: newTab.key
            });
        }
        this.props.history.replace(`${newTab.url}`);
    };

    addTab = (tabData) => {
        // console.log('add tab', tabData);
        if (!tabData) {
            return;
        }
        const newTab = generateTab(tabData, this.props.translate, this.props.match.url);
        let {key} = newTab;
        let tab = find(this.state.tabs, {key});
        if (tab) {
            this.activeTab(key, tab);
        } else {
            let newTabs = clone(this.state.tabs);
            newTabs.push(newTab);
            this.setState({tabs: newTabs});
            this.activeTab(key, newTab);
        }
    };

    updateTab = (tabData) => {
        if (!tabData) {
            return;
        }
        console.log('new tab data', tabData, this);
        // return;
        const newTab = generateTab(tabData, this.props.translate, this.props.match.url);
        const key = newTab.key;
        const tabIndex = findIndex(this.state.tabs, {key});
        console.log('current tab index', tabIndex);
        // đã có tab, update data
        if (tabIndex > -1) {
            let newTabs = clone(this.state.tabs);
            newTabs[tabIndex] = newTab;
            this.setState({tabs: newTabs});
        }
    };

    render() {
        // redirect to studies after login
        const { location, translate, staff } = this.props;
        console.log('staff', staff);
        // if (location.pathname === '/')
        //     return <Redirect to={'/studies'}/>;

        let listExtendTabs = this.state.tabs.map((tab, index) =>
            <Nav.Item key={index}>
                <Nav.Link eventKey={tab.key}>
                    {tab.closable ? ClosableTitle(tab.key, tab.title, this.tabRemoveOnClick) : tab.title}
                </Nav.Link>
            </Nav.Item>
        );

        let { userLogout } = this.props;
        // console.log(`isLoggedIn=${isLoggedIn}`);
        console.log('tabkey=', this.state.tabKey);

        // const {tabKey} = this.state;
        //regis resource for re-login
        return (
            <ErrorBoundary>
                <div className="min-vh-100 main-page">
                    {RESOURCES.map(resource => <Resource context='registration' name={resource} options={{}}
                                                         key={resource}/>)}
                    <Authenticated location={location}>
                        <Fragment>
                            <Container fluid={true}>
                                <Tab.Container defaultActiveKey="home" activeKey={this.state.tabKey}
                                               onSelect={this.tabClick}
                                               id="controlled-tab-example"
                                               className='itech-tabs'>
                                    <Row className="navbar navbar-expand-lg navbar-light bg-light nav-iTech px-1">
                                        <div>
                                            <Navbar.Brand href="#">
                                                <Image className="logo d-inline-block align-top" src={logoMedium}
                                                       height={"50px"}/>
                                            </Navbar.Brand>
                                        </div>
                                        <Nav variant="tabs" id="navItech" className="d-flex flex-row">
                                            <Nav.Item>
                                                <Nav.Link eventKey="home">iTech Solution</Nav.Link>
                                            </Nav.Item>
                                            {listExtendTabs}
                                        </Nav>
                                        <div className="d-flex flex-row">
                                        <span className="my-auto mr-3 ml-2 font-875rem">
                                                {translate('page.login.text.currentLogin')}
                                                &nbsp;
                                                <NavLink
                                                    to={URL_PROFILE}
                                                >
                                                    {staff.username}
                                                </NavLink>
                                            </span>
                                            <LanguageSwitcher className="mr-2" variant={'default'}
                                                              id={'language-change'}/>
                                            <LogoutButton userLogout={userLogout}/>
                                        </div>
                                    </Row>
                                    <Row>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="home">
                                                <Home {...this.props}/>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Row>
                                </Tab.Container>
                            </Container>
                        </Fragment>
                    </Authenticated>
                </div>
            </ErrorBoundary>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        staff: getStaff(state)
    }
}
const enhance = compose(withRouter, connect(mapStateToProps, {userLogout, registerResource}), translate);

export default enhance(Main);

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({hasError: true});
        console.log(error, info)
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <Redirect to={'/login'}/>;
        }
        return this.props.children;
    }
}
