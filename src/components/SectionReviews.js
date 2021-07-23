import React from 'react';
import _map from 'lodash/map';
import _get from 'lodash/get';

import { htmlToReact, withPrefix } from '../utils';

export default class SectionReviews extends React.Component {
    renderReview(review, index) {
        const content = _get(review, 'content');
        const avatar = _get(review, 'avatar');
        const avatarAlt = _get(review, 'avatar_alt');
        const author = _get(review, 'author');

        return (
            <blockquote key={index} className="cell review">
                <div className="card">
                    <p className="review-text">{htmlToReact(content)}</p>
                    <footer className="review-footer">
                        {avatar && <img className="review-avatar" src={withPrefix(avatar)} alt={avatarAlt} />}
                        {author && <cite className="review-author">{author}</cite>}
                    </footer>
                </div>
            </blockquote>
        );
    }

    render() {
        const section = _get(this.props, 'section');
        const sectionId = _get(section, 'section_id');
        const background = _get(section, 'background');
        const title = _get(section, 'title');
        const subtitle = _get(section, 'subtitle');
        const reviews = _get(section, 'reviews');

        return (
            <section id={sectionId} className={`block reviews-block bg-${background} outer`}>
                <div className="block-header inner-small">
                    {title && <h2 className="block-title">{title}</h2>}
                    {subtitle && <p className="block-subtitle">{htmlToReact(subtitle)}</p>}
                </div>
                {reviews && (
                    <div className="inner">
                        <div className="grid">{_map(reviews, (review, index) => this.renderReview(review, index))}</div>
                    </div>
                )}
            </section>
        );
    }
}
