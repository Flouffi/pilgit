import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';


export interface Month { value: boolean ; viewValue: string; }

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isAdmin;
  isLoaded = false;
  hasProfil = false;
  profil;
  search;
  search2;
  result = ''
  allResult;
  allResult2;
  nada = false;
  id;
  formQF;
  allResult3;
  allqf = [];
  etape =0;
  qf1;
  qf2;
  qf3;
  qf4;
  qf5;
  qf6;
  qf7;
  qf8;
  qf;

  statut: Month[] = [
    {value: true , viewValue: 'Valide'},
    {value: false , viewValue: 'Non valide'}
  ];

  constructor(public db: AngularFirestore, public authService: AuthService,
              public afAuth: AngularFireAuth, public router: Router,
              public dialog: MatDialog, public dialog2: MatDialog, public toastr: ToastrService) { this.main(); }

  ngOnInit() {
  }

  async main() {
    await this.afAuth.user.subscribe(user => this.db.collection('users').doc(user.uid).get().toPromise()
     .then((doc => this.profil = doc.data()))
     .then(ref => this.getQF())
     .then(ref2 => this.isAdmin = this.profil.isAdmin)
    // .then(ref3 => this.getData())
     .then(ref6 => this.isLoaded = true));
    }

 async getData(search:string) {
   var self = this;

   if(!this.search || !this.search2) {
     this.toastr.error('Merci d\'entrer le nom ET le prénom de la personne à rechercher','Impossible')
   }
   else {
    await this.db.collection('users',ref => ref.where('responsable.nom','==',this.search).where('responsable.prenom','==',this.search2))
    .get().toPromise()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          if (doc.data().pdf) {
            self.result = doc.data().pdf
            self.allResult = doc.data()
          }
          if (doc.data().responsable.qf) {
            self.result = doc.data().responsable.qf
            self.allResult = doc.data()
          }

          if (doc.data().validQF || !doc.data().validQF) {

            self.allResult2 = doc.data().validQF;
            console.log(self.allResult2)
          } 
          // if(!doc.data().pdf) {
          //   self.toastr.error('Aucun résultat avec' + ' ' + self.search + ' ' + self.search2,'Aucun résultat')
          // }
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
   }
    
  }



  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }


  openDialog(templateRef, event): void {
    this.id = event.target.id;
    
    const dialogRef = this.dialog.open(templateRef, { width: '600px' });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  majQF() {
    console.log(this.id)
    this.afAuth.user.subscribe(user => this.db.collection('users').doc(this.id).update({validQF : this.formQF}).then(ref => window.location.reload()));

  }


  getQF() {
    this.db
      .collection("QF")
      .doc("hx87ersLKOGdmOZpt9y3")
      .get()
      .toPromise()
      .then((doc) => {
        if (doc.exists) {
          this.allqf.push(doc.data());
          this.qf1 = doc.data().QF1
          this.qf2 = doc.data().QF2
          this.qf3 = doc.data().QF3
          this.qf4 = doc.data().QF4
          this.qf5 = doc.data().QF5
          this.qf6 = doc.data().QF6
          this.qf7= doc.data().QF7
          this.qf8 = doc.data().QF8

        }
      });
  }

  openDialog3(templateRef): void {
    const dialogRef = this.dialog.open(templateRef, { width: "800px" });
    dialogRef.afterClosed().subscribe((result) => {
      this.etape = 0;
    });
  }

  majQf() {
    this.qf = {
      QF1: this.qf1,
      QF2: this.qf2,
      QF3: this.qf3,
      QF4: this.qf4,
      QF5: this.qf5,
      QF6: this.qf6,
      QF7: this.qf7,
      QF8: this.qf8,
      Hors_Tourcoing: true,
    };

    this.db
      .collection("QF")
      .doc("hx87ersLKOGdmOZpt9y3")
      .set(this.qf)
      .then( ref =>  this.toastr.success('Mise à jour effectuée avec succès','Succès') )
      .then((ref) => window.location.reload());
  }

  croixRouge()
  {
    this.dialog.closeAll()
  }

}
