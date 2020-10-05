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
				console.log(`Guardando token ${action.payload.token}`)
				await AsyncStorage.setItem("token", action.payload.token)
			}
			setToken()
			return {
				...state,
				...action.payload,
            }
        case "LOGOUT_USER":
			const removeToken = async () => {
				await AsyncStorage.removeItem("token")
			}
			removeToken()
			return {
				...initialState
            }
        case "LOAD_CART":
			if(action.payload.length === 0) localStorage.removeItem('items')
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
        default:
                return state
        }
}