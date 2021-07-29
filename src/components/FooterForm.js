import React from 'react';

import { markdownify, safeMap } from '../utils';
import FormField from './FormField';

export default class FooterForm extends React.Component {
    render() {
        const section = this.props?.section;
        const title = section?.title;
        const hideLabels = section?.hide_labels;
        const content = section?.content;
        const formId = section?.form_id;
        const formAction = section?.form_action;
        const formFields = section?.form_fields;
        const submitLabel = section?.submit_label;

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
                    {safeMap(formFields, (field, idx) => (
                        <div key={idx} className="form-row">
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
