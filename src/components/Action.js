import React from 'react';

import { Link, withPrefix, classNames } from '../utils';
import Icon from './Icon';

export default class Action extends React.Component {
    render() {
        const action = this.props?.action;
        const url = action?.url;
        const label = action?.label;
        const actionStyle = action?.style ?? 'link';
        const hasIcon = action?.has_icon;
        const actionIcon = action?.icon ?? 'arrow-left';
        const actionIconPos = action?.icon_position ?? 'left';
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
