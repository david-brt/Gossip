export interface Room {
  id: string;
  name: string;
  messages: Message[];
}

export interface Message {
  id: string;
  text: string;
  time: string;
  user: string;
}
