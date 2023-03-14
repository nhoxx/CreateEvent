import moment from 'moment';
import React, {useState} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {AppColors} from 'common/appColors';
import {AppFonts} from 'common/appFonts';
import {AppImages} from 'common/appImages';
import {AppStyles} from 'common/appStyles';

interface Props {
  placeholder?: string;
  multiline?: boolean;
  containerStyles?: StyleProp<ViewStyle>;
  value?: string;
  mode: 'date' | 'time' | 'datetime';
  name?: string;
  isMinDate?: boolean;
  errorText?: string;
  onChange?: (value: number, name: string) => void;
}

const CommonDateTimePicker = (props: Props) => {
  const [open, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(prev => !prev);
  };

  const onChange = (value: Date) => {
    const date = moment(value).valueOf();
    props.onChange?.(date, props.name ?? '');
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleClick}
        activeOpacity={AppStyles.activeOpacity}
        style={[styles.container, props.containerStyles]}>
        <Text
          style={[
            styles.fontSize15,
            {
              fontFamily: AppFonts.MontserratRegular,
              color: props.value ? undefined : AppColors.subTitle,
            },
          ]}>
          {props.value
            ? moment(props.value).format(
                props.mode === 'date' ? 'DD/MM/YYYY' : 'HH:mm',
              )
            : props.placeholder}
        </Text>
        <Image
          source={
            props.mode === 'date' ? AppImages.IC_CALENDAR : AppImages.IC_CLOCK
          }
          style={props.mode === 'date' ? styles.iconDate : styles.iconTime}
        />
      </TouchableOpacity>
      {props.errorText ? (
        <Text style={styles.errorText}>{props.errorText}</Text>
      ) : null}
      <DatePicker
        modal
        open={open}
        date={new Date(props.value ?? Date.now())}
        mode={props.mode}
        minimumDate={props.isMinDate ? new Date() : undefined}
        onCancel={handleClick}
        onConfirm={onChange}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: AppColors.inputBorder,
    borderRadius: 8,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputStyles: {
    fontSize: 15,
    fontFamily: AppFonts.MontserratRegular,
  },
  iconDate: {
    width: 16,
    height: 18,
  },
  iconTime: {
    width: 16,
    height: 16,
  },
  fontSize15: {
    fontSize: 15,
  },
  errorText: {
    marginTop: 5,
    color: 'red',
    fontSize: 12,
    fontFamily: AppFonts.MontserratRegular,
  },
});
export default CommonDateTimePicker;
