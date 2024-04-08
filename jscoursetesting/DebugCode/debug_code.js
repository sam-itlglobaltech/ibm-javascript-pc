<script>
function performOperation() {
// Get user input from input fields
// Retrieves numerical values entered by the user from HTML input fields (input1 and
// input2). Validates that the entered values are valid numbers. If both values are
// valid numbers, it calls the multiply() function passing these values, otherwise,
// it displays an error message.
let num1 = parseInt(document.getElementById('input1').value);
let num2 = parseInt(document.getElementById('input2').value);
// Check if inputs are valid numbers
if (!isNaN(num1) && !isNaN(num2)) {
// Perform the operation
                let result = multiply(num1, num2);

                // Display the result
                displayResult(result);
            } else {
                displayResult('Please enter valid numbers');
            }
        }

        // Includes a debugger statement to pause code execution at this point for
        // debugging purposes. Multiplies two input numbers (a and b) and returns
        // the result.

        function multiply(a, b) {
            // Introduce a debugger statement to pause execution
            debugger;

            // Multiply the numbers
            return a * b;
        }

        // Displays the result of the multiplication or an error message in a
        // designated paragraph element (resultElement) on the webpage.

        function displayResult(result) {
            // Display the result in the paragraph element
            const resultElement = document.getElementById('result');
            resultElement.textContent = `The result is: ${result}`;
        }
    </script>