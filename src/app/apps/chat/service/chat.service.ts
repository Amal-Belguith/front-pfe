import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage } from '../model/chat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any;
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);
  private userSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  constructor() { 
    this.initConnectionSocket();   
  }

  initConnectionSocket() {
    const url = '//localhost:8091/chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }

  joinRoom(roomId: string, chatMessage: ChatMessage) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {
        const messageContent = JSON.parse(message.body);
        const currentMessage = this.messageSubject.getValue();
        currentMessage.push(messageContent);
        this.messageSubject.next(currentMessage);
      });
      
      this.stompClient.subscribe(`/topic/users/${roomId}`, (users: any) => {
        const userContent = JSON.parse(users.body);
        this.userSubject.next(userContent);
      });

      this.sendUserAction(roomId, chatMessage, '/app/join');
    });
  }

  leaveRoom(roomId: string, chatMessage: ChatMessage) {
    this.sendUserAction(roomId, chatMessage, '/app/leave');
  }

  sendMessage(roomId: string, chatMessage: ChatMessage) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
  }

  sendUserAction(roomId: string, chatMessage: ChatMessage, action: string) {
    this.stompClient.send(action + `/${roomId}`, {}, JSON.stringify(chatMessage));
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();     
  }

  getUserSubject() {
    return this.userSubject.asObservable();
  }
}