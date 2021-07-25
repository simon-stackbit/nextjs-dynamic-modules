import React from 'react';

import { safeMap, withPrefix } from '../utils';

export default class SectionReviews extends React.Component {
    renderReview(review, index) {
        const content = review?.content;
        const avatar = review?.avatar;
        const avatarAlt = review?.avatar_alt;
        const author = review?.author;

        return (
            <blockquote key={index} className="cell review">
                <div className="card">
                    <p className="review-text">{content}</p>
                    <footer className="review-footer">
                        {avatar && <img className="review-avatar" src={withPrefix(avatar)} alt={avatarAlt} />}
                        {author && <cite className="review-author">{author}</cite>}
                    </footer>
                </div>
            </blockquote>
        );
    }

    render() {
        const section = this.props?.section;
        const sectionId = section?.section_id;
        const background = section?.background;
        const title = section?.title;
        const subtitle = section?.subtitle;
        const reviews = section?.reviews;

        return (
            <section id={sectionId} className={`block reviews-block bg-${background} outer`}>
                <div className="block-header inner-small">
                    {title && <h2 className="block-title">{title}</h2>}
                    {subtitle && <p className="block-subtitle">{subtitle}</p>}
                </div>
                {reviews && (
                    <div className="inner">
                        <div className="grid">{safeMap(reviews, (review, index) => this.renderReview(review, index))}</div>
                    </div>
                )}
            </section>
        );
    }
}
