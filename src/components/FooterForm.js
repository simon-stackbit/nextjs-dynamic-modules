import React from 'react';
import _get from 'lodash/get';
import _map from 'lodash/map';

import { markdownify } from '../utils';
import FormField from './FormField';

export default class FooterForm extends React.Component {
    render() {
        const section = _get(this.props, 'section');
        const title = _get(section, 'title');
        const hideLabels = _get(section, 'hide_labels');
        const content = _get(section, 'content');
        const formId = _get(section, 'form_id');
        const formAction = _get(section, 'form_action');
        const formFields = _get(section, 'form_fields');
        const submitLabel = _get(section, 'submit_label');

        return (
            <section className="cell widget widget-form">
                {title && <h2 className="widget-title">{title}</h2>}
                {markdownify(content)}
                <form
                    name={formId}
                    id={formId}
                    {...(formAction ? { action: formAction } : null)}
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot={formId + '-bot-field'}
                >
                    <div className="screen-reader-text">
                        <label id={formId + '-honeypot-label'} htmlFor={formId + '-honeypot'}>
                            Don't fill this out if you're human:
                        </label>
                        <input aria-labelledby={formId + '-honeypot-label'} id={formId + '-honeypot'} name={formId + '-bot-field'} />
                    </div>
                    <input aria-labelledby={formId + '-honeypot-label'} type="hidden" name="form-name" value={formId} />
                    {_map(formFields, (field, fieldIdx) => (
                        <div key={fieldIdx} className="form-row">
                            <FormField field={field} hideLabels={hideLabels} />
                        </div>
                    ))}
                    {submitLabel && (
                        <div className="form-row">
                            <button type="submit" className="button">
                                {submitLabel}
                            </button>
                        </div>
                    )}
                </form>
            </section>
        );
    }
}
