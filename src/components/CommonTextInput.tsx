import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {AppColors} from 'common/appColors';
import {AppFonts} from 'common/appFonts';

const HEIGHT_MULTI = 90;
const HEIGHT_DEFAULT = 50;
interface Props {
  placeholder?: string;
  multiline?: boolean;
  containerStyles?: StyleProp<ViewStyle>;
  value?: string;
  name?: string;
  onChange?: (value: string, name: string) => void;
  errorText?: string;
}

const CommoneTextInput = (props: Props) => {
  const onChange = (value: string) => {
    props.onChange?.(value, props.name ?? '');
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            height: props.multiline ? HEIGHT_MULTI : HEIGHT_DEFAULT,
          },
          props.containerStyles,
        ]}>
        <TextInput
          placeholder={props.placeholder}
          multiline={props.multiline}
          placeholderTextColor={AppColors.subTitle}
          style={styles.inputStyles}
          onChangeText={onChange}
          value={props.value}
        />
      </View>
      {props.errorText ? (
        <Text style={styles.errorText}>{props.errorText}</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: AppColors.inputBorder,
    borderRadius: 8,
  },
  inputStyles: {
    fontSize: 15,
    fontFamily: AppFonts.MontserratRegular,
  },
  errorText: {
    marginTop: 5,
    color: 'red',
    fontSize: 12,
    fontFamily: AppFonts.MontserratRegular,
  },
});
export default CommoneTextInput;
