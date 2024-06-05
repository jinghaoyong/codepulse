import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChatMessage, ChatUser } from '../models/chat.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { chatData, chatMessagesData } from '../models/data-chat';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../auth/models/user.model';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  // bread crumb items
  @ViewChild('componentRef') scrollRef: any;

  // chatData?: ChatUser[];
  // chatMessagesData?: ChatMessage[];

  formData!: UntypedFormGroup;

  // Form submit
  chatSubmit?: boolean;

  username: string = 'John Howard';
  status: string = 'Online';
  usermessage?: string;

  targetUserId?: string;
  chatroomId?: string;

  targetUser?: any;

  chatData?: any[];
  chatMessagesData?: any[];

  constructor(
    public formBuilder: UntypedFormBuilder,
    private chatServ: ChatService,
    private route: ActivatedRoute,
    private authServ: AuthService
  ) {
    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
  }

  ngOnInit() {

    this.route.paramMap.subscribe({
      next: async (params: any) => {
        this.targetUserId = params.get('id');

        if (this.targetUserId) {
          this.authServ.getUserProfile(this.targetUserId).then((userProfile: any) => {
            if (userProfile) {
              this.targetUser = userProfile;
            }
          });
          console.log("targetUserId", this.targetUserId)
          this.chatroomId = await this.chatServ.createOrGetChatroom(this.targetUserId);
          console.log("chatroomId", this.chatroomId)
        }
      }
    })

    // this.chatServ.getMessages();
  }

  ngAfterViewInit() {
    this.onListScroll();

  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  // private _fetchData() {
  //   this.chatData = chatData;
  //   this.chatMessagesData = chatMessagesData;
  //   this.onListScroll();
  // }

  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight + 1500;
      }, 500);
    }
  }

  /**
   * Save the message in chat
   */
  messageSave() {
    const message = this.formData.get('message')?.value;
    const currentDate = new Date();
    if (this.formData.valid && message) {
      // Message Push in Chat
      // this.chatMessagesData?.push({
      //   align: 'right',
      //   name: 'Henry Wells',
      //   message,
      //   time: currentDate.getHours() + ':' + currentDate.getMinutes(),
      // });
      setTimeout(() => {
        this.onListScroll();
      });
      // Set Form Data Reset
      this.formData = this.formBuilder.group({
        message: null,
      });
    }

    this.chatSubmit = true;
  }

  // Delete Message
  deleteMessage(event: any) {
    event.target.closest('li').remove();
  }

  // Copy Message
  copyMessage(event: any) {
    navigator.clipboard.writeText(event.target.closest('li').querySelector('p').innerHTML);
  }

  // Delete All Message
  deleteAllMessage(event: any) {
    var allMsgDelete: any = document.querySelector('.chat-conversation')?.querySelectorAll('li');
    allMsgDelete.forEach((item: any) => {
      item.remove();
    })
  }

  chatUsername(): void {

  }

  // const firestore1: Firestore = this.firebaseServ.getApp1Firestore();
  // const firestore2: Firestore = this.firebaseServ.getApp2Firestore();

  // const querySnapshot1 = await getDocs(collection(firestore1, 'posts'));
  // const querySnapshot2 = await getDocs(collection(firestore2, 'posts'));

  // querySnapshot1.forEach(doc => {
  //   console.log(`${doc.id} => ${doc.data()}`);
  // });

  // querySnapshot2.forEach(doc => {
  //   console.log(`${doc.id} => ${doc.data()}`);
  // });

}
