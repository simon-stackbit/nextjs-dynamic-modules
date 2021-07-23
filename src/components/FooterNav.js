import React from 'react';
import _get from 'lodash/get';
import _map from 'lodash/map';

import Action from './Action';

export default class FooterNav extends React.Component {
    render() {
        const section = _get(this.props, 'section');
        const title = _get(section, 'title');
        const navLinks = _get(section, 'nav_links');

        return (
            <section className="cell widget widget-nav">
                {title && <h2 className="widget-title">{title}</h2>}
                {navLinks && (
                    <ul className="menu">
                        {_map(navLinks, (action, actionIdx) => (
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
