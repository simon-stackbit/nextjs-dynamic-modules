export default function safeMap(array, callback, thisArg) {
    if (!Array.isArray(array) || array.length === 0) {
        return null;
    }
    return array.map(callback, thisArg);
}
