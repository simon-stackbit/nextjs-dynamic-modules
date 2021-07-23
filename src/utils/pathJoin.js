import _compact from 'lodash/compact';

export default function pathJoin(...pathParts) {
    const result = _compact(pathParts)
        .join('/')
        .replace(/\/{2,}/g, '/');
    return result || '.';
}
