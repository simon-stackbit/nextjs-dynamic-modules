export default function modelTypeToComponentName(string) {
    return string.replace(/[-_]+([a-z])/ig, (match, p1) => {
        return p1.toUpperCase();
    }).replace(/^[a-z]/, (match) => match.toUpperCase());
}
