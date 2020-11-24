import * as Action from "../types";
import Axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import NavigationService from '../../NavigationService';
import { useDispatch } from "react-redux";

const BaseURL = "onqueue-api.herokuapp.com"
export const getCategories = () => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/categories`)
            .then(data => {
                dispatch({
                    type: Action.GET_CATEGORIES,
                    payload: data.data
                })
            })
            .catch(() => {
                dispatch({
                    type: Action.CATEGORIES_ERROR
                })
            })
    }
}

export const getShops = (category_id) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/shops/${category_id}`)
            .then(data => {
                dispatch({
                    type: Action.GET_SHOPS,
                    payload: data.data
                })
            })
            .catch(() => {
                dispatch({
                    type: Action.SHOPS_ERROR
                })
            })
    }
}

export const getManageShops = (token) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/shops/manage/`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                dispatch({
                    type: Action.SET_MANAGE_SHOP,
                    payload: data.data
                })
                NavigationService.navigate("manageLocation");
            })
            .catch(() => {
                dispatch({
                    type: Action.SHOPS_ERROR
                })
            })
    }
}

export const getManageShopsQueue = (token) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/shops/manage/`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                dispatch({
                    type: Action.SET_MANAGE_SHOP,
                    payload: data.data
                })
                NavigationService.navigate("manageLocationQueue");
            })
            .catch(() => {
                dispatch({
                    type: Action.SHOPS_ERROR
                })
            })
    }
}

export const getManageServices = (token, shop_id) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/services/manage/${shop_id}/`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                dispatch({
                    type: Action.SET_MANAGE_SERVICE,
                    payload: data.data
                })
                NavigationService.navigate("manageService", {
                    shop_id: shop_id
                });
            })
            .catch((e) => {
                console.log(e.response);
                dispatch({
                    type: Action.SHOPS_ERROR,
                    payload: e
                })
            })
    }
}

export const getManageServicesQueue = (token, shop_id, shop) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/services/manage/${shop_id}/`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                dispatch({
                    type: Action.SET_MANAGE_SERVICE,
                    payload: data.data
                })
                NavigationService.navigate("manageQueue", {
                    shop_id: shop_id,
                    shop: shop
                });
            })
            .catch((e) => {
                console.log(e.response);
                dispatch({
                    type: Action.SERVICES_ERROR,
                    payload: e
                })
            })
    }
}

export const getAllServicesQueue = (token, service_id) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/services/manage/service/${service_id}/`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                dispatch({
                    type: Action.SET_MANAGE_QUEUE,
                    payload: data.data
                })
            })
            .catch((e) => {
                console.log(e.response);
                dispatch({
                    type: Action.QUEUE_ERRORS,
                    payload: e
                })
            })
    }
}

export const getEditShop = (token, shop_id) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/shops/detail/${shop_id}/`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                dispatch({
                    type: Action.SET_EDIT_SHOP,
                    payload: data.data
                })
                NavigationService.navigate("locationEdit", {
                    shop_id: data.data.id,
                })
            })
            .catch(() => {
                dispatch({
                    type: Action.SHOPS_ERROR
                })
            })
    }
}

export const getEditService = (token, service_id) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/services/detail/${service_id}/`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                dispatch({
                    type: Action.SET_EDIT_SERVICE,
                    payload: data.data
                })
                NavigationService.navigate("serviceEdit", {
                    shop_id: data.data.id,
                })
            })
            .catch(() => {
                dispatch({
                    type: Action.SERVICES_ERROR
                })
            })
    }
}

export const getManageShopItem = (token, shop_id) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/shops/detail/${shop_id}/`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                dispatch({
                    type: Action.SET_EDIT_SHOP,
                    payload: data.data
                })
                NavigationService.navigate("locationItem", {
                    shop_id: data.data.id,
                })
            })
            .catch(() => {
                dispatch({
                    type: Action.SHOPS_ERROR
                })
            })
    }
}

export const getServices = (shop_id) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/services/${shop_id}`)
            .then(data => {
                dispatch({
                    type: Action.GET_SERVICES,
                    payload: data.data
                })
            })
            .catch(() => {
                dispatch({
                    type: Action.SERVICES_ERROR
                })
            })
    }
}

export const getQueue = (queue_id, token) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/services/queue/${queue_id}/`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                dispatch({
                    type: Action.SET_QUEUE,
                    payload: data.data
                })
                NavigationService.navigate("queueScreen")
            })
            .catch(() => {
                dispatch({
                    type: Action.QUEUE_ERRORS
                })
            })
    }
}

export const getQueue2 = (queue_id, token) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/services/queue/${queue_id}/`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                dispatch({
                    type: Action.SET_QUEUE,
                    payload: data.data
                })
                NavigationService.navigate("queueScreenHistory")
            })
            .catch(() => {
                dispatch({
                    type: Action.QUEUE_ERRORS
                })
            })
    }
}

export const getQueueHistory = (token) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/services/queue/history/`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                dispatch({
                    type: Action.SET_QUEUES,
                    payload: data.data
                })
                NavigationService.navigate("queueHistory")
            })
            .catch((e) => {
                if (e.response.status === 400) {
                    Alert.alert(
                        "Alert",
                        "ไม่พบประวัติการใช้งานของคุณ ต้องการจองคิวหรือไม่",
                        [
                            {
                                text: "ยกเลิก",
                                style: "cancel"
                            },
                            { text: "จองคิว", onPress: () => NavigationService.navigate("categories") }
                        ],
                        { cancelable: false }
                    );
                }
                dispatch({
                    type: Action.QUEUE_ERRORS,
                    payload: e
                })
            })
    }
}

export const getUserToken = (id) => {
    return (dispatch) => {
        Axios.post(`https://${BaseURL}/api/token/`, {
            username: id,
            password: id,
        })
            .then(async (data) => {
                if (data.status === 200) {
                    await AsyncStorage.setItem("@OnQueue_Token", JSON.stringify(data.data.access));
                    const token = await AsyncStorage.getItem("@OnQueue_Token");
                    dispatch({
                        type: Action.SET_USER_TOKEN,
                        payload: data.data.access
                    })
                }
            })
            .catch(e => {
                dispatch({
                    type: Action.USER_ERROR,
                    payload: e
                })
            })
    }
}

export const getUserData = (id, email, name, image) => {
    return (dispatch) => {
        Axios.post(`https://${BaseURL}/user/checkuser/`, {
            id: id,
            email: email,
            name: name,
            image: image,
        })
            .then(data => {
                // console.log(data.data);
                dispatch({
                    type: Action.SET_USER_DATA,
                    payload: data.data
                })
            }).catch(e => {
                dispatch({
                    type: Action.USER_ERROR,
                    payload: e
                })
            })
    }
}

export const validateUserToken = (token) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/api/token/verify/`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                // console.log(data.data);
                dispatch({
                    type: Action.SET_USER_DATA_TOKEN,
                    data: data.data,
                    token: token
                })
            }).catch(e => {
                dispatch({
                    type: Action.USER_ERROR,
                    payload: e
                })
            })
    }
}

export const createBookingQueue = (token, service_id) => {
    return (dispatch) => {
        Axios.post(`https://${BaseURL}/services/queue/book/${service_id}/`, {}, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                if (data.status === 201) {
                    Alert.alert(
                        "Booking Success!",
                        "ทำการจองคิวเรียบร้อยแล้ว",
                    );
                    dispatch({
                        type: Action.SET_QUEUE,
                        payload: data.data
                    })
                    NavigationService.navigate("queueScreen", {
                        queue_id: data.data.id
                    })
                }
            })
            .catch(e => {
                dispatch({
                    type: Action.USER_ERROR,
                    payload: e
                })
            })
    }
}

export const createShop = (token, shopData) => {
    return (dispatch) => {
        let formData = new FormData();
        formData.append("image", {
            uri: shopData.image.uri,
            type: shopData.image.type,
            name: shopData.shop_name,
        })
        Axios.post('https://api.imgur.com/3/image/', formData, {
            headers: {
                "Authorization": "Client-ID 415d9499bd03c8e",
            }
        })
            .then(data => {
                if (data.status === 200) {
                    // console.log(data.data.data.link);
                    Axios.post(`https://${BaseURL}/shops/create/`, {
                        category_id: shopData.category_id,
                        shop_name: shopData.shop_name,
                        branch_name: shopData.branch_name,
                        open_time: shopData.open_time,
                        close_time: shopData.close_time,
                        status: shopData.status,
                        image: data.data.data.link
                    }, {
                        headers: {
                            "Authorization": "Bearer " + token,
                        }
                    })
                        .then(data => {
                            if (data.status === 201) {
                                Alert.alert("Create Success!", "สร้างร้านค้าสำเร็จ!",
                                    [
                                        {
                                            text: "ตกลง", onPress: () => {
                                                dispatch(getManageShops(token));
                                            }
                                        }
                                    ],
                                    { cancelable: false })
                            } else {
                                dispatch({
                                    type: Action.SET_LOADING,
                                    data: false,
                                })
                            }
                        })
                        .catch(e => {
                            dispatch({
                                type: Action.SHOPS_ERROR,
                                payload: e
                            })
                        })
                }
            })
            .catch(e => {
                dispatch({
                    type: Action.SHOPS_ERROR,
                    payload: e
                })
            })
    }
}

export const createService = (token, serviceData) => {
    return (dispatch) => {
        Axios.post(`https://${BaseURL}/services/create/${serviceData.shop_id}/`, {
            shop_id: serviceData.shop_id,
            service_name: serviceData.service_name,
            waiting_time: serviceData.waiting_time,
            status: serviceData.status,
        }, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                if (data.status === 201) {
                    Alert.alert("Create Success!", "สร้างบริการสำเร็จ!",
                        [
                            {
                                text: "ตกลง", onPress: () => {
                                    dispatch(getManageServices(token, serviceData.shop_id));
                                }
                            }
                        ],
                        { cancelable: false })
                }
                console.log(data.data);
            })
            .catch(e => {
                dispatch({
                    type: Action.SERVICES_ERROR,
                    payload: e
                })
            })
    }
}

export const setEditShop = (token, shop_id, shopData) => {
    return (dispatch) => {
        Axios.get(`https://api.imgur.com/3/image/${shopData.image.uri.substring(20, shopData.image.uri.indexOf(".", 19))}`, {
            headers: {
                "Authorization": "Client-ID 415d9499bd03c8e",
            }
        })
            .then(data => {
                if (data.status === 200) {
                    Axios.put(`https://${BaseURL}/shops/edit/${shop_id}/`, {
                        category_id: shopData.category_id,
                        shop_name: shopData.shop_name,
                        branch_name: shopData.branch_name,
                        open_time: shopData.open_time,
                        close_time: shopData.close_time,
                        status: shopData.status,
                        image: shopData.image.uri
                    }, {
                        headers: {
                            "Authorization": "Bearer " + token,
                        }
                    })
                        .then(data => {
                            Alert.alert("Edit Success!", "แก้ไขร้านค้าสำเร็จ!",
                                [
                                    {
                                        text: "ตกลง", onPress: () => {
                                            dispatch(getManageShops(token));
                                        }
                                    }
                                ],
                                { cancelable: false })
                        })
                        .catch(e => {
                            dispatch({
                                type: Action.SHOPS_ERROR,
                                payload: e
                            })
                        })
                }
            })
            .catch(e => {
                let formData = new FormData();
                formData.append("image", {
                    uri: shopData.image.uri,
                    type: shopData.image.type,
                    name: shopData.shop_name,
                })
                Axios.post('https://api.imgur.com/3/image/', formData, {
                    headers: {
                        "Authorization": "Client-ID 415d9499bd03c8e",
                    }
                })
                    .then(data => {
                        if (data.status === 200) {
                            Axios.put(`https://${BaseURL}/shops/edit/${shop_id}/`, {
                                category_id: shopData.category_id,
                                shop_name: shopData.shop_name,
                                branch_name: shopData.branch_name,
                                open_time: shopData.open_time,
                                close_time: shopData.close_time,
                                status: shopData.status,
                                image: data.data.data.link
                            }, {
                                headers: {
                                    "Authorization": "Bearer " + token,
                                }
                            })
                                .then(data => {
                                    Alert.alert("Edit Success!", "แก้ไขร้านค้าสำเร็จ!",
                                        [
                                            {
                                                text: "ตกลง", onPress: () => {
                                                    dispatch(getManageShops(token));
                                                }
                                            }
                                        ],
                                        { cancelable: false })
                                })
                                .catch(e => {
                                    dispatch({
                                        type: Action.SHOPS_ERROR,
                                        payload: e
                                    })
                                })
                        }
                    })
                    .catch(e => {
                        dispatch({
                            type: Action.SHOPS_ERROR,
                            payload: e
                        })
                    })
            })
    }
}

export const setLoading = (bool) => {
    return {
        type: Action.SET_LOADING,
        data: bool
    }
}

export const userLogout = () => {
    return async (dispatch) => {
        await AsyncStorage.clear();
        dispatch({
            type: Action.USER_LOGOUT
        })
        Alert.alert('Logged Out!', 'คุณได้ล็อกเอาท์แล้ว !');
    }
}

export const setEditService = (token, service_id, serviceData) => {
    return (dispatch) => {
        Axios.put(`https://${BaseURL}/services/edit/${service_id}/`, {
            service_name: serviceData.service_name,
            status: serviceData.status,
            waiting_time: serviceData.waiting_time,
        }, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                Alert.alert("Edit Success!", "แก้ไขบริการสำเร็จ!",
                    [
                        {
                            text: "ตกลง", onPress: () => {
                                dispatch(getManageServices(token, serviceData.shop_id));
                            }
                        }
                    ],
                    { cancelable: false })
            })
            .catch(e => {
                dispatch({
                    type: Action.SERVICES_ERROR,
                    payload: e
                })
            })
    }
}


export const deleteShop = (token, shop_id) => {
    return (dispatch) => {
        Axios.delete(`https://${BaseURL}/shops/delete/${shop_id}/`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                if (data.status === 200) {
                    Alert.alert("Delete Success!", "ลบร้านค้าสำเร็จ!",
                        [
                            {
                                text: "ตกลง", onPress: () => {
                                    dispatch(getManageShops(token));
                                }
                            }
                        ],
                        { cancelable: false })
                }
            })
            .catch((e) => {
                dispatch({
                    type: Action.SHOPS_ERROR,
                    payload: e
                })
            })
    }
}

export const deleteService = (token, service_id, shop_id) => {
    return (dispatch) => {
        Axios.delete(`https://${BaseURL}/services/delete/${service_id}/`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                if (data.status === 200) {
                    Alert.alert("Delete Success!", "ลบบริการสำเร็จ!",
                        [
                            {
                                text: "ตกลง", onPress: () => {
                                    dispatch(getManageServices(token, shop_id));
                                }
                            }
                        ],
                        { cancelable: false })
                }
            })
            .catch((e) => {
                dispatch({
                    type: Action.SERVICES_ERROR,
                    payload: e
                })
            })
    }
}

export const getManageUser = (token, shop_id) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/shops/staff/${shop_id}/`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                console.log(data.data);
                dispatch({
                    type: Action.SET_MANAGER_USER,
                    payload: data.data
                })
                NavigationService.navigate("managerList", {
                    shop_id: shop_id
                })
            })
            .catch((e) => {
                console.log(e.response);
                dispatch({
                    type: Action.USER_ERROR,
                    payload: e
                })
            })
    }
}

export const createShopManager = (token, shop_id, email) => {
    return (dispatch) => {
        Axios.post(`https://${BaseURL}/user/staff/${shop_id}/`, {
            email: email
        }, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                dispatch(getManageUser(token, shop_id));
                NavigationService.navigate("managerList", {
                    shop_id: shop_id
                })
            })
            .catch((e) => {
                if (e.response.status === 400) {
                    Alert.alert("Oops !", "ไม่พบบัญชีผู้ใช้งานดังกล่าว!");
                }
                dispatch({
                    type: Action.USER_ERROR,
                    payload: e
                })
            })
    }
}

export const deleteShopManager = (token, shop_id, email) => {
    return (dispatch) => {
        Axios.delete(`https://${BaseURL}/user/staff/${shop_id}/`, {
            headers: {
                "Authorization": "Bearer " + token,
                "email": email,
            }
        })
            .then(data => {
                dispatch(getManageUser(token, shop_id));
                NavigationService.navigate("managerList", {
                    shop_id: shop_id
                })
            })
            .catch((e) => {
                if (e.response.status === 400) {
                    Alert.alert("Oops !", "ไม่พบบัญชีผู้ใช้งานดังกล่าว!");
                }
                dispatch({
                    type: Action.USER_ERROR,
                    payload: e
                })
            })
    }
}

export const updateQueueStatus = (token, queue_id, status) => {
    return (dispatch) => {
        Axios.patch(`https://${BaseURL}/services/update/queue/${queue_id}/`, {
            status: status,
        }, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                Alert.alert("Update Success!", "อัพเดทสถานะคิวสำเร็จ!",
                    [
                        {
                            text: "ตกลง", onPress: () => {
                                dispatch(getAllServicesQueue(token, data.data.service.id));
                            }
                        }
                    ],
                    { cancelable: false })
            })
            .catch(e => {
                dispatch({
                    type: Action.QUEUE_ERRORS,
                    payload: e
                })
            })
    }
}