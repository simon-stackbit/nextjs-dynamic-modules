import React from 'react';

import { withPrefix, markdownify } from '../utils';

export default class Page extends React.Component {
    render() {
        const page = this.props?.page;
        const title = page?.title;
        const subtitle = page?.subtitle;
        const image = page?.image;
        const imageAlt = page?.image_alt;
        const markdownContent = page?.markdown_content;

        return (
            <div className="outer">
                <div className="inner-medium">
                    <article className="post post-full">
                        <header className="post-header">
                            <h1 className="post-title">{title}</h1>
                            {subtitle && <div className="post-subtitle">{subtitle}</div>}
                        </header>
                        {image && (
                            <div className="post-image">
                                <img src={withPrefix(image)} alt={imageAlt} />
                            </div>
                        )}
                        {markdownContent && <div className="post-content">{markdownify(markdownContent)}</div>}
                    </article>
                </div>
            </div>
        );
    }
}
