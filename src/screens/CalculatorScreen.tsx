import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../theme/appTheme';
import { ButtonCalc } from '../components';

export const CalculatorScreen = () => {
  return (
    <View style={styles.calculatorContainer}>
      <Text style={styles.smallResult}>1,500.00</Text>
      <Text style={styles.result}>1,500.00</Text>

      <View style={styles.buttonRow}>
        <ButtonCalc label="C" color="gray" />
        <ButtonCalc label="+/-" color="gray" />
        <ButtonCalc label="Del" color="gray" />
        <ButtonCalc label="/" color="orange" />
      </View>

      <View style={styles.buttonRow}>
        <ButtonCalc label="7" />
        <ButtonCalc label="8" />
        <ButtonCalc label="9" />
        <ButtonCalc label="x" color="orange" />
      </View>

      <View style={styles.buttonRow}>
        <ButtonCalc label="4" />
        <ButtonCalc label="5" />
        <ButtonCalc label="6" />
        <ButtonCalc label="-" color="orange" />
      </View>

      <View style={styles.buttonRow}>
        <ButtonCalc label="1" />
        <ButtonCalc label="2" />
        <ButtonCalc label="3" />
        <ButtonCalc label="+" color="orange" />
      </View>

      <View style={styles.buttonRow}>
        <ButtonCalc label="0" longButton />
        <ButtonCalc label="." />
        <ButtonCalc label="=" color="orange" />
      </View>
    </View>
  );
};
