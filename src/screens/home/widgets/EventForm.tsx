import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppStyles} from 'common/appStyles';
import CommoneTextInput from 'components/CommonTextInput';
import {Event_Category} from 'domain/enum/event';
import en from 'i18n/en';
import {getColorCategory} from 'utils/Func';
import {styles} from '../styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import {addData, getData} from 'database/storage';
import {RespType_Event} from 'domain/entities/event';
import CommonDateTimePicker from 'components/CommonDateTimePicker';
import {AppColors} from 'common/appColors';

const defaultState = {
  eventName: '',
  date: undefined,
  start_time: undefined,
  end_time: undefined,
  created_at: undefined,
  reminds_me: false,
  category: Event_Category.Brainstorm,
  notes: '',
};

interface Props {
  onSubmit: (value?: number) => void;
  onCancel: () => void;
}

const EventForm = (props: Props) => {
  const [state, setState] = useState(defaultState);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const onChange = (value: any, name: string) => {
    const currentState = {...state} as any;
    currentState[name] = value;
    setState(currentState);
  };

  const checkValidation = () => {
    setIsSubmit(true);
    if (state.eventName.trim().length === 0) {
      return false;
    }
    if (!state.date) {
      return false;
    }
    if (state.start_time && state.end_time) {
      const minutesOfDay = function (m: moment.Moment) {
        return m.minutes() + m.hours() * 60;
      };
      const startTime = minutesOfDay(moment(state.start_time));
      const endTime = minutesOfDay(moment(state.end_time));
      if (startTime >= endTime) {
        Alert.alert('Message', 'End time greater than Start time');
        return false;
      }
    }
    return true;
  };

  const getParams = () => {
    const newDate = moment(state.date).format('DD/MM/YYYY');
    const startTime = moment(state.start_time).format('HH:mm');
    const endTime = moment(state.end_time).format('HH:mm');
    const newItem = {
      eventName: state.eventName,
      date: state.date,
      start_time: state.date
        ? moment(`${newDate} ${startTime}`, 'DD/MM/YYYY HH:mm').valueOf()
        : undefined,
      end_time: state.date
        ? moment(`${newDate} ${endTime}`, 'DD/MM/YYYY HH:mm').valueOf()
        : undefined,
      created_at: moment().valueOf(),
      reminds_me: state.reminds_me,
      category: state.category,
      notes: state.notes,
    };
    return newItem;
  };

  const onSubmit = async () => {
    if (checkValidation()) {
      setLoading(true);
      let newData = [] as RespType_Event[];
      const currentData = await getData();
      if (currentData) {
        newData = currentData as RespType_Event[];
      }
      newData.push(getParams());
      addData(newData);
      props.onCancel?.();
      props.onSubmit?.(state.date);
      setIsSubmit(false);
      setState(defaultState);
      setLoading(false);
    }
  };

  return (
    <View style={styles.containerModal}>
      <Pressable onPress={() => props.onCancel?.()} style={styles.flex} />
      <View style={styles.contentModal}>
        <KeyboardAwareScrollView>
          <Text style={styles.txtAddNewEvent}>{'Add New Event'}</Text>
          <CommoneTextInput
            placeholder={`${en.event_name}*`}
            onChange={onChange}
            value={state.eventName}
            name={'eventName'}
            errorText={
              state.eventName.trim().length === 0 && isSubmit
                ? 'The event name is required'
                : ''
            }
          />
          <CommoneTextInput
            containerStyles={styles.marginTop}
            placeholder={en.type_the_note_here}
            multiline
            onChange={onChange}
            value={state.notes}
            name={'notes'}
          />
          <CommonDateTimePicker
            mode={'date'}
            placeholder={`${en.date}*`}
            value={state.date}
            name={'date'}
            onChange={onChange}
            isMinDate
            containerStyles={styles.marginTop}
            errorText={!state.date && isSubmit ? 'The date is required' : ''}
          />
          <View style={styles.rowBetween}>
            <CommonDateTimePicker
              mode={'time'}
              placeholder={en.start}
              containerStyles={styles.startTime}
              value={state.start_time}
              name={'start_time'}
              onChange={onChange}
            />
            <CommonDateTimePicker
              mode={'time'}
              placeholder={en.end_time}
              containerStyles={styles.endTime}
              value={state.end_time}
              name={'end_time'}
              onChange={onChange}
            />
          </View>
          <View style={[styles.rowBetween, styles.marginTop]}>
            <Text style={styles.remindMe}>{en.reminds_me}</Text>
            <Switch
              onChange={() => onChange(!state.reminds_me, 'reminds_me')}
              value={state.reminds_me}
            />
          </View>
          <Text style={styles.selectCategory}>{en.select_catgeory}</Text>
          <View style={styles.categoryList}>
            {[
              Event_Category.Brainstorm,
              Event_Category.Design,
              Event_Category.Workout,
            ].map((item, index) => {
              const color = getColorCategory(item);
              return (
                <TouchableOpacity
                  activeOpacity={AppStyles.activeOpacity}
                  style={styles.itemCate}
                  onPress={() => onChange(item, 'category')}
                  key={`categoryList${index}`}>
                  <View style={styles.inforCate}>
                    <View
                      style={[
                        styles.categoryView,
                        styles.marginRight5,
                        {
                          borderColor: color,
                          backgroundColor:
                            item === state.category ? color : undefined,
                        },
                      ]}
                    />
                    <Text style={styles.txtCate}>{item}</Text>
                  </View>
                  <View
                    style={[
                      styles.bgCate,
                      {
                        backgroundColor: color,
                      },
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            onPress={onSubmit}
            style={styles.btnCreateEvent}
            activeOpacity={AppStyles.activeOpacity}>
            {isLoading ? (
              <ActivityIndicator
                size={'small'}
                color={AppColors.white}
                style={styles.marginRight5}
              />
            ) : null}
            <Text style={styles.txtCreateEvent}>{en.create_event}</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};
export default EventForm;
