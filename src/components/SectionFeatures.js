import React from 'react';

import { withPrefix, markdownify, safeMap } from '../utils';
import CtaButtons from './CtaButtons';

export default class SectionFeatures extends React.Component {
    renderFeature(feature, index) {
        const image = feature?.image;
        const imageAlt = feature?.image_alt;
        const title = feature?.title;
        const content = feature?.content;
        const actions = feature?.actions;

        return (
            <div key={index} className="block-item">
                <div className="grid">
                    {image && (
                        <div className="cell block-preview">
                            <img src={withPrefix(image)} alt={imageAlt} />
                        </div>
                    )}
                    <div className="cell block-content">
                        <h3 className="block-title underline">{title}</h3>
                        <div className="block-copy">{markdownify(content)}</div>
                        {actions && (
                            <div className="block-buttons">
                                <CtaButtons actions={actions} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const section = this.props?.section;
        const sectionId = section?.section_id;
        const background = section?.background;
        const title = section?.title;
        const subtitle = section?.subtitle;
        const features = section?.features;

        return (
            <section id={sectionId} className={`block features-block bg-${background} outer`}>
                <div className="block-header inner-small">
                    {title && <h2 className="block-title">{title}</h2>}
                    {subtitle && <p className="block-subtitle">{subtitle}</p>}
                </div>
                {features && <div className="inner">{safeMap(features, (feature, index) => this.renderFeature(feature, index))}</div>}
            </section>
        );
    }
}
