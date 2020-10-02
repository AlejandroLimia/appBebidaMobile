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
			AsyncStorage.setItem("token", action.payload.token)

			return {
				...state,
				...action.payload,
            }
        case "LOGOUT_USER":
            AsyncStorage.removeItem("token")
			return {
				...initialState
            }
        case "LOAD_CART":
			if(action.payload.length === 0) localStorage.removeItem('items')
			else AsyncStorage.setItem('items', JSON.stringify(action.payload));
			return {
				...state,
				cart: action.payload,
		}
        default:
                return state
        }
}