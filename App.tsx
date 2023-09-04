import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import ShoppingCart from './src/screens/ShoppingCart';
import {GlobalProvider} from './src/context/GlobalState';

const Stack = createStackNavigator();

const App: React.FC = () => {
	return (
		<GlobalProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Cart" component={ShoppingCart} />
				</Stack.Navigator>
			</NavigationContainer>
		</GlobalProvider>
	);
};

export default App;
