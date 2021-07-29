import React from 'react';

import CtaButtons from './CtaButtons';

export default class SectionCta extends React.Component {
    render() {
        const section = this.props?.section;
        const sectionId = section?.section_id;
        const title = section?.title;
        const subtitle = section?.subtitle;
        const actions = section?.actions;

        return (
            <section id={sectionId} className="block cta-block bg-accent outer">
                <div className="inner-large">
                    <div className="grid">
                        <div className="cell block-content">
                            {title && <h2 className="block-title">{title}</h2>}
                            {subtitle && <p className="block-copy">{subtitle}</p>}
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
