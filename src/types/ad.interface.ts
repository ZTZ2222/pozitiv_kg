export interface Ad {
  id: number;
  title: string;
  re_area: number;
  is_favorite: boolean;
  is_promoted: boolean;
  price_usd: number;
  price_som: number;
  images: string[];
}
