import React from 'react';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import _upperFirst from 'lodash/upperFirst';
import _camelCase from 'lodash/camelCase';

import components from './index';
import ActionLink from './ActionLink';
import { htmlToReact } from '../utils';

export default class Footer extends React.Component {
    render() {
        const config = _get(this.props, 'config');
        const footer = _get(config, 'footer');
        const footerSections = _get(footer, 'sections');
        const hasNav = _get(footer, 'has_nav');
        const navLinks = _get(footer, 'nav_links');
        const footerContent = _get(footer, 'content');
        const links = _get(footer, 'links');

        return (
            <footer id="colophon" className="site-footer">
                {footerSections && !_isEmpty(footerSections) && (
                    <div className="footer-top outer">
                        <div className="inner">
                            <div className="grid footer-widgets">
                                {_map(footerSections, (section, sectionIdx) => {
                                    const sectionType = _get(section, 'type');
                                    const component = _upperFirst(_camelCase(sectionType));
                                    if (!component) {
                                        throw new Error(`footer section does not have the 'type' property`);
                                    }
                                    const Component = components[component];
                                    if (!Component) {
                                        throw new Error(`no component matching the footer section's type: ${sectionType}`);
                                    }
                                    return <Component key={sectionIdx} section={section} />;
                                })}
                            </div>
                        </div>
                    </div>
                )}
                <div className="footer-bottom outer">
                    <div className="inner">
                        {hasNav && navLinks && (
                            <div className="footer-nav">
                                <ul className="menu">
                                    {_map(navLinks, (action, actionIdx) => (
                                        <li key={actionIdx} className="menu-item">
                                            <ActionLink action={action} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="site-info">
                            {htmlToReact(footerContent)}
                            &nbsp;
                            {_map(links, (action, actionIdx) => (
                                <ActionLink key={actionIdx} action={action} />
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
