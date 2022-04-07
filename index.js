const url = "https://www.thecolorapi.com/scheme?hex=245678&count=10";
const boxes = document.querySelectorAll(".color-box");

fetchData(url).then(async (response) => {
    const colors = await response.colors;
    const clickedBoxes = [];
    const main = document.getElementById("main");

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = colors[i].hex.value;

        boxes[i].addEventListener("click", function (e) {
            const color = e.target.style.backgroundColor;
            navigator.clipboard.writeText(color);

            if (typeof clickedBoxes[0] !== "undefined")
                clickedBoxes[0].classList.remove("box-shadow");
            clickedBoxes[0] = e.target;
            clickedBoxes[0].classList.add("box-shadow");

            addHeaderText(color, main);
        });
    }
});

document.getElementById("button").addEventListener("click", () => {
    const colorCode = document.getElementById("colorInput").value.substring(1);
    colorCode.padEnd(6, "0");
    fetchData(
        `https://www.thecolorapi.com/scheme?hex=${colorCode}&count=10`
    ).then(async (response) => {
        const colors = await response.colors;
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].style.backgroundColor = colors[i].hex.value;
        }
    });
});

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function addHeaderText(color, parent) {
    let head = document.getElementById("h1");
    if (head !== null) {
        head.innerText = "Copied " + color;
        head.style.color = color;
    } else {
        head = document.createElement("h1");
        head.id = "h1";
        head.innerText = "Copied " + color;
        head.style.color = color;
        parent.insertBefore(head, parent.firstChild);
    }
}
