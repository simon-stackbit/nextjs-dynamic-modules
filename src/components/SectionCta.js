import React from 'react';
import _get from 'lodash/get';

import { htmlToReact } from '../utils';
import CtaButtons from './CtaButtons';

export default class SectionCta extends React.Component {
    render() {
        const section = _get(this.props, 'section');
        const sectionId = _get(section, 'section_id');
        const title = _get(section, 'title');
        const subtitle = _get(section, 'subtitle');
        const actions = _get(section, 'actions');

        return (
            <section id={sectionId} className="block cta-block bg-accent outer">
                <div className="inner-large">
                    <div className="grid">
                        <div className="cell block-content">
                            {title && <h2 className="block-title">{title}</h2>}
                            {subtitle && <p className="block-copy">{htmlToReact(subtitle)}</p>}
                        </div>
                        {actions && (
                            <div className="cell block-buttons">
                                <CtaButtons actions={actions} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}
