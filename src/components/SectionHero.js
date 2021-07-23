import React from 'react';
import _get from 'lodash/get';

import { withPrefix, markdownify } from '../utils';
import CtaButtons from './CtaButtons';

export default class SectionHero extends React.Component {
    render() {
        const section = _get(this.props, 'section');
        const sectionId = _get(section, 'section_id');
        const image = _get(section, 'image');
        const imageAlt = _get(section, 'image_alt');
        const title = _get(section, 'title');
        const content = _get(section, 'content');
        const actions = _get(section, 'actions');

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
