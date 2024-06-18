import { IAttribute } from "@/types/category.interface";

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
