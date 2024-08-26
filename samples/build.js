const fs = require('fs');
const path = require('path');

// Read the template
const template = fs.readFileSync('template.html', 'utf8');

// Define the pages to process
const pages = [
    { name: 'about', title: 'About' },
    { name: 'writing', title: 'Writing' },
    { name: 'things-im-up-to', title: "Things I'm Up To" },
    { name: 'things-i-was-up-to', title: 'Things I Was Up To' },
    { name: 'art', title: 'Art' }
];

function extractContent(html) {
    const mainStart = html.indexOf('<main>');
    const mainEnd = html.lastIndexOf('</main>');
    if (mainStart !== -1 && mainEnd !== -1) {
        return html.slice(mainStart + 6, mainEnd);
    }
    // If no <main> tags, extract content between <nav> and <script> or end of file
    const navEnd = html.indexOf('</nav>');
    const scriptStart = html.indexOf('<script>');
    if (navEnd !== -1) {
        return html.slice(navEnd + 6, scriptStart !== -1 ? scriptStart : undefined).trim();
    }
    return '';
}

pages.forEach(page => {
    const filePath = `${page.name}.html`;
    
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const mainContent = extractContent(content);
        
        // Create the new page content
        let newHtml = template
            .replace('{{PAGE_TITLE}}', page.title)
            .replace('{{MAIN_CONTENT}}', mainContent);
        
        // Write the new file
        fs.writeFileSync(`${page.name}-new.html`, newHtml);
        console.log(`Generated ${page.name}-new.html`);
    } else {
        console.log(`Warning: ${filePath} does not exist. Skipping.`);
    }
});

console.log('Build process completed.');