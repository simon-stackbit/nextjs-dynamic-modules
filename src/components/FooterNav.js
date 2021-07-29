import React from 'react';

import Action from './Action';
import { safeMap } from '../utils';

export default class FooterNav extends React.Component {
    render() {
        const section = this.props?.section;
        const title = section?.title;
        const navLinks = section?.nav_links;

        return (
            <section className="cell widget widget-nav">
                {title && <h2 className="widget-title">{title}</h2>}
                {navLinks && (
                    <ul className="menu">
                        {safeMap(navLinks, (action, actionIdx) => (
                            <li key={actionIdx} className="menu-item">
                                <Action action={action} />
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        );
    }
}
