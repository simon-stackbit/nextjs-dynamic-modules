import React from 'react';
import Router from 'next/router';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _trim from 'lodash/trim';
import _isEmpty from 'lodash/isEmpty';

import { Link, withPrefix, classNames, getPageUrl } from '../utils';
import Action from './Action';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleRouteChange = this.handleRouteChange.bind(this);
        this.menuOpenRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize, true);
        Router.events.on('routeChangeStart', this.handleRouteChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize, true);
        Router.events.off('routeChangeStart', this.handleRouteChange);
    }

    handleWindowResize() {
        const menuOpenElm = _get(this.menuOpenRef, 'current.offsetParent');
        if (menuOpenElm === null) {
            document.body.classList.remove('menu--opened');
        }
    }

    handleRouteChange() {
        document.body.classList.remove('menu--opened');
    }

    handleMenuOpen(event) {
        event.preventDefault();
        document.body.classList.add('menu--opened');
    }

    handleMenuClose(event) {
        event.preventDefault();
        document.body.classList.remove('menu--opened');
    }

    renderNavLinks(navLinks, pageUrl) {
        return (
            <React.Fragment>
                <nav id="main-navigation" className="site-navigation" aria-label="Main Navigation">
                    <div className="site-nav-inside">
                        <button id="menu-close" className="menu-toggle" onClick={this.handleMenuClose.bind(this)}>
                            <span className="screen-reader-text">Open Menu</span>
                            <span className="icon-close" aria-hidden="true" />
                        </button>
                        <ul className="menu">
                            {_map(navLinks, (action, actionIdx) => {
                                const actionUrl = _trim(_get(action, 'url'), '/');
                                const actionStyle = _get(action, 'style', 'link');
                                return (
                                    <li
                                        key={actionIdx}
                                        className={classNames('menu-item', {
                                            'current-menu-item': pageUrl === actionUrl,
                                            'menu-button': actionStyle !== 'link'
                                        })}
                                    >
                                        <Action action={action} />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>
                <button id="menu-open" className="menu-toggle" ref={this.menuOpenRef} onClick={this.handleMenuOpen.bind(this)}>
                    <span className="screen-reader-text">Close Menu</span>
                    <span className="icon-menu" aria-hidden="true" />
                </button>
            </React.Fragment>
        );
    }

    render() {
        const config = _get(this.props, 'config');
        const page = _get(this.props, 'page');
        const configTitle = _get(config, 'title');
        const header = _get(config, 'header');
        const hasNav = _get(header, 'has_nav');
        const navLinks = _get(header, 'nav_links');
        const logoImage = _get(header, 'logo_img');
        const logoImageAlt = _get(header, 'logo_img_alt');
        const pageTemplate = _get(page, 'template');
        const pageUrl = _trim(getPageUrl(page), '/');

        return (
            <header id="masthead" className="site-header outer">
                <div className="inner">
                    <div className="site-header-inside">
                        <div className="site-branding">
                            {logoImage && (
                                <p className="site-logo">
                                    <Link href={withPrefix('/')}>
                                        <img src={withPrefix(logoImage)} alt={logoImageAlt} />
                                    </Link>
                                </p>
                            )}
                            {pageTemplate === 'landing' || pageTemplate === 'blog' ? (
                                <h1 className={classNames('site-title', { 'screen-reader-text': logoImageAlt })}>
                                    <Link href={withPrefix('/')}>{configTitle}</Link>
                                </h1>
                            ) : (
                                <p className={classNames('site-title', { 'screen-reader-text': logoImageAlt })}>
                                    <Link href={withPrefix('/')}>{configTitle}</Link>
                                </p>
                            )}
                        </div>
                        {hasNav && !_isEmpty(navLinks) && this.renderNavLinks(navLinks, pageUrl)}
                    </div>
                </div>
            </header>
        );
    }
}
