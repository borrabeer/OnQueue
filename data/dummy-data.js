import Category from "../models/category";
import Shop from "../models/shop";
import Service from "../models/service";

export const CATEGORIES = [
  new Category("c1", "ธนาคาร", "https://i.imgur.com/RWZkgOv.png"),
  new Category("c2", "ร้านอาหาร", "https://i.imgur.com/doqC103.png"),
  new Category("c3", "บริการเครือข่าย", "https://i.imgur.com/uaKji9D.png"),
  new Category("c4", "แฟชั่น", "https://i.imgur.com/mfoHxtB.png"),
  new Category("c5", "โรงพยาบาล", "https://i.imgur.com/neBaouC.png"),
  new Category("c6", "อื่น ๆ", "https://i.imgur.com/5WrmE1Y.png"),
];

export const SHOPS = [
  new Shop("s1", "BonChon", "ลาดกระบัง", "https://i.imgur.com/CppXInc.png", "c2"),
];

export const SERVICES = [
  new Service("ss1", "จองโต๊ะ", "s1"),
];