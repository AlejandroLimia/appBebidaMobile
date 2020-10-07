import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios"
import { RUTA_API } from "../../shared/constants"

const getCartItems = async () => {
	let items = (await AsyncStorage.getItem('items') === null) ? [] : JSON.parse(await AsyncStorage.getItem('items'));
	return items;
}

export const userActions = {
    createUser: (user, set = null) => {
		return async (dispatch, getState) => {
			const response = await axios.post(RUTA_API + '/api/user/register', user)

			if (response.data.success === "false") {
				set({ status: false })
				let errors = response.data.error.errors;
				if (errors.username !== undefined) alert(errors.username.message);
				if (errors.mail !== undefined) alert(errors.mail.message);
				return;
			}else {
            alert(`Buenas ${response.data.firstName}`)
				dispatch({
					type: "USER_IN",
					payload: {
						token: response.data.token,
						id: response.data.id,
						firstName: response.data.firstName,
						lastName: response.data.lastName,
						wishlist: response.data.wishlist,
						billingAddress: response.data.billingAddress,
						shippingAddress: response.data.shippingAddress,
						rates: response.data.rates,
						phone: response.data.phone
                    },
				})
			}
            return response
        }
    },
    loginUser: (user, set = null) => {
		return async (dispatch, getState) => {
			const response = await axios.post(RUTA_API + "/api/user/login", user)

			if (!response.data.success) {
				set({ status: false })
				alert(response.data.error)
				return response.data.error
			} else {
				set({ status: false })
				alert(`Buenas ${response.data.firstName}!`)
				dispatch({
					type: "USER_IN",
					payload: {
						token: response.data.token,
						id: response.data.id,
						firstName: response.data.firstName,
						lastName: response.data.lastName,
						wishlist: response.data.wishlist,
						billingAddress: response.data.billingAddress,
						shippingAddress: response.data.shippingAddress,
						rates: response.data.rates,
						phone: response.data.phone
					},
				})
			}
		}
	},
    logoutUser: () => {
		return (dispatch, getState) => {
			alert("Nos vemos mas tarde!")
			dispatch({
				type: "LOGOUT_USER",
			})
		}
    },
    addToCart: (id, cantidad) => {
		return async (dispatch, getState) => {
			let found = false
			let cart = await getCartItems()
			if (cart.length > 0) {
				cart.map(item => {
					if (item._id === id) {
						item.quantity += cantidad;
						found = true;
					}
				})
			}
			if (found) {
				dispatch({
					type: 'LOAD_CART',
					payload: cart
				})
			}
			else {
				const response = await axios.get(`${RUTA_API}/api/product/getProduct/${id}`)
				const item = response.data.productFound
				item.quantity = cantidad
				cart.push(item)
				dispatch({
					type: 'LOAD_CART',
					payload: cart
				})
			}
		}
    },
	clearCart: () => {
		return async (dispatch, getState) => {
			let cart = []
			AsyncStorage.removeItem("items")
			dispatch({
				type: 'LOAD_CART',
				payload: cart
			})
		}
	},
	loadCart: () => {
		return (dispatch, getState) => {
			let cart = getCartItems();
			dispatch({
				type: 'LOAD_CART',
				payload: cart
			})
		}
	},
	removeFromCart: id => {
		return async (dispatch, getState) => {
			let cart = await getCartItems()
			cart.map((item, index) => {
				if (item._id === id) {
					item.quantity--
					if (item.quantity === 0) {
						cart.splice(index, 1)
					}
				}
			})
			dispatch({
				type: 'LOAD_CART',
				payload: cart
			})
		}
	},



}