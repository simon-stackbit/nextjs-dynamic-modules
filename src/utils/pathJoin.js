export default function pathJoin(...pathParts) {
    const result = (pathParts || []).filter(Boolean)
        .join('/')
        .replace(/\/{2,}/g, '/');
    return result || '.';
}
