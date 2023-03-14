import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {RespType_Event} from 'domain/entities/event';
import {convertDate, getColorCategory} from 'utils/Func';
import {styles} from '../styles';

interface Props {
  item: RespType_Event;
  index: number;
}

const EventItem = (props: Props) => {
  const {item, index} = props;
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [numLines, setNumLines] = useState(undefined) as any;

  const toggleTextShown = () => {
    setTextShown(!textShown);
  };

  useEffect(() => {
    setNumLines(textShown ? undefined : 3);
  }, [textShown]);

  const onTextLayout = useCallback(
    (e: {nativeEvent: {lines: string | any[]}}) => {
      if (e.nativeEvent.lines.length > 1 && !textShown) {
        setShowMoreButton(true);
        setNumLines(1);
      }
    },
    [textShown],
  );
  const color = getColorCategory(item.category);
  return (
    <View style={styles.itemStyles} key={`EventItem${index}`}>
      <View style={styles.rowCenter}>
        <View style={[styles.categoryView, {borderColor: color}]} />
        <Text style={styles.txtTime}>{`${convertDate(
          item.date,
          'DD/MM',
        )}  ${convertDate(item.start_time, 'HH:mm')}-${convertDate(
          item.end_time,
          'HH:mm',
        )}`}</Text>
      </View>
      <Text style={styles.txtEventName}>{item.eventName}</Text>
      <View style={styles.rowBetween}>
        <Text
          ellipsizeMode="tail"
          onTextLayout={onTextLayout}
          numberOfLines={numLines}
          style={[
            styles.txtNote,
            {
              width: textShown ? '100%' : '80%',
            },
          ]}>
          {item.notes}
        </Text>
        {showMoreButton && !textShown ? (
          <Text style={styles.txtViewMore} onPress={toggleTextShown}>
            {'View More'}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
export default EventItem;
