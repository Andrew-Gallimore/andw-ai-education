/*
 * This file contains the state management for the project.
 * Created by: Andrew Gallimore, 4/11/2024
 */

// Secion 0 is the image generation section
// Section 1 is the slideshow section
var sectionState = 0;

// UNDER section 0
// Content 0 is the image carousel
// Content 1 is the prompt input
// Content 2 is displaying the generated image and loading animation

// UNDER section 1
// Content 4 is the presentation slides
var contentState = 0;


/*
 * Changes the state of the section.
 * @param {number} state - The state to change to
 * Has the side effect of changing the UI to reflect the new state
 */
function changeSectionState(state) {
    sectionState = state;

    // TODO: Depending on the state, change the UI to reflect the new state
}

/*
 * Changes the state of the content.
 * @param {number} state - The state to change to
 * Has the side effect of changing the UI to reflect the new state
 */
function changeConetentState(state) {
    if(contentState == state) return;

    if(contentState == 2 && state == 0) {
        // We are going back to the prompt, so we need to remove the image
        displayFadeOut();
    }

    // Updating the content state
    contentState = state;

    if(state == 0) {
        contentIn("carousel");
        contentOut("prompt");
        contentOut("display");

        resizeImage();
        setTimeout(() => {
            resizeImage();
        }, 1000);

        document.querySelector(".main-title").innerHTML = "Generative AI";
        document.querySelector(".main-button p").innerHTML = "Try it out!";
    }else if(state == 1) {
        contentOut("carousel");
        contentIn("prompt");
        contentOut("display");
        
        document.querySelector(".main-title").innerHTML = "Input a Prompt...";
        document.querySelector(".main-button p").innerHTML = "Generate Image";
    }else if(state == 2) {
        contentOut("carousel");
        contentOut("prompt");
        setTimeout(() => {
            displayFadeIn();
            
            // Resizing the images
            resizeImage();
            setTimeout(() => {
                resizeImage();
            }, 500);
        }, 600);


        document.querySelector(".main-title").innerHTML = "Generating Image";
    }
}

function contentOut(contentName) {
    var content = document.querySelector(".c." + contentName);
    if(content.classList.contains("active")) {
        content.classList.add("slide-out-top");
        content.classList.remove("slide-in-bottom");
        setTimeout(() => {
            content.classList.remove("active");
        }, 1000);
    }
}
function contentIn(contentName) {
    var content = document.querySelector(".c." + contentName);
    if(!content.classList.contains("active")) {
        content.classList.add("slide-in-bottom");
        content.classList.remove("slide-out-top");
        content.classList.add("active");
    }
}
function displayFadeIn() {
    var content = document.querySelector(".c.display");
    if(!content.classList.contains("active")) {
        content.classList.add("fade-in-fwd");
        content.classList.remove("fade-out");
        content.classList.add("active");
    }
}
function displayFadeOut() {
    var content = document.querySelector(".c.display");
    if(content.classList.contains("active")) {
        content.classList.add("fade-out");
        content.classList.remove("fade-in-fwd");
        setTimeout(() => {
            content.classList.remove("active");
            content.querySelector(".image-size").classList.add("loading");
            content.querySelector(".img-wrapper img").remove();
        }, 500);
    }
}

/*
* The direct input from the primary button
* @param {Element} button - The primary button
* Has the side effect of calling changeConetentState to change to new states
*/
function primaryButtonClicked(button) {
    console.log(contentState)
    if(contentState == 0) {
        changeConetentState(1);
    }else if(contentState == 1) {
        console.log("Submitting form...")
        promptFormSubmit();
    }else if(contentState == 2) {
        changeConetentState(0);
    }
}

function promptFormSubmit(event="") {
    if(event !== "") event.preventDefault();

    // Showing loader
    var button = document.querySelector(".main-button");
    button.classList.add("loading");
    button.disabled = true;

    // Getting the prompt
    var prompt = document.getElementById("promptInput").value;
    console.log(prompt)
    
    // Checking if the prompt is valid
    // NOTE: we technically don't need this here, as we check it inside the generateImage function as well
    if(checkPromptValid(prompt)) {
        // Generating the image
        generateImage(prompt);

        // If we are successfully generation the image, we will change the content state
        setTimeout(() => {
            if(generatingImg) {
                // Going to display
                changeConetentState(2);

            }
        }, 200);
    }else {
        // Hiding loader
        button.classList.remove("loading");
        button.disabled = false;
    }
    // changeConetentState(2);

    return false;
}


function imageFinishedLoading() {
    var button = document.querySelector(".main-button");
    button.classList.remove("loading");
    button.disabled = false;
    button.querySelector("p").innerHTML = "Create Another?";

    // Changing the title
    document.querySelector(".main-title").innerHTML = "Generated Image";
}