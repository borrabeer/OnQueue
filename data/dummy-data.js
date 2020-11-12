import UserFunction from "../models/userfunction";
import * as Action from "../store/types";
export const USERFUNCTION = [
  new UserFunction("u1", "แก้ไขข้อมูล", "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQd326Nlb2A9bZXER6wetzJ_cBaaz6JLljAg&usqp=CAU"),
  new UserFunction("u2", "จัดการสถานที่", "https://image.flaticon.com/icons/png/512/235/235861.png"),
  new UserFunction("u3", "จักการคิว", "https://image.flaticon.com/icons/png/128/835/835885.png"),
  new UserFunction(Action.USER_LOGOUT, "ล็อกเอาท์", "https://image.flaticon.com/icons/png/128/3532/3532203.png"),
];