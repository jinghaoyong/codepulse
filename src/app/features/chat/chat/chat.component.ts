import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChatMessage, ChatUser } from '../models/chat.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { chatData, chatMessagesData } from '../models/data-chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  // bread crumb items
  @ViewChild('componentRef') scrollRef: any;

  chatData?: ChatUser[];
  chatMessagesData?: ChatMessage[];

  formData!: UntypedFormGroup;

  // Form submit
  chatSubmit?: boolean;

  username: string = 'John Howard';
  status: string = 'Online';
  usermessage?: string;

  constructor(public formBuilder: UntypedFormBuilder) { }

  ngOnInit() {

    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    this._fetchData();
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

  private _fetchData() {
    this.chatData = chatData;
    this.chatMessagesData = chatMessagesData;
    this.onListScroll();
  }

  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight + 1500;
      }, 500);
    }
  }

  chatUsername(name: any, status: any) {
    this.username = name;
    this.status = status;
    this.usermessage = 'Hello';
    this.chatMessagesData = [];
    const currentDate = new Date();

    this.chatMessagesData.push({
      name: this.username,
      message: this.usermessage,
      time: currentDate.getHours() + ':' + currentDate.getMinutes(),
    });
  }

  /**
   * Save the message in chat
   */
  messageSave() {
    const message = this.formData.get('message')?.value;
    const currentDate = new Date();
    if (this.formData.valid && message) {
      // Message Push in Chat
      this.chatMessagesData?.push({
        align: 'right',
        name: 'Henry Wells',
        message,
        time: currentDate.getHours() + ':' + currentDate.getMinutes(),
      });
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

}
