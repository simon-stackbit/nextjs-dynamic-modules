import safeTrim from './safeTrim';

/**
 * Get the page at the provided `urlPath`.
 *
 * @param {Array} pages Array of page objects. All pages must have '__metadata.urlPath' field.
 * @param {string} urlPath The url path to find the page by
 * @return {Object}
 */
export default function getPage(pages, urlPath) {
    urlPath = safeTrim(urlPath, '/');
    if (!Array.isArray(pages)) {
        return undefined;
    }
    return pages.find((page) => {
        const pageUrlPath = safeTrim(page?.__metadata?.urlPath, '/');
        return urlPath === pageUrlPath;
    });
}
