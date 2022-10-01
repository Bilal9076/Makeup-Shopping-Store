import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import Colors from '../../Constants/Colors';
import * as CustomerAuthActions from '../../Store/Action/CustomerAuthAction';


const CustomerStartupScreen=({ navigation })=> {
  const dispatch = useDispatch();

  useEffect(() => {
    const TryLogin = async () => {
      const userData = await AsyncStorage.getItem('CustomerData');
      if (!userData) {
        dispatch(CustomerAuthActions.DidTryAutoLogin());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(CustomerAuthActions.DidTryAutoLogin());
        return;
   
      }
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      // props.navigation.navigate('Doctor Details');
      dispatch(CustomerAuthActions.CustomerAuthenticate(userId, token, expirationTime));
    };

    TryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CustomerStartupScreen;

