const addBlockBtn = document.getElementById("add-block-btn");
addBlockBtn.addEventListener("click", () => {
    // Create new elements
    const colorBlock = document.createElement("div");
    const colorInput = document.createElement("input");
    const deleteBtn = document.createElement("button");

    // Set class and attributes for new elements
    colorBlock.className = "color-block";
    colorBlock.style.backgroundColor = "#000000";
    colorInput.className = "color-input";
    colorInput.placeholder = "Enter a hex color value...";
    deleteBtn.className = "delete-block-btn";
    deleteBtn.textContent = "×";

    // Insert new elements into the DOM
    document.body.insertBefore(colorBlock, addBlockBtn);
    colorBlock.appendChild(colorInput);
    colorBlock.appendChild(deleteBtn);

    // Add event listener for new input element
    colorInput.addEventListener("input", () => {
        const hexValue = colorInput.value;
        if (/^#[0-9A-F]{6}$/i.test(hexValue)) {
            colorBlock.style.backgroundColor = hexValue;
            localStorage.setItem("colorBlock" + document.querySelectorAll(".color-block").length + "HexValue", hexValue);
        } else {
            colorBlock.style.backgroundColor = "#000000";
            localStorage.removeItem("colorBlock" + document.querySelectorAll(".color-block").length + "HexValue");
        }
    });

    // Add event listener for new delete button
    deleteBtn.addEventListener("click", () => {
        colorBlock.remove();
        localStorage.removeItem("colorBlock" + document.querySelectorAll(".color-block").length + "HexValue");
    });

    // Add event listener for new color block element
    colorBlock.addEventListener("click", () => {
        const showcase = document.querySelector(".showcase");
        const showcaseColor = document.querySelector(".showcase-color");

        // Set showcase color to match clicked color block
        showcaseColor.style.backgroundColor = colorBlock.style.backgroundColor;

        // Show showcase
        showcase.style.display = "block";

        // Add event listener for showcase to hide on click
        showcase.addEventListener("click", () => {
            showcase.style.display = "none";
        });
    });
});

// Retrieve saved color blocks from localStorage
function getSavedColorBlocks() {
    const savedColorBlocks = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("colorBlock")) {
            const index = parseInt(key.slice(10, key.length - 8));
            const hexValue = localStorage.getItem(key);
            savedColorBlocks.push({ index, hexValue });
        }
    }
    return savedColorBlocks;
}

// Initialize existing and saved color blocks
const savedColorBlocks = getSavedColorBlocks();
const colorBlockContainer = document.createElement("div");
colorBlockContainer.id = "color-block-container";
document.body.insertBefore(colorBlockContainer, addBlockBtn);
for (let i = 0; i < savedColorBlocks.length; i++) {
    const savedColorBlock = savedColorBlocks[i];
    const colorBlock = document.createElement("div");
    const colorInput = document.createElement("input");
    const deleteBtn = document.createElement("button");

    // Set class and attributes for new elements
    colorBlock.className = "color-block";
    colorBlock.style.backgroundColor = savedColorBlock.hexValue;
    colorInput.className = "color-input";
    colorInput.placeholder = "Enter a hex color value...";
    colorInput.value = savedColorBlock.hexValue;
    deleteBtn.className = "delete-block-btn";
    deleteBtn.textContent = "×";

    // Insert new elements into the DOM
    document.body.insertBefore(colorBlock, addBlockBtn);
    colorBlock.appendChild(colorInput);
    colorBlock.appendChild(deleteBtn);

    // Add event listener for existing input element
    colorInput.addEventListener("input", (event) => {
        event.stopPropagation();

        const hexValue = colorInput.value;
        if (/^#[0-9A-F]{6}$/i.test(hexValue)) {
            colorBlock.style.backgroundColor = hexValue;
            localStorage.setItem("colorBlock" + (i + 1) + "HexValue", hexValue);
        } else {
            colorBlock.style.backgroundColor = "#000000";
            localStorage.removeItem("colorBlock" + (i + 1) + "HexValue");
        }
    });

    // Add event listener for new delete button
    deleteBtn.addEventListener("click", (event) => {
        colorBlock.remove();
        event.stopPropagation();
        localStorage.removeItem("colorBlock" + document.querySelectorAll(".color-block").length + "HexValue");
    });

    // Add event listener for existing color block element
    colorBlock.addEventListener("click", () => {
        const showcase = document.querySelector(".showcase");
        const showcaseColor = document.querySelector(".showcase-color");

        // Set showcase color to match clicked color block
        showcaseColor.style.backgroundColor = colorBlock.style.backgroundColor;

        // Show showcase
        showcase.style.display = "block";

        // Add event listener to hide showcase when clicking outside of it
        document.addEventListener("click", (event) => {
            if (showcase.contains(event.target)) {
                showcase.style.display = "none";
            }
        });
    });
}

// Add event listener for delete button
const deleteBtns = document.querySelectorAll(".delete-btn");
for (let i = 0; i < deleteBtns.length; i++) {
	const deleteBtn = deleteBtns[i];
	const colorBlock = deleteBtn.parentNode;
	deleteBtn.addEventListener("click", () => {
		colorBlock.remove();
		localStorage.removeItem("colorBlock" + (i + 1) + "HexValue");
	});
}