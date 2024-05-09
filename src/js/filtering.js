/*
 * This file is used to filter prompts
 * It is not currently implemented, but will be in the future.
 * Created by: Andrew Gallimore, 4/10/2024
 */

/*
 * Filter the prompt for NSFW content
 * @param {string} text - The prompt to filter
 * @returns {boolean} - If the prompt was valid or not
 * Has the side effect of calling alerts
 */
function checkPromptValid(text) {
    if(containsNSFW(text)) {
        alertNSFW();
        return false;
    }
    if(!containsContent(text)) {
        alertNoPrompt();
        return false;
    }
    return true;
}

/*
 * Filters out NSFW content from the prompt.
 * @param {string} text - The prompt to filter
 * @returns {boolean} - If the prompt contained NSFW or not
 * Has the side effect of calling alerts
 * TODO: Implement this function.
 */
function containsNSFW(text) {
    return false;
}

/*
 * Filter for making sure a prompt has something in it.
 * @param {string} text - The prompt to filter
 * @returns {boolean} - If the prompt contained anything at all
 * Has the side effect of calling alerts
 */
function containsContent(text) {
    if(text == "" || text == null || text == undefined) {
        return false;
    }

    return true;
}