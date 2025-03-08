const fs = require('fs').promises;
const path = require('path');

class BookIndexer {
    constructor(pagesDir, excludeFile, outputFile) {
        this.pagesDir = pagesDir;
        this.excludeFile = excludeFile;
        this.outputFile = outputFile;
        this.excludeWords = new Set();
        this.index = {};
    }

    // Load exclude words asynchronously
    async loadExcludeWords() {
        try {
            console.log(`Loading exclude words from: ${this.excludeFile}`);
            const data = await fs.readFile(this.excludeFile, 'utf8');
            this.excludeWords = new Set(data.split(/\s+/).map(word => word.toLowerCase()));
            console.log(`Exclude words loaded. Total words: ${this.excludeWords.size}`);
        } catch (err) {
            console.error(`Error reading exclude words file: ${err.message}`);
        }
    }

    // Read all .txt files inside the pages directory and process them
    async loadPages() {
        try {
            console.log(`Reading files from directory: ${this.pagesDir}`);
            const files = await fs.readdir(this.pagesDir);
            const pageFiles = files.filter(file => file.endsWith('.txt')).sort();

            console.log(`Total pages found: ${pageFiles.length}`);

            await Promise.all(pageFiles.map(async (file, index) => {
                await this.processPage(path.join(this.pagesDir, file), index + 1);
            }));
        } catch (err) {
            console.error(`Error reading pages directory: ${err.message}`);
        }
    }

    // Read and process a single page file
    async processPage(filePath, pageNumber) {
        try {
            console.log(`Processing page ${pageNumber}: ${filePath}`);
            const content = await fs.readFile(filePath, 'utf8');
            this.processContent(content, pageNumber);
            console.log(`Page ${pageNumber} processed successfully.`);
        } catch (err) {
            console.error(`Error reading ${filePath}: ${err.message}`);
        }
    }

    // Extract words and update index
    processContent(content, pageNumber) {
        const words = content.toLowerCase().match(/\b[a-zA-Z]+\b/g) || [];
        words.forEach(word => {
            if (!this.excludeWords.has(word)) {
                if (!this.index[word]) {
                    this.index[word] = new Set();
                }
                this.index[word].add(pageNumber);
            }
        });
    }

    // Write index to file asynchronously
    async writeIndex() {
        try {
            console.log(`Writing index to file: ${this.outputFile}`);
            const sortedWords = Object.keys(this.index).sort();
            const output = sortedWords.map(word => `${word} : ${[...this.index[word]].join(',')}`).join('\n');
            await fs.writeFile(this.outputFile, output, 'utf8');
            console.log(`Index successfully written to ${this.outputFile}`);
        } catch (err) {
            console.error(`Error writing index file: ${err.message}`);
        }
    }
}

// Main function
async function main() {
    console.log("Starting Book Indexer...");

    const pagesDir = './pages';  // Directory containing Page1.txt, Page2.txt, etc.
    const excludeFile = './exclude-words.txt';
    const outputFile = './index.txt';

    const indexer = new BookIndexer(pagesDir, excludeFile, outputFile);

    await indexer.loadExcludeWords();
    await indexer.loadPages();
    await indexer.writeIndex();

    console.log("Book Indexing Completed.");
}

// Execute the script
main().catch(err => console.error(`Fatal Error: ${err.message}`));
