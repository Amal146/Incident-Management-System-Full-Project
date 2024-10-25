import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";
import { LayoutService } from "../../../@core/utils";
import { map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { NbAuthService } from "@nebular/auth";
import { NotificationService } from "../../../service/notification/notification.service";
import { PopoverNotifyComponent } from "../notification/popover-notify.component";
import { Router } from "@angular/router";
import { ChatService } from "../../../pages/extra-components/chat/chat.service";
import { GeminiAiService } from "../../../service/gemini-ai/gemini-ai.service";

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
  providers: [ ChatService ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: any = {};
  showChat = false;
  showNotifications = false;
  unreadCount = 0;
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly = false;
  hasUnreadMessages = false; // Flag to track unread messages

  currentTheme = "cosmic";
  userMenu = [{ title: "Log out", link: 'auth/logout' }];
  currentUser = localStorage.getItem("currentUser");
  notifyComponent = PopoverNotifyComponent;
  themes = [
    { value: "default", name: "Light" },
    { value: "dark", name: "Dark" },
    { value: "cosmic", name: "Cosmic" },
    { value: "corporate", name: "Corporate" },
  ];
  messages: any[] = [];

  constructor(
    private notificationService: NotificationService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authService: NbAuthService,
    private router: Router,
    protected chatService: ChatService,
    private geminiAiService: GeminiAiService
  ) {
    this.messages = this.chatService.loadMessages();
  }

  @ViewChild('notificationsInbox') notificationsInbox: ElementRef;


  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'nb-compose',
      };
    });
  
    // Push the user message
    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'You',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
  
    // Add a note indicating the message is sent and a reply will be provided soon
    this.messages.push({
      text: 'Message sent. We will reply to you soon.',
      date: new Date(),
      reply: false,
      type: 'text',
      user: {
        name: 'InciManage Bot',
        avatar: 'https://i.gifer.com/SVKl.gif',
      },
    });
  
    // Define the pattern for IT incident-related questions and greetings
    const incidentKeywords = /incident|problem|issue|error|bug|failure|downtime/gi;
    const greetingKeywords = /hello|hi|hey|greetings|good morning|good afternoon|good evening/gi;
  
    // Check if the message is either a greeting or related to IT incidents
    if (incidentKeywords.test(event.message) || greetingKeywords.test(event.message)) {
      this.geminiAiService.generateText(event.message).then(
        (responseText) => {
          const botReply = {
            text: responseText || 'I could not understand your request.',
            date: new Date(),
            reply: false,
            type: 'text',
            user: {
              name: 'InciManage Bot',
              avatar: 'https://i.gifer.com/SVKl.gif',
            },
          };
  
          if (!this.showChat) {
            // Set the flag for unread messages if the chatbot is closed
            this.hasUnreadMessages = true;
          }
  
          setTimeout(() => {
            this.messages.push(botReply);
          }, 500);
        },
        (error) => {
          console.error('AI service error:', error);
          const botReply = {
            text: 'Sorry, I am having trouble connecting to the AI service right now.',
            date: new Date(),
            reply: false,
            type: 'text',
            user: {
              name: 'InciManage Bot',
              avatar: 'https://i.gifer.com/SVKl.gif',
            },
          };
  
          if (!this.showChat) {
            // Set the flag for unread messages if the chatbot is closed
            this.hasUnreadMessages = true;
          }
  
          setTimeout(() => {
            this.messages.push(botReply);
          }, 500);
        }
      );
    } else {
      // If the message is not recognized as an IT incident or greeting
      const botReply = {
        text: 'I only respond to questions about IT incidents.',
        date: new Date(),
        reply: false,
        type: 'text',
        user: {
          name: 'InciManage Bot',
          avatar: 'https://i.gifer.com/SVKl.gif',
        },
      };
  
      if (!this.showChat) {
        // Set the flag for unread messages if the chatbot is closed
        this.hasUnreadMessages = true;
      }
  
      setTimeout(() => {
        this.messages.push(botReply);
      }, 500);
    }
  }
  
  
  
  ngOnInit() {
    const userId = this.currentUser ? JSON.parse(this.currentUser)["id"] : null;

    this.notificationService.getUnreadNotifications(userId).subscribe(notifications => {
      this.unreadCount = notifications.length;
    });

    this.currentTheme = this.themeService.currentTheme;
    const { xl } = this.breakpointService.getBreakpointsMap();

    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe((isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl));

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));

    this.authService.onTokenChange().subscribe((token) => {
      if (token.isValid()) {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
      }
    });
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
