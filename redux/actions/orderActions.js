import axios from "axios"
import { RUTA_API } from "../../shared/constants"
import AsyncStorage from "@react-native-community/async-storage";

export const orderActions = {
	createOrder: order => {
		return async (dispatch, getState) => {
			const response = await axios.post(`${RUTA_API}/api/orders`, order)
			if(response.data.success) AsyncStorage.removeItem('items')
		}	
	}
}
