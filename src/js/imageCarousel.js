/*
 * This file is for the image carousel on the landing page.
 * It is responsible for displaying the images and their associated text
 * Created by: Andrew Gallimore, 4/11/2024
 */

// NOTE: BASE_URL is defined in the index.html file, and is updated to the correct path by the gulp.js build script

// The list of images and their associated text
var images = [
    {
        src: BASE_URL + "img/generated/img1.png",
        text: "Plateau landscape, llamas, shrubs and grasses, natural colors."
    },
    {
        src: BASE_URL + "img/generated/img2.png",
        text: "Redwoods, mushrooms, and banana slugs in the fog"
    },
    {
        src: BASE_URL + "img/generated/img3.png",
        text: "Vibrant steampunk giant clock, gears, and mythical creatures on a flying turtle"
    },
    {
        src: BASE_URL + "img/generated/img4.png",
        text: "Black and white street photography of a rainy night in New York"
    },
    {
        src: BASE_URL + "img/generated/img5.png",
        text: "Submarine in the sky abstract fantasy art"
    },
    {
        src: BASE_URL + "img/generated/img6.png",
        text: "Masterpiece, smiling happy girl with necklace on collarbone, wavy red hair, freckles, and ponytail. With blurry foreground, intricate dappled sunlight, just upper body"
    },
    {
        src: BASE_URL + "img/generated/img7.png",
        text: "Abstract of how musicians visualize music flowing, with highs and lows, sharp corners and smooth movements"
    },
    {
        src: BASE_URL + "img/generated/img8.png",
        text: "A portal to a dream of another galaxy, matte painting, futuristic and mysterious"
    },
];

// Choosing a random image to start with
var currentImageIndex = Math.floor(Math.random() * images.length);
var nextImageIndex = (currentImageIndex + 1) % images.length;

window.addEventListener('DOMContentLoaded', () => {
    // Start the next image loading
    addImage(images[nextImageIndex].src, images[nextImageIndex].text);

    // Changing the image every 8 seconds
    setInterval(() => {
        if(contentState == 0) {
            changeImage();
        }
    }, 8000);
    setTimeout(() => {
        changeImage();
    }, 850);
});

/*
 * Changes the image to the next image in the carousel.
 * Has the side effect of changing the UI to reflect the new image
 */
function changeImage() {
    console.log("Changing image...")
    // Incrementing the image index
    currentImageIndex = (currentImageIndex + 1) % images.length;
    nextImageIndex = (currentImageIndex + 1) % images.length;

    var current = document.querySelector(".carousel .image-size .img-wrapper.current");
    var next = document.querySelector(".carousel .image-size .img-wrapper.next");
    
    // Adding the animation to the current & next image
    if(current !== null) current.classList.remove("flip-diagonal-2-tl-in");
    if(current !== null) current.classList.add("flip-diagonal-2-tl-out");
    next.classList.add("flip-diagonal-2-tl-in");
    
    // Waiting for the animation to finish
    setTimeout(() => {
        // Removing the current image
        if(current !== null) current.remove();
        
        // Making the next image the next image
        next.classList.remove("next");
        next.classList.add("current");
        
        // Starting the next image loading
        addImage(images[nextImageIndex].src, images[nextImageIndex].text);
    }, 500);
};

/*
 * Adds new image to the carousel
 * @param {string} src - The src of the new image
 * @param {string} text - The text to display with the image
 * Has the side effect of adding the new image to the carousel behind the scenes (so it has time to load)
 */
function addImage(src, text) {
    console.log("Adding img: " + src);
    // Creating the new image element
    var newImg = document.querySelector(".carousel .image-size template").content.cloneNode(true);
    newImg.querySelector("img").src = src;
    newImg.querySelector("img").alt = 'Image Generated from "' + text + '"';
    newImg.querySelector(".img-wrapper").classList.add("next");

    // TODO: Add the text to the new image

    // Adding the new image to the carousel
    // document.querySelector(".carousel .image-size").insertBefore(newImg, document.querySelector(".carousel .image-size").firstChild);
    document.querySelector(".carousel .image-size").appendChild(newImg);
    resizeImage();
}