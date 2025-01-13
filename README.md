# MimmicGoogleSheets
a web page that mimics the functionality of Google Sheets involves building an interactive spreadsheet application that allows users to input data, format cells, and perform basic calculations.


For Mimmicing GoogleSheet With having few functionalities in it 


# Google Sheet Clone

This README provides an overview of the Google Sheet Clone project, outlining the features and usage instructions.

-> Features

- **Text Formatting**:
  - **Bold**: Toggle bold formatting on selected cells.
  - **Italic**: Toggle italic formatting on selected cells.
  - **Increase/Decrease Font Size**: Adjust font size of selected cells.

- **Mathematical Functions**:
  - **SUM, AVERAGE, MAX, MIN, COUNT**: Apply mathematical functions to selected cells.
  - **Formula Bar**: Enter formulas directly into selected cells.

- **Data Quality Functions**:
  - **TRIM**: Remove extra spaces from cell contents.
  - **UPPERCASE/LOWERCASE**: Convert text to uppercase or lowercase.
  - **REMOVE DUPLICATES**: Remove duplicate values from selected cells.
  - **FIND & REPLACE**: Find and replace text within selected cells.


- **Cell Styling**:
  - **Font Color**: Change font color of selected cells.
  - **Background Color**: Change background color of selected cells.

- **Row and Column Management**:
  - **Add/Delete Row**: Add or delete rows in the spreadsheet.
  - **Add/Delete Column**: Add or delete columns in the spreadsheet.

- **Search**:
  - **Search Function**: Highlight cells containing the search term.

- **Save and Load**:
  - **Save**: Save the current spreadsheet data to a JSON file.
  - **Load**: Load spreadsheet data from a JSON file.

## Usage

1. **Text Formatting**:        Select cells or single cell and click the respective buttons (Bold, Italic, Font Size).
2. **Mathematical Functions**: Select Multiplecells, choose a function from the dropdown, and click "Apply" Then the result will be popup as alert message at 
                               Middle of screen.
3. **FormulaBar**  :           For formula bar,Select the multiple cells for what cells u want u made opertion like(sum,min,max,avg function ) by simply typing 
                               that above keywords in the formula bar ,while selecting datacells please select one empty cell to display the opertion result in 
                               it.which means if i want to make sum opertion for 2 cells then with that two cells i can choose another third cell(the third cell 
                               which is empty cell either left or right or below the data cell and this cell is helpful for display result).  
4. **Data Quality Functions**: Select cells, choose a function from the dropdown, and click "Apply".
5. **Cell Styling**:           Select cells or cell, Click on the color pickers to change font and background colors.
6. **Row/Column Management**:  Click the respective buttons to add or delete rows/columns,  The rows will add&delete takes place From bottom of Sheet  And the 
                               column add& Deletion takes place at Right side end of Sheet.
7. **Search**:                 Click the search icon, enter the search term, if that term is present in the sheet then it highlight matching cells with yellow 
                               else it shows an message no result found.
8. **Save/Load**:              Use the save and load buttons to manage spreadsheet data,For save option once clicked it save in our system,for load sheet it needs 
                               to be in json format only if its then it fetches the data else it shows an message like "Please Select a .json file.
