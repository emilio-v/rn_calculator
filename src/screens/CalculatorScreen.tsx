import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../theme/appTheme';
import { ButtonCalc } from '../components';
import { useCalculator } from '../hooks/useCalculator';

export const CalculatorScreen = () => {
  const {
    addButton,
    calculate,
    clearScreen,
    currentNumber,
    deleteNumber,
    divideButton,
    multiplyButton,
    negativeOrPositive,
    previousNumber,
    setNumber,
    subtractButton,
  } = useCalculator();

  return (
    <View style={styles.calculatorContainer}>
      {previousNumber !== '0' && (
        <Text style={styles.smallResult}>{previousNumber}</Text>
      )}
      <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
        {currentNumber}
      </Text>

      <View style={styles.buttonRow}>
        <ButtonCalc label="C" color="gray" onAction={clearScreen} />
        <ButtonCalc label="+/-" color="gray" onAction={negativeOrPositive} />
        <ButtonCalc label="Del" color="gray" onAction={deleteNumber} />
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
