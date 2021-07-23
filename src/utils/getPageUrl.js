import _get from 'lodash/get';

import withPrefix from './withPrefix';

export default function getPageUrl(post, { withPrefix: addPrefix = false } = {}) {
    const urlPath = _get(post, '__metadata.urlPath');
    return addPrefix ? withPrefix(urlPath) : urlPath;
}
