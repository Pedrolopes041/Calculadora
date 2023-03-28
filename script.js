const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

// A classe está servindo para fazer a persistencia dos numero do previousOperandTextElement e currentOperandTextElement

class Calculator {
  // O constructor serve para passar as propriedades que vão ser utilizadas na classe
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.previousOperand} ${
      this.operation || ""
    }`;
    this.currentOperandTextElement.innerText = this.currentOperand;
  }
  //Colocar um numero no final basicamente
  appendNumber(number) {
    //para so colocar o pontinho 1 vez
    if (this.currentOperand.includes(".") && number === ".") return;

    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  calculate() {
    let resultado;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if(isNaN(_currentOperand) || isNaN(_previousOperand)) return;

    switch (this.operation) {
      case "+":
        resultado = _previousOperand + _currentOperand;
        break;
      case "-":
        resultado = _previousOperand - _currentOperand;
        break;
      case "*":
        resultado = _previousOperand * _currentOperand;
        break;
      case "÷":
        resultado = _previousOperand / _currentOperand;
        break;
      default:
        return;
    }
    this.currentOperand = resultado;
    this.operation = undefined;
    this.previousOperand = "";
  }
  //Função para pegar o valor das operações
  chooseOperation(operation) {

    if (this.currentOperand == "") return;

    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operation = operation;

    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  // dando error
  delete() {
    this.currentOperand = this.currentOperand.slice(0,-1);
  }
}

// Instaciando a classe
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

//Função para quando a gente clica nos numeros
for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });

  // função para quando clicar no botão de limpar
  allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
  });

  equalsButton.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
  });
// dando error 
  deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
  });
}
