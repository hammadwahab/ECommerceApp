import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ShoppingCartScreen from './src/screens/ShoppingCartScreen';
import {GlobalProvider} from './src/context/GlobalState';

const Stack = createStackNavigator();

const App: React.FC = () => {
	return (
		<GlobalProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Cart" component={ShoppingCartScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</GlobalProvider>
	);
};

export default App;
