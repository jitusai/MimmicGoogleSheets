document.addEventListener("DOMContentLoaded", function () {
  const spreadsheet = document.getElementById("spreadsheet");
  const dependencies = new Map(); // Track cell dependencies
  const defaultFontSize = 14;
  const defaultRowCount = 20;
  const defaultColCount = 10;

  initializeSpreadsheet(defaultRowCount, defaultColCount);
  // Create a 10 * 20  grid
  function initializeSpreadsheet(rows, cols) {
    spreadsheet.innerHTML = "";
    for (let i = 0; i < rows; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < cols; j++) {
        const cell = document.createElement("td");
        cell.contentEditable = true;
        cell.setAttribute(
          "data-cell",
          `${String.fromCharCode(65 + j)}${i + 1}`
        );
        cell.setAttribute("data-type", "text");
        row.appendChild(cell);
      }
      spreadsheet.appendChild(row);
    }
    attachCellListeners();
  }
  function attachCellListeners() {
    document.querySelectorAll("td").forEach((cell) => {
      cell.addEventListener("click", function () {
        clearSelection();
        this.classList.toggle("selected");
      });
      cell.addEventListener("blur", function () {
        validateCell(this);
      });
    });
  }
  /*  Code For Bold Button*/

  document.getElementById("boldButton").addEventListener("click", function () {
    const selectedCells = getSelectedCells();
    selectedCells.forEach((cell) => {
      const currentWeight = window.getComputedStyle(cell).fontWeight;
      cell.style.fontWeight = currentWeight === "bold" ? "normal" : "bold";
    });
  });
  /*  End For Bold Button*/

  /* Code For Italic Button*/

  document
    .getElementById("italicButton")
    .addEventListener("click", function () {
      const selectedCells = getSelectedCells();
      selectedCells.forEach((cell) => {
        const currentStyle = window.getComputedStyle(cell).fontStyle;
        cell.style.fontStyle = currentStyle === "italic" ? "normal" : "italic";
      });
    });
  /* End For Italic Button*/

  /* Code for Font _Size Increaser Button*/
  document
    .getElementById("increaseFontButton")
    .addEventListener("click", function () {
      const selectedCells = getSelectedCells();
      selectedCells.forEach((cell) => {
        const currentSize = parseInt(window.getComputedStyle(cell).fontSize);
        cell.style.fontSize = currentSize + 2 + "px";
      });
    });
  /* End for Font _Size Increaser Button*/
  /* Code For Font _Size Deccreaser Button*/
  document
    .getElementById("decreaseFontButton")
    .addEventListener("click", function () {
      const selectedCells = getSelectedCells();
      selectedCells.forEach((cell) => {
        const currentSize = parseInt(window.getComputedStyle(cell).fontSize);
        if (currentSize > 8) {
          // Prevent font size from getting too small
          cell.style.fontSize = currentSize - 2 + "px";
        }
      });
    });
  /* End For Font _Size Deccreaser Button*/
  /*Function For E-Sum Button(Sum,Avg,max,Min,Count)*/
  function getNumericValuesFromCells(cells) {
    return Array.from(cells)
      .map((cell) => parseFloat(cell.innerText))
      .filter((value) => !isNaN(value));
  }

  function applyFunctionToCells() {
    const cells = document.querySelectorAll("td.selected");
    const values = getNumericValuesFromCells(cells);
    const selectedFunction = document.getElementById(
      "mathFunctionSelector"
    ).value;

    let result;

    switch (selectedFunction) {
      case "sum":
        result = values.reduce((acc, val) => acc + val, 0);
        break;
      case "average":
        result = values.length
          ? values.reduce((acc, val) => acc + val, 0) / values.length
          : 0;
        break;
      case "max":
        result = values.length ? Math.max(...values) : "No values";
        break;
      case "min":
        result = values.length ? Math.min(...values) : "No values";
        break;
      case "count":
        result = cells.length;
        break;
      default:
        result = "Invalid Function";
    }

    alert(`${selectedFunction.toUpperCase()}: ${result}`);
  }
  /*End For E-Sum Button(Sum,Avg,max,Min,Count)*/
  /* Code For DataQuality Button*/
  document
    .getElementById("applyFunctionButton")
    .addEventListener("click", applyFunctionToCells);
  function applyDataQualityFunction() {
    const selectedFunction = document.getElementById(
      "dataQualitySelector"
    ).value;
    const cells = document.querySelectorAll("td.selected");

    switch (selectedFunction) {
      case "trim":
        cells.forEach((cell) => {
          cell.innerText = cell.innerText.trim();
        });
        break;
      case "uppercase":
        cells.forEach((cell) => {
          cell.innerText = cell.innerText.toUpperCase();
        });
        break;
      case "lowercase":
        cells.forEach((cell) => {
          cell.innerText = cell.innerText.toLowerCase();
        });
        break;
      case "removeDuplicates":
        removeDuplicateValues(cells);
        break;
      case "findReplace":
        const findValue = document.getElementById("findInput").value;
        const replaceValue = document.getElementById("replaceInput").value;
        cells.forEach((cell) => {
          cell.innerText = cell.innerText.replace(
            new RegExp(findValue, "g"),
            replaceValue
          );
        });
        break;
    }
  }
  /* Function For RemoveDuplicate Values*/
  function removeDuplicateValues(cells) {
    const uniqueValues = new Set();
    cells.forEach((cell) => {
      const value = cell.innerText;
      if (uniqueValues.has(value)) {
        cell.innerText = "";
      } else {
        uniqueValues.add(value);
      }
    });
  }
  /* End For RemoveDuplicate Values*/
  /* Function For Find&Replace Option*/
  document
    .getElementById("dataQualitySelector")
    .addEventListener("change", function () {
      const selectedValue = this.value;
      if (selectedValue === "findReplace") {
        document.getElementById("findInput").style.display = "inline-block";
        document.getElementById("replaceInput").style.display = "inline-block";
      } else {
        document.getElementById("findInput").style.display = "none";
        document.getElementById("replaceInput").style.display = "none";
      }
    });

  document
    .getElementById("applyDataQualityButton")
    .addEventListener("click", applyDataQualityFunction);
  /* End For Find&Replace Option*/
  /* End For DataQuality Button*/

  /* Fucntion For Formlua Bar*/

  function updateDependencies(cell) {
    const cellId = cell.getAttribute("data-cell");
    const formula = cell.innerText;
    const matches = formula.match(/([A-Z]\d+)/g);
    if (matches) {
      dependencies.set(cellId, matches);
      matches.forEach((dep) => {
        const depCell = document.querySelector(`[data-cell="${dep}"]`);
        if (depCell) {
          depCell.addEventListener("input", () => updateCell(cell));
        }
      });
    } else {
      dependencies.delete(cellId);
    }

    updateCell(cell);
  }

  function updateCell(cell) {
    const formula = cell.innerText;
    const matches = formula.match(/([A-Z]\d+)/g);

    if (matches) {
      let updatedValue = formula;
      matches.forEach((match) => {
        const depCell = document.querySelector(`[data-cell="${match}"]`);
        const depValue = depCell ? depCell.innerText : 0;
        updatedValue = updatedValue.replace(match, depValue);
      });

      try {
        cell.innerText = eval(updatedValue);
      } catch {
        cell.innerText = "ERROR";
      }
    }
  }

  /* Code For Formula Bar*/
  document.getElementById("Formula-Bar").addEventListener("input", function () {
    const selectedCells = getSelectedCells();
    const inputValue = this.value.trim().toUpperCase();

    // Parse and execute operations on selected cells
    if (selectedCells.length > 0) {
      try {
        const result = calculateDirectFormula(inputValue, selectedCells);
        selectedCells[selectedCells.length - 1].innerText = result;
      } catch (error) {
        selectedCells[selectedCells.length - 1].innerText = "Error";
      }
    }
  });

  function calculateDirectFormula(input, cells) {
    // Simple support for SUM, AVG, MIN, MAX on selected cells
    const values = Array.from(cells)
      .map((cell) => parseFloat(cell.innerText))
      .filter((v) => !isNaN(v));
    if (values.length === 0) throw new Error("No numeric values selected");

    let result;
    if (input.startsWith("SUM")) {
      result = values.reduce((acc, val) => acc + val, 0);
    } else if (input.startsWith("AVG")) {
      result = values.reduce((acc, val) => acc + val, 0) / values.length;
    } else if (input.startsWith("MIN")) {
      result = Math.min(...values);
    } else if (input.startsWith("MAX")) {
      result = Math.max(...values);
    } else {
      throw new Error("Unsupported operation");
    }
    return result;
  }
  /* End For Formlua Bar*/

  /* Code For FontColorButtton*/
  document
    .getElementById("fontColorButton")
    .addEventListener("input", function () {
      const selectedCells = getSelectedCells();
      selectedCells.forEach((cell) => {
        cell.style.color = this.value;
      });
    });
  /* End For FontColorButtton*/

  /* Code For BgColorButtton*/
  document
    .getElementById("bgColorButton")
    .addEventListener("input", function () {
      const selectedCells = getSelectedCells();
      selectedCells.forEach((cell) => {
        cell.style.backgroundColor = this.value;
      });
    });
  /* End For BgColorButtton*/

  // Add Row
  document
    .getElementById("addRowButton")
    .addEventListener("click", function () {
      const row = document.createElement("tr");
      const colCount = spreadsheet.rows[0].cells.length;
      for (let j = 0; j < colCount; j++) {
        const cell = document.createElement("td");
        cell.contentEditable = true;
        row.appendChild(cell);
      }
      spreadsheet.appendChild(row);
      attachCellListeners(); // Reattach listeners
    });

  // Delete Row
  document
    .getElementById("deleteRowButton")
    .addEventListener("click", function () {
      if (spreadsheet.rows.length > 0) {
        spreadsheet.deleteRow(-1); // Deletes the last row
      }
    });

  // Add Column
  document
    .getElementById("addColumnButton")
    .addEventListener("click", function () {
      Array.from(spreadsheet.rows).forEach((row) => {
        const cell = document.createElement("td");
        cell.contentEditable = true;
        row.appendChild(cell);
      });
      attachCellListeners(); // Reattach listeners
    });

  // Delete Column
  document
    .getElementById("deleteColumnButton")
    .addEventListener("click", function () {
      if (spreadsheet.rows[0].cells.length > 0) {
        Array.from(spreadsheet.rows).forEach((row) => {
          row.deleteCell(-1); // Deletes the last column
        });
      }
    });

  /* Code For Search Button*/

  document.getElementById("searchIcon").addEventListener("click", function () {
    const searchTerm = prompt("Enter search term:").toLowerCase();
    clearSearchHighlights();
    const cells = document.querySelectorAll("td");
    let found = false;
    cells.forEach((cell) => {
      if (cell.innerText.toLowerCase().includes(searchTerm)) {
        cell.classList.add("highlight");
        found = true;
      }
    });
    if (!found) {
      alert("No Result Found!");
    }
  });

  function clearSearchHighlights() {
    document.querySelectorAll("td.highlight").forEach((cell) => {
      cell.classList.remove("highlight");
    });
  }
  /*End of Serach Button*/
  /* Code For SaveButton & LoadButton*/
  document
    .getElementById("saveButton")
    .addEventListener("click", saveSpreadsheet);
  document
    .getElementById("loadButton")
    .addEventListener("click", loadSpreadsheet);

  function saveSpreadsheet() {
    const data = [];
    document.querySelectorAll("tr").forEach((row) => {
      const rowData = [];
      row.querySelectorAll("td").forEach((cell) => {
        rowData.push(cell.innerText);
      });
      data.push(rowData);
    });

    const dataStr = JSON.stringify(data);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "spreadsheet.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function loadSpreadsheet() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (file.type !== "application/json") {
          alert("Please select a JSON file.");
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            populateSpreadsheet(data);
          } catch (error) {
            alert("Error parsing JSON file. Please ensure it is a valid JSON.");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }

  function populateSpreadsheet(data) {
    spreadsheet.innerHTML = "";
    data.forEach((rowData, rowIndex) => {
      const row = document.createElement("tr");
      rowData.forEach((cellData, colIndex) => {
        const cell = document.createElement("td");
        cell.contentEditable = true;
        cell.innerText = cellData;
        cell.setAttribute(
          "data-cell",
          `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`
        );
        row.appendChild(cell);
      });
      spreadsheet.appendChild(row);
    });
    attachCellListeners();
  }
  /* End For SaveButton & LoadButton*/

  /* Code For Dragging Function*/
  let isDragging = false;
  let startCell = null;

  document.querySelectorAll("td").forEach((cell) => {
    cell.addEventListener("mousedown", function (e) {
      isDragging = true;
      startCell = this;
      clearSelection();
      this.classList.add("selected");
    });

    cell.addEventListener("mouseover", function (e) {
      if (isDragging) {
        this.classList.add("selected");
      }
    });

    cell.addEventListener("mouseup", function (e) {
      isDragging = false;
    });

    cell.addEventListener("click", function () {
      clearSelection();
      this.classList.toggle("selected");
    });

    cell.addEventListener("dragstart", (e) => e.preventDefault()); // Prevent default drag behavior
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });
  /* End For Dragging Function*/

  /*Function For SelectedCells*/
  function getSelectedCells() {
    return document.querySelectorAll("td.selected");
  }

  document.querySelectorAll("td").forEach((cell) => {
    cell.addEventListener("click", function () {
      clearSelection();
      this.classList.toggle("selected");
    });
  });

  /*Code For Clearing the Cells*/
  function clearSelection() {
    document.querySelectorAll("td.selected").forEach((cell) => {
      cell.classList.remove("selected");
    });
  }
});
