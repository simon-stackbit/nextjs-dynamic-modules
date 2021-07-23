import React from 'react';
import _get from 'lodash/get';
import _map from 'lodash/map';

import Action from './Action';

export default class CtaButtons extends React.Component {
    render() {
        const actions = _get(this.props, 'actions');
        return _map(actions, (action, actionIdx) => <Action key={actionIdx} action={action} />);
    }
}
