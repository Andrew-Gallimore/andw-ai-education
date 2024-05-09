/*
 * This file is for the image generation part of the project.
 * It is responsible for generating the image and displaying it.
 * Created by: Andrew Gallimore, 4/11/2024
 */
// Adding the custom element that is the image loading animation
window.addEventListener('DOMContentLoaded', () => {
    // Adding custom html element to page
    var doodle = document.createElement('css-doodle');
    doodle.innerHTML = `
        <style>
            @grid: 30 / 100%;
            background: cyan;
            scale: 0;
            opacity: 0;
            animation: m 4s linear infinite;
            animation-delay: calc(-1s/@I * @i * @sin(@i));
            @keyframes m {
                0%, 50%, 90% { scale: 1; opacity: 1 }
                25%, 75%, 100% { scale: 0; opacity: 0 }
            }
        </style>
    `;
    document.querySelector(".c.display .loading-anim .content").appendChild(doodle);
});



var generatingImg = false;

/*
 * Calls API for generating image, and displays it.
 * @param {string} prompt - The prompt to check
 * @returns {boolean} - If the prompt is valid or not
 */
function generateImage(prompt="") {
    // Making sure we only are generating one at a time
    // NOTE: We shouldn't need this, as the button should be disabled, but it is a good safety net.
    if(generatingImg) {
        console.log("Already generating an image.");
        return false;
    }

    // Validating prompt
    if(checkPromptValid(prompt)) {
        console.log("Prompt: \"" + prompt + "\"");
    }else {
        console.log("Prompt is not valid.");
        return false;
    }


    // Start the loading of the image
    generatingImg = true;
    console.log("Generating image...");

    try {
        // Making the post request to the server
        fetch("https://full-imggen.andw.dev", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                password: "1q29fvb8ke",
                prompt: prompt,
            })
        })
        .then((response) => {
            // Reading the headers to get the values I want from it
            var header = response.headers.get('content-type');
    
            if(header === "image/png") {
                console.log("Recived Image, displaying it now.");
                
                // Create the image
                response.blob().then(blob => {
                    presentImage(blob);
                });
                
                // Stop the loading of the image
                generatingImg = false;
                stopLoadingAnim();
                return;
            }
            if(response.status === 400) {
                console.log("Recived HTTP error 400.");

                // Stops loading of the image AND States there was an error
                generatingImg = false;
                alertAPIError("Failed to generate the image (HTTP error 400) via full-imggen API.");
                stopLoadingAnim();

                return;
            }
        })
        .catch(error => {
            console.log("Error with fetching the image: ")
            console.log(error)
    
            // Stops loading of the image AND State there was an error
            generatingImg = false;
            alertAPIError("Failed to fetch the image via full-imggen API.");
            stopLoadingAnim();
        });
    }catch (error) {
        console.log("Unplanned error occured: ")
        console.log(error)

        // Stops loading of the image AND States there was an error
        generatingImg = false;
        alertAPIError("An unplanned error occured.");
        stopLoadingAnim();
    }
}

/*
 * Presents the image to the user.
 * @param {Blob} blob - The Blob of the image to present
 * Has the side effect of displaying the image in the page
 */
function presentImage(blob) {
    var genImg = document.createElement("img");
    genImg.src = URL.createObjectURL(blob);
    if(document.querySelector(".c.display .img-wrapper img") !== null) {
        document.querySelector(".c.display .img-wrapper img").remove();
    }
    document.querySelector(".c.display .img-wrapper").appendChild(genImg);

    // Resizing the image
    resizeImage();

    imageFinishedLoading();
}

/*
 * Stops loading animation(s) for the image.
 * Has the side effect of stopping the loading animation, and enables the button
 * TODO: Implement this function.
 */
function stopLoadingAnim() {
    document.querySelector(".c.display .image-size").classList.remove("loading");
}