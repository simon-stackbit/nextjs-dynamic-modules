import React from 'react';
import _get from 'lodash/get';

import Layout from '../components/Layout';
import { htmlToReact, withPrefix, markdownify } from '../utils';

export default class Page extends React.Component {
    render() {
        const page = _get(this.props, 'page');
        const data = _get(this.props, 'data');
        const config = _get(data, 'config');
        const title = _get(page, 'title');
        const subtitle = _get(page, 'subtitle');
        const image = _get(page, 'image');
        const imageAlt = _get(page, 'image_alt');
        const markdownContent = _get(page, 'markdown_content');

        return (
            <Layout page={page} config={config}>
                <div className="outer">
                    <div className="inner-medium">
                        <article className="post post-full">
                            <header className="post-header">
                                <h1 className="post-title">{title}</h1>
                                {subtitle && <div className="post-subtitle">{htmlToReact(subtitle)}</div>}
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
            </Layout>
        );
    }
}
