import React from 'react';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _orderBy from 'lodash/orderBy';

import Layout from '../components/Layout';
import { Link, getPageUrl, withPrefix } from '../utils';
import BlogPostFooter from '../components/BlogPostFooter';

export default class Blog extends React.Component {
    renderPost(post, index, data) {
        const title = _get(post, 'title');
        const thumbImage = _get(post, 'thumb_image');
        const thumbImageAlt = _get(post, 'thumb_image_alt');
        const excerpt = _get(post, 'excerpt');
        const postUrl = getPageUrl(post, { withPrefix: true });

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
                            <h2 className="post-title">
                                <Link href={postUrl}>{title}</Link>
                            </h2>
                        </header>
                        {excerpt && (
                            <div className="post-excerpt">
                                <p>{excerpt}</p>
                            </div>
                        )}
                        <BlogPostFooter post={post} dateType={'short'} data={data} />
                    </div>
                </div>
            </article>
        );
    }

    render() {
        const page = _get(this.props, 'page');
        const data = _get(this.props, 'data');
        const config = _get(this.props, 'data.config');
        const posts = _orderBy(_get(this.props, 'posts', []), 'date', 'desc');
        return (
            <Layout page={page} config={config}>
                <div className="outer">
                    <div className="inner">
                        <div className="grid post-feed">{_map(posts, (post, index) => this.renderPost(post, index, data))}</div>
                    </div>
                </div>
            </Layout>
        );
    }
}
