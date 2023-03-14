import moment from 'moment';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppStyles} from 'common/appStyles';
import {AppImages} from 'common/appImages';
import {styles} from '../styles';

interface Props {
  date: Date;
  setDate: (value: number) => void;
}

const Header = (props: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: insets.top,
        },
      ]}>
      <TouchableOpacity
        activeOpacity={AppStyles.activeOpacity}
        style={styles.btnArrow}
        onPress={() => props?.setDate(-1)}>
        <Image
          source={AppImages.IC_ARROW}
          style={[
            styles.imgArrow,
            {
              transform: [{rotate: '180deg'}],
            },
          ]}
        />
      </TouchableOpacity>
      <View style={styles.center}>
        <Text style={styles.txtHeader}>
          {moment(props.date).format('MMMM')}
        </Text>
        <Text style={styles.txtSubHeader}>
          {moment(props.date).format('YYYY')}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={AppStyles.activeOpacity}
        style={styles.btnArrow}
        onPress={() => props?.setDate(1)}>
        <Image source={AppImages.IC_ARROW} style={styles.imgArrow} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
