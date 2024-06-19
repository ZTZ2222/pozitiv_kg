import { IAttribute } from "@/types/category.interface";
import { IChat, IMessage } from "@/types/chat.interface";
import { IUser } from "@/types/user.interface";

export const categories = [
  {
    title: "Недвижимость",
    subs: [
      {
        title: "Квартиры",
        href: "#",
      },
      {
        title: "Дома",
        href: "#",
      },
      {
        title: "Земельные участки",
        href: "#",
      },
      {
        title: "Коммерческая недвижимость",
        href: "#",
      },
    ],
    icon: "/assets/categoryIcons/house.png",
    className: "bg-[#0279CF]",
  },
  {
    title: "Транспорт",
    subs: [
      {
        title: "Легковые автомобили",
        href: "#",
      },
      {
        title: "Грузовые автомобили",
        href: "#",
      },
      {
        title: "Мотоциклы",
        href: "#",
      },
      {
        title: "Автобусы",
        href: "#",
      },
    ],
    icon: "/assets/categoryIcons/car.png",
    className: "bg-[#0DC2C2]",
  },
  {
    title: "Услуги",
    subs: [
      {
        title: "Уборка",
        href: "#",
      },
      {
        title: "Ремонт автомобилей",
        href: "#",
      },
      {
        title: "Строительство",
        href: "#",
      },
      {
        title: "Ремонт квартир",
        href: "#",
      },
    ],
    icon: "/assets/categoryIcons/service.png",
    className: "bg-[#FF5B00]",
  },
  {
    title: "Дом и сад",
    subs: [
      {
        title: "Квартиры",
        href: "#",
      },
      {
        title: "Дома",
        href: "#",
      },
      {
        title: "Земельные участки",
        href: "#",
      },
      {
        title: "Коммерческая недвижимость",
        href: "#",
      },
    ],
    icon: "/assets/categoryIcons/chair.png",
    className: "bg-[#7EED31]",
  },
  {
    title: "Техника и электроника",
    subs: [
      {
        title: "Квартиры",
        href: "#",
      },
      {
        title: "Дома",
        href: "#",
      },
      {
        title: "Земельные участки",
        href: "#",
      },
      {
        title: "Коммерческая недвижимость",
        href: "#",
      },
    ],
    icon: "/assets/categoryIcons/phone.png",
    className: "bg-[#6C6C6C]",
  },
  {
    title: "Работа",
    subs: [
      {
        title: "Квартиры",
        href: "#",
      },
      {
        title: "Дома",
        href: "#",
      },
      {
        title: "Земельные участки",
        href: "#",
      },
      {
        title: "Коммерческая недвижимость",
        href: "#",
      },
    ],
    icon: "/assets/categoryIcons/briefcase.png",
    className: "bg-[#FF5B5B]",
  },
  {
    title: "Эко продукция",
    subs: [
      {
        title: "Квартиры",
        href: "#",
      },
      {
        title: "Дома",
        href: "#",
      },
      {
        title: "Земельные участки",
        href: "#",
      },
      {
        title: "Коммерческая недвижимость",
        href: "#",
      },
    ],
    icon: "/assets/categoryIcons/eco.png",
    className: "bg-[#8BCA1E]",
  },
  {
    title: "Личный вещи",
    subs: [
      {
        title: "Квартиры",
        href: "#",
      },
      {
        title: "Дома",
        href: "#",
      },
      {
        title: "Земельные участки",
        href: "#",
      },
      {
        title: "Коммерческая недвижимость",
        href: "#",
      },
    ],
    icon: "/assets/categoryIcons/personal.png",
    className: "bg-[#E55BFF]",
  },
];

export const ads = [
  {
    id: 1,
    title: "Загородный дом",
    re_area: 120,
    is_favorite: true,
    is_promoted: true,
    price_usd: 78650,
    price_som: 78650 * 89.6,
    images: ["/assets/ads/house_1.png", "/assets/ads/house_2.png"],
  },
  {
    id: 2,
    title: "Загородный дом",
    re_area: 120,
    is_favorite: false,
    is_promoted: false,
    price_usd: 78650,
    price_som: 78650 * 89.6,
    images: ["/assets/ads/house_1.png", "/assets/ads/house_2.png"],
  },
  {
    id: 3,
    title: "Загородный дом",
    re_area: 120,
    is_favorite: true,
    is_promoted: true,
    price_usd: 78650,
    price_som: 78650 * 89.6,
    images: ["/assets/ads/house_1.png", "/assets/ads/house_2.png"],
  },
  {
    id: 4,
    title: "Загородный дом",
    re_area: 120,
    is_favorite: false,
    is_promoted: false,
    price_usd: 78650,
    price_som: 78650 * 89.6,
    images: ["/assets/ads/house_1.png", "/assets/ads/house_2.png"],
  },
];

export const ads_2 = [
  {
    id: 1,
    title: "Загородный дом",
    re_area: 120,
    is_favorite: true,
    is_promoted: true,
    price_usd: 78650,
    price_som: 78650 * 89.6,
    images: ["/assets/ads/house_2.png", "/assets/ads/house_1.png"],
  },
  {
    id: 2,
    title: "Загородный дом",
    re_area: 120,
    is_favorite: false,
    is_promoted: false,
    price_usd: 78650,
    price_som: 78650 * 89.6,
    images: ["/assets/ads/house_2.png", "/assets/ads/house_1.png"],
  },
  {
    id: 3,
    title: "Загородный дом",
    re_area: 120,
    is_favorite: true,
    is_promoted: true,
    price_usd: 78650,
    price_som: 78650 * 89.6,
    images: ["/assets/ads/house_2.png", "/assets/ads/house_1.png"],
  },
  {
    id: 4,
    title: "Загородный дом",
    re_area: 120,
    is_favorite: false,
    is_promoted: false,
    price_usd: 78650,
    price_som: 78650 * 89.6,
    images: ["/assets/ads/house_2.png", "/assets/ads/house_1.png"],
  },
];

export const banners = [
  {
    id: 1,
    url_mobile: "/assets/swiperImages/dubai_mobile.png",
    url_desktop: "/assets/swiperImages/dubai_desktop.png",
    href: "#",
  },
  {
    id: 2,
    url_mobile: "/assets/swiperImages/sea_mobile.png",
    url_desktop: "/assets/swiperImages/sea_desktop.png",
    href: "#",
  },
  {
    id: 3,
    url_mobile: "/assets/swiperImages/flat_mobile.png",
    url_desktop: "/assets/swiperImages/flat_desktop.png",
    href: "#",
  },
  {
    id: 4,
    url_mobile: "/assets/swiperImages/sea_mobile.png",
    url_desktop: "/assets/swiperImages/sea_desktop.png",
    href: "#",
  },
];

export const socials = [
  {
    title: "instagram",
    image: "/assets/socials/instagram.svg",
    link: "#",
    color: "",
  },
  {
    title: "whatsapp",
    image: "/assets/socials/whatsapp.svg",
    link: "#",
    color: "",
  },
  {
    title: "telegram",
    image: "/assets/socials/telegram.svg",
    link: "#",
    color: "",
  },
  {
    title: "tiktok",
    image: "/assets/socials/tiktok.svg",
    link: "#",
    color: "",
  },
  {
    title: "facebook",
    image: "/assets/socials/facebook.svg",
    link: "#",
    color: "",
  },
];

export const category_attrs: IAttribute[] = [
  {
    id: 174,
    name: "MGP",
    type: "integer",
    is_required: 1,
    options: [],
  },
  {
    id: 175,
    name: "Lens",
    type: "select",
    is_required: 0,
    options: [
      {
        id: 1891,
        name: "Carl zeis",
      },
      {
        id: 1892,
        name: "LG",
      },
    ],
  },
  {
    id: 176,
    name: "Поддержка",
    type: "multiselect",
    is_required: 0,
    options: [
      {
        id: 1893,
        name: "option-1",
      },
      {
        id: 1894,
        name: "option-2",
      },
      {
        id: 1895,
        name: "option-3",
      },
    ],
  },
  {
    id: 177,
    name: "Texts",
    type: "text",
    is_required: 1,
    options: [],
  },
];

export const chat_list: IChat[] = [
  {
    chat_id: "559_482",
    id: 559,
    name: "Продается 3 к кв- студия\nМкр Асанбай\nс/к Авангард стиль\nЕлисейские поля\n113 м2, этаж 2/18\nS кухни-35м2\nДДУ, г/п 2024\nПланировка: сквозная\nСдача ПСО 2025г\n148 000$",
    price: 148000,
    image: "",
    currency: "USD",
    status: "approved",
    created_at: "2024-04-29 06:00:02",
    last_message: "Я заинтересован!",
    last_seen: 0,
    total_unseen: 0,
    user: {
      id: 482,
      name: "Mohamed Jalal Jalal",
      phone: "+996590000000",
      image: "",
      last_seen: "2024-06-18T15:32:12.478291Z",
    },
    seller: {
      id: 471,
      name: "Раушан Бай",
      phone: "+996555102050",
      image: "https://pozitiv.kg/users/images/2023-11-01-65422edf287d1.png",
      last_seen: "2024-06-18T15:32:12.478478Z",
    },
  },
  {
    chat_id: "616_482",
    id: 616,
    name: "Сдаю  Уютную 2к. Элитную Квартиру Студия 71м2 с ремонтом и мебелью 8/9 район  Юг-2 Цена:650$+ Депозит  т:055510-20-50 pozitiv.kg",
    price: 650,
    image: "",
    currency: "USD",
    status: "approved",
    created_at: "2023-12-15 03:25:17",
    last_message: "Еще актуально?",
    last_seen: 0,
    total_unseen: 0,
    user: {
      id: 482,
      name: "Mohamed Jalal Jalal",
      phone: "+996590000000",
      image: "",
      last_seen: "2024-06-18T15:32:12.480076Z",
    },
    seller: {
      id: 471,
      name: "Раушан Бай",
      phone: "+996555102050",
      image: "https://pozitiv.kg/users/images/2023-11-01-65422edf287d1.png",
      last_seen: "2024-06-18T15:32:12.480171Z",
    },
  },
];

export const chat_messages: IMessage[] = [
  {
    id: 134,
    sender_id: {
      id: 482,
      name: "Mohamed Jalal Jalal",
      image: "",
    },
    receiver_id: {
      id: 471,
      name: "Раушан Бай",
      image: "https://pozitiv.kg/users/images/2023-11-01-65422edf287d1.png",
    },
    type: "text",
    message: "Я заинтересован!",
    image: "",
    created_at: "2024-04-29T06:00:02.000000Z",
    updated_at: "2024-04-29T06:00:02.000000Z",
  },
  {
    id: 138,
    sender_id: {
      id: 482,
      name: "Mohamed Jalal Jalal",
      image: "",
    },
    receiver_id: {
      id: 471,
      name: "Раушан Бай",
      image: "https://pozitiv.kg/users/images/2023-11-01-65422edf287d1.png",
    },
    type: "text",
    message:
      "Hello How are you? Augments native src func for custom, cross-browser styling.",
    image: "",
    created_at: "2024-06-19T04:30:26.000000Z",
    updated_at: "2024-06-19T04:30:26.000000Z",
  },
  {
    id: 140,
    sender_id: {
      id: 471,
      name: "Раушан Бай",
      image: "https://pozitiv.kg/users/images/2023-11-01-65422edf287d1.png",
    },
    receiver_id: {
      id: 482,
      name: "Mohamed Jalal Jalal",
      image: "",
    },
    type: "text",
    message: "Hello I'm fine, you?",
    image: "",
    created_at: "2024-06-19T04:30:26.000000Z",
    updated_at: "2024-06-19T04:30:26.000000Z",
  },
];

export const current_user: IUser = {
  id: 482,
  role: "User",
  customer_id: "v8lRpr4X",
  name: "Mohamed Jalal Jalal",
  email: "mohamedjalalj8@gmail.com",
  email_verified_at: "2023-11-21 03:15:57",
  phone: "+996590000000",
  phone_verified_at: "2023-11-21 09:15:57",
  image: "",
  banner_img: "0",
  country: "",
  country_code: "+996",
  city: "",
  state: "",
  address: "",
  status: 1,
  about: "",
  registered: 1,
  register_from: "otp",
  promo_link: "",
  promo_qr: "",
  screenshot: 0,
  show_theme: 1,
};
