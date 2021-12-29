let calcurationStack = null;
let operatorStore = "";
let presentMode = false;
const plus = (a, b) => a + b;
const minus = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operatorCheck = [
  { key: "÷", fn: divide },
  { key: "+", fn: plus },
  { key: "-", fn: minus },
  { key: "×", fn: multiply }
];

function getDomInnerText(dom) {
  return dom.innerText;
}

function resetCalcuration(resultDom) {
  calcurationStack = null;
  operatorStore = "";
  presentMode = false;
  resultDom.innerText = 0;
}

function presentCalcuration(resultDom, numberDom) {
  const clickNumber = getDomInnerText(numberDom);
  const resultNumber = getDomInnerText(resultDom);
  const presentNumber = !presentMode
    ? clickNumber
    : `${resultNumber}${clickNumber}`;
  presentMode = true;
  resultDom.innerText = presentNumber;
}

function operateCalcuration(resultDom, operatorDom) {
  const nowOperator = getDomInnerText(operatorDom);
  if (
    nowOperator === operatorStore ||
    (calcurationStack === null && nowOperator === "")
  ) {
    return;
  }

  const presentNumber = Number(getDomInnerText(resultDom));

  if (calcurationStack !== null) {
    const nowOperate = operatorCheck.find((obj) => obj.key === operatorStore)
      .fn;
    const calcNumber = nowOperate(calcurationStack, presentNumber);
    calcurationStack = calcNumber;
  } else {
    calcurationStack = presentNumber;
  }

  operatorStore = nowOperator;

  presentMode = false;
  resultDom.innerText = calcurationStack;
  if (nowOperator === "=") {
    calcurationStack = null;
    operatorStore = "";
  }
}

function main() {
  const result = document.querySelector(".result");
  const ac = document.querySelector(".ac");
  const numbers = document.querySelectorAll(".number");
  const operators = document.querySelectorAll(".operator");

  numbers.forEach((numberDom) => {
    numberDom.addEventListener("click", () =>
      presentCalcuration(result, numberDom)
    );
  });

  operators.forEach((operator) => {
    operator.addEventListener("click", () =>
      operateCalcuration(result, operator)
    );
  });

  ac.addEventListener("click", () => resetCalcuration(result));
}

document.addEventListener("DOMContentLoaded", main);
