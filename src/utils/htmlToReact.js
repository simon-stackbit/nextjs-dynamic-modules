import React from 'react';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import Link from './link';
import safeMap from './safeMap';

const convertChildren = (children, index) => safeMap(children, (childNode) => convertNodeToElement(childNode, index, () => {}));

export default function htmlToReact(html) {
    if (!html) {
        return null;
    }
    return ReactHtmlParser(html, {
        transform: (node, index) => {
            if (node.type === 'tag' && node.name === 'a') {
                const { href, ...props } = node.attribs;
                // use Link only if there are no custom attributes like style, class, and what's not that might break react
                if (Object.keys(props).length === 0) {
                    return (
                        <Link key={index} href={href} {...props}>
                            {convertChildren(node.children, index)}
                        </Link>
                    );
                }
            }
        }
    });
}
