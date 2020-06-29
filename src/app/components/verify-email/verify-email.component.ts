import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  user;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit() {
  }

  goToHome() {
    this.router.navigateByUrl('').then(ref => window.location.reload());
  }
}
