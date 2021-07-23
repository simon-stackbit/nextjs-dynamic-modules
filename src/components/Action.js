import React from 'react';
import _get from 'lodash/get';

import { Link, withPrefix, classNames } from '../utils';
import Icon from './Icon';

export default class Action extends React.Component {
    render() {
        const action = _get(this.props, 'action');
        const url = _get(action, 'url');
        const label = _get(action, 'label');
        const actionStyle = _get(action, 'style', 'link');
        const hasIcon = _get(action, 'has_icon');
        const actionIcon = _get(action, 'icon', 'arrow-left');
        const actionIconPos = _get(action, 'icon_position', 'left');
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
            <Link
                href={withPrefix(url)}
                {...attrs}
                className={classNames({
                    button: actionStyle === 'primary' || actionStyle === 'secondary',
                    secondary: actionStyle === 'secondary',
                    'has-icon': hasIcon
                })}
            >
                {hasIcon && <Icon icon={actionIcon} />}
                <span className={classNames({ 'order-first': actionIconPos === 'right' })}>{label}</span>
            </Link>
        );
    }
}
