import React from "react";
import { Button } from "../ui/button";
import { Heart, MessageCircleMore, Phone } from "lucide-react";
import { cn, formatStringToDate } from "@/lib/utils";
import AddToFavorites from "../favorites/AddToFavorites";

type Props = {
  id: number;
  favorites: number;
  createdAt: string;
  updatedAt: string;
  className?: string;
};

const ContactBlock: React.FC<Props> = ({
  id,
  favorites,
  createdAt,
  updatedAt,
  className,
}) => {
  return (
    <div className={cn("space-y-5", className)}>
      <div className="flex w-full gap-5">
        <Button variant="contact-chat" size="col-2">
          <MessageCircleMore className="size-5" />
          Написать в чат
        </Button>
        <Button variant="contact-wa" size="col-2">
          <svg
            className="size-5 fill-white"
            viewBox="0 0 19 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.2312 2.76455C15.3558 1.88478 14.3132 1.18724 13.1641 0.712603C12.015 0.237969 10.7824 -0.0042561 9.53819 5.6591e-05C4.32513 5.6591e-05 0.0763821 4.22754 0.0763821 9.41453C0.0763821 11.077 0.515578 12.692 1.33668 14.117L0 19L5.01256 17.689C6.39698 18.4395 7.95327 18.8385 9.53819 18.8385C14.7513 18.8385 19 14.611 19 9.42403C19 6.90654 18.0166 4.54104 16.2312 2.76455ZM9.53819 17.2425C8.12512 17.2425 6.7407 16.8625 5.52814 16.15L5.24171 15.979L2.26281 16.758L3.05528 13.87L2.86432 13.5755C2.07925 12.3281 1.66239 10.8863 1.66131 9.41453C1.66131 5.10154 5.19397 1.58655 9.52864 1.58655C11.6291 1.58655 13.6055 2.40355 15.0854 3.88555C15.8182 4.61131 16.3989 5.47457 16.7939 6.42529C17.1889 7.37601 17.3903 8.39528 17.3864 9.42403C17.4055 13.737 13.8729 17.2425 9.53819 17.2425ZM13.8538 11.3905C13.6151 11.2765 12.4502 10.7065 12.2402 10.621C12.0206 10.545 11.8678 10.507 11.7055 10.735C11.5432 10.9725 11.0945 11.5045 10.9608 11.6565C10.8271 11.818 10.6839 11.837 10.4452 11.7135C10.2065 11.5995 9.44271 11.343 8.54523 10.545C7.83869 9.91803 7.37085 9.14853 7.22764 8.91103C7.09397 8.67353 7.20854 8.55003 7.33266 8.42653C7.43769 8.32203 7.57136 8.15103 7.68593 8.01803C7.8005 7.88503 7.84824 7.78053 7.92462 7.62853C8.001 7.46703 7.96281 7.33404 7.90553 7.22004C7.84824 7.10604 7.37085 5.94704 7.1799 5.47204C6.98894 5.01604 6.78844 5.07304 6.64523 5.06354H6.18693C6.02462 5.06354 5.77638 5.12054 5.55678 5.35804C5.34673 5.59554 4.73568 6.16554 4.73568 7.32453C4.73568 8.48353 5.58543 9.60453 5.7 9.75653C5.81457 9.91803 7.37085 12.293 9.73869 13.3095C10.302 13.5565 10.7412 13.699 11.0849 13.8035C11.6482 13.984 12.1638 13.9555 12.5744 13.8985C13.0327 13.832 13.9779 13.3285 14.1688 12.7775C14.3693 12.2265 14.3693 11.761 14.3025 11.6565C14.2357 11.552 14.0925 11.5045 13.8538 11.3905Z" />
          </svg>
          WhatsApp
        </Button>
      </div>
      <Button variant="contact-call" size="col-1">
        <Phone className="size-5" />
        Позвонить
      </Button>
      {/* Created & Updated Dates */}
      <div className="my-10 flex flex-col">
        <span className="font-light text-gray-800">
          Обновлено {formatStringToDate(updatedAt)}
        </span>
        <span className="font-light text-gray-800">
          Дата публикации {formatStringToDate(createdAt)}
        </span>
      </div>
      {/* Add To Favorites */}
      <AddToFavorites variant="button" id={id} favorites={favorites} />
    </div>
  );
};

export default ContactBlock;
