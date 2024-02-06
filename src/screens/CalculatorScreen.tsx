import React, { useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../theme/appTheme';
import { ButtonCalc } from '../components';

enum Operators {
  add,
  subtract,
  multiply,
  divide,
}

export const CalculatorScreen = () => {
  const [prevNumber, setPrevNumber] = useState('0');
  const [currNumber, setCurrNumber] = useState('0');

  const lastOperation = useRef<Operators>();

  const clearNumber = () => {
    setCurrNumber('0');
    setPrevNumber('0');
  };

  const setNumber = (actionText: string) => {
    if (currNumber.includes('.') && actionText === '.') {
      return;
    }

    if (currNumber.startsWith('0') || currNumber.startsWith('-0')) {
      if (actionText === '.') {
        setCurrNumber(currNumber + actionText);
      } else if (actionText === '0' && currNumber.includes('.')) {
        setCurrNumber(currNumber + actionText);
      } else if (actionText !== '0' && !currNumber.includes('.')) {
        setCurrNumber(actionText);
      } else if (actionText === '0' && !currNumber.includes('.')) {
        setCurrNumber(currNumber);
      } else {
        setCurrNumber(currNumber + actionText);
      }
    } else {
      setCurrNumber(currNumber + actionText);
    }
  };

  const negativeOrPositive = () => {
    if (currNumber.includes('-')) {
      setCurrNumber(currNumber.replace('-', ''));
    } else {
      setCurrNumber('-' + currNumber);
    }
  };

  const delNumber = () => {
    if (currNumber === '0') {
      return;
    }

    let negative = '';
    let tempNumber = currNumber;

    if (currNumber.includes('-')) {
      negative = '-';
      tempNumber = currNumber.substring(1);
    }

    if (tempNumber.length > 1) {
      setCurrNumber(negative + tempNumber.slice(0, -1));
    } else {
      setCurrNumber('0');
    }
  };

  const setPreviousNumber = () => {
    if (currNumber.endsWith('.')) {
      setPrevNumber(currNumber.slice(0, -1));
    } else {
      setPrevNumber(currNumber);
    }
    setCurrNumber('0');
  };

  const divideButton = () => {
    setPreviousNumber();
    lastOperation.current = Operators.divide;
  };

  const multiplyButton = () => {
    setPreviousNumber();
    lastOperation.current = Operators.multiply;
  };

  const subtractButton = () => {
    setPreviousNumber();
    lastOperation.current = Operators.subtract;
  };

  const addButton = () => {
    setPreviousNumber();
    lastOperation.current = Operators.add;
  };

  const calculate = () => {
    const prevNum = Number(prevNumber);
    const currNum = Number(currNumber);

    switch (lastOperation.current) {
      case Operators.add:
        if (isNaN(prevNum)) {
          setCurrNumber('Not a number');
          setPrevNumber('0');
          return;
        }
        setCurrNumber(`${prevNum + currNum}`);
        break;
      case Operators.subtract:
        if (isNaN(prevNum)) {
          setCurrNumber('Not a number');
          setPrevNumber('0');
          return;
        }
        setCurrNumber(`${prevNum - currNum}`);
        break;
      case Operators.multiply:
        if (isNaN(prevNum)) {
          setCurrNumber('Not a number');
          setPrevNumber('0');
          return;
        }
        setCurrNumber(`${prevNum * currNum}`);
        break;
      case Operators.divide:
        if (prevNum === 0 && currNum === 0) {
          return;
        }
        if (isNaN(prevNum) || (prevNum !== 0 && currNum === 0)) {
          setCurrNumber('Not a number');
          setPrevNumber('0');
          return;
        }

        setCurrNumber(`${prevNum / currNum}`);
        break;
    }

    setPrevNumber('0');
  };

  return (
    <View style={styles.calculatorContainer}>
      {prevNumber !== '0' && (
        <Text style={styles.smallResult}>{prevNumber}</Text>
      )}
      <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
        {currNumber}
      </Text>

      <View style={styles.buttonRow}>
        <ButtonCalc label="C" color="gray" onAction={clearNumber} />
        <ButtonCalc label="+/-" color="gray" onAction={negativeOrPositive} />
        <ButtonCalc label="Del" color="gray" onAction={delNumber} />
        <ButtonCalc label="/" color="orange" onAction={divideButton} />
      </View>

      <View style={styles.buttonRow}>
        <ButtonCalc label="7" onAction={setNumber} />
        <ButtonCalc label="8" onAction={setNumber} />
        <ButtonCalc label="9" onAction={setNumber} />
        <ButtonCalc label="x" color="orange" onAction={multiplyButton} />
      </View>

      <View style={styles.buttonRow}>
        <ButtonCalc label="4" onAction={setNumber} />
        <ButtonCalc label="5" onAction={setNumber} />
        <ButtonCalc label="6" onAction={setNumber} />
        <ButtonCalc label="-" color="orange" onAction={subtractButton} />
      </View>

      <View style={styles.buttonRow}>
        <ButtonCalc label="1" onAction={setNumber} />
        <ButtonCalc label="2" onAction={setNumber} />
        <ButtonCalc label="3" onAction={setNumber} />
        <ButtonCalc label="+" color="orange" onAction={addButton} />
      </View>

      <View style={styles.buttonRow}>
        <ButtonCalc label="0" longButton onAction={setNumber} />
        <ButtonCalc label="." onAction={setNumber} />
        <ButtonCalc label="=" color="orange" onAction={calculate} />
      </View>
    </View>
  );
};
