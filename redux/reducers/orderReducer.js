import AsyncStorage from "@react-native-community/async-storage"

const initialState = {
	shippingAddress:{},
	billingAddress: {}
}

export default orderReducer =(state = initialState, action) => {
	switch (action.type) {
		case "SET_SHIPPING":	
			return {
				...state,
				shippingAddress: action.payload,
			}
		case "SET_BILLING":	
			return {
				...state,
				billingAddress: action.payload,
			}
		
		default:
			return state
	}
}

