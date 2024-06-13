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
