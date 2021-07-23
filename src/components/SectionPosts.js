import React from 'react';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _orderBy from 'lodash/orderBy';

import { getPageUrl, htmlToReact, Link, withPrefix } from '../utils';
import BlogPostFooter from './BlogPostFooter';

export default class SectionPosts extends React.Component {
    renderRecentPost(post, index, data) {
        const title = _get(post, 'title');
        const postUrl = getPageUrl(post, { withPrefix: true });
        const thumbImage = _get(post, 'thumb_image');
        const thumbImageAlt = _get(post, 'thumb_image_alt');
        const excerpt = _get(post, 'excerpt');

        return (
            <article key={index} className="cell post">
                <div className="card">
                    {thumbImage && (
                        <Link className="post-thumbnail" href={postUrl}>
                            <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
                        </Link>
                    )}
                    <div className="post-body">
                        <header className="post-header">
                            <h3 className="post-title">
                                <Link href={postUrl}>{title}</Link>
                            </h3>
                        </header>
                        <div className="post-excerpt">
                            <p>{excerpt}</p>
                        </div>
                        <BlogPostFooter post={post} dateType={'short'} data={data} />
                    </div>
                </div>
            </article>
        );
    }

    render() {
        const section = _get(this.props, 'section');
        const data = _get(this.props, 'data');
        const posts = _orderBy(_get(this.props, 'posts', []), 'date', 'desc');
        const recentPosts = posts.slice(0, 3);
        const sectionId = _get(section, 'section_id');
        const background = _get(section, 'background');
        const title = _get(section, 'title');
        const subtitle = _get(section, 'subtitle');

        return (
            <section id={sectionId} className={`block posts-block bg-${background} outer`}>
                <div className="block-header inner-small">
                    {title && <h2 className="block-title">{title}</h2>}
                    {subtitle && <p className="block-subtitle">{htmlToReact(subtitle)}</p>}
                </div>
                <div className="inner">
                    <div className="grid post-feed">{_map(recentPosts, (post, index) => this.renderRecentPost(post, index, data))}</div>
                </div>
            </section>
        );
    }
}
