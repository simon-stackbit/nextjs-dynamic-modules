import Markdown from 'markdown-to-jsx';
import Link from './link';

export default function markdownify(markdown) {
    if (!markdown) {
        return null;
    }
    const options = { overrides: { a: Link } };
    return (
        <Markdown options={options}>
            {markdown}
        </Markdown>
    );
}
