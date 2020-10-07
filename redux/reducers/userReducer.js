import AsyncStorage from "@react-native-community/async-storage"

const initialState = {
	id: '',
	token: '',
	firstName: '',
	lastName: '',
	shippingAddress: '',
	billingAddress: '',
	wishlist: [],
	cart: [],
	phone:""
}

export default userReducer =(state = initialState, action) => {
    switch (action.type) {
		case "USER_IN":
			const setToken = async () => {
				console.log(`Guardando token`)
				await AsyncStorage.setItem("token", action.payload.token)
			}
			setToken()
			return {
				...state,
				...action.payload,
			}
			break;

        case "LOGOUT_USER":
			const clearAll = async () => {
				await AsyncStorage.clear()
			}
			clearAll()
			return {
				...initialState
			}
			break;

        case "LOAD_CART":
			
			if(action.payload.length === 0){
			const setCartt = async () => {
				await AsyncStorage.removeItem('items')
			}
			setCartt()
		   }
			else {
				const setCart = async () => {
					await AsyncStorage.setItem('items', JSON.stringify(action.payload));
				}
				setCart()
			}
			return {
				...state,
				cart: action.payload,
			}
			break;
        default:
                return state
        }
}