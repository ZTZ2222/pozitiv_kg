import React, { ComponentProps } from "react";

const Heart: React.FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg {...props} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.61186 12.6348C4.61419 12.6365 4.61642 12.6383 4.61853 12.6402C5.94951 13.711 7.60328 15.2154 9.84063 17.2956C9.88394 17.336 9.94099 17.3585 10.0002 17.3585C10.0595 17.3585 10.1166 17.336 10.1599 17.2956C12.3963 15.2152 14.0505 13.711 15.3802 12.6402C15.3826 12.6387 15.3849 12.6369 15.3869 12.6348C16.6214 11.5677 18.1591 10.1334 19.0972 8.50473C20.1666 6.64954 20.2864 4.82925 19.4543 3.09545C19.0376 2.22794 18.399 1.48605 17.6031 0.945009C16.8072 0.403973 15.8824 0.0830373 14.9225 0.0147539C13.9625 -0.0535296 13.0016 0.133268 12.1372 0.5562C11.2727 0.979133 10.5355 1.62316 10.0002 2.42295C9.46511 1.62288 8.72785 0.978595 7.86329 0.555477C6.99873 0.132359 6.03764 -0.0545378 5.07752 0.0137519C4.1174 0.0820416 3.19243 0.403087 2.39646 0.944313C1.60049 1.48554 0.961846 2.22768 0.545334 3.09545C-0.286556 4.82948 -0.166064 6.64954 0.902588 8.50473C1.84141 10.1334 3.37736 11.5677 4.61186 12.6348Z"
      />
    </svg>
  );
};

export default Heart;
