import { Injectable } from "@angular/core";
import { Stomp } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any;
  private nickname: string | null = null;
  private fullname: string | null = null;
  private selectedUserId: string | null = null;

  constructor() {}

  connect(nickname: string, fullname: string) {
    this.nickname = nickname.trim();
    this.fullname = fullname.trim();

    if (this.nickname && this.fullname) {
      const socket = new SockJS('/ws');
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect({}, this.onConnected.bind(this), this.onError.bind(this));
    }
  }

  private onConnected() {
    this.stompClient.subscribe(`/user/${this.nickname}/queue/messages`, this.onMessageReceived.bind(this));
    this.stompClient.subscribe(`/user/public`, this.onMessageReceived.bind(this));

    // Register the connected user
    this.stompClient.send("/app/user.addUser",
      {},
      JSON.stringify({nickName: this.nickname, fullName: this.fullname, status: 'ONLINE'})
    );
    document.getElementById('connected-user-fullname')!.textContent = this.fullname!;
    this.findAndDisplayConnectedUsers();
  }

  private async findAndDisplayConnectedUsers() {
    try {
      const connectedUsersResponse = await fetch('/users');
      const connectedUsers = await connectedUsersResponse.json();
      const filteredUsers = connectedUsers.filter((user: any) => user.nickName !== this.nickname);
      const connectedUsersList = document.getElementById('connectedUsers');
      if (connectedUsersList) {
        connectedUsersList.innerHTML = '';

        filteredUsers.forEach((user: any) => {
          this.appendUserElement(user, connectedUsersList!);
          if (filteredUsers.indexOf(user) < filteredUsers.length - 1) {
            const separator = document.createElement('li');
            separator.classList.add('separator');
            connectedUsersList.appendChild(separator);
          }
        });
      }
    } catch (error) {
      console.error('Error fetching connected users:', error);
    }
  }

  private appendUserElement(user: any, connectedUsersList: HTMLElement) {
    const listItem = document.createElement('li');
    listItem.classList.add('user-item');
    listItem.id = user.nickName;

    const userImage = document.createElement('img');
    userImage.src = 'assets/images/user_icon.png';
    userImage.alt = user.fullName;

    const usernameSpan = document.createElement('span');
    usernameSpan.textContent = user.fullName;

    const receivedMsgs = document.createElement('span');
    receivedMsgs.textContent = '0';
    receivedMsgs.classList.add('nbr-msg', 'hidden');

    listItem.appendChild(userImage);
    listItem.appendChild(usernameSpan);
    listItem.appendChild(receivedMsgs);

    listItem.addEventListener('click', this.userItemClick.bind(this));

    connectedUsersList.appendChild(listItem);
  }

  private userItemClick(event: MouseEvent) {
    const clickedUser = event.currentTarget as HTMLElement;
    document.querySelectorAll('.user-item').forEach(item => {
      item.classList.remove('active');
    });
    const messageForm = document.querySelector('#messageForm');
    if (messageForm) {
      messageForm.classList.remove('hidden');
    }

    clickedUser.classList.add('active');

    this.selectedUserId = clickedUser.getAttribute('id');
    this.fetchAndDisplayUserChat();
    const nbrMsg = clickedUser.querySelector('.nbr-msg');
    if (nbrMsg) {
      nbrMsg.classList.add('hidden');
      nbrMsg.textContent = '0';
    }
  }

  private displayMessage(senderId: string, content: string) {
    const chatArea = document.querySelector('#chat-messages');
    if (chatArea) {
      const messageContainer = document.createElement('div');
      messageContainer.classList.add('message');
      if (senderId === this.nickname) {
        messageContainer.classList.add('sender');
      } else {
        messageContainer.classList.add('receiver');
      }
      const message = document.createElement('p');
      message.textContent = content;
      messageContainer.appendChild(message);
      chatArea.appendChild(messageContainer);
      chatArea.scrollTop = chatArea.scrollHeight;
    }
  }

  private async fetchAndDisplayUserChat() {
    if (this.nickname && this.selectedUserId) {
      try {
        const userChatResponse = await fetch(`/messages/${this.nickname}/${this.selectedUserId}`);
        const userChat = await userChatResponse.json();
        const chatArea = document.querySelector('#chat-messages');
        if (chatArea) {
          chatArea.innerHTML = '';
          userChat.forEach((chat: any) => {
            this.displayMessage(chat.senderId, chat.content);
          });
          chatArea.scrollTop = chatArea.scrollHeight;
        }
      } catch (error) {
        console.error('Error fetching user chat:', error);
      }
    }
  }

  private onError() {
    const connectingElement = document.querySelector('.connecting');
    if (connectingElement) {
      connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    }
  }

  sendMessage(messageContent: string) {
    if (messageContent && this.stompClient && this.nickname && this.selectedUserId) {
      const chatMessage = {
        senderId: this.nickname,
        recipientId: this.selectedUserId,
        content: messageContent.trim(),
        timestamp: new Date()
      };
      this.stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      this.displayMessage(this.nickname, messageContent.trim());
      const messageInput = document.querySelector('#message') as HTMLInputElement;
      if (messageInput) {
        messageInput.value = '';
      }
    }
  }

  private async onMessageReceived(payload: any) {
    await this.findAndDisplayConnectedUsers();
    console.log('Message received', payload);
    const message = JSON.parse(payload.body);
    if (this.selectedUserId && this.selectedUserId === message.senderId) {
      this.displayMessage(message.senderId, message.content);
    }

    if (this.selectedUserId) {
      const selectedUser = document.querySelector(`#${this.selectedUserId}`);
      if (selectedUser) {
        selectedUser.classList.add('active');
      }
    } else {
      const messageForm = document.querySelector('#messageForm');
      if (messageForm) {
        messageForm.classList.add('hidden');
      }
    }

    const notifiedUser = document.querySelector(`#${message.senderId}`);
    if (notifiedUser && !notifiedUser.classList.contains('active')) {
      const nbrMsg = notifiedUser.querySelector('.nbr-msg');
      if (nbrMsg) {
        nbrMsg.classList.remove('hidden');
        nbrMsg.textContent = '';
      }
    }
  }

  onLogout() {
    if (this.stompClient && this.nickname && this.fullname) {
      this.stompClient.send("/app/user.disconnectUser",
        {},
        JSON.stringify({nickName: this.nickname, fullName: this.fullname, status: 'OFFLINE'})
      );
      window.location.reload();
    }
  }
}

