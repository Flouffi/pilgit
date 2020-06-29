import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit() {
    this.dialog.closeAll()
   }

   goToHome(){
     this.router.navigateByUrl('/sign-in');
   }
}
