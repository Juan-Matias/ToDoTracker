import { StyleSheet, Dimensions } from "react-native";

const COLORS = {
  gray: '#6f6f6f',
  white: '#ffffff',
  blue: '#5897fb',
  red: '#f33d3d',
  borderGray: '#e4e4e4',
};

const Style = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: COLORS.gray,
  },
  text: {
    fontSize: 20,
    color: COLORS.gray,
  },
  textDone: {
    fontSize: 20,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
  },
  whiText: {
    fontSize: 20,
    color: COLORS.white,
  },
  textInput: {
    borderColor: COLORS.gray,
    borderWidth: 1,
    width: Dimensions.get('screen').width * 0.6,
    borderRadius: 15,
    paddingLeft: 15,
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    width: Dimensions.get('screen').width * 0.25,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  scrollContainer: {
    marginTop: 20,
  },
  itemContainer: {
    paddingVertical: 20,
    borderBottomColor: COLORS.borderGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  removeButton: {
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
  },
});

export default Style;
