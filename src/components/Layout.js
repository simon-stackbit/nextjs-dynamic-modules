import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import _trim from 'lodash/trim';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

import { withPrefix } from '../utils';
import Header from './Header';
import Footer from './Footer';

export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.handleRouteChange = this.handleRouteChange.bind(this);
    }

    componentDidMount() {
        // Sticky header
        let offsetY = 0;
        let ticking = false;

        window.addEventListener('scroll', function (e) {
            offsetY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    handleHeader(offsetY);
                    ticking = false;
                });
                ticking = true;
            }
        });

        function handleHeader(scrollPos) {
            if (scrollPos > 0) {
                document.body.classList.add('has--scrolled');
            } else {
                document.body.classList.remove('has--scrolled');
            }
        }

        Router.events.on('routeChangeStart', this.handleRouteChange);
    }

    componentWillUnmount() {
        Router.events.off('routeChangeStart', this.handleRouteChange);
    }

    handleRouteChange() {
        // Responsive video embeds
        const videoEmbeds = ['iframe[src*="youtube.com"]', 'iframe[src*="vimeo.com"]'];
        reframe(videoEmbeds.join(','));
    }

    render() {
        const page = _get(this.props, 'page');
        const config = _get(this.props, 'config');
        const favIcon = _get(config, 'favicon');
        const domain = _trim(_get(config, 'domain', ''), '/');
        const configTitle = _get(config, 'title');
        const pageTitle = _get(page, 'title');
        const seo = _get(page, 'seo');
        const seoTitle = _get(seo, 'title');
        const title = seoTitle ? seoTitle : [pageTitle, configTitle].join(' | ');
        const seoDescription = _get(seo, 'description');
        const seoRobots = _get(seo, 'robots', []).join(',');
        const seoExtra = _get(seo, 'extra', []).map((meta, metaIdx) => {
            const keyName = _get(meta, 'keyName', 'name');
            const name = _get(meta, 'name');
            if (!name) {
                return null;
            }
            const nameAttr = { [keyName]: name };
            const relativeUrl = _get(meta, 'relativeUrl');
            let value = _get(meta, 'value');
            if (!value) {
                return null;
            }
            if (relativeUrl) {
                value = domain + withPrefix(value);
            }
            return <meta key={metaIdx} {...nameAttr} content={value} />;
        });

        return (
            <React.Fragment>
                <Head>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="google" content="notranslate" />
                    {seoDescription && <meta name="description" content={seoDescription} />}
                    {!_isEmpty(seoRobots) && <meta name="robots" content={seoRobots} />}
                    {seoExtra}
                    {favIcon && <link rel="icon" href={withPrefix(favIcon)} />}
                </Head>
                <div id="page" className="site">
                    <Header page={page} config={config} />
                    <main id="content" className="site-content">
                        {this.props.children}
                    </main>
                    <Footer config={config} />
                </div>
            </React.Fragment>
        );
    }
}
