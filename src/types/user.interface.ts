export interface IUser {
  id: number;
  role: string;
  customer_id: string;
  name?: string;
  email: string;
  email_verified_at: string;
  phone?: string;
  phone_verified_at: string;
  image?: string;
  banner_img: string;
  country?: string;
  country_code?: string;
  city?: string;
  state?: string;
  address?: string;
  status: number;
  about?: string;
  registered: number;
  register_from: string;
  promo_link?: string;
  promo_qr?: string;
  screenshot: number;
  show_theme: number;
}
