window.addEventListener('resize', resizeImage);
window.addEventListener('load', resizeImage);
window.addEventListener('DOMContentLoaded', resizeImage);
window.addEventListener('zoom', resizeImage);

function resizeImage() {
    document.querySelectorAll('.image-size').forEach((el) => {
        // Get width and height of element
        const width = el.offsetWidth - 10;
        const height = el.offsetHeight - 10;

        var dim;
        if(width < height) {
            dim = width;
        }else {
            dim = height;
        }

        // Set the width and height of the img element to the same value
        el.querySelectorAll('.img-wrapper').forEach(element => {
            element.style.width = `${dim}px`;
            element.style.height = `${dim}px`;
        });


        // Also setting the loader animation to the same size
        if(el.querySelector('.loading-anim .content') !== null) {
            el.querySelector('.loading-anim .content').style.width = `${dim}px`;
            el.querySelector('.loading-anim .content').style.height = `${dim}px`;
        }
    });
}