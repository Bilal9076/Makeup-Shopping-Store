import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import confrimScreen,{ScreenOption as confrimScreenScreenOptions} from '../Screen/Admin/ConfrimUserScreen'
const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const UserconfrimationStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
               <Stack.Screen
                name="Confrim Screen"
                component={confrimScreen}
                options={confrimScreenScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default UserconfrimationStack;