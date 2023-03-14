import AsyncStorage from '@react-native-async-storage/async-storage';

const EVENT_KEY = 'EVENT_KEY';

export const addData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(EVENT_KEY, jsonValue);
  } catch (e) {}
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(EVENT_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {}
};
