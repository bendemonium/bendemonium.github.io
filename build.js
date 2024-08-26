const fs = require('fs');
const path = require('path');

const template = fs.readFileSync('template.html', 'utf8');

const pages = [
    { name: 'about', title: 'About' },
    { name: 'writing', title: 'Writing' },
    { name: 'things-im-up-to', title: "Things I'm Up To" },
    { name: 'things-i-was-up-to', title: 'Things I Was Up To' },
    { name: 'art', title: 'Art' }
];

pages.forEach(page => {
    const content = fs.readFileSync(`${page.name}-content.html`, 'utf8');
    let html = template.replace('{{PAGE_TITLE}}', page.title)
                       .replace('{{MAIN_CONTENT}}', content);
    fs.writeFileSync(`${page.name}.html`, html);
});
