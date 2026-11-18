
const garden = document.getElementById("garden");
const message = document.getElementById("message");

let flowers = [];
let removalTimer;
let idleTimer;

// Pixel art designs
const flowerDesign = [
    "000P000",
    "00PPP00",
    "0PPYPP0",
    "00PPP00",
    "000G000",
    "000G000",
    "000G000",
    "00LGL00",
    "0000000"
];

// Different flower colors
const colors = [
    "#ff729f",
    "#ffdf63",
    "#c99aff",
    "#ffffff",
    "#ff914d",
    "#ff5c5c"
];

// Plant a flower
function plantFlower(x, y) {

    const flower = document.createElement("div");

    flower.classList.add("flower");

    const color = colors[
        Math.floor(Math.random() * colors.length)
    ];

    flower.style.setProperty("--petal-color", color);

    // Random rotation
    flower.style.rotate =
        Math.floor(Math.random() * 30 - 15) + "deg";

    flower.style.left = x + "px";
    flower.style.top = y + "px";

    // Create pixel art
    flowerDesign.forEach(row => {

        row.split("").forEach(pixel => {

            const square = document.createElement("div");

            square.classList.add("pixel");

            if (pixel === "P") {
                square.classList.add("petal");
            }

            if (pixel === "Y") {
                square.classList.add("center");
            }

            if (pixel === "G") {
                square.classList.add("stem");
            }

            if (pixel === "L") {
                square.classList.add("leaf");
            }

            flower.appendChild(square);

        });

    });

    garden.appendChild(flower);

    flowers.push(flower);

    updateSky();
}

// Change the background based on flower count
function updateSky() {

    const amount = Math.min(flowers.length / 30, 1);

    // Transition from black to light blue
    const red = Math.round(135 * amount);
    const green = Math.round(206 * amount);
    const blue = Math.round(235 * amount);

    document.body.style.backgroundColor =
        `rgb(${red}, ${green}, ${blue})`;

    // Change the instructions
    if (flowers.length > 0) {
        message.style.opacity = "0";
    } else {
        message.style.opacity = "0.6";
    }
}

// Mouse click plants a flower in a random position
document.addEventListener("click", function(event) {

    // Stop flowers from disappearing
    clearTimeout(idleTimer);
    clearInterval(removalTimer);

    // Generate random screen coordinates
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    // Plant flower at random position
    plantFlower(x, y);

    // Wait until the user stops clicking
    idleTimer = setTimeout(function() {

        startRemovingFlowers();

    }, 3000);

});


// Remove flowers one by one
function startRemovingFlowers() {

    removalTimer = setInterval(function() {

        if (flowers.length === 0) {

            clearInterval(removalTimer);
            updateSky();
            return;

        }

        // Remove the oldest flower
        const flower = flowers.shift();

        flower.classList.add("disappearing");

        setTimeout(function() {
            flower.remove();
        }, 500);

        updateSky();

    }, 350);

}
