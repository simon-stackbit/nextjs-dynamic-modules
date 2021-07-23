import _get from 'lodash/get';
import _find from 'lodash/find';
import _trim from 'lodash/trim';

/**
 * Get the page at the provided `urlPath`.
 *
 * @param {Array} pages Array of page objects. All pages must have '__metadata.urlPath' field.
 * @param {string} urlPath The url path to find the page by
 * @return {Object}
 */
export default function getPage(pages, urlPath) {
    urlPath = _trim(urlPath, '/');
    return _find(pages, (page) => {
        const pageUrlPath = _trim(_get(page, '__metadata.urlPath'), '/');
        return urlPath === pageUrlPath;
    });
}
