import React from 'react';
import dayjs from 'dayjs';

import { getData } from '../utils';

export default class BlogPostFooter extends React.Component {
    render() {
        const post = this.props?.post;
        const dateType = this.props?.dateType;
        const data = this.props?.data;
        const date = post?.date;
        const dateTimeAttr = dayjs(date).format('YYYY-MM-DD HH:mm');
        const formattedDate = dateType === 'short' ? dayjs(date).format('MMMM DD, YYYY') : dayjs(date).format('dddd, MMMM D, YYYY');
        const postAuthorRef = post?.author;
        const author = postAuthorRef ? getData(data, postAuthorRef) : null;
        const authorName = author ? `${author.first_name} ${author.last_name}`.trim() : null;

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
