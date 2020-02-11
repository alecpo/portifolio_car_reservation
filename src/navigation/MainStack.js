import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import FriendsScreen from "../screens/FriendsScreen";

const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
    Friends: FriendsScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerStyle: {
        backgroundColor: "#118800"
      },
      headerTintColor: "#fff"
    }
  }
);

export default MainStack;
