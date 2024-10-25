import { Component, ChangeDetectorRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NbRegisterComponent } from '@nebular/auth';
import { NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { User } from '../../model/user'; 
import { ToastrComponent } from '../../pages/modal-overlays/toastr/toastr.component';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
})
export class NgxRegisterComponent extends NbRegisterComponent {
  user!: User;
  strategy: string = 'email';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    cd: ChangeDetectorRef,
    router: Router,
    private toastrService :NbToastrService
  ) {
    super(service, options, cd, router);
  }
  showSuccess() {
    this.toastrService.show("Authenticated successfully !", "Success", {
      status: "success",
    });
  }
  register(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    
    this.service.register(this.strategy, this.user).subscribe(
      (result: any) => {
        this.submitted = false;

        if (result.isSuccess()) {
          this.messages = result.getMessages();
          this.showSuccess();
          console.log("Registration successful!");
          setTimeout(() => {
            this.router.navigate(['/auth/login']); 
          }, this.getConfigValue('forms.register.redirectDelay'));
        } else {
          this.messages = result.getMessages();
          this.errors = result.getErrors();
          console.log("Registration failed!" , this.errors.toString());
          if (this.errors.toString() === "Token is empty or invalid."){
            this.showSuccess();
            this.router.navigate(['/auth/login']);
          }
        }

        this.cd.detectChanges();
      },
      (error: any) => {
        console.log("Registration error!");
        this.submitted = false;
        this.errors = [error];
        this.cd.detectChanges();
      },
    );
  }
}
