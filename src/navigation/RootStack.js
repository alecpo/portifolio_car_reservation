import { createStackNavigator } from "@react-navigation/stack";
import MainStack from "./MainStack";
import HelloModalScreen from "../screens/HelloModalScreen";

const RootStack = createStackNavigator(
  {
    Main: MainStack,
    HelloModal: HelloModalScreen
  },
  {
    initialRouteName: "Main",
    mode: "modal",
    headerMode: "none"
  }
);

export default RootStack;
