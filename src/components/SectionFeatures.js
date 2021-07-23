import React from 'react';
import _map from 'lodash/map';
import _get from 'lodash/get';

import { htmlToReact, withPrefix, markdownify } from '../utils';
import CtaButtons from './CtaButtons';

export default class SectionFeatures extends React.Component {
    renderFeature(feature, index) {
        const image = _get(feature, 'image');
        const imageAlt = _get(feature, 'image_alt');
        const title = _get(feature, 'title');
        const content = _get(feature, 'content');
        const actions = _get(feature, 'actions');

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
        const section = _get(this.props, 'section');
        const sectionId = _get(section, 'section_id');
        const background = _get(section, 'background');
        const title = _get(section, 'title');
        const subtitle = _get(section, 'subtitle');
        const features = _get(section, 'features');

        return (
            <section id={sectionId} className={`block features-block bg-${background} outer`}>
                <div className="block-header inner-small">
                    {title && <h2 className="block-title">{title}</h2>}
                    {subtitle && <p className="block-subtitle">{htmlToReact(subtitle)}</p>}
                </div>
                {features && <div className="inner">{_map(features, (feature, index) => this.renderFeature(feature, index))}</div>}
            </section>
        );
    }
}
