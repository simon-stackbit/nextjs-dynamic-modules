import React from 'react';

import components from './index';
import ActionLink from './ActionLink';
import {
    htmlToReact,
    safeMap,
    nonEmptyArray,
    modelTypeToComponentName
} from '../utils';

export default class Footer extends React.Component {
    render() {
        const footer = this.props?.config?.footer;
        const footerSections = footer?.sections;
        const hasNav = footer?.has_nav;
        const navLinks = footer?.nav_links;
        const footerContent = footer?.content;
        const links = footer?.links;

        return (
            <footer id="colophon" className="site-footer">
                {nonEmptyArray(footerSections) && (
                    <div className="footer-top outer">
                        <div className="inner">
                            <div className="grid footer-widgets">
                                {safeMap(footerSections, (section, idx) => {
                                    const sectionType = section?.type;
                                    const component = modelTypeToComponentName(sectionType);
                                    if (!component) {
                                        throw new Error(`footer section does not have the 'type' property`);
                                    }
                                    const Component = components[component];
                                    if (!Component) {
                                        throw new Error(`no component matching the footer section's type: ${sectionType}`);
                                    }
                                    return <Component key={idx} section={section} />;
                                })}
                            </div>
                        </div>
                    </div>
                )}
                <div className="footer-bottom outer">
                    <div className="inner">
                        {hasNav && nonEmptyArray(navLinks) && (
                            <div className="footer-nav">
                                <ul className="menu">
                                    {safeMap(navLinks, (action, idx) => (
                                        <li key={idx} className="menu-item">
                                            <ActionLink action={action} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="site-info">
                            {htmlToReact(footerContent)}
                            &nbsp;
                            {safeMap(links, (action, idx) => (
                                <ActionLink key={idx} action={action} />
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
