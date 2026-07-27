let socket: any | null = null;

export const initSocket = (userId: string): any => {
  const baseURLSocket = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
  if (!socket) {
    socket = new WebSocket(
     `${baseURLSocket}?userId=${userId}&transport=websocket`,
    );
  }
  return socket;
};

// export const initSocket = (userId: string): WebSocket => {
//   // Always create a new connection rather than singleton
//   return new WebSocket(`ws://dev82.developer24x7.com:4016/socket.io/?userId=${userId}=4&transport=websocket`);
// };
 