// Get references to the text box, "Add" button, and list items
const textBox = document.getElementById("text-box");
const addButton = document.getElementById("add-button");
const listItems = document.getElementById("list-items");

let itemCounter = 1; // Initialize a counter for list items

// Function to update task numbering
function updateTaskNumbers() {
    const listItemsArray = Array.from(listItems.querySelectorAll("li"));
    listItemsArray.forEach((item, index) => {
        const taskText = item.querySelector(".task-text");
        const currentText = taskText.textContent; // Get the current task text
        taskText.textContent = `Task #${index + 1}. ${currentText.substring(currentText.indexOf(". ") + 2)}`;
    });
}


// Function to reset task numbering
function resetTaskNumbering() {
    itemCounter = 1;
    updateTaskNumbers();
}

// Function to add a new task
function addNewTask(userText) {
    // Create a new list item element
    const listItem = document.createElement("li");

    // Create a delete button for each list item
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");

    // Add a click event listener to the delete button
    deleteButton.addEventListener("click", function() {
        listItem.remove(); // Remove the associated list item when the delete button is clicked
        updateTaskNumbers(); // Update task numbering after deletion

        // Check if all tasks are deleted
        if (listItems.children.length === 0) {
            // If all tasks are deleted, refresh the page
            window.location.reload();
        }
    });

    // Create a span element to hold the user text
    const userTextSpan = document.createElement("span");
    userTextSpan.classList.add("task-text");
    userTextSpan.textContent = `Task #${itemCounter}. ${userText}`;

    // Create a space element for some gap
    const spaceElement = document.createElement("span");
    spaceElement.textContent = " ";

    // Create a dustbin icon
    const dustbinIcon = document.createElement("i");
    dustbinIcon.classList.add("fas", "fa-trash-alt");

    // Append the user text, space element, and dustbin icon to the list item
    listItem.appendChild(userTextSpan);
    listItem.appendChild(spaceElement);
    listItem.appendChild(dustbinIcon);

    // Adjust the background color based on item number (same as before)
    const bgColor = getColorForItem(itemCounter);
    listItem.style.backgroundColor = bgColor;

    // Append the delete button and list item to the ordered list
    listItem.appendChild(deleteButton);
    listItems.appendChild(listItem);

    // Increment the counter for the next item
    itemCounter++;

    // Clear the text box and restore the placeholder
    textBox.value = "";
    textBox.placeholder = "Your preference";
}

// Call resetTaskNumbering when the page loads
window.addEventListener("load", function() {
    resetTaskNumbering();
});

// Add a click event listener to the "Add" button
addButton.addEventListener("click", function() {
    // Get the text entered by the user
    const userText = textBox.value;

    // Check if the user has entered text (not just spaces)
    if (userText.trim() !== "") {
        addNewTask(userText);
    } else if (listItems.children.length === 0) {
        // If there are no tasks and the user enters an empty task, add it as "Task #1"
        addNewTask("Your task text");
    }
});

// Function to get background color based on item number (same as before)
function getColorForItem(itemNumber) {
    const minColorValue = 50;
    const maxColorValue = 200;
    const colorStep = (maxColorValue - minColorValue) / itemCounter;
    const greenValue = maxColorValue - colorStep * (itemNumber - 1);
    return `rgb(0, ${greenValue}, 0)`;
}
