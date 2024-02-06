import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../theme/appTheme';
import { ButtonCalc } from '../components';

export const CalculatorScreen = () => {
  const [prevNumber, setPrevNumber] = useState('0');
  const [number, setNumber] = useState('0');

  const clearNumber = () => setNumber('0');

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
        setNumber(number);
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

  return (
    <View style={styles.calculatorContainer}>
      <Text style={styles.smallResult}>{prevNumber}</Text>
      <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
        {number}
      </Text>

      <View style={styles.buttonRow}>
        <ButtonCalc label="C" color="gray" onAction={clearNumber} />
        <ButtonCalc label="+/-" color="gray" onAction={negativeOrPositive} />
        <ButtonCalc label="Del" color="gray" onAction={onSetNumber} />
        <ButtonCalc label="/" color="orange" onAction={onSetNumber} />
      </View>

      <View style={styles.buttonRow}>
        <ButtonCalc label="7" onAction={onSetNumber} />
        <ButtonCalc label="8" onAction={onSetNumber} />
        <ButtonCalc label="9" onAction={onSetNumber} />
        <ButtonCalc label="x" color="orange" onAction={onSetNumber} />
      </View>

      <View style={styles.buttonRow}>
        <ButtonCalc label="4" onAction={onSetNumber} />
        <ButtonCalc label="5" onAction={onSetNumber} />
        <ButtonCalc label="6" onAction={onSetNumber} />
        <ButtonCalc label="-" color="orange" onAction={onSetNumber} />
      </View>

      <View style={styles.buttonRow}>
        <ButtonCalc label="1" onAction={onSetNumber} />
        <ButtonCalc label="2" onAction={onSetNumber} />
        <ButtonCalc label="3" onAction={onSetNumber} />
        <ButtonCalc label="+" color="orange" onAction={onSetNumber} />
      </View>

      <View style={styles.buttonRow}>
        <ButtonCalc label="0" longButton onAction={onSetNumber} />
        <ButtonCalc label="." onAction={onSetNumber} />
        <ButtonCalc label="=" color="orange" onAction={onSetNumber} />
      </View>
    </View>
  );
};
