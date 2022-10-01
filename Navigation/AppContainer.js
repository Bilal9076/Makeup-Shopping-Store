import React from 'react';
import { useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import ProductNavigator from './ProductNavigator';
import AdminNavigator from './AdminNavigator';
import StartStack from './StartStack'


const AppContainer = () =>{

       const AmdinIsAuth = useSelector(state => !!state.AmdinAuth.token);
       const AmdindidTryAutoLogin = useSelector(state=>!!state.AmdinAuth.didTryAutoLogin);
       const UserIsAuth =  useSelector(state => !!state.Auth.token);
       const UserdidTryAutoLogin = useSelector(state => !!state.Auth.didTryAutoLogin);
       
       return(
              <NavigationContainer>
                     {/* <AdminNavigator/> */}
                     {  !UserIsAuth && !AmdinIsAuth && <StartStack/> }
                     {!UserIsAuth && AmdinIsAuth && <AdminNavigator/>} 
                     {UserIsAuth && !AmdinIsAuth && <ProductNavigator/>}

                     {/* {!AmdinIsAuth && !StudentIsAuth && <StartStack/> }
                     {!StudentIsAuth && AmdinIsAuth && <AdminNavigator/>} 
                     {!AmdinIsAuth && StudentIsAuth && <UserNavigator/>} */}
              </NavigationContainer>
       )
};

export default AppContainer;