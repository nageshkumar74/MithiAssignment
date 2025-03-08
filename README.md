# Mithi Assignment
# Book Indexer

This Node.js script reads multiple text files from a directory, processes their content, and generates an index of words along with the page numbers they appear on. Additionally, it excludes common words from indexing using an exclude-words file.

## Features
- Reads text files from a specified directory.
- Excludes common words from indexing using an `exclude-words.txt` file.
- Outputs an alphabetically sorted word index with associated page numbers.
- Uses asynchronous file handling for efficiency.
- Displays progress logs for processing.

## Installation
Ensure you have Node.js installed on your system.

1. Clone this repository or download the script.
2. Install dependencies (if needed, though this script only uses built-in Node.js modules).

## Folder Structure
project-folder/ │── pages/ # Directory containing text files (Page1.txt, Page2.txt, etc.) │── exclude-words.txt # File containing words to exclude from indexing │── index.txt # Generated index output │── indexer.js # Main script │── README.md # 

## Usage

1. **Prepare Files:**
   - Create a `pages/` directory in the same location as `indexer.js`.
   - Add text files like `Page1.txt`, `Page2.txt`, etc., inside `pages/`.
   - Create `exclude-words.txt` and add words (one per line) that should be ignored during indexing.

2. **Run the Script:**
   Open a terminal in the project directory and execute:
   ```sh
   node indexer.js
Output:

    The script will generate an index.txt file containing indexed words in alphabetical order along with the page numbers they appear on.
    Example output in index.txt:
about : 2
access : 2,3
across : 1
add : 2,3
admin : 1
administration : 1
administrative : 2,3
Error Handling

    Logs errors if files are missing or unreadable.
    Displays progress updates in the console.
    Ignores words that are in exclude-words.txt.

License

This project is open-source and free to use.
Author

Developed by NageshKumar Gunji


### **How to Use This**
- Save this as `README.md` in your project directory.
- It provides instructions for setup, execution, and expected output.

Let me know if you need any modifications! 

