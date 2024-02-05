import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';

interface ButtonCalcProps {
  label: string;
  color?: keyof typeof colors;
  longButton?: boolean;
}

export const ButtonCalc = ({
  label,
  color = 'darkGray',
  longButton = false,
}: ButtonCalcProps) => {
  const textColor = useMemo(
    () => (color === 'gray' ? 'black' : 'white'),
    [color],
  );
  const buttonWidth = useMemo(() => (longButton ? 180 : 80), [longButton]);

  return (
    <TouchableOpacity>
      <View
        style={{
          ...styles.button,
          backgroundColor: colors[color],
          width: buttonWidth,
        }}
      >
        <Text
          style={{
            ...styles.buttonText,
            color: textColor,
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.darkGray,
    borderRadius: 100,
    height: 80,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    fontWeight: '300',
    fontSize: 30,
    padding: 10,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
    paddingHorizontal: 10,
  },
});
