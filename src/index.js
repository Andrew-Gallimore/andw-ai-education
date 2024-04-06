var generatingImg = false;

// Makes a post request to start creating the SD image
function createSDImage(prompt="") {
    // Making sure we only are generating one at a time
    if(generatingImg) {
        console.log("Already generating an image.");
        return;
    }

    // Validating prompt
    if(promptValid(prompt)) {
        console.log("Prompt: \"" + prompt + "\"");
    }else {
        console.log("Prompt is not valid.");
        return;
    }


    // Start the loading of the image
    startLoading();
    console.log("Generating image...")

    try {
        // Making the post request to the server
        fetch("http://full-imggen.andw.dev", {
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
                // Stop the loading of the image
                stopLoading();
    
                // Create the image
                response.blob().then(blob => {
                    var genImg = document.createElement("img");
                    genImg.src = URL.createObjectURL(blob);
                    document.getElementById("aiImage").appendChild(genImg);
                });
    
                return;
            }
            if(response.status === 400) {
                console.log("Recived HTTP error 400.");

                // Stops loading of the image AND States there was an error
                errorOccured("Failed to generate the image (HTTP error 400) via full-imggen API.");
    
                return;
            }
        })
        .catch(error => {
            console.log("Error with fetching the image: ")
            console.log(error)
    
            // Stops loading of the image AND States there was an error
            errorOccured("Failed to fetch the image via full-imggen API.")
        });
    }catch (error) {
        console.log("Unplanned error occured: ")
        console.log(error)

        // Stops loading of the image AND States there was an error
        errorOccured("An unplanned error occured.")
    }
}

// Checks if the prompt is valid, if not, tells user
function promptValid(prompt) {
    if(prompt == "") {
        alert("Prompt must be filled out");
        return false;
    }

    // TODO: Check if prompt is too long
    // TODO: Check if prompt is illegal in some way (PORN, etc.)

    return true;
}

// Starts the visual loading of the image
function startLoading() {
    generatingImg = true;
}

// Stops the visual loading of the image
function stopLoading() {
    generatingImg = false;
}

// Stops the visual loading of the image AND alerts the user of the error
function errorOccured(message) {
    stopLoading();

    // TODO: Alert the user of the error
}
