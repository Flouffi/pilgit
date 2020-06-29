import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

   typewriter_text: string = "Créer";
   typewriter_display: string = "";
   texte = '';
   img = '';

  constructor(private dialog: MatDialog, public authService: AuthService, public router: Router, public db: AngularFirestore) {

    this.db.collection('home').doc('acc').get().toPromise().then(doc => {
      if(doc.exists)
      {
        this.texte = doc.data().message;
        this.img = doc.data().image
      }
    })

  }

  openDialog(templateRef): void {
    const dialogRef = this.dialog.open(templateRef, { width: '500px'});
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  goToVerif() {
    this.router.navigate(['/mot-de-passe-oublie']).then(ref => this.dialog.closeAll());
  }

  typingCallback(that) {
    let total_length = that.typewriter_text.length;
    let current_length = that.typewriter_display.length;
    if (current_length < total_length) {
      that.typewriter_display += that.typewriter_text[current_length];
      setTimeout(that.typingCallback, 100, that);
    } else {
      that.typewriter_display = "";
    }
  }
  ngOnInit() {
    // setInterval(() => {this.typingCallback(this)},2000)
    
  }

}
