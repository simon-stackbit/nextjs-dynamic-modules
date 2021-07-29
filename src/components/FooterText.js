import React from 'react';

import { Link, withPrefix, markdownify } from '../utils';

export default class FooterText extends React.Component {
    render() {
        const section = this.props?.section;
        const image = section?.image;
        const imageUrl = section?.image_url;
        const imageAlt = section?.image_alt;
        const title = section?.title;
        const content = section?.content;

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
