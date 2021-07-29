import React from 'react';

import { Link, withPrefix } from '../utils';

export default class ActionLink extends React.Component {
    render() {
        const action = this.props?.action;
        const url = action?.url;
        const label = action?.label;
        const newWindow = action?.new_window;
        const noFollow = action?.no_follow;
        const attrs = {};
        if (newWindow) {
            attrs.target = '_blank';
        }
        if (newWindow || noFollow) {
            attrs.rel = [(newWindow ? 'noopener' : '') + (noFollow ? 'nofollow' : '')].join(' ');
        }

        return (
            <Link href={withPrefix(url)} {...attrs}>
                {label}
            </Link>
        );
    }
}
