const inputBox = document.getElementById("inputBox");
const buttons = document.querySelectorAll("button");

let expression = "";

// Function to update display
function updateDisplay() {
    inputBox.value = expression;
}

function handleInput(value) {

    if (value === "AC") {
        expression = "";
        updateDisplay();
    }

    else if (value === "DE") {
        expression = expression.slice(0, -1);
        updateDisplay();
    }

    else if (value === "=") {
        try {
            expression = eval(expression).toString();
            updateDisplay();
        } catch {
            expression = "";
            inputBox.value = "Error";
        }
    }

    else if (value === "%") {
        try {
            expression = (eval(expression) / 100).toString();
            updateDisplay();
        } catch {
            expression = "";
            inputBox.value = "Error";
        }
    }

    else {
        expression += value;
        updateDisplay();
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        handleInput(button.innerText);
    });
});


document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        ["+", "-", "*", "/", ".", "%"].includes(key)
    ) {
        handleInput(key);
    }

    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        handleInput("=");
    }

    else if (key === "Backspace") {
        handleInput("DE");
    }

    else if (key === "Escape") {
        handleInput("AC");
    }
});