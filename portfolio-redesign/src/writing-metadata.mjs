function plainText(node) {
  if (node.type === 'html') return '';
  if (node.type === 'break') return ' ';
  return node.value ?? node.alt ?? (node.children ?? []).map(plainText).join('');
}

export default function writingMetadata() {
  return (tree, file) => {
    if (!/(?:^|[\\/])src[\\/]content[\\/]writing[\\/]/.test(file.path)) return;

    const data = file.data.astro.frontmatter;
    const first = tree.children[0];
    if (first?.type === 'heading' && first.depth === 1) {
      data.headingTitle = plainText(first).trim();
      // The article header displays the title once, including for plain Markdown.
      tree.children.shift();
    }

    if (!data.summary) {
      const paragraph = tree.children.find(node => node.type === 'paragraph');
      const text = paragraph && plainText(paragraph).replace(/\s+/g, ' ').trim();
      if (text) data.excerpt = text.length <= 180 ? text : text.slice(0, 177).replace(/\s+\S*$/, '') + '…';
    }
  };
}
