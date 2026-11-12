let myText = document.getElementById("myText");

function changeText() {
    myText.textContent = "You clicked the button!";
    document.body.style.backgroundColor = "lightblue";
}

document.getElementById("changeButton").addEventListener("click", changeText);
