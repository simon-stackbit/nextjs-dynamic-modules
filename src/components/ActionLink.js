import React from 'react';
import _get from 'lodash/get';

import { Link, withPrefix } from '../utils';

export default class ActionLink extends React.Component {
    render() {
        const action = _get(this.props, 'action');
        const url = _get(action, 'url');
        const label = _get(action, 'label', null);
        const newWindow = _get(action, 'new_window');
        const noFollow = _get(action, 'no_follow');
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
