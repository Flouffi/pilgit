import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import * as XLSX from 'xlsx'; 


export interface Month {
  value: string;
  viewValue: string;
}
export interface Month2 {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  isAdmin;
  isLoaded = false;
  hasProfil = false;
  profil;
  result = [];
  result2 = [];
  fileName= 'ExcelSheet.xlsx';  
  fileName2= 'ExcelSheet.xlsx';  
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
  newname;
  search;
  search2;
  result3 = "";
  allResult = [];
  allResult2;
  nada = false;
  id4;
  formQF;
  allResult3;
  idD;
  seeVal = "def";
  gesteve = false;
  gesteve2 = false;
  gests = false;
  semaine1 = [];
  semaine1Q = [];
  choixTab;
  nameBdd = [];
  Tab$;
  results3;
  results2;
  data:any;
  data2;
  col = [];
  columnsToDisplay = [];
  dataToDisplay = [];
  itemList: any[];
  dataSource;
  data3 = [];
  hasGS = false;
  hasGM = false;
  hasCantine = false;
  show = false;
  etapeQ2= 0;
  cmer;
  listing = []
  detailList = []

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

  dataFromServer: any =
    [{
      'id': 20,
      'someFeild1': 'asdfasdf',
      'someFeild2': 'asdf',
      'someFeild3': 'asdfasdfasfasdfa',
      },
     {
      'id': 81,
      'someFeild1': 'aasdfsdf',
      'someFeild2': 'asasdfdf',
      'someFeild3': 'dfasfasdfa',
      }, 
    ];
    customHeaders: any = {
      thead: ['CUSTOM NAME 1', 'SOME COOL NAME', 'ANOTHER NAME', '2', '5', '5'], // the Column Name in table head.
      displayed: ['someFeild1', 'someFeild2', 'someFeild3', '5', '6', '8'], // the data it should populate in table.
    };

   
 

  constructor(
    public db: AngularFirestore,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    public router: Router,
    public dialog: MatDialog,
    public dialog2: MatDialog,
    public toastr: ToastrService
  ) {
    this.main();
  }

  ngOnInit() {}

  async main() {
    await this.afAuth.user.subscribe((user) =>
      this.db
        .collection("users")
        .doc(user.uid)
        .get()
        .toPromise()
        .then((doc) => (this.profil = doc.data()))
        .then((ref2) => (this.isAdmin = this.profil.isAdmin))
        .then((ref) => this.getQF())
        .then((ref) => this.getEve())
        .then((ref => this.getEve2()))
        // .then(ref => this.getInscrid())
        .then((ref6) => (this.isLoaded = true))
    );
  }

  getInscri() {
    this.result2 = [];
    this.db
      .collection("Inscriptions", (ref) =>
        ref
          .where("IsValid", "==", "wait")
          .where("Lieu", "==", this.choix)
          .where("eve", "==", this.choixMois)
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

  getInscri2() {
    this.result = [];
    this.db
      .collection("Inscriptions", (ref) =>
        ref.where("IsValid", "==", "yes").where("eve", "==", this.choixMois2)
      )
      .get()
      .toPromise()
      .then((snapshot) =>
        snapshot.forEach((doc) => {
          if (doc.exists) {
            this.result2.push(doc.data());
          }
        })
      );
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

  openDialog(templateRef, id): void {
    console.log(id)
    this.id = id.srcElement.id;
    console.log(id)
    const dialogRef = this.dialog.open(templateRef, { width: "600px" });
    dialogRef.afterClosed().subscribe((result) => {
      this.listing = [];
    });
  }
  idNom;
  idDocument;
  idMercredi;

  openDialog2(templateRef, id, id2,id3,id4,id5): void {

    this.id2 = id;
    this.id3 = id2;
    this.idNom = id3
    this.cmer = id4;
    this.idMercredi = id5;

    console.log(id4)

    const dialogRef = this.dialog.open(templateRef, { autoFocus: false,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%' });
    dialogRef.afterClosed().subscribe((result) => {
      this.etape = 0;
      this.etape2 = 0;
      this.etapeQ2= 0;
      this.listing = [];
      this.id2;
      this.id3;
      this.idNom;
    });
  }

  openDialog3(templateRef): void {
    const dialogRef = this.dialog.open(templateRef, { width: "800px" });
    dialogRef.afterClosed().subscribe((result) => {
      this.etape = 0;
      this.etape2 = 0;
    });
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

  semaineQo;

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
           // this.semaine1Q = Object.values(doc.data().Quota1);
            this.semaineQo = doc.data().Quota1;
          }
        })
      )
      .then((ref) => (this.app = false));
  }


  getEve2() {
    this.db
      .collection("archive", ref => ref.where('Etat','==','archive'))
      .get()
      .toPromise()
      .then((snapshot) =>
        snapshot.forEach((doc) => {
          if (doc.exists) {
            this.eve2.push(doc.data());
            // this.semaine1 = Object.keys(doc.data().Quota1);
            // this.semaine1Q = Object.values(doc.data().Quota1);
            // this.semaineQo = doc.data().Quota1;
          }
        })
      )
      .then((ref) => (this.app = false));
  }

  suppEve() {
    // console.log(this.id2)
    if (confirm("Etes-vous sûr de vouloir supprimer cet évènement ?")) {
      this.db
        .collection("Eve", (ref) => ref.where("Id", "==", this.id2))
        .get()
        .toPromise()
        .then((snapshot) =>
          snapshot.forEach((doc) => {
            if (doc.exists) {
              this.IdDoc = doc.data().IdDoc;
            }
          })
        )
        .then((ref) => this.db.collection("Eve").doc(this.IdDoc).delete())
        .then((ref) => window.location.reload());
    }
  }

  modifEve() {
    // console.log(this.id3)
    this.etape = this.etape + 1;
  }

  modifEve3() {
    // console.log(this.id3)
    this.etape = this.etape = 1;
    this.etape2 = this.etape2 + 1;
  }

  modifEve2() {
    this.db
      .collection("Eve")
      .doc(this.id3)
      .update({ Lieu: this.lieuEve })
      .then((ref) => window.location.reload());
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
        }
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
      .then((ref) => window.location.reload());
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

  async duplicate() {
    let dup;
    await this.db
      .collection("Eve", (ref) => ref.where("Id", "==", this.id2))
      .get()
      .toPromise()
      .then((snapshot) =>
        snapshot.forEach((doc) => {
          if (doc.exists) {
            dup = doc.data().IdDoc + "n";
            if (doc.data().IdDoc) {
              console.log(doc.data().IdDoc);
              this.db.collection("Eve").doc(dup).set(doc.data());

              setTimeout(() => {
                this.db.collection("Eve").doc(dup).update({ IdDoc: dup });
              }, 100);
            }
          }
        })
      )
      .then((ref) =>
        this.toastr.success("Votre évenement a bien été dupliqué", "Succès !")
      )
      .then((ref) =>
        setTimeout(() => {
          window.location.reload();
        }, 1500)
      );
  }

  modifEve4() {
    this.db
      .collection("Eve")
      .doc(this.id3)
      .update({ Nom: this.newname })
      .then((ref) => window.location.reload());
  }

  async archiveEve() {
    let content;
    let dump;

    await this.db
      .collection("Eve", (ref) => ref.where("Id", "==", this.id2))
      .get()
      .toPromise()
      .then((snapshot) =>
        snapshot.forEach((doc) => {
          if (doc.exists) {
            content = doc.data();
            content.Etat = 'archive'
            dump = doc.data().IdDoc + "archive";
           

            // if (doc.data().IdDoc) {
            //   console.log(doc.data().IdDoc);
            //   this.db.collection("Eve").doc(dup).set(doc.data());

            setTimeout(() => {
              this.db
                .collection("archive")
                .doc(dump)
                .set(content)
                .then((ref) =>
                  this.db
                    .collection("Eve", (ref) => ref.where("Id", "==", this.id2))
                    .get()
                    .toPromise()
                    .then(function (querySnapshot) {
                      querySnapshot.forEach(function (doc) {
                        doc.ref.delete();
                      });
                    })
                )
                .then((ref) => window.location.reload());
            }, 100);
          }
        })
      )
      .then((ref) =>
        this.toastr.success("Votre évenement a bien été archivé", "Succès !")
      );
    // .then((ref) =>
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 1500)
    // );
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

  croixRouge()
  {
    this.dialog.closeAll()
  }

  modifEveQ()
  {

    this.etape  = 2;
    this.etape2 = 2;
    this.getTab2()
  }

  idt;
  row:any;

  deleteByIdS(ids) {
    console.log(this.idt); // this function gives the ID of deleted rows.. as an array
  }

  updateChanges(row) {
    this.row = row;
    console.log(row); // This return the row which is updated with the id.
  }

  async getTab2() {
    //  this.hasGM = false;
    //  this.hasGS = false;
    this.dataFromServer =
    [{
      'id': 0,
      'someFeild1': 'Choisir',
      'someFeild2': 'une',
      'someFeild3': 'grille',
      },
    ];
    this.data
    this.Tab$ = await this.db
      .collection('Eve')
      .doc(this.id3)
      .get()
      .toPromise()
      .then((doc) => (this.results3 = doc.data()))
      .then((ref) => this.getTab3())
     // .then((ref) => console.log(this.choixTab));
  }

  async getTab3() {
    await this.db
      .collection('Eve')
      .doc(this.id3)
      .get()
      .toPromise()
      .then((ref2) => this.getData2());
  }

  async getData2() {
    this.data2 = false;
    await this.db
      .collection('Eve')
      .doc(this.id3)
      .get()
      .toPromise()
      .then((doc) => (this.data = doc.data()))
      .then((ref2) => this.getToArrayOfObject())

     .then((ref) => console.log(this.dataFromServer));
    // this.data = JSON.stringify(doc.data()
    // console.log(Object.keys(doc.data())
  }

  async getToArrayOfObject() {
    this.columnsToDisplay = [];
    this.col = [];
    let name = 'Quota1';
    let truc = name.toString();
    this.dataSource = await this.data[truc];
    this.col = this.data[truc];
 
    this.data2 = Object.values(this.col)
   

    for (var i=0; i<20; i++) {
      if(!this.data2[i])
      {
        break;
      }
      this.data2[i] = [this.data2[i]];
  }

  console.log(this.data2)
  this.dataFromServer = this.data2
   // this.dataFromServer = this.col.map(Object.values)

    // this.data3 = await this.col.map(Object.keys);
    //this.dataFromServer = this.data2;
    // for (let j = 0; j < 7; j++) {
    //   if (this.data3[0][j] === 'Prix_GS') {
    //     this.hasGS = true;
    //   } else if (this.data3[0][j] === 'Prix_GM') {
    //     this.hasGM = true;
    //   } else if (this.data3[0][j] === 'Prix_Cantine') {
    //     this.hasCantine = true;
    //   }
    // }
    for (let i = 0; i < 1; i++) {
      this.columnsToDisplay.push(Object.keys(this.col));
      //this.customHeaders.thead.push(Object.keys(this.col))
      // this.dataToDisplay.push(Object.values(this.col[i]));
    }
    this.columnsToDisplay = this.columnsToDisplay[0];
    this.customHeaders.displayed = this.columnsToDisplay;
    this.customHeaders.thead = this.columnsToDisplay;
    // this.customHeaders = this.columnsToDisplay
    console.log(this.columnsToDisplay);
    console.log(this.customHeaders)
    console.log([this.data.Quota1])

  }


  updateQuota1()
  {
    this.db.collection('Eve').doc(this.id3).update({Quota1 : this.row})
    .then(ref => this.toastr.success('Le Quota de' + this.idNom + 'a bien été mis à jour','Succès'))
    .then(ref => this.confirmQuota1() );
  }

  row2:any;
  updateChanges2(row) {
    this.row2 = row;
    console.log(row); // This return the row which is updated with the id.
  }
  row3:any;
  updateChanges3(row) {
    this.row3 = row;
    console.log(row); // This return the row which is updated with the id.
  }
  row4:any;
  updateChanges4(row) {
    this.row4 = row;
    console.log(row); // This return the row which is updated with the id.
  }
  row5:any;
  updateChanges5(row) {
    this.row5 = row;
    console.log(row); // This return the row which is updated with the id.
  }

  row6:any;
  updateChanges6(row) {
    this.row6 = row;
    console.log(row); // This return the row which is updated with the id.
  }

  row7:any;
  updateChanges7(row) {
    this.row7 = row;
    console.log(row); // This return the row which is updated with the id.
  }

  row8:any;
  updateChanges8(row) {
    this.row8 = row;
    console.log(row); // This return the row which is updated with the id.
  }


  updateQuota2()
  {
    console.log(this.row2)
    this.db.collection('Eve').doc(this.id3).update({Quota2 : this.row2})
    .then(ref => this.toastr.success('Le Quota de' + this.idNom + 'a bien été mis à jour','Succès'))
    .then(ref => this.confirmQuota1() );
  }

  updateQuota3()
  {
    console.log(this.row3)
    this.db.collection('Eve').doc(this.id3).update({Quota3 : this.row3})
    .then(ref => this.toastr.success('Le Quota de' + this.idNom + 'a bien été mis à jour','Succès'))
    .then(ref => this.confirmQuota1() );
  }


  
  updateQuota4()
  {
    console.log(this.row4)
    this.db.collection('Eve').doc(this.id3).update({Quota4 : this.row4})
    .then(ref => this.toastr.success('Le Quota de' + this.idNom + 'a bien été mis à jour','Succès'))
    .then(ref => this.confirmQuota1() );
  }

  updateQuota5()
  {
    console.log(this.row5)
    this.db.collection('Eve').doc(this.id3).update({Quota5 : this.row5})
    .then(ref => this.toastr.success('Le Quota de' + this.idNom + 'a bien été mis à jour','Succès'))
    .then(ref => this.confirmQuota1() );
  }

  updateQuota6()
  {
    console.log(this.row6)
    this.db.collection('Eve').doc(this.id3).update({Quota6 : this.row6})
    .then(ref => this.toastr.success('Le Quota de' + this.idNom + 'a bien été mis à jour','Succès'))
    .then(ref => this.confirmQuota1() );
  }

  updateQuota7()
  {
    console.log(this.row7)
    this.db.collection('Eve').doc(this.id3).update({Quota7 : this.row7})
    .then(ref => this.toastr.success('Le Quota de' + this.idNom + 'a bien été mis à jour','Succès'))
    .then(ref => this.confirmQuota1() );
  }

  updateQuota8()
  {
    console.log(this.row8)
    this.db.collection('Eve').doc(this.id3).update({Quota8 : this.row8})
    .then(ref => this.toastr.success('Le Quota de' + this.idNom + 'a bien été mis à jour','Succès'))
    .then(ref => this.confirmQuota1() );
  }

  confirmQuota1()
  {
    if(confirm('Avez-vous terminé ?'))
    {
      window.location.reload()
    }
  }

  Q2()
  {
    this.etapeQ2 = 2;
    
  }





  listEve()
  {
  
    this.db.collection('listing',ref => ref.where('eve','==',this.idNom)).get().toPromise().then(doc => {
      doc.forEach(ref => {
        if(ref.exists){
          this.listing.push(ref.data())
        }
      })
    })

  }


  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

    exportexcel2(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table2'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName2);
			
    }


    fullinscri(id)
    {
      this.detailList = []
      this.db.collection('Inscriptions').doc(id).get().toPromise().then(doc => 
        {
          if(doc.exists)
          {
            this.detailList.push(doc.data())
          }
        })
    }

}
