/*
 * This file is responsible for providing suggestion prompts to the user.
 * It is not currently implemented, but will be in the future.
 * Created by: Andrew Gallimore, 4/10/2024
 */

/*
 * Get a prompt from the database.
 * @returns {string} - The prompt to use
 * TODO: Implement this function.
 */
function newExamplePrompt() {
    // List of prompts
    var prompts = [
        "A cat with a top hat, funny",
        "Submarine in the sky abstract art",
        "A tree with a face with a children's book style",
        "City from Cyberpunk 2077, super colorful with neon lights, flying cars",
        "Redwoods, mushrooms, and banana slugs in the fog",
        "Aquaculture habitat, with seaweed beds in the ocean, manga style",
    ];

    var temp = "";
    // Get a random prompt
    temp = prompts[Math.floor(Math.random() * prompts.length)];

    // Return a random prompt (making sure it isn't a repeat)
    document.querySelector(".prompt-suggestion .prompt").innerHTML = temp;
}

// Gets a new prompt every 8 seconds
setInterval(() => {
    newExamplePrompt();
}, 8000);
window.addEventListener('DOMContentLoaded', () => {
    newExamplePrompt();
});

/*
* Toggles whether it shows prompt suggestions.
* @param {Element} checkbox - The checkbox that was clicked
*/

function togglePrompts(checkbox) {
    if(checkbox.checked) {
        document.querySelector(".prompt-suggestion").style.display = "flex";
    }else {
        document.querySelector(".prompt-suggestion").style.display = "none";
    }
}