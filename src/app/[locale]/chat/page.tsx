import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { chat_list } from "@/utils/fake_api";
import { IChat } from "@/types/chat.interface";
import BackButton from "@/components/BackButton";

// const fetchChats = async () => {
//   const res = await fetch("https://pozitiv.kg/api/v1/chats", {
//     cache: "no-store",
//     headers: {
//       Authorizaion:
//         "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiNGE5M2FlNDZkYTc1Mjk1MDA3ZWZkZDExNDhjMTRjMjcwNmY4ODc5YmZiZTJjMGFkOTZkMjA4MDUzNzk1Mjg3ZmQ0YjlkNzg4OGY2OWUxNDUiLCJpYXQiOjE3MTg3Njk5MTYuNTc0NDc0LCJuYmYiOjE3MTg3Njk5MTYuNTc0NDc2LCJleHAiOjE3NTAzMDU5MTYuNTY2MTg0LCJzdWIiOiI0ODIiLCJzY29wZXMiOltdfQ.i__TPFnsMx68e9mUxfSjYZPwpTzj1HxwDqWzs5gt2V_sHAh66GpETwBZ2slRuAVxoHMInVJjsi9nSq62p238tOQoq_lf9NboC9F2V5Z_tDl4CatCHX7GcEHn--fWeXbpuCd-7iGuAh7XsRpLrDMxIbcg5i5aw1CgMUBHoiu-ArVfJegxxoCgS1jjsBDcHxpAsgAu_nzqZff3h331VcIf-HaPq-uM7nDnDJapuKLjcMvY5B8s1MOHuGrS65Zv3id8jiHCKevhgeDGVAV4lVJqKpGe2B7o1mN2aMxswm3Sr_QI86kukGVW6acFj_gCe6IkMK9iK4po-Z-XaYRdvPqCMPPIm9QFWPos0FfikLOF5psRb62vV2dLojZQibZkp7z-I5wGej862Esm6r9vQBV3PLutEXTGmbx_cDPWOtYrp8Jh59TEXyG-iQrrQBYAuXSj8o1JJvsmyPpb3bcXxFqOYsbiPwCZuQ_2S1OR7z7ycfs-nJaHU-o_S9Gf4iJZ-S6ADWFh3i5PcX-yQH9_EaL6UawDNKwAefG3sUeRMP2xArgcz68QggncF7Y4H-LPV5DA6sg6QPQupceOEMOa1xdCAZime2nTH_ammHsRMxU2k4nxzGkU9dNwp5pNqPzEW6tGIIxK18x2VqANrIkVOGue1PJ3LBOwLf68L5HTXoQjqQs",
//       "Content-Type": "application/json",
//       "User-Agent": "PostmanRuntime/7.29.0",
//       "Accept-Encoding": "gzip, deflate, br",
//       Connection: "keep-alive",
//       Accept: "*/*",
//       "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     },
//   });

//   console.log(res.status);

//   return res.json();
// };

const ChatList = async () => {
  // const chats = await fetchChats();
  // console.log(chats);

  return (
    <>
      <div className="container flex h-16 items-center border-b border-gray-200">
        <BackButton variant="router" />
        <h1 className="mx-auto -translate-x-5">Чаты</h1>
      </div>
      <main className="mt-10 flex h-screen w-full flex-col gap-2.5">
        {chat_list.map((chat: IChat) => (
          <Link href={`/chat/${chat.chat_id}`} key={chat.chat_id}>
            <Card className="container flex min-h-[78px] items-center justify-between gap-4 rounded-none border-0 border-y border-gray-200 bg-gray-50 pb-3 pt-1.5 transition-colors duration-500 hover:bg-gray-200">
              <div className="relative size-10 shrink-0">
                <Image
                  src={chat.seller.image || "/assets/chat/woman.png"}
                  alt="profile picture"
                  className="rounded-full bg-gray-600 object-contain"
                  fill
                  sizes="(max-width: 600px) 100vw, 50vw"
                />
              </div>
              <div className="flex w-[160px] flex-col justify-between xs:w-[215px]">
                <span className="truncate font-semibold text-gray-800">
                  {chat.name}
                </span>
                <p className="truncate font-light text-gray-500">
                  {chat.last_message}
                </p>
              </div>
              <div className="relative size-[60px] shrink-0">
                <Image
                  src={chat.image || "/assets/chat/house.png"}
                  alt="ad picture"
                  className="rounded-[10px] bg-gray-600 object-contain"
                  fill
                  sizes="(max-width: 600px) 100vw, 50vw"
                />
              </div>
            </Card>
          </Link>
        ))}
      </main>
    </>
  );
};

export default ChatList;
