import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppImages} from 'common/appImages';
import {AppStyles} from 'common/appStyles';
import {getData} from 'database/storage';
import {RespType_Event} from 'domain/entities/event';
import {styles} from './styles';
import EventForm from './widgets/EventForm';
import EventItem from './widgets/EventItem';
import Header from './widgets/Header';
import {AppColors} from 'common/appColors';

const HomeScreen = () => {
  const [date, setDateTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<RespType_Event[]>();

  useEffect(() => {
    _getCurrentData(moment().month());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _queryData = async ({month}: {month?: number}) => {
    const currentData = await getData();
    let newData = currentData ?? [];
    if (currentData) {
      newData = currentData.filter(
        (x: RespType_Event) => moment(x.date).month() === month,
      );
    }
    return newData;
  };

  const _sortBy = (res: RespType_Event[]) => {
    let result: RespType_Event[] = [];
    if (data) {
      result = res.sort(function (x: RespType_Event, y: RespType_Event) {
        return y.created_at - x.created_at;
      });
    }
    return result;
  };

  const _getCurrentData = async (month: number) => {
    try {
      setLoading(true);
      let newResult: RespType_Event[] = [];
      newResult = await _queryData({month});
      newResult = _sortBy(newResult);
      setData(newResult);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const _handleShowModal = () => {
    setShowModal(prev => !prev);
  };

  const _handleDate = (value: number) => {
    const newDate = moment(date).add(value, 'M').format();
    _getCurrentData(moment(newDate).month());
    setDateTime(new Date(newDate));
  };

  const _onSubmit = (dateTime?: number) => {
    setDateTime(new Date(dateTime ?? Date.now()));
    _getCurrentData(moment(dateTime).month());
  };

  return (
    <View style={styles.conatiner}>
      <Header date={date} setDate={_handleDate} />
      <FlatList
        data={data}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          isLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator size={'small'} color={AppColors.primary} />
            </View>
          ) : null
        }
        renderItem={({item, index}) => <EventItem item={item} index={index} />}
        keyExtractor={(item, index) => `HomeScreen${index.toString()}`}
      />
      <TouchableOpacity
        onPress={_handleShowModal}
        activeOpacity={AppStyles.activeOpacity}
        style={styles.btnPlus}>
        <Image source={AppImages.IC_PLUS} style={styles.iconPlus} />
      </TouchableOpacity>
      <Modal transparent visible={showModal} animationType={'slide'}>
        <EventForm onSubmit={_onSubmit} onCancel={_handleShowModal} />
      </Modal>
    </View>
  );
};

export default HomeScreen;
