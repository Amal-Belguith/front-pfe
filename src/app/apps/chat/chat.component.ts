import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from './model/chat-message';
import { ChatService } from './service/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
 
  messageInput: string = '';
  userId: string = '';
  messageList: any[] = [];
  userList: any[] = [];
  roomId: string = 'ABC';
  userConnected: any;
  firstName: string = '';
  lastName: string = '';

  constructor(private chatService: ChatService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    this.setConnectedUser();
    const chatMessage = {
      user: this.userId,
      firstName: this.firstName,
      lastName: this.lastName
    } as ChatMessage;
    this.chatService.joinRoom(this.roomId, chatMessage);
    this.listenToMessages();
    this.listenToUsers();
  }

  setConnectedUser() {
    const userConnectedString = localStorage.getItem('currentUser');
    if (userConnectedString) {
      this.userConnected = JSON.parse(userConnectedString);
      this.firstName = this.userConnected.firstname;
      this.lastName = this.userConnected.lastname;
    }
  }

  ngOnDestroy(): void {
    const chatMessage = {
      user: this.userId,
      firstName: this.firstName,
      lastName: this.lastName
    } as ChatMessage;
    this.chatService.leaveRoom(this.roomId, chatMessage);
  }

  sendMessage() {
    const chatMessage = {
      message: this.messageInput,
      user: this.userId,
      firstName: this.firstName,
      lastName: this.lastName
    } as ChatMessage;
    this.chatService.sendMessage(this.roomId, chatMessage);
    this.messageInput = '';
  }

  listenToMessages() {
    this.chatService.getMessageSubject().subscribe((messages: any) => {
      this.messageList = messages.map((item: any) => ({
        ...item,
        message_side: item.user === this.userId ? 'sender' : 'receiver'
      }));
    });
  }

  listenToUsers() {
    this.chatService.getUserSubject().subscribe((users: any) => {
      this.userList = users;
      console.log('!!!!!!!!!!!!!!!!!!>>>>>>>>>>> ' , this.userList)
    });
  }
}