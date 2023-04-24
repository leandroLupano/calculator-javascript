
// Asigno variables para cada elemento del HTML:

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const displayPreviousValue = document.querySelector(".display-previous");
const displayCurrentValue = document.querySelector(".display-current");
const deleteAllButton = document.querySelector(".delete-all");
const deletePreviousButton = document.querySelector(".delete-previous");
const equalButton = document.querySelector(".equal");



// Creo la clase con las variables y métodos para dar funcionalidad a la calculadora:

class Calculator {

    constructor (displayPreviousValue, displayCurrentValue) {
        this.displayPreviousValue = displayPreviousValue;
        this.displayCurrentValue = displayCurrentValue;
        this.allClear();

        
    };

    allClear() {
        this.currentValue = "";
        this.previousValue = "";
        this.operator = "";

    };

    deletePrevious() {
        this.currentValue = this.currentValue.toString().slice(0, -1);
    }

    addNumber(number) {
        if (number === "." && this.currentValue.includes(".")) return;
        if(number === "0" && this.currentValue === "0") return;
        if (number === "." && this.currentValue === "") {
            this.currentValue = "0" + number.toString();            
        } else {
            this.currentValue = this.currentValue.toString() + number.toString();
        }
    }

    updateDisplay() {
        this.displayCurrentValue.textContent = this.currentValue;
        this.displayPreviousValue.textContent = `${this.previousValue} ${this.operator}`;

    }

    selectOperation(operator) {
        if (this.currentValue === "") return;
        if (this.previousValue !== "") {
            this.mathOperation();
        }

        this.operator = operator;
        this.previousValue = this.currentValue;
        this.currentValue = "";

    }

    mathOperation() {
        let result;
        const currenNumber = parseFloat(this.currentValue);
        const previousNumber = parseFloat(this.previousValue);

        if (isNaN(currenNumber) || isNaN(previousNumber)) return;

        switch(this.operator) {

            case "+":
                result = previousNumber + currenNumber;
            break;

            case "-":
                result = previousNumber - currenNumber;
                break;

            case "X":
                result = previousNumber * currenNumber;
                break;

            case "%":
                result = previousNumber / currenNumber;
                break;

            default:
                return;
        }

        this.currentValue = result;
        this.previousValue = "";
        this.operator = "";
    }


}



// Creo el objeto calculadora:

const calculator = new Calculator(displayPreviousValue, displayCurrentValue);



// Agrego las funcionalidades de cada botón:

numberButtons.forEach( (button) => {
    button.addEventListener("click", () => {
        calculator.addNumber(button.textContent);
        calculator.updateDisplay();
    });
});


operatorButtons.forEach( (button) => {
    button.addEventListener("click", () => {
        calculator.selectOperation(button.textContent);
        calculator.updateDisplay();
    });
});


equalButton.addEventListener("click", () => {
    calculator.mathOperation();
    calculator.updateDisplay();
});


deleteAllButton.addEventListener("click", () => {
    calculator.allClear();
    calculator.updateDisplay();
});


deletePreviousButton.addEventListener("click", () => {
    calculator.deletePrevious();
    calculator.updateDisplay();
});
