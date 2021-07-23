const _startsWith = require('lodash/startsWith');
const _trim = require('lodash/trim');
const _trimStart = require('lodash/trimStart');
const _compact = require('lodash/compact');
const pathPrefix = require('../../content/data/config.json').path_prefix;

export default function withPrefix(url) {
    if (!url) {
        return url;
    }

    if (_startsWith(url, '#') || _startsWith(url, 'http://') || _startsWith(url, 'https://')) {
        return url;
    }
    const basePath = _trim(pathPrefix, '/');
    return '/' + _compact([basePath, _trimStart(url, '/')]).join('/');
}
