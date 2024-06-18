export interface ICategory {
  title: string;
  icon?: string;
  subs?: {
    title: string;
    href: string;
  }[];
  className?: string;
  variant?: "accordion" | "button";
}

export interface IOption {
  id: number;
  name: string;
}

export interface IAttribute {
  id: number;
  name: string;
  type: "integer" | "text" | "select" | "multiselect";
  is_required: number;
  options: IOption[];
}
