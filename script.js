const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
  const postX = e.clientX;
  const postY = e.clientY;

  cursorDot.style.left = `${postX}px`;
  cursorDot.style.top = `${postY}px`;

  // cursorOutline.style.left = `${postX}px`;
  // cursorOutline.style.top = `${postY}px`;
  cursorOutline.animate(
    {
      left: `${postX}px`,
      top: `${postY}px`,
    },
    { duration: 500, fill: "forwards" }
  );
});

document.addEventListener("DOMContentLoaded", () => {
  const inputBox = document.getElementById("inputbox");
  const buttons = document.querySelectorAll("button");
  const outputBox = document.getElementById("outputbox");
  const historyList = document.getElementById("history-list");
  let currentInput = "";
  let history = [];

  // Handle button clicks
  buttons.forEach((button) => {
    button.addEventListener("click", () => handleInput(button.innerText));
  });

  function handleInput(value) {
    if (value === "AC") {
      currentInput = "";
      outputBox.textContent = "Result: 0";
    } else if (value === "=") {
      try {
        const result = eval(currentInput);
        addToHistory(`${currentInput} = ${result}`);
        outputBox.textContent = `Ans: ${result}`;
      } catch {
        outputBox.textContent = "Result: Error";
      }
    } else if (value === "Del") {
      currentInput = currentInput.slice(0, -1);
    } else if (value === "x^2") {
      currentInput = Math.pow(parseFloat(currentInput), 2).toString();
    } else {
      currentInput += value;
    }

    inputBox.value = currentInput || "0";
  }

  function addToHistory(entry) {
    // Add new entry to the history array
    history.push(entry);

    // Limit the history to the last 10 entries
    if (history.length > 10) {
      history.shift();
    }

    // Update the history display
    updateHistoryDisplay();
  }

  function updateHistoryDisplay() {
    // Clear the existing history list
    historyList.innerHTML = "";

    // Add each history entry as a list item
    history.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      historyList.appendChild(li);
    });
  }
});
