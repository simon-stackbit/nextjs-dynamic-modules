import React from 'react';
import _get from 'lodash/get';

import { Link, withPrefix, markdownify } from '../utils';

export default class FooterText extends React.Component {
    render() {
        const section = _get(this.props, 'section');
        const image = _get(section, 'image');
        const imageUrl = _get(section, 'image_url');
        const imageAlt = _get(section, 'image_alt');
        const title = _get(section, 'title');
        const content = _get(section, 'content');

        return (
            <section className="cell widget widget-text">
                {image &&
                    (imageUrl ? (
                        <Link className="widget-image" href={withPrefix(imageUrl)}>
                            <img src={withPrefix(image)} alt={imageAlt} />
                        </Link>
                    ) : (
                        <p className="widget-image">
                            <img src={withPrefix(image)} alt={imageAlt} />
                        </p>
                    ))}
                {title && <h2 className="widget-title">{title}</h2>}
                {markdownify(content)}
            </section>
        );
    }
}
