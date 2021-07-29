import React from 'react';

import { getPageUrl, Link, safeMap, withPrefix } from '../utils';
import BlogPostFooter from './BlogPostFooter';

export default class SectionPosts extends React.Component {
    renderRecentPost(post, index, data) {
        const title = post?.title;
        const postUrl = getPageUrl(post, { withPrefix: true });
        const thumbImage = post?.thumb_image;
        const thumbImageAlt = post?.thumb_image_alt;
        const excerpt = post?.excerpt;

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
        const section = this.props?.section;
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
        const recentPosts = sortedPosts.slice(0, 3);
        const sectionId = section?.section_id;
        const background = section?.background;
        const title = section?.title;
        const subtitle = section?.subtitle;

        return (
            <section id={sectionId} className={`block posts-block bg-${background} outer`}>
                <div className="block-header inner-small">
                    {title && <h2 className="block-title">{title}</h2>}
                    {subtitle && <p className="block-subtitle">{subtitle}</p>}
                </div>
                <div className="inner">
                    <div className="grid post-feed">{safeMap(recentPosts, (post, index) => this.renderRecentPost(post, index, data))}</div>
                </div>
            </section>
        );
    }
}
