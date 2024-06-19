export interface ISenderMessage {
  id: number;
  name: string;
  image: string;
}

export interface IReceiverMessage extends ISenderMessage {}

export interface IUserChat extends ISenderMessage {
  phone: string;
  last_seen: string;
}

export interface ISellerChat extends IUserChat {}

export interface IChat {
  chat_id: string;
  id: number;
  name: string;
  price: number;
  image: string;
  currency: string;
  status: string;
  created_at: string;
  last_message: string;
  last_seen: number;
  total_unseen: number;
  user: IUserChat;
  seller: ISellerChat;
}

export interface IMessage {
  id: number;
  sender_id: ISenderMessage;
  receiver_id: IReceiverMessage;
  type?: string;
  message: string;
  image: string;
  created_at: string;
  updated_at?: string;
}
