import React from 'react';

import Action from './Action';
import { safeMap } from '../utils';

export default class CtaButtons extends React.Component {
    render() {
        const actions = this.props?.actions;
        return safeMap(actions, (action, idx) => <Action key={idx} action={action} />);
    }
}
