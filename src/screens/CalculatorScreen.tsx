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
  const [number, setNumber] = useState('0');

  const lastOperation = useRef<Operators>();

  const clearNumber = () => {
    setNumber('0');
    setPrevNumber('0');
  };

  const onSetNumber = (actionText: string) => {
    if (number.includes('.') && actionText === '.') {
      return;
    }

    if (number.startsWith('0') || number.startsWith('-0')) {
      if (actionText === '.') {
        setNumber(number + actionText);
      } else if (actionText === '0' && number.includes('.')) {
        setNumber(number + actionText);
      } else if (actionText !== '0' && !number.includes('.')) {
        setNumber(actionText);
      } else if (actionText === '0' && !number.includes('.')) {
        setNumber(number);
      } else {
        setNumber(number + actionText);
      }
    } else {
      setNumber(number + actionText);
    }
  };

  const negativeOrPositive = () => {
    if (number.includes('-')) {
      setNumber(number.replace('-', ''));
    } else {
      setNumber('-' + number);
    }
  };

  const delNumber = () => {
    if (number === '0') {
      return;
    }

    let negative = '';
    let tempNumber = number;

    if (number.includes('-')) {
      negative = '-';
      tempNumber = number.substring(1);
    }

    if (tempNumber.length > 1) {
      setNumber(negative + tempNumber.slice(0, -1));
    } else {
      setNumber('0');
    }
  };

  const setPreviousNumber = () => {
    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1));
    } else {
      setPrevNumber(number);
    }
    setNumber('0');
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

  return (
    <View style={styles.calculatorContainer}>
      {prevNumber !== '0' && (
        <Text style={styles.smallResult}>{prevNumber}</Text>
      )}
      <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
        {number}
      </Text>

      <View style={styles.buttonRow}>
        <ButtonCalc label="C" color="gray" onAction={clearNumber} />
        <ButtonCalc label="+/-" color="gray" onAction={negativeOrPositive} />
        <ButtonCalc label="Del" color="gray" onAction={delNumber} />
        <ButtonCalc label="/" color="orange" onAction={divideButton} />
      </View>

      <View style={styles.buttonRow}>
        <ButtonCalc label="7" onAction={onSetNumber} />
        <ButtonCalc label="8" onAction={onSetNumber} />
        <ButtonCalc label="9" onAction={onSetNumber} />
        <ButtonCalc label="x" color="orange" onAction={multiplyButton} />
      </View>

      <View style={styles.buttonRow}>
        <ButtonCalc label="4" onAction={onSetNumber} />
        <ButtonCalc label="5" onAction={onSetNumber} />
        <ButtonCalc label="6" onAction={onSetNumber} />
        <ButtonCalc label="-" color="orange" onAction={subtractButton} />
      </View>

      <View style={styles.buttonRow}>
        <ButtonCalc label="1" onAction={onSetNumber} />
        <ButtonCalc label="2" onAction={onSetNumber} />
        <ButtonCalc label="3" onAction={onSetNumber} />
        <ButtonCalc label="+" color="orange" onAction={addButton} />
      </View>

      <View style={styles.buttonRow}>
        <ButtonCalc label="0" longButton onAction={onSetNumber} />
        <ButtonCalc label="." onAction={onSetNumber} />
        <ButtonCalc label="=" color="orange" onAction={onSetNumber} />
      </View>
    </View>
  );
};
