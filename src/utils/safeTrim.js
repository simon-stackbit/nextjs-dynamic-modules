export default function safeTrim(string, chars) {
    if (typeof string !== 'string') {
        string = '';
    }
    if (!chars || typeof chars !== 'string') {
        return string.trim();
    }
    const charClass = `[\\${chars.split('').join('\\')}]+`
    return string.replace(new RegExp(`^${charClass}|${charClass}$`, 'g'), '');
}
