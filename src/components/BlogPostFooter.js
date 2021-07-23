import React from 'react';
import _get from 'lodash/get';
import _trim from 'lodash/trim';
import dayjs from 'dayjs';

import { getData } from '../utils';

export default class BlogPostFooter extends React.Component {
    render() {
        const post = _get(this.props, 'post');
        const dateType = _get(this.props, 'dateType');
        const data = _get(this.props, 'data');
        const date = _get(post, 'date');
        const dateTimeAttr = dayjs(date).format('YYYY-MM-DD HH:mm');
        const formattedDate = dateType === 'short' ? dayjs(date).format('MMMM DD, YYYY') : dayjs(date).format('dddd, MMMM D, YYYY');
        const postAuthorRef = _get(post, 'author');
        const author = postAuthorRef ? getData(data, postAuthorRef) : null;
        const authorName = author ? _trim(`${author.first_name} ${author.last_name}`) : null;

        return (
            <footer className="post-meta">
                <time className="published" dateTime={dateTimeAttr}>
                    {formattedDate}
                </time>
                {authorName && `, by ${authorName}`}
            </footer>
        );
    }
}
