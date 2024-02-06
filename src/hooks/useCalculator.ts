import { useRef, useState } from 'react';

enum Operators {
  add,
  subtract,
  multiply,
  divide,
}

export const useCalculator = () => {
  const [previousNumber, setPreviousNumber] = useState('0');
  const [currentNumber, setCurrentNumber] = useState('0');

  const lastOperation = useRef<Operators>();

  const clearScreen = () => {
    setPreviousNumber('0');
    setCurrentNumber('0');
  };

  const negativeOrPositive = () => {
    if (currentNumber === 'Not a number') {
      return;
    }

    if (currentNumber.includes('-')) {
      setCurrentNumber(currentNumber.replace('-', ''));
    } else {
      setCurrentNumber('-' + currentNumber);
    }
  };

  const deleteNumber = () => {
    if (currentNumber === '0') {
      return;
    }

    if (currentNumber === 'Not a number') {
      clearScreen();
      return;
    }

    let negative = '';
    let tempNumber = currentNumber;

    if (currentNumber.includes('-')) {
      negative = '-';
      tempNumber = currentNumber.substring(1);
    }

    if (tempNumber.length > 1) {
      setCurrentNumber(negative + tempNumber.slice(0, -1));
    } else {
      setCurrentNumber('0');
    }
  };

  const setNumber = (actionText: string) => {
    if (currentNumber === 'Not a number') {
      return;
    }

    if (currentNumber.includes('.') && actionText === '.') {
      return;
    }

    const startsWithZero =
      currentNumber.startsWith('0') || currentNumber.startsWith('-0');

    if (!startsWithZero) {
      setCurrentNumber(currentNumber + actionText);
      return;
    }

    if (actionText === '0' && currentNumber.includes('.')) {
      setCurrentNumber(currentNumber + actionText);
    } else if (actionText === '0' && !currentNumber.includes('.')) {
      return;
    } else if (actionText !== '0' && !currentNumber.includes('.')) {
      setCurrentNumber(actionText);
    } else {
      setCurrentNumber(currentNumber + actionText);
    }
  };

  const setPrevNumber = () => {
    if (currentNumber.endsWith('.')) {
      setPreviousNumber(currentNumber.slice(0, -1));
    } else {
      setPreviousNumber(currentNumber);
    }
    setCurrentNumber('0');
  };

  const divideButton = () => {
    setPrevNumber();
    lastOperation.current = Operators.divide;
  };

  const multiplyButton = () => {
    setPrevNumber();
    lastOperation.current = Operators.multiply;
  };

  const subtractButton = () => {
    setPrevNumber();
    lastOperation.current = Operators.subtract;
  };

  const addButton = () => {
    setPrevNumber();
    lastOperation.current = Operators.add;
  };

  const calculate = () => {
    const prevNum = Number(previousNumber);
    const currNum = Number(currentNumber);

    if (isNaN(currNum)) {
      return;
    }

    if (isNaN(prevNum)) {
      setCurrentNumber('Not a number');
      setPreviousNumber('0');
      return;
    }

    switch (lastOperation.current) {
      case Operators.add:
        setCurrentNumber(`${prevNum + currNum}`);
        break;
      case Operators.subtract:
        setCurrentNumber(`${prevNum - currNum}`);
        break;
      case Operators.multiply:
        setCurrentNumber(`${prevNum * currNum}`);
        break;
      case Operators.divide:
        if (prevNum === 0 && currNum === 0) {
          return;
        }
        if (prevNum !== 0 && currNum === 0) {
          setCurrentNumber('Not a number');
          setPreviousNumber('0');
          return;
        }

        setCurrentNumber(`${prevNum / currNum}`);
        break;
    }

    setPreviousNumber('0');
  };

  return {
    previousNumber,
    currentNumber,
    clearScreen,
    negativeOrPositive,
    deleteNumber,
    setNumber,
    divideButton,
    multiplyButton,
    subtractButton,
    addButton,
    calculate,
  };
};
