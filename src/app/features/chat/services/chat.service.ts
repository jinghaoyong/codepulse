import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat.model';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user?: User;
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private authServ: AuthService,
  ) {
    this.user = this.authServ.getUser();
  }

  async createOrGetChatroom(userId1: string) {
    try {
      const userId2 = this.user?.uid;
      if (!userId2) throw new Error('Current user ID is not available');

      // Step 1: Check if the chatroom already exists
      const chatrooms = await this.firestore.collection('chatrooms', ref =>
        ref.where('participants', 'array-contains', userId1)
      ).get().toPromise();

      let chatroomId = null;

      console.log("chatrooms", chatrooms);

      chatrooms?.docs.forEach((chatroom: any) => {
        const participants = chatroom.data()?.participants;
        console.log("participants", participants);
        if (participants.includes(userId1) && participants.includes(userId2)) {
          chatroomId = chatroom.id;
        }
      });

      // Step 2: If chatroom does not exist, create one
      if (!chatroomId) {
        const chatroomRef = await this.firestore.collection('chatrooms').add({
          participants: [userId1, userId2],
          readStatus: {
            [userId1]: false,
            [userId2]: false
          },
          lastMessage: null
        });

        chatroomId = chatroomRef.id;
      }

      return chatroomId;

    } catch (error) {
      console.error('Error creating or getting chatroom:', error);
      throw error;
    }
  }

  getMessages(chatRoomId: string): Observable<ChatMessage[]> {
    return this.firestore
      .collection<ChatMessage>(`chatrooms/${chatRoomId}/messages`, ref => ref.orderBy('timestamp'))
      .valueChanges();

  }

  sendMessage(chatRoomId: string, content: string): Promise<any> {
    const timestamp = Date.now();

    if (this.user) {
      const message: ChatMessage = { message: content, createdAt: new Date().toString(), senderId: this.user.uid };
      return this.firestore.collection(`chatrooms/${chatRoomId}/messages`).add(message);
    } else {
      return Promise.reject('No user logged in');
    }
  }
}
