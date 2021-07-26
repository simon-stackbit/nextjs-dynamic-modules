import React from 'react';

import Layout from '../components/Layout';
import { Link, getPageUrl, withPrefix, safeMap } from '../utils';
import BlogPostFooter from '../components/BlogPostFooter';

export default class Blog extends React.Component {
    renderPost(post, index, data) {
        const title = post?.title;
        const thumbImage = post?.thumb_image;
        const thumbImageAlt = post?.thumb_image_alt;
        const excerpt = post?.excerpt;
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
        const data = this.props?.data;
        const posts = this.props?.posts ?? [];
        const sortedPosts = posts.sort((postA, postB) => {
            if (postA?.date > postB?.date) {
                return -1;
            } else if (postA?.date < postB?.date) {
                return 1;
            } else {
                return 0;
            }
        });
        return (
            <div className="outer">
                <div className="inner">
                    <div className="grid post-feed">{safeMap(sortedPosts, (post, index) => this.renderPost(post, index, data))}</div>
                </div>
            </div>
        );
    }
}
