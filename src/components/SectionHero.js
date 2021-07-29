import React from 'react';

import { withPrefix, markdownify } from '../utils';
import CtaButtons from './CtaButtons';

export default class SectionHero extends React.Component {
    render() {
        const section = this.props?.section;
        const sectionId = section?.section_id;
        const image = section?.image;
        const imageAlt = section?.image_alt;
        const title = section?.title;
        const content = section?.content;
        const actions = section?.actions;

        return (
            <section id={sectionId} className="block hero-block bg-accent outer">
                <div className="inner">
                    <div className="grid">
                        {image && (
                            <div className="cell block-preview">
                                <img src={withPrefix(image)} alt={imageAlt} />
                            </div>
                        )}
                        <div className="cell block-content">
                            {title && <h2 className="block-title underline">{title}</h2>}
                            {content && <div className="block-copy">{markdownify(content)}</div>}
                            {actions && (
                                <div className="block-buttons">
                                    <CtaButtons actions={actions} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
