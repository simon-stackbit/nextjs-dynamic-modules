import safeTrim from './safeTrim';

const pathPrefix = require('../../content/data/config.json').path_prefix;

export default function withPrefix(url) {
    if (!url || typeof url !== 'string') {
        return url;
    }

    if (url.startsWith('#') || url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    const basePath = safeTrim(pathPrefix, '/');
    return '/' + [basePath, url.replace(/^\/+/, '')].filter(Boolean).join('/');
}
