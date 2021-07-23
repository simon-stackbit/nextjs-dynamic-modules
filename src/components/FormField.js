import React from 'react';
import _get from 'lodash/get';
import _map from 'lodash/map';

import { classNames } from '../utils';

export default class FormField extends React.Component {
    render() {
        const field = _get(this.props, 'field');
        const hideLabels = _get(this.props, 'hideLabels');
        const inputType = _get(field, 'input_type');
        const label = _get(field, 'label');
        const name = _get(field, 'name');
        const defaultValue = _get(field, 'default_value');
        const options = _get(field, 'options');
        const required = _get(field, 'is_required');
        const attr = {};
        const nameLabel = `${name}-label`;
        if (label) {
            attr['aria-labelledby'] = nameLabel;
        }
        if (required) {
            attr.required = true;
        }

        return (
            <React.Fragment>
                {inputType !== 'checkbox' && label && (
                    <label id={nameLabel} htmlFor={name} className={classNames({ 'screen-reader-text': hideLabels })}>
                        {label}
                    </label>
                )}
                {inputType === 'checkbox' ? (
                    <div className="form-checkbox">
                        <input id={name} type="checkbox" name={name} {...attr} />
                        {label && (
                            <label htmlFor={name} id={nameLabel}>
                                {label}
                            </label>
                        )}
                    </div>
                ) : inputType === 'select' ? (
                    <div className="form-select">
                        <select id={name} name={name} {...attr}>
                            {defaultValue && <option value="">{defaultValue}</option>}
                            {_map(options, (option, optionIdx) => (
                                <option key={optionIdx} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : inputType === 'textarea' ? (
                    <textarea id={name} name={name} rows="5" {...(defaultValue ? { placeholder: defaultValue } : null)} {...attr} />
                ) : (
                    <input id={name} type={inputType} name={name} {...(defaultValue ? { placeholder: defaultValue } : null)} {...attr} />
                )}
            </React.Fragment>
        );
    }
}
