import UserFunction from "../models/userfunction";
import * as Action from "../store/types";
export const USERFUNCTION = [
  new UserFunction(Action.QUEUE_HISTORY, "ประวัติการจองคิว", "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQd326Nlb2A9bZXER6wetzJ_cBaaz6JLljAg&usqp=CAU"),
  new UserFunction(Action.USER_LOGOUT, "ล็อกเอาท์", "https://image.flaticon.com/icons/png/128/3532/3532203.png"),
];

export const STAFFFUNCTION = [
  new UserFunction(Action.QUEUE_HISTORY, "ประวัติการจองคิว", "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQd326Nlb2A9bZXER6wetzJ_cBaaz6JLljAg&usqp=CAU"),
  new UserFunction(Action.SHOP_MANAGE, "จัดการสถานที่", "https://image.flaticon.com/icons/png/512/235/235861.png"),
  new UserFunction("u3", "จักการคิว", "https://image.flaticon.com/icons/png/128/835/835885.png"),
  new UserFunction(Action.USER_LOGOUT, "ล็อกเอาท์", "https://image.flaticon.com/icons/png/128/3532/3532203.png"),
];