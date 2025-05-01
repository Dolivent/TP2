// The element where we'll display the note
const noteContentElement = document.getElementById('note-content');

// --- Configuration ---
// CHANGE THESE to your GitHub username and repository name!
const githubUsername = "dolivent";
const githubRepo = "tp2";
const noteFilePath = "notes/2025-W18-Example.md"; // Path to the note file in your repo
// --- End Configuration ---

// Construct the URL to fetch the raw Markdown file from GitHub
const noteUrl = `https://raw.githubusercontent.com/<span class="math-inline">\{githubUsername\}/</span>{githubRepo}/main/${noteFilePath}`; // Use 'main' or 'master' depending on your branch

console.log(`Workspaceing note from: ${noteUrl}`); // For debugging

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
        // Ensure marked is loaded before this script runs (hence placing its script tag after ours or using defer/async appropriately, but simpler for now is just order)
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