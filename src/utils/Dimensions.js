import { Dimensions } from "react-native";

const fullHeight = Dimensions.get("window").height;
const fullWidth = Dimensions.get("window").width;

const heightRef = fullHeight / 820;
const widthRef = fullHeight / 375;

export { fullHeight, fullWidth, heightRef, widthRef };