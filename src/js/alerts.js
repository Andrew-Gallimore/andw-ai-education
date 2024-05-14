/*
 * This file is responsible for creating alerts for the user.
 * It is not currently implemented, but will be in the future.
 * Created by: Andrew Gallimore, 4/11/2024
 */

/*
 * Alert the user that the prompt is NSFW
 */
function alertNSFW() {
    // Creates local alert on text-input saying prompt is flaged as nsfw
    console.log("ALERT: Prompt is NSFW.");

    new Noty({
        type: 'error',
        layout: 'bottomRight',
        text: 'Prompt flagged as NSFW',
        theme: 'sunset',
        timeout: 3000,
    }).show();
}

/*
 * Alert the user that they need to enter a prompt
 */
function alertNoPrompt() {
    // Creates local alert on text-input saying they need to enter a prompt
    console.log("ALERT: No prompt entered.");

    new Noty({
        type: 'error',
        layout: 'bottomRight',
        text: 'No prompt entered',
        theme: 'sunset',
        timeout: 2000,
    }).show();
}

/*
 * Alert the user that the API is not working
 */
function alertAPIError(message) {
    // Creates more global alert saying there was an error with the API
    console.log("ALERT: API Error - " + message);

    new Noty({
        type: 'error',
        layout: 'bottomRight',
        text: 'Error: ' + message,
        theme: 'sunset',
        timeout: 3000,
    }).show();

    // Removing loading from the main button
    document.querySelector(".main-button").classList.remove("loading");
    document.querySelector(".main-button").disabled = false;
    document.querySelector(".main-button p").innerHTML = "Try again...";
}