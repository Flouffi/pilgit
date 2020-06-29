import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

export interface Month2 {
  value: boolean;
  viewValue: string;
}
export interface Month {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-moteur',
  templateUrl: './moteur.component.html',
  styleUrls: ['./moteur.component.scss']
})
export class MoteurComponent implements OnInit {


  isAdmin;
  isLoaded = false;
  hasProfil = false;
  profil;
  search;
  search2;
  result3 = "";
  allResult = [];
  allResult2;
  id4;
  allqf = [];
  qf1;
  qf2;
  qf3;
  qf4;
  qf5;
  qf6;
  qf7;
  qf8;
  qf;
  formQF;
  result = [];
  result2 = [];
  choix;
  choix2;
  choix3;
  choixMois;
  choixMois2;
  choixMois3;
  id;
  id2;
  id3;
  eve = [];
  eve2 = [];
  app = true;
  IdDoc;
  etape = 0;
  etape2 = 0;
  lieuEve;
  newname;
  nada = false;
  allResult3;
  idD;
  seeVal = "def";
  gesteve = false;
  gests = false;
  semaine1 = [];
  semaine1Q = [];
  semaineQo = [];
  notif:number=0;

  places: Month[] = [
    {
      value: "Ecole Maternelle Branly (Belencontre 3/5 ans)",
      viewValue: "Ecole Maternelle Branly",
    },
    {
      value: "Ecole Racine (Belecontre 6/8 ans et 8/12 ans)",
      viewValue: "Ecole Racine",
    },
    { value: "CSC Belencontre (Ados)", viewValue: "CSC Belencontre" },
    {
      value: "CSC Phalempins (La Fontaine) (6/8 et 8/12 ans et Ados)",
      viewValue: "CSC Phalempins",
    },
    {
      value: "Ecoles Paul Bert (3/5 ans et 6/8 et 8/12 ans)",
      viewValue: "Paul Bert",
    },
  ];

  statut: Month[] = [
    { value: "yes", viewValue: "Payé" },
    { value: "wait", viewValue: "Liste d'attente" },
    { value: "no", viewValue: "Refusé" },
  ];

  months: Month[] = [
    { value: "Janvier", viewValue: "Janvier" },
    { value: "Fevrier", viewValue: "Février" },
    { value: "Mars", viewValue: "Mars" },
    { value: "Avril", viewValue: "Avril" },
    { value: "Mai", viewValue: "Mai" },
    { value: "Juin", viewValue: "Juin" },
    { value: "Juillet", viewValue: "Juillet" },
    { value: "Août", viewValue: "Août" },
    { value: "Septembre", viewValue: "Septembre" },
    { value: "Octobre", viewValue: "Octobre" },
    { value: "Novembre", viewValue: "Novembre" },
    { value: "Decembre", viewValue: "Décembre" },
  ];

  statut2: Month2[] = [
    { value: true, viewValue: "Valide" },
    { value: false, viewValue: "Non valide" },
  ];


  constructor(public db: AngularFirestore, public authService: AuthService,
    public afAuth: AngularFireAuth, public router: Router,
    public dialog: MatDialog, public dialog2: MatDialog, public toastr: ToastrService) { this.main(); }

  ngOnInit() {
  }

  async main() {
    await this.afAuth.user.subscribe(user => this.db.collection('users').doc(user.uid).get().toPromise()
     .then((doc => this.profil = doc.data()))
     .then(ref2 => this.isAdmin = this.profil.isAdmin)
     .then(ref => this.getEve())
     .then(ref => this.notification())
     .then(ref6 => this.isLoaded = true));
    }

    getEve() {
      this.db
        .collection("Eve")
        .get()
        .toPromise()
        .then((snapshot) =>
          snapshot.forEach((doc) => {
            if (doc.exists) {
              this.eve.push(doc.data());
              this.semaine1 = Object.keys(doc.data().Quota1);
              this.semaine1Q = Object.values(doc.data().Quota1);
              this.semaineQo = doc.data().Quota1;
            }
          })
        )
        .then((ref) => (this.app = false));
    }


    async getData(search: string, search2: string) {
      var self = this;
      self.allResult  = []
  
      if (!this.search && !this.search2) {
        this.toastr.error(
          "Merci d'entrer le nom OU le prénom de la personne à rechercher",
          "Impossible"
        );
      } else {
        if (search) {
          search = search.toLowerCase();
          await this.db
            .collection("users", (ref) =>
              ref.where("responsable.nom_lower", "==", this.search)
            )
            .get()
            .toPromise()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                if (doc.data().pdf) {
                  self.result3 = doc.data().pdf;
                  self.allResult.push(doc.data());
                  self.search='';
                }
                if (doc.data().responsable.qf && !doc.data().pdf) {
                  self.result3 = doc.data().responsable.qf;
                  self.allResult.push(doc.data());
                  self.search='';
                }
  
                if (doc.data().validQF || !doc.data().validQF) {
                  self.allResult2 = doc.data().validQF;
                  self.search='';
                }
                // if(!doc.data().pdf) {
                //   self.toastr.error('Aucun résultat avec' + ' ' + self.search + ' ' + self.search2,'Aucun résultat')
                // }
              });
            });
        }
  
        if (search2) {
          search2 = search2.toLowerCase();
          await this.db
            .collection("users", (ref) =>
              ref.where("responsable.prenom_lower", "==", this.search2)
            )
            .get()
            .toPromise()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                if (doc.data().pdf) {
                  self.result3 = doc.data().pdf;
                  self.allResult.push(doc.data());
                  self.search2='';
                }
                if (doc.data().responsable.qf && !doc.data().pdf) {
                  self.result3 = doc.data().responsable.qf;
                  self.allResult.push(doc.data());
  
                  self.search2='';
                }
  
                if (doc.data().validQF || !doc.data().validQF) {
                  self.allResult2 = doc.data().validQF;
                  self.search2='';
                }
                // if(!doc.data().pdf) {
                //   self.toastr.error('Aucun résultat avec' + ' ' + self.search + ' ' + self.search2,'Aucun résultat')
                // }
              });
            });
        }
  
      //   search2 = search2.toLowerCase();
      //   await this.db
      //     .collection("users", (ref) =>
      //       ref
      //         .where("responsable.nom_lower", "==", this.search)
      //         .where("responsable.prenom_lower", "==", this.search2)
      //     )
      //     .get()
      //     .toPromise()
      //     .then(function (querySnapshot) {
      //       querySnapshot.forEach(function (doc) {
      //         if (doc.data().pdf) {
      //           self.result3 = doc.data().pdf;
      //           self.allResult = doc.data();
      //         }
      //         if (doc.data().responsable.qf) {
      //           self.result3 = doc.data().responsable.qf;
      //           self.allResult = doc.data();
      //         }
  
      //         if (doc.data().validQF || !doc.data().validQF) {
      //           self.allResult2 = doc.data().validQF;
      //           console.log(self.allResult2);
      //         }
      //         // if(!doc.data().pdf) {
      //         //   self.toastr.error('Aucun résultat avec' + ' ' + self.search + ' ' + self.search2,'Aucun résultat')
      //         // }
      //       });
      //     })
      //     .catch(function (error) {
      //       console.log("Error getting documents: ", error);
      //     });
       }
    }


    SignOut() {
      return this.afAuth.auth.signOut().then(() => {
        localStorage.removeItem("user");
        this.router.navigate(["sign-in"]);
      });
    }

    openDialog4(templateRef, event): void {
      this.id4 = event.target.id;
  
      const dialogRef = this.dialog.open(templateRef, { width: "600px" });
      dialogRef.afterClosed().subscribe((result) => {});
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
        .then((ref) => window.location.reload());
    }
    
    majQF() {
      // console.log(this.id4)
      this.afAuth.user.subscribe((user) =>
        this.db
          .collection("users")
          .doc(this.id4)
          .update({ validQF: this.formQF })
          .then((ref) => window.location.reload())
      );
    }


    croixRouge()
    {
      this.dialog.closeAll()
    }

    dataEve3 = [];

    async getInscrid() {
      await this.afAuth.user.subscribe((user) =>
        this.db
          .collection("Inscriptions", (ref) =>
            ref.where("unique", "==", this.id)
          )
          .get()
          .toPromise()
          .then((ref) =>
            ref.forEach((doc) => {
              if (doc.exists) {
                this.dataEve3.push(doc.data());
              }
            })
          )
      );
    }
  
    verifwait = false;
    verifyes = false;
    verifno = false;
  
    voirAttente(event) {
      this.verifno = false;
      this.verifyes = false;
      this.seeVal = "wait";
    }
  
    voirVal(event) {
      this.verifno = false;
      this.verifwait = false;
      this.seeVal = "yes";
    }
  
    voirNo(event) {
      this.verifwait = false;
      this.verifyes = false;
      this.seeVal = "no";
    }
  
  
    modifAll() 
    {
     this.etape = 2;
     this.etape2 = 2;
     this.db.collection('Eve').doc(this.id3).get().toPromise().then(doc => {
       if(doc.data())
       {
         console.log(doc.data())
       }
     })
    }

    openDialogId(templateRef, id): void {
      this.idD = id.target.id;
      this.id = id.target.id
      console.log(this.idD)
      this.getInscrid();
      const dialogRef = this.dialog.open(templateRef, { width: "800px" });
      dialogRef.afterClosed().subscribe((result) => {
        this.etape = 0;
        this.etape2 = 0;
        this.dataEve3 = [];
     
      });
    }

    getInscriAll() {
      this.result2 = [];
      this.result = []
      this.db
        .collection("Inscriptions", (ref) =>
          ref.where("eve", "==", this.choixMois3)
        )
        .get()
        .toPromise()
        .then((snapshot) =>
          snapshot.forEach((doc) => {
            if (doc.exists) {
              this.result.push(doc.data());
            }
          })
        );
    }

    reset() {
      this.result = [];
      this.result2 = [];
    }

    updateStatut() {
      console.log(this.idD)
      console.log(this.choix3)
      this.db
        .collection("Inscriptions")
        .doc(this.id)
        .update({ IsValid: this.choix3 })
        .then((ref) => window.location.reload());
    }

usernotif=[]
    notification()
    {
      this.db.collection('users', ref => ref.where('pdfnew', '==', true)).get().toPromise().then(ref => {
        ref.forEach(doc => {
          if(doc.exists)
          {
            this.usernotif.push(doc.data())
            if(doc.data().pdfnew)
            {
              this.getnotif()
            }
          }
        })
      })
      console.log(this.usernotif)
    }

    getnotif()
    {
      this.notif++;
    }


    validPDF(id,id2,id3)
    {
      if(confirm('Valider le PDF et le QF de ' + id3 + ' ' + id2 + ' ? ' ))
      {
        this.db.collection('users').doc(id).update({['responsable.validQF'] : true, pdfnew : false}).then(ref => this.toastr.success('Mise à jour du compte','Validation en cours...'))
        .then(ref => this.usernotif = [])
        .then(ref => this.notif = 0)
        .then(ref => 
          this.notification())
      }
    
    }


    refusPDF(id,id2,id3)
    {
      if(confirm('Refuser le PDF et le QF de ' + id3 + ' ' + id2 + ' ? ' ))
      {
        this.db.collection('users').doc(id).update({['responsable.validQF'] : false, pdfnew : false, refusPDF : true}).then(ref => this.toastr.success('Mise à jour du compte','Refus en cours...'))
        .then(ref => this.usernotif = [])
        .then(ref => this.notif = 0)
        .then(ref => 
          this.notification())
      }
    
    }

    
  

}
