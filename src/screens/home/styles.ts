import {StyleSheet} from 'react-native';
import {AppColors} from 'common/appColors';
import {AppFonts} from 'common/appFonts';
import {AppStyles} from 'common/appStyles';

export const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: AppColors.white,
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  btnArrow: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppColors.btnBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgArrow: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtHeader: {
    fontSize: 20,
    fontFamily: AppFonts.MontserratMedium,
    color: AppColors.title,
  },
  txtSubHeader: {
    fontSize: 12,
    color: AppColors.subTitle,
  },
  center: {
    alignItems: 'center',
  },
  itemStyles: {
    height: 95,
    marginBottom: 16,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryView: {
    backgroundColor: 'white',
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 3,
    marginRight: 12,
  },
  txtTime: {
    fontSize: 12,
    fontFamily: AppFonts.MontserratLight,
    color: AppColors.subTitle,
  },
  txtEventName: {
    fontSize: 16,
    fontFamily: AppFonts.MontserratMedium,
    color: AppColors.title,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtNote: {
    fontSize: 12,
    fontFamily: AppFonts.MontserratLight,
    color: AppColors.subTitle,
  },
  txtViewMore: {
    fontSize: 12,
    fontFamily: AppFonts.MontserratLight,
    color: AppColors.subTitle,
    fontStyle: 'italic',
  },
  marginTop: {
    marginTop: AppStyles.paddingApp,
  },
  startTime: {
    flex: 1,
    marginRight: 7,
    marginTop: AppStyles.paddingApp,
  },
  endTime: {
    flex: 1,
    marginLeft: 7,
    marginTop: AppStyles.paddingApp,
  },
  iconSwitch: {
    width: 42,
    height: 24,
  },
  remindMe: {
    fontSize: 14,
    fontFamily: AppFonts.MontserratRegular,
  },
  selectCategory: {
    fontSize: 17,
    color: AppColors.title,
    fontFamily: AppFonts.MontserratMedium,
    marginTop: 16,
  },
  categoryList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  itemCate: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inforCate: {
    paddingHorizontal: 13,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtCate: {
    fontSize: 14,
    fontFamily: AppFonts.MontserratMedium,
    color: AppColors.title,
  },
  bgCate: {
    opacity: 0.07,
    height: '100%',
    flex: 1,
    paddingHorizontal: 13,
    borderRadius: 11,
    position: 'absolute',
    width: '100%',
  },
  txtAddNewEvent: {
    fontSize: 20,
    fontFamily: AppFonts.MontserratMedium,
    textAlign: 'center',
    color: AppColors.title,
    marginVertical: 20,
  },
  txtCreateEvent: {
    fontSize: 16,
    fontFamily: AppFonts.MontserratBold,
    textAlign: 'center',
    color: AppColors.white,
  },
  btnCreateEvent: {
    height: 50,
    padding: AppStyles.paddingApp,
    backgroundColor: AppColors.primary,
    borderRadius: 7,
    marginTop: 47,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPlus: {
    width: 51,
    height: 51,
    backgroundColor: AppColors.primary,
    borderRadius: 25.5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 16,
  },
  iconPlus: {
    width: 20,
    height: 20,
  },
  marginRight5: {
    marginRight: 5,
  },
  containerModal: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    flex: 1,
  },
  contentModal: {
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 30,
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  flex: {
    flex: 1,
  },
  loading: {
    paddingVertical: 10,
  },
  contentContainerStyle: {
    paddingBottom: 67,
  },
});
