const noteContentElement = document.getElementById('note-content');

// --- Configuration ---
const githubUsername = "Dolivent";
const githubRepo = "TP2";
const branchName = "main"; // Change to your branch name if different
const noteFilePath = "notes/2025-W18-Example.md";
// --- End Configuration ---

// Construct the URL to fetch the raw Markdown file from GitHub
const noteUrl = `https://raw.githubusercontent.com/${githubUsername}/${githubRepo}/${branchName}/${noteFilePath}`;

console.log(`Fetching note from: ${noteUrl}`); // For debugging

// Fetch the Markdown content
fetch(noteUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Get the response text (Markdown)
    })
    .then(markdownText => {
        console.log("Markdown fetched successfully!"); // For debugging
        // Use the marked library to convert Markdown to HTML
        if (window.marked) {
             noteContentElement.innerHTML = marked.parse(markdownText); // Use marked.parse()
        } else {
             console.error("Marked library not loaded!");
             noteContentElement.textContent = "Error: Could not load Markdown parser.";
        }
    })
    .catch(error => {
        console.error('Error fetching or parsing note:', error);
        noteContentElement.textContent = `Error loading note: ${error.message}. Check console for details.`;
    });