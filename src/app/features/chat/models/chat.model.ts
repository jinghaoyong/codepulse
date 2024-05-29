export interface ChatUser {
    image?: string;
    name: string;
    message: string;
    time: string;
    status?: string;
    unread?: string;
}

export interface ChatRoom {
    chatRoomId: string;

}

export interface ChatMessage {
    senderId?: string;
    message: string;
    createdAt: string;
}
