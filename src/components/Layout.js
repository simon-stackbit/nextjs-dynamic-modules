import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { safeTrim, withPrefix } from '../utils';
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
        const page = this.props?.page;
        const config = this.props?.config;
        const favIcon = config?.favicon;
        const domain = safeTrim(config?.domain ?? '', '/');
        const configTitle = config?.title;
        const pageTitle = page?.title;
        const seo = page?.seo;
        const seoTitle = seo?.title;
        const title = seoTitle ? seoTitle : [pageTitle, configTitle].join(' | ');
        const seoDescription = seo?.description;
        const seoRobots = (seo?.robots ?? []).join(',');
        const seoExtra = (seo?.extra ?? []).map((meta, metaIdx) => {
            const keyName = meta?.keyName || 'name';
            const name = meta?.name;
            if (!name) {
                return null;
            }
            const nameAttr = { [keyName]: name };
            const relativeUrl = meta?.relativeUrl;
            let value = meta?.value;
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
                    {seoRobots && <meta name="robots" content={seoRobots} />}
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
