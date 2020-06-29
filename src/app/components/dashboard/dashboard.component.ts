import { Component, OnInit, TemplateRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { FirebaseFirestore } from '@angular/fire';
import { AuthService } from '../../shared/services/auth.service';
import { auth, firestore } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { isString, isNumber } from 'util';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { take, find } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  FormArray,
  FormGroup,
  FormControl,
  AbstractControl,
} from '@angular/forms';

export interface EveImg {
  name: string;
  filepath: string;
  size: number;
}
export interface Month {
  value: string;
  viewValue: string;
}
export interface Month2 {
  value: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('800ms', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('400ms', style({ transform: 'translateY(100%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  //TAB

  choixTab;
  nameBdd = [];
  Tab$;
  results3;
  results2;
  data;
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
  //

  logo : Month[] = [ 
  {value : 'agcscbp', viewValue : 'Centres Socioculturels Belencontre & Phalempins'},
  {value : 'bourgogne', viewValue : 'Centre Socioculturel Bourgogne'},
  {value : 'marliere', viewValue : 'Centre Socioculturel Marlière - Croix Rouge'},]

  isAdmin;
  isLoaded = false;
  hasProfil = false;
  profil;
  enCours = false;
  // info account
  responsable = {};
  responsable2 = {};
  member = {};
  nom: string;
  nom2: string;
  prenom: string;
  prenom2: string;
  enfant: string;
  age: string;
  age2: string;
  info: string = '';
  taille;
  sexe: string;
  sexe2: string;
  sexes: string[] = ['Femme', 'Homme'];
  sexes2: string[] = ['Fille', 'Garçon'];
  qf;
  monQF = false;
  mesInfo = false;
  maFamille = false;
  go = false;
  go2 = false;
  Tranche = [];
  Price = [];
  ObjectPrix: Observable<any>;
  // Obs
  total = 0.0;
  choixMonth;
  choixMonth2;
  choixQF;
  MonQ;MonQ2;MonQ3;MonQ4;MonQ5;MonQ6;MonQ7;MonQ8;
  finalQ;finalQ1;finalQ2;finalQ3;finalQ4;finalQ5;finalQ6;finalQ7;finalQ8;
  id;
  uid;
  prenomEnfant;
  nomEve;
  theEve;
  choixPlace;
  caf = false;

  months: Month[] = [
    { value: 'Janvier', viewValue: 'Janvier' },
    { value: 'Fevrier', viewValue: 'Février' },
    { value: 'Mars', viewValue: 'Mars' },
    { value: 'Avril', viewValue: 'Avril' },
    { value: 'Mai', viewValue: 'Mai' },
    { value: 'Juin', viewValue: 'Juin' },
    { value: 'Juillet', viewValue: 'Juillet' },
    { value: 'Août', viewValue: 'Août' },
    { value: 'Septembre', viewValue: 'Septembre' },
    { value: 'Octobre', viewValue: 'Octobre' },
    { value: 'Novembre', viewValue: 'Novembre' },
    { value: 'Decembre', viewValue: 'Décembre' },
  ];

  quof: Month[] = [
    { value: 'QF1', viewValue: 'QF1 (0-369€)' },
    { value: 'QF2', viewValue: 'QF2 (370-499€)' },
    { value: 'QF3', viewValue: 'QF3 (500-700€)' },
    { value: 'QF4', viewValue: 'QF4 (701-800€)' },
    { value: 'QF5', viewValue: 'QF5 (801-1000€)' },
    { value: 'QF6', viewValue: 'QF6 (1001-1200€)' },
    { value: 'QF7', viewValue: 'QF7 (1201-1400€)' },
    { value: 'QF8', viewValue: 'QF8 (supérieur à 1400€)' },
    { value: 'HORS-TOURCOING', viewValue: 'HORS-TOURCOING' },
  ];

  places: Month[] = [
    // {value: 'Ecole Maternelle Branly (Belencontre 3/5 ans)', viewValue: 'Ecole Maternelle Branly'},
    // {value: 'Ecole Racine (Belecontre 6/8 ans et 8/12 ans)', viewValue: 'Ecole Racine'},
    // {value: 'CSC Belencontre (Ados)', viewValue: 'CSC Belencontre'},
    // {value: 'CSC Phalempins (La Fontaine) (6/8 et 8/12 ans et Ados)', viewValue: 'CSC Phalempins'},
    // {value: 'Ecoles Paul Bert (3/5 ans et 6/8 et 8/12 ans)', viewValue: 'Paul Bert'}
  ];

  modif = false;
  dataEve = [];
  dataEve2: any = [];
  monInscription = [];
  dataStat = []
  monInscription2 = [];
  monInscription3 = [];
  monInscription4 = [];
  dataEve3 = [];
  dataEve4 = [];
  Lieu;
  Mois;
  Semaine;
  alreadyOn = false;
  periode = [];
  msg = '';
  image = '';
  dataInscri;
  dataInscri2;
  getDays = [];
  // UPLOAD
  Quota1;

  quotaeve;

  enAttente = 0;
  refuse = 0;
  accepte = 0;

  lineTotalF = 0;
  lineF;
  nlieu = false;
  nlieu2 = false;
  newlieu;

  lineTotalM = 0;
  lineM;
  adresse;
  telephone;
  acc = false;
  flag = false;
  private basePath = '/pdf';
  file: File;
  url = '';
  profilPhoto;
  random;
  imgPublic;

  // CHART
  chart = [];
  count = 0;
  count2 = 0;
  man = 0;
  women = 0;
  moyAge = 0;
  moyAgeWoman = 0;
  countMoy = 0;
  countMoy2 = 0;
  moy = 0;
  moy2 = 0;
  userId;
  etape = 0;
  semaine = {};
  result;
  aInscrire;
  aInscrire2;
  aAge;
  tabEve = [];
  doughnutChartLabels: Label[] = ['Homme', 'Femme', 'Non précisé'];
  doughnutChartData: MultiDataSet = [[55, 25, 20]];
  doughnutChartType: ChartType = 'doughnut';
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Homme', 'Femme'];
  barChartType: ChartType = 'horizontalBar';
  barChartLegend = true;
  barChartPlugins = [];
  truc;
  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Moyenne' },
  ];

  barChartColor: [
    'rgba(224, 108, 112, 1)',
    'rgba(224, 108, 112, 1)',
    'rgba(224, 108, 112, 1)'
  ];

  semaine1 = false;
  semaine2= false;
  semaine3= false;
  semaine4= false;

  public chartColors: any[] = [
    {
      backgroundColor: ['#525d7d', '#ffc400', '#FAFFF2', '#FFFCC4', '#B9E8E0'],
    },
  ];

  public chartColors2: any[] = [
    {
      backgroundColor: ['#525d7d', '#ffc400', '#ff574d', '#FFFCC4', '#B9E8E0'],
    },
  ];

  lineChartData: ChartDataSets[] = [{ data: [85, 10], label: 'Revenu' }];

  // lineChartLabels: Label[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'];
  lineChartLabels: Label[] = ['Février', 'Mars'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#525d7d',
    },
  ];

  newmsg;
  newimg;

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  getnewLieu = {};
  getnewLieu2 = [];

  element: HTMLElement;

  doughnutChartLabels2: Label[] = ['Validé', 'En Attente', 'Refusé'];
  doughnutChartData2: MultiDataSet = [[55, 25, 20]];
  doughnutChartType2: ChartType = 'doughnut';
  secu = false;
  tempEve = [];
  tempEve2 = [];
  tabInscri: Month2[] = [{ value: '' }];
  tabInscri2:  Month2[]= [{value: ''}];

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
 
  flag2 = false;
  constructor(
    public db: AngularFirestore,
    public dialog: MatDialog,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    public router: Router,
    public toastr: ToastrService,
    private storage: AngularFireStorage
  ) {
    this.main();
  }

  ngOnInit() {
    this.dialog.closeAll();
  }

  async main() {
    await this.afAuth.user.subscribe((user) =>
      this.db
        .collection('users')
        .doc(user.uid)
        .get()
        .toPromise()
        .then((doc) => (this.profil = doc.data()))
        .then(
          (ref1) => (this.taille = Object.keys(this.profil.responsable).length)
        )
        .then((ref1bis) => this.pourcentage())
        .then((ref2) => (this.isAdmin = this.profil.isAdmin))
        .then((ref3) => this.haveProfil())
        // .then(ref4 => this.getMan())
        // .then(ref5 => this.getWomen())
        // .then(refdo => this.doughnutChartData = [[this.count, this.count2]])
        // .then(ref4bis => this.getMoyAgeMan())
        // .then(ref4bisbisbis => this.getMoyAgeWoman())
        .then((ref4bisbisbisbis) => this.getInscri())
        //.then(ref => this.quotaEve())
        .then((ref) => this.getInscri2())
        .then((ref) => this.getDocNameBDD())
        // .then(ref => this.manMoyBar())
        // .then(ref2 => this.womanMoyBar())
        // .then(ref => this.getInfo())
        // .then(ref => this.getInfo2())
        // .then(ref => this.getInfo3())
        // .then(ref => this.getTotalF())
        // .then(ref => this.getTotalM())
        .then((ref) => this.getInscriEve())
        .then((ref) => this.getInscriEve2())
        .then((ref) => this.getLieu())
        .then((ref) => this.gethome())
        // .then(ref => this.lineChartData = [{data : [this.lineTotalF, this.lineTotalM],label:' Revenu en €'}])
        // .then(ref => this.doughnutChartData2 = [[this.accepte,this.enAttente, this.refuse]])
        // .then(refbar => this.barChartData = [{ data: [this.moy, this.moy2, 0], label: 'Âge moyen ' }])
        .then((ref6) => (this.isLoaded = true))
    );
  }

  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  haveProfil() {
    if (this.profil.profil) {
      this.hasProfil = true;
    } else {
      this.hasProfil = false;
    }
  }
  openDialog(templateRef): void {
    const dialogRef = this.dialog.open(templateRef, {
      autoFocus: false,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    });
    dialogRef.afterClosed().subscribe((result) => {
    this.customHeaders = {
      thead: ['CUSTOM NAME 1', 'SOME COOL NAME', 'ANOTHER NAME', '2', '5', '5'], // the Column Name in table head.
      displayed: ['someFeild1', 'someFeild2', 'someFeild3', '5', '6', '8'], // the data it should populate in table.
    };
    this.nlieu = false; 
    this.choixTab;
    this.data = false;
 
    });
  }


  openDialogwhy(templateRef): void {
    const dialogRef = this.dialog.open(templateRef, {
      width: '1000px',
      height: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  openDialog2(templateRef, Id, name): void {
    console.log(templateRef)
    console.log(Id)
    console.log(name)
    // console.clear()
    this.theEve = name;
       this.db
      .collection('Eve',ref => ref.where('IdDoc','==',Id)).get().toPromise().then((doc) => {
        doc.forEach((doc => {
          if(doc.data()){
            this.result = doc.data()
            for(let i = 0; i < 5; i++)
            {
              if(doc.data().Semaine[i] == 'Semaine 2')
              {
                this.semaine2 = true;
              }
              if(doc.data().Semaine[i] == 'Semaine 3')
              {
                this.semaine3 = true;
              }
              if(doc.data().Semaine[i] == 'Semaine 4')
              {
                this.semaine4 = true;
              }
              
            }
          }
        }))
        {
         
       
        }});
    this.db
      .collection('Eve')
      .doc(Id)
      .get()
      .toPromise()
      .then((doc) => {
        if (doc.exists) {
          this.Lieu = doc.data().Lieu;
          this.Mois = doc.data().Mois;
          this.Semaine = doc.data().Semaine;
        }
      });

    const dialogRef = (this.dialog.open(templateRef, {
      width: '1000px',
      height: '600px',
    }).disableClose = true);
  }

  openDialog2bis(templateRef, Id, name): void {
    this.theEve = name;
       this.db
      .collection('Eve',ref => ref.where('IdDoc','==',Id)).get().toPromise().then((doc) => {
        doc.forEach((doc => {
          // if(doc.data()){
            this.result = doc.data()
        }))
        {
         
       
        }});
    this.db
      .collection('Eve')
      .doc(Id)
      .get()
      .toPromise()
      .then((doc) => {
        if (doc.exists) {
          this.Lieu = doc.data().Lieu;
        }
      });

    const dialogRef = (this.dialog.open(templateRef, {
      width: '1000px',
      height: '600px',
    }).disableClose = true);
  }

  majQf(templateRef): void {
    const dialogRef = this.dialog.open(templateRef, {
      width: '600px',
      height: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  inscri(templateRef): void {
    const dialogRef = this.dialog.open(templateRef, {
      width: '600px',
      height: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  getDataInscri(id, TemplateRef) {
    this.inscri(TemplateRef);
    this.dataInscri = this.db
      .collection('Eve', (ref) => ref.where('Id', '==', id))
      .valueChanges();
    this.dataInscri2 = this.db
      .collection('Eve', (ref) => ref.where('Id', '==', id))
      .get()
      .toPromise()
      .then((snapshot) => {
        if (snapshot.empty) {
          return;
        }
        snapshot.forEach((doc) => {
          if (doc.exists) {
            this.getDays = doc.data().Jour;
          }
        });
      });
  }

  addEnfant(templateRef2): void {
    const dialogRef = this.dialog.open(templateRef2, {
      width: '600px',
      height: '500px',
      panelClass: 'formFieldWidth480',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  addToArray1() {
    this.responsable = {
      nom: this.nom,
      sexe: this.sexe,
      prenom: this.prenom,
      age: this.age,
      qf: this.qf,
      tel: this.telephone,
      adresse: this.adresse,
      validQF: false,
    };
    this.afAuth.user.subscribe((user) =>
      this.db
        .collection('users')
        .doc(user.uid)
        .update({ responsable: this.responsable })
        .then((ref) =>
          this.afAuth.user.subscribe((user) =>
            this.db
              .collection('users')
              .doc(user.uid)
              .update({ isAdmin: false })
              .then((ref2) => this.dialog.closeAll())
              .then((ref3) => window.location.reload())
          )
        )
    );
  }

  croixRouge()
  {
    this.dialog.closeAll()
      this.cancel();
      this.etape;
      this.ObjectPrix = new Observable;
      this.choixQF;
  }
  croixRouge2()
  {
    if(!this.secu){
      this.toastr.error('Veuillez décochez les cases avant d\'annuler l\'inscription','Opération impossible')
    }
      if(this.secu) {
      this.dialog.closeAll()
      this.cancel();
      this.etape;
      this.ObjectPrix = new Observable;
      this.choixQF;
    }

  }

  addToArray2() {
    this.responsable = {
      nom: this.nom,
      sexe: this.sexe,
      prenom: this.prenom,
      age: this.age,
      enfant: this.enfant,
      qf: this.qf,
      validQF: false,
    };
    this.afAuth.user.subscribe((user) =>
      this.db
        .collection('users')
        .doc(user.uid)
        .update({ responsable: this.responsable })
        .then((ref) => console.log('Info sauvegardé'))
        .then((ref2) => this.dialog.closeAll())
        .then((ref3) => window.location.reload())
    );
  }

  addToArray3() {
    this.responsable = {
      nom: this.nom,
      sexe: this.sexe,
      prenom: this.prenom,
      age: this.age,
      qf: this.qf,
      tel: this.telephone,
      adresse: this.adresse,
      validQF: false,
    };
    this.afAuth.user.subscribe((user) =>
      this.db
        .collection('users')
        .doc(user.uid)
        .update({ responsable: this.responsable })
        .then((ref) =>
          this.afAuth.user.subscribe((user) =>
            this.db
              .collection('users')
              .doc(user.uid)
              .update({ isAdmin: false })
              .then((ref2) => this.dialog.closeAll())
              .then((ref3) => window.location.reload())
          )
        )
    );
  }

  pourcentage() {
    this.taille = this.taille / 10;
    this.taille = this.taille * 100;
  }

  majQuo() {
    if (this.qf) {
      // this.qf = parseInt(this.qf, 10);

      this.afAuth.user.subscribe((user) =>
        this.db
          .collection('users')
          .doc(user.uid)
          .update({ ['responsable.qf']: this.qf, validQF: false })

          .then((ref) =>
            this.toastr.success(
              'Votre quotient familial a été mis à jour',
              'Succès !'
            )
          )
          .then((ref1) => setTimeout((ref) => window.location.reload(), 2000))
      );
    } else {
      this.toastr.error(
        'Merci d\'entrer un nombre pour mettre à jour votre quotient familial',
        'Champs invalide'
      );
    }
  }

  async getMan() {
    const citiesRef = this.db.collection('users', (ref) =>
      ref.where('responsable.sexe', '==', 'Homme')
    );
    const query = await citiesRef
      .get()
      .toPromise()
      .then((snapshot) => {
        if (snapshot.empty) {
          return;
        }
        snapshot.forEach((doc) => {
          if (doc.exists) {
            this.manCount();
          }
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }

  async getMoyAgeMan() {
    const citiesRef = this.db.collection('users', (ref) =>
      ref
        .where('responsable.age', '>', '0')
        .where('responsable.sexe', '==', 'Homme')
    );
    const query = await citiesRef
      .get()
      .toPromise()
      .then((snapshot) => {
        if (snapshot.empty) {
          return;
        }
        snapshot.forEach((doc) => {
          if (doc.exists) {
            this.moyAge += parseInt(doc.data().responsable.age, 10);
            this.moyCount();
          }
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }

  async getWomen() {
    const citiesRef = this.db.collection('users', (ref) =>
      ref.where('responsable.sexe', '==', 'Femme')
    );
    const query = await citiesRef
      .get()
      .toPromise()
      .then((snapshot) => {
        if (snapshot.empty) {
          return;
        }
        snapshot.forEach((doc) => {
          if (doc.exists) {
            this.womanCount();
          }
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }

  async getMoyAgeWoman() {
    const citiesRef = this.db.collection('users', (ref) =>
      ref
        .where('responsable.age', '>', '0')
        .where('responsable.sexe', '==', 'Femme')
    );
    const query = await citiesRef
      .get()
      .toPromise()
      .then((snapshot) => {
        if (snapshot.empty) {
          return;
        }
        snapshot.forEach((doc) => {
          if (doc.exists) {
            this.moyAgeWoman += parseInt(doc.data().responsable.age, 10);
            this.moyCount2();
          }
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }

  async getInfo() {
    const citiesRef = this.db.collection('Inscriptions', (ref) =>
      ref.where('IsValid', '==', 'wait')
    );
    const query = await citiesRef
      .get()
      .toPromise()
      .then((snapshot) => {
        if (snapshot.empty) {
          return;
        }
        snapshot.forEach((doc) => {
          if (doc.exists) {
            this.enAttente1();
          }
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }

  async getInfo2() {
    const citiesRef = this.db.collection('Inscriptions', (ref) =>
      ref.where('IsValid', '==', 'no')
    );
    const query = await citiesRef
      .get()
      .toPromise()
      .then((snapshot) => {
        if (snapshot.empty) {
          return;
        }
        snapshot.forEach((doc) => {
          if (doc.exists) {
            this.refus1();
          }
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }

  async getInfo3() {
    const citiesRef = this.db.collection('Inscriptions', (ref) =>
      ref.where('IsValid', '==', 'yes')
    );
    const query = await citiesRef
      .get()
      .toPromise()
      .then((snapshot) => {
        if (snapshot.empty) {
          return;
        }
        snapshot.forEach((doc) => {
          if (doc.exists) {
            this.accepte1();
          }
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }

  async getTotalF() {
    const citiesRef = this.db.collection('Inscriptions', (ref) =>
      ref
        .where('total', '>', 0)
        .where('Mois', '==', 'Fevrier')
        .where('IsValid', '==', 'yes')
    );
    const query = await citiesRef
      .get()
      .toPromise()
      .then((snapshot) => {
        if (snapshot.empty) {
          return;
        }
        snapshot.forEach((doc) => {
          if (doc.exists) {
            this.lineTotalF += doc.data().total;
            //console.log(this.lineTotalF);
            doc.data().Mois = this.lineF;
          }
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }

  async getTotalM() {
    const citiesRef = this.db.collection('Inscriptions', (ref) =>
      ref
        .where('total', '>', 0)
        .where('Mois', '==', 'Mars')
        .where('IsValid', '==', 'yes')
    );
    const query = await citiesRef
      .get()
      .toPromise()
      .then((snapshot) => {
        if (snapshot.empty) {
          return;
        }
        snapshot.forEach((doc) => {
          if (doc.exists) {
            this.lineTotalM += doc.data().total;
            doc.data().Mois = this.lineM;
          }
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }

  manCount() {
    this.count++;
  }

  moyCount() {
    this.countMoy++;
  }

  moyCount2() {
    this.countMoy2++;
  }
  enAttente1() {
    this.enAttente++;
  }
  refus1() {
    this.refuse++;
  }
  accepte1() {
    this.accepte++;
  }

  womanCount() {
    this.count2++;
  }

  manMoyBar() {
    this.moy = this.moyAge / this.countMoy;
  }

  womanMoyBar() {
    this.moy2 = this.moyAgeWoman / this.countMoy2;
  }

  async addToBase() {
    this.member = {
      prenomMember: this.prenom2,
      nomMember: this.nom2,
      sexeMember: this.sexe2,
      ageMember: this.age2,
      infoMember: this.info,
    };

    await this.afAuth.user.subscribe((user) =>
      this.db
        .collection('users', (ref) => ref.where('uid', '==', user.uid))
        .get()
        .toPromise()
        .then((snapshot) => {
          if (snapshot.empty) {
            return;
          }
          snapshot.forEach((doc) => {
            if (doc.exists) {
              if (!doc.data().member) {
                this.db
                  .collection('users')
                  .doc(user.uid)
                  .update({ member: this.member });
              }
              if (
                doc.data().member &&
                !doc.data().member2 &&
                !doc.data().member3 &&
                !doc.data().member4
              ) {
                this.db
                  .collection('users')
                  .doc(user.uid)
                  .update({ member2: this.member });
              }
              if (
                doc.data().member &&
                doc.data().member2 &&
                !doc.data().member3 &&
                !doc.data().member4
              ) {
                this.db
                  .collection('users')
                  .doc(user.uid)
                  .update({ member3: this.member });
              }
              if (
                doc.data().member &&
                doc.data().member2 &&
                doc.data().member3 &&
                !doc.data().member4
              ) {
                this.db
                  .collection('users')
                  .doc(user.uid)
                  .update({ member4: this.member });
              }
            }
          });
        })
        .then((ref) => this.dialog.closeAll())
        .then((ref2) => setTimeout((ref) => window.location.reload(), 1000))
        .catch((err) => {
          console.log('Error getting documents', err);
        })
    );
  }

  handleFiles(event) {
    this.file = event.target.files[0];
  }

  // method to upload file at firebase storage
  async uploadFile() {
    this.handleFiles(event);
    if (this.file.size < 5000000) {
      this.toastr.show(
        'Télechargement en cours... Merci de patienter',
        'Votre attestation'
      );
      const filePath = `${this.basePath}/${this.file.name}`; // path at which image will be stored in the firebase storage
      const snap = await this.storage.upload(filePath, this.file); // upload task
      this.getUrl(snap);
    } else {
      this.toastr.error(
        'La taille du fichier est trop importante',
        'Impossible d\'uploader'
      );
      this.file;
    }
  }

  // method to retrieve download url

  private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
    const url = await snap.ref.getDownloadURL();
    this.url = url; // store the URL
    this.afAuth.authState.subscribe((user) => {
      this.userId = user.uid;
      if (user) {
        let self = this;
        self.db
          .collection('users')
          .doc(user.uid)
          .update({ pdf: this.url, pdfnew : true, refusPDF : false })
          .then((ref) => window.location.reload());
      }
    });
  }

  getEve(id) {
    this.dataEve = [];
    this.dataStat = [];
    console.log(id)
    this.db
      .collection('Eve', (ref) => ref.where('Nom', '==', id))
      .get()
      .toPromise()
      .then((query) => {
        query.forEach((doc) => this.dataEve.push(doc.data()));
      })
      .then((ref) => (this.go = true));
  }

  getEveStat(id) {
    this.dataStat = [];
    this.dataEve = [];
    console.log(id)
    this.db
      .collection('Eve', (ref) => ref.where('Nom', '==', id))
      .get()
      .toPromise()
      .then((query) => {
        query.forEach((doc) => this.dataStat.push(doc.data()));
      })
      .then((ref) => (this.go = true)).then(ref => this.dataFromServer = this.dataStat);
  }

   getEve2(id) {
    this.dataStat = [];
    this.dataEve = [];
    console.log(id)
    this.db
      .collection('Eve', (ref) => ref.where('Nom', '==', id))
      .get()
      .toPromise()
      .then((query) => {
        query.forEach((doc) => this.dataEve.push(doc.data()));
        console.log(this.dataEve)
      })
      .then((ref) => (this.go2 = true));
  }

  resetEve(){
    this.dataEve = [];
    this.go = false;
    this.go2 = false;

  }

  resetMer()
  {
    this.dataEve = [];
    this.go = false;
    this.go2 = false;
    this.choixMonth2 = ''
    this.dataEve = [];
    this.dataStat = [];
  }

  resetEves()
  {
    this.dataEve = [];
    this.go = false;
    this.go2 = false;
    this.choixMonth = ''
    this.dataEve = [];
    this.dataStat = [];
  }

  plusUn(id, age,id2, event) {
    this.etape++;
    if (this.etape === 1) {
      this.aInscrire = id;
      this.aInscrire2 = id2;
      this.aAge = age;
      let myTab = event.srcElement.name;
      this.db
        .collection('Tableau')
        .doc(myTab)
        .get()
        .toPromise()
        .then((doc) => {
          if (doc.exists) {
            this.dataEve2 = doc.data();
            let name = 'Tableau';
            for (let i = 0; i < this.dataEve2[name].length; i++) {
              this.Tranche.push(this.dataEve2[name][i].TrancheQF);
              this.Price.push(this.dataEve2[name][i]);
            }
          }
        });
    }
    if (this.choixQF || this.etape === 2) {
      this.ObjectPrix = this.Price.find((x) => x.TrancheQF === this.choixQF);
      this.db
        .collection('users', (ref) =>
          ref.where(
            this.theEve + this.aInscrire + this.aAge + this.Semaine,
            '==',
            this.aInscrire + this.aAge
          )
        )
        .get()
        .toPromise()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (doc.exists) {
              this.alreadyOn = true;
            }
          });
        });
    }

    if (this.etape === 3) {
    }
  }

  noGo() {
    this.go = false;
    this.dataEve = [];
  }

  change(event) {
    if (event.target.checked) {
      this.secu = true;
      this.total += parseFloat(event.target.defaultValue);
      let q = event.target.name;
      let n = event.target.id;
      this.nomEve = event.target.id;
      this.MonQ = 'Quota1.' + q;
      let doc = this.db.collection('Eve', (ref) => ref.where('Nom', '==', n));
      doc
        .get()
        .toPromise()
        .then((res) => {
          res.forEach((doc) => (this.id = doc.data().IdDoc));
        })
        .then((ref) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .get()
            .toPromise()
            .then((doc) => (this.finalQ = doc.data().Quota1[q]))
        )
        .then((ref2) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .update({ [this.MonQ]: this.finalQ - 1 })
        )
        .then((ref) => this.monInscription.push(q)).then(ref=>this.secu = false);
    }
    if (!event.target.checked) {
      this.secu = true;
      this.total -= parseFloat(event.target.defaultValue);
      let q = event.target.name;
      let n = event.target.id;
      this.MonQ = 'Quota1.' + q;
      let doc = this.db.collection('Eve', (ref) => ref.where('Nom', '==', n));
      doc
        .get()
        .toPromise()
        .then((res) => {
          res.forEach((doc) => (this.id = doc.data().IdDoc));
        })
        .then((ref) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .get()
            .toPromise()
            .then((doc) => (this.finalQ = doc.data().Quota1[q]))
        )
        .then((ref2) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .update({ [this.MonQ]: this.finalQ + 1 })
        )
        .then(
          (ref) =>
            (this.monInscription = this.monInscription.filter((e) => e !== q))
        ).then(ref=>this.secu = false);
    }

    this.total = Math.round(this.total * 100) / 100;
  }

  
  change2(event) {
    if (event.target.checked) {
      this.secu = true;
      this.total += parseFloat(event.target.defaultValue);
      let q = event.target.name;
      let n = event.target.id;
      this.nomEve = event.target.id;
      this.MonQ = 'Quota2.' + q;
      let doc = this.db.collection('Eve', (ref) => ref.where('Nom', '==', n));
      doc
        .get()
        .toPromise()
        .then((res) => {
          res.forEach((doc) => (this.id = doc.data().IdDoc));
        })
        .then((ref) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .get()
            .toPromise()
            .then((doc) => (this.finalQ = doc.data().Quota2[q]))
        )
        .then((ref2) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .update({ [this.MonQ]: this.finalQ - 1 })
        )
        .then((ref) => this.monInscription2.push(q)).then(ref=>this.secu = false);
    }
    if (!event.target.checked) {
      this.total -= parseFloat(event.target.defaultValue);
      let q = event.target.name;
      let n = event.target.id;
      this.MonQ = 'Quota2.' + q;
      let doc = this.db.collection('Eve', (ref) => ref.where('Nom', '==', n));
      doc
        .get()
        .toPromise()
        .then((res) => {
          res.forEach((doc) => (this.id = doc.data().IdDoc));
        })
        .then((ref) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .get()
            .toPromise()
            .then((doc) => (this.finalQ = doc.data().Quota2[q]))
        )
        .then((ref2) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .update({ [this.MonQ]: this.finalQ + 1 })
        )
        .then(
          (ref) =>
            (this.monInscription2 = this.monInscription2.filter((e) => e !== q))
        );
    }

    this.total = Math.round(this.total * 100) / 100;
  }

  change3(event) {
    if (event.target.checked) {
      this.secu = true;
      this.total += parseFloat(event.target.defaultValue);
      let q = event.target.name;
      let n = event.target.id;
      this.nomEve = event.target.id;
      this.MonQ = 'Quota3.' + q;
      let doc = this.db.collection('Eve', (ref) => ref.where('Nom', '==', n));
      doc
        .get()
        .toPromise()
        .then((res) => {
          res.forEach((doc) => (this.id = doc.data().IdDoc));
        })
        .then((ref) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .get()
            .toPromise()
            .then((doc) => (this.finalQ = doc.data().Quota3[q]))
        )
        .then((ref2) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .update({ [this.MonQ]: this.finalQ - 1 })
        )
        .then((ref) => this.monInscription3.push(q)).then(ref=>this.secu = false);
    }
    if (!event.target.checked) {
      this.total -= parseFloat(event.target.defaultValue);
      let q = event.target.name;
      let n = event.target.id;
      this.MonQ = 'Quota3.' + q;
      let doc = this.db.collection('Eve', (ref) => ref.where('Nom', '==', n));
      doc
        .get()
        .toPromise()
        .then((res) => {
          res.forEach((doc) => (this.id = doc.data().IdDoc));
        })
        .then((ref) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .get()
            .toPromise()
            .then((doc) => (this.finalQ = doc.data().Quota3[q]))
        )
        .then((ref2) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .update({ [this.MonQ]: this.finalQ + 1 })
        )
        .then(
          (ref) =>
            (this.monInscription3 = this.monInscription3.filter((e) => e !== q))
        );
    }

    this.total = Math.round(this.total * 100) / 100;
  }

  change4(event) {
    if (event.target.checked) {
      this.secu = true;
      this.total += parseFloat(event.target.defaultValue);
      let q = event.target.name;
      let n = event.target.id;
      this.nomEve = event.target.id;
      this.MonQ = 'Quota4.' + q;
      let doc = this.db.collection('Eve', (ref) => ref.where('Nom', '==', n));
      doc
        .get()
        .toPromise()
        .then((res) => {
          res.forEach((doc) => (this.id = doc.data().IdDoc));
        })
        .then((ref) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .get()
            .toPromise()
            .then((doc) => (this.finalQ = doc.data().Quota4[q]))
        )
        .then((ref2) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .update({ [this.MonQ]: this.finalQ - 1 })
        )
        .then((ref) => this.monInscription4.push(q)).then(ref=>this.secu = false);
    }
    if (!event.target.checked) {
      this.total -= parseFloat(event.target.defaultValue);
      let q = event.target.name;
      let n = event.target.id;
      this.MonQ = 'Quota4.' + q;
      let doc = this.db.collection('Eve', (ref) => ref.where('Nom', '==', n));
      doc
        .get()
        .toPromise()
        .then((res) => {
          res.forEach((doc) => (this.id = doc.data().IdDoc));
        })
        .then((ref) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .get()
            .toPromise()
            .then((doc) => (this.finalQ = doc.data().Quota4[q]))
        )
        .then((ref2) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .update({ [this.MonQ]: this.finalQ + 1 })
        )
        .then(
          (ref) =>
            (this.monInscription4 = this.monInscription4.filter((e) => e !== q))
        );
    }

    this.total = Math.round(this.total * 100) / 100;
  }

  changeMer(event) {
    let tempo
    if (event.target.checked) {
      this.secu = true;
      this.total += parseFloat(event.target.defaultValue);
      let q = event.target.name;
      let n = event.target.id;
      this.nomEve = event.target.id;
      this.MonQ = 'Quota1.' + q
      this.MonQ2 = 'Quota2.' + q
      this.MonQ3 = 'Quota3.' + q
      this.MonQ4 = 'Quota4.' + q
      this.MonQ5 = 'Quota5.' + q
      this.MonQ6 = 'Quota6.' + q
      this.MonQ7 = 'Quota7.' + q
      this.MonQ8 = 'Quota8.' + q
      let doc = this.db.collection('Eve', (ref) => ref.where('Nom', '==', n));
      doc
        .get()
        .toPromise()
        .then((res) => {
          res.forEach((doc) => (this.id = doc.data().IdDoc));
        })
        .then((ref) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .get()
            .toPromise()
            .then((doc) => (tempo = doc.data()))
            .then((doc) => (this.finalQ1 = tempo.Quota1[q]))
            .then((doc) => (this.finalQ2 = tempo.Quota2[q]))
            .then((doc) => (this.finalQ3 = tempo.Quota3[q]))
            .then((doc) => (this.finalQ4 = tempo.Quota4[q]))
            .then((doc) => (this.finalQ5 = tempo.Quota5[q]))
            .then((doc) => (this.finalQ6 = tempo.Quota6[q]))
            .then((doc) => (this.finalQ7 = tempo.Quota7[q]))
            .then((doc) => (this.finalQ8 = tempo.Quota8[q]))
            .then(ref => console.log(this.finalQ1))
            .then(ref => console.log(this.finalQ2))
            .then(ref => console.log(this.finalQ3))
            .then(ref => console.log(this.finalQ4))

        )
        .then((ref2) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .update({ [this.MonQ]: this.finalQ1 - 1 , [this.MonQ2] : this.finalQ2 - 1, [this.MonQ3] : this.finalQ3 - 1, [this.MonQ4] : this.finalQ4 - 1, [this.MonQ5] : this.finalQ5 - 1, [this.MonQ6] : this.finalQ6 - 1, [this.MonQ7] : this.finalQ7 - 1, [this.MonQ8] : this.finalQ8 - 1})
        )
        .then((ref ) => {
          this.db.collection('Eve').doc(this.id).get().toPromise().then((doc) => {
          if(doc.exists)
          {
            tempo = doc.data()
            console.log(tempo.Quota1[q])
            console.log(tempo.Quota2[q])
            console.log(tempo.Quota3[q]);


          }
        })
        })
        .then((ref) => this.monInscription.push(q)).then(ref=>this.secu = false);
        console.log(this.monInscription)
    }
    if (!event.target.checked) {
      this.secu = true;
      this.total -= parseFloat(event.target.defaultValue);
      let q = event.target.name;
      let n = event.target.id;
      this.MonQ = 'Quota1.' + q;
      let doc = this.db.collection('Eve', (ref) => ref.where('Nom', '==', n));
      doc
        .get()
        .toPromise()
        .then((res) => {
          res.forEach((doc) => (this.id = doc.data().IdDoc));
        })
        .then((ref) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .get()
            .toPromise()
            .then((doc) => (tempo = doc.data()))
            .then((doc) => (this.finalQ1 = tempo.Quota1[q]))
            .then((doc) => (this.finalQ2 = tempo.Quota2[q]))
            .then((doc) => (this.finalQ3 = tempo.Quota3[q]))
            .then((doc) => (this.finalQ4 = tempo.Quota4[q]))
            .then((doc) => (this.finalQ5 = tempo.Quota5[q]))
            .then((doc) => (this.finalQ6 = tempo.Quota6[q]))
            .then((doc) => (this.finalQ7 = tempo.Quota7[q]))
            .then((doc) => (this.finalQ8 = tempo.Quota8[q]))
        )
        .then((ref2) =>
          this.db
            .collection('Eve')
            .doc(this.id)
            .update({ [this.MonQ]: this.finalQ1 + 1 , [this.MonQ2] : this.finalQ2 + 1, [this.MonQ3] : this.finalQ3 + 1, [this.MonQ4] : this.finalQ4 + 1, [this.MonQ5] : this.finalQ5 + 1, [this.MonQ6] : this.finalQ6 + 1, [this.MonQ7] : this.finalQ7 + 1, [this.MonQ8] : this.finalQ8 + 1})
        )
        .then(
          (ref) =>
            (this.monInscription = this.monInscription.filter((e) => e !== q))
        ).then(ref=>this.secu = false);
    }

    this.total = Math.round(this.total * 100) / 100;
    console.log(this.monInscription)
  }

  monInsri() {
    if (this.total === 0) {
      this.toastr.error('Vous devez cochez au moins une date', 'Erreur');
    } else {
      if(confirm('Souhaitez-vous valider votre inscription ?')) {
        this.afAuth.user.subscribe((user) =>
        this.db
          .collection('Inscriptions')
          .doc(user.uid + this.nomEve + this.aInscrire + this.Semaine)
          .set({
            nom: user.uid,
            periode: this.monInscription,
            periode2 : this.monInscription2,
            periode3 : this.monInscription3,
            periode4 : this.monInscription4,
            total: this.total,
            age: this.aAge,
            prenom: this.aInscrire,
            Lieu: this.Lieu,
            Mois: this.Mois,
            Semaine: this.Semaine,
            eveNom: user.uid + this.nomEve + this.aInscrire + this.Semaine,
            IsValid: 'wait',
            eve : this.nomEve
          })
          .then((ref) =>
            this.toastr.success(
              'Inscription Réussi',
              'Enregistrement en cours...'
            )
          )
          .then((ref) => this.db.collection('listing').add({
            nom: user.uid,
            prenom : this.aInscrire,
            prenom2 : this.aInscrire2,
            age : this.aAge,
            eve : this.nomEve,
            total : this.total,
            unique : user.uid + this.nomEve + this.aInscrire + this.Semaine,
            isMercredi : false,
          }))
          .then((ref) => this.dialog.closeAll())
          .then((ref2) => (this.total = 0))
          .then((ref3) => (this.etape = 0))
          .then((ref3bis) =>
            this.db
              .collection('users')
              .doc(user.uid)
              .update({
                [this.nomEve + this.aInscrire + this.aAge + this.Semaine]:
                  this.aInscrire + this.aAge,
              })
          )
          .then((ref4) => window.location.reload())
      );
      }
    }
  }

  monInsri2() {
    let randomId = Math.floor(Math.random()*100000);
    if (this.total === 0) {
      this.toastr.error('Vous devez cochez au moins une date', 'Erreur');
    } else {
      if(confirm('Souhaitez-vous valider votre inscription ?')) {
        this.afAuth.user.subscribe((user) =>
        this.db
          .collection('Inscriptions')
          .doc(user.uid + this.nomEve + this.aInscrire + 'Mercredi')
          .set({
            nom: user.uid,
            periode: this.monInscription,
            periode2 : this.monInscription2,
            periode3 : this.monInscription3,
            periode4 : this.monInscription4,
            total: this.total,
            age: this.aAge,
            prenom: this.aInscrire,
            Lieu: this.Lieu,
            unique: user.uid + this.nomEve + this.aInscrire + randomId ,
            IsValid: 'wait',
            isMercredi : true,
            eve : this.nomEve,
            eveNom : user.uid + this.nomEve + this.aInscrire + 'Mercredi',
          })
          .then((ref) =>
            this.toastr.success(
              'Inscription Réussi',
              'Enregistrement en cours...'
            )
          ).then((ref) => this.db.collection('listing').add({
            nom: user.uid,
            prenom : this.aInscrire,
            prenom2 : this.aInscrire2,
            age : this.aAge,
            eve : this.nomEve,
            total : this.total,
            unique : user.uid + this.nomEve + this.aInscrire + 'Mercredi',
            isMercredi : true,
          }))
          .then((ref) => this.dialog.closeAll())
          .then((ref2) => (this.total = 0))
          .then((ref3) => (this.etape = 0))
          .then((ref3bis) =>
            this.db
              .collection('users')
              .doc(user.uid)
              .update({
                [this.nomEve + this.aInscrire + this.aAge + 'Mercredi']:
                  this.aInscrire + this.aAge,
              })
          )
          .then((ref4) => window.location.reload())
      );
      }
    }
  }

  gml = false;

  async getInscri() {
    await this.afAuth.user.subscribe((user) =>
      this.db
        .collection('Inscriptions', (ref) => ref.where('nom', '==', user.uid))
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

  async getInscri2() {
    await this.afAuth.user.subscribe((user) =>
      this.db
        .collection('Eve')
        .get()
        .toPromise()
        .then((ref) =>
          ref.forEach((doc) => {
            if (doc.exists) {
              this.dataEve4.push(doc.data());
            }
          })
        )
    );
  }

 

  async getInscriEve() {
    await this.afAuth.user.subscribe((user) =>
      this.db
        .collection('Eve', ref => ref.where('vac_act', '==', true))
        .get()
        .toPromise()
        .then((ref) =>
          ref.forEach((doc) => {
            if (doc.exists) {
              this.tempEve.push(doc.data().Nom);
              for(let i = 0; i < this.tempEve.length; i++)
              {
                this.tabInscri = [
                  { value: this.tempEve[0] },
                  { value: this.tempEve[1] },
                  { value: this.tempEve[2] },
                  { value: this.tempEve[3] },
                  { value: this.tempEve[4] },
                  { value: this.tempEve[5] },
                  { value: this.tempEve[6] },
                  { value: this.tempEve[7] },
                  { value: this.tempEve[8] },
                  { value: this.tempEve[9] },
                  { value: this.tempEve[10] },
                  { value: this.tempEve[11] },
                  { value: this.tempEve[12] },
                  { value: this.tempEve[13] },
                  { value: this.tempEve[14] },
  
                ];
              }
             
            }
          })
        )
    );
  }

  async getInscriEve2() {
    await this.afAuth.user.subscribe((user) =>
      this.db
        .collection('Eve', ref => ref.where('isMercrediplus', '==', true))
        .get()
        .toPromise()
        .then((ref) =>
          ref.forEach((doc) => {
            if (doc.exists) {
              this.tempEve2.push(doc.data().Nom);
              for(let i = 0; i < this.tempEve2.length; i++)
              {
                this.tabInscri2 = [
                  { value: this.tempEve2[0] },
                  { value: this.tempEve2[1] },
                  { value: this.tempEve2[2] },
                  { value: this.tempEve2[3] },
                  { value: this.tempEve2[4] },
                  { value: this.tempEve2[5] },
                  { value: this.tempEve2[6] },
                  { value: this.tempEve2[7] },
                  { value: this.tempEve2[8] },
                  { value: this.tempEve2[9] },
                  { value: this.tempEve2[10] },
                  { value: this.tempEve2[11] },
                  { value: this.tempEve2[12] },
                  { value: this.tempEve2[13] },
                  { value: this.tempEve2[14] },
                ];
              }
            }
          })
        )
    );
  }

  cancel() {
    if (this.total !== 0) {
      this.toastr.error(
        'Merci de décochez les cases pour pouvoir annuler votre inscription',
        'Opération impossible',
        { timeOut: 15000 }
      );
    } else {
      this.dialog.closeAll();
      this.aInscrire;
      this.alreadyOn = false;
      this.aAge;
      this.etape = 0;
      this.ObjectPrix = new Observable;
      this.choixQF;
    }
  }

  search(key, inputArray) {
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].name === key) {
        return inputArray[i];
      }
    }
  }

  // quoquo = [];
  // jsonquo;

  //   async quotaEve() {

  //     await this.afAuth.user.subscribe(user => this.db.collection('Eve').get()
  //       .toPromise().then(ref => ref.forEach(doc => {

  //         if (doc.exists) {

  //           this.quoquo.push(doc.data())
  //           this.jsonquo = JSON.stringify(this.quoquo);
  //       }
  //     }
  //         )));
  // }

  // searchQuo() {
  //   for (var i = 0; i < this.jsonquo.length; i++) {

  //     if (this.jsonquo[i] == 0){
  //       console.log(this.jsonquo[i])
  //     }
  //     }
  // }

  addLieu() {
    this.db
      .collection('lieu')
      .doc('7Zvrcy1ejH0vp4TEYIHv')
      .update({ [this.newlieu]: this.newlieu })
      .then((ref) => this.toastr.success('Votre lieu a été ajouté', 'Succès !'))
      .then((ref1) => setTimeout((ref) => window.location.reload(), 2000));
  }

 
  getLieu() {
    this.db
      .collection('lieu')
      .doc('7Zvrcy1ejH0vp4TEYIHv')
      .get()
      .toPromise()
      .then((doc) => {
        if (doc.exists) {
          this.getnewLieu = doc.data();
          this.getnewLieu2.push(Object.values(doc.data()));
        }
      });
  }

  async getTab2(choixTab: string) {
    //  this.hasGM = false;
    //  this.hasGS = false;
    this.flag2 = true;
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
      .collection('Tableau')
      .doc(choixTab)
      .get()
      .toPromise()
      .then((doc) => (this.results3 = doc.data()))
      .then((ref) => this.getTab3())
     // .then((ref) => console.log(this.choixTab));
  }

  async getTab3() {
    await this.db
      .collection('Tableau')
      .doc(this.choixTab)
      .get()
      .toPromise()
      .then((doc) => (this.results2 = doc.data().Age))
      .then((ref2) => this.getData());
  }

  async getData() {
    this.data2 = false;
    await this.db
      .collection('Tableau')
      .doc(this.choixTab)
      .get()
      .toPromise()
      .then((doc) => (this.data = doc.data()))
      .then((ref2) => this.getToArrayOfObject())
      .then(ref => this.data = this.data.Tableau)
      .then( ref => this.dataFromServer = this.data)
     // .then((ref) => console.log(this.dataFromServer));
    // this.data = JSON.stringify(doc.data()
    // console.log(Object.keys(doc.data())
  }

  async getToArrayOfObject() {
    this.columnsToDisplay = [];
    this.col = [];
    let name = 'Tableau';
    let truc = name.toString();
    this.dataSource = await this.data[truc];
    this.col = this.data[truc];
    this.data2 = this.col.map(Object.values);
    this.dataFromServer = this.col.map(Object.values)

    this.data3 = await this.col.map(Object.keys);
    this.dataFromServer = this.data2;
    for (let j = 0; j < 7; j++) {
      if (this.data3[0][j] === 'Prix_GS') {
        this.hasGS = true;
      } else if (this.data3[0][j] === 'Prix_GM') {
        this.hasGM = true;
      } else if (this.data3[0][j] === 'Prix_Cantine') {
        this.hasCantine = true;
      }
    }
    for (let i = 0; i < 1; i++) {
      this.columnsToDisplay.push(Object.keys(this.col[0]));
      //this.customHeaders.thead.push(Object.keys(this.col))
      // this.dataToDisplay.push(Object.values(this.col[i]));
    }
    this.columnsToDisplay = this.columnsToDisplay[0];
    this.customHeaders.displayed = this.columnsToDisplay;
    this.customHeaders.thead = this.columnsToDisplay;

    console.log(this.columnsToDisplay);
    console.log(this.customHeaders)
    console.log(this.data)
    // console.log(this.columnsToDisplay);
  }

  getDocNameBDD() {
    this.nameBdd = [];
    this.db
      .collection('Tableau')
      .get()
      .toPromise()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.nameBdd.push(doc.id);
        });
      });
  }

  suppDocNameBDD() {
    if (confirm('Etes-vous sûr de vouloir supprimer cette grille ?')) {
      this.db
        .collection('Tableau')
        .doc(this.choixTab)
        .delete()
        .then((ref) =>
          this.toastr.success('Votre grille a bien été supprimée', 'Succès !')
        )
        .then((ref) => window.location.reload());
    }
  }

  deleteAcc(id) {
    console.log(id);

    if (confirm('Etes-vous sûr de vouloir supprimer ' + id + ' ?')) {
      this.db
        .collection('lieu')
        .doc('7Zvrcy1ejH0vp4TEYIHv')
        .update({
          [id]: firestore.FieldValue.delete(),
        })
        .then((ref) =>
          this.toastr.success(
            'Le lieu d\'acceuil a bien été supprimé',
            'Succès !'
          )
        )
        .then((ref) => window.location.reload());
    }
  }

  displayedColumns: string[] = [];
  displayedHead: string[] = [];
  displayedFields: string[] = [];
  myformArray = new FormArray([]);
  dataSource2 = this.myformArray.controls;
  columns: number;

  modifopen = false;

  modDocNameBDD() {
    // this.modifopen = true;
  }

  test(event) {
    // console.log(event)
  }

  modifObject: any = {};
  idDoc; 

  showModif() {
    console.log(this.dataFromServer);
    if (confirm('Etes-vous sûr de vouloir modifier cette grille ?')) {
      this.db
        .collection('Tableau')
        .doc(this.choixTab).update({Tableau : this.dataFromServer})
        .then((ref) =>
          this.toastr.success('Votre grille a bien été supprimée', 'Succès !')
        )
        .then((ref) => window.location.reload());
    }
  }

  idt;

  // [headers] are used to define the table head and show what are the feilds required.

  // JSON data can be from any source just need an `id` in order to update and delete.
  

  deleteByIdS(ids) {
    console.log(this.idt); // this function gives the ID of deleted rows.. as an array
  }

  updateChanges(row) {
    console.log(row); // This return the row which is updated with the id.
  }


  gethome()
  {
    this.db.collection('home').doc('acc').get().toPromise().then(doc => {
      if(doc.exists)
      {
        this.msg = doc.data().message
        this.image = doc.data().image

      }
    })
  
  }

  sethome()
  {
    this.db.collection('home').doc('acc').update({message : this.msg, image : this.newimg}).then(ref => this.toastr.success('Les modifications ont bien été enregistrées', 'Succès'));
  }



  reset()
  {
    
    this.dataFromServer = [];
  }

  async dupli() {
    let dup;
    await this.db
      .collection("Tableau").doc(this.choixTab)
      .get()
      .toPromise()
      .then((doc) => {
          if (doc.exists) {
            let newtitre = prompt('Indiquez le nouveau nom de la grille, attention il doit être différent des autres grilles !');
              this.db.collection("Tableau").doc(newtitre).set(doc.data());
          }
        }
      )
      .then((ref) =>
        this.toastr.success("Votre grille a bien été dupliquée", "Succès !")
      )
      .then((ref) =>
        setTimeout(() => {
          this.getDocNameBDD()
          

        }, 1500)
      );
  }


    addresponsable(templateRef2): void {
    const dialogRef = this.dialog.open(templateRef2, {
      width: '600px',
      height: '500px',
      panelClass: 'formFieldWidth480',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  async addToBase2() {
    this.responsable2 = {
      prenomMember: this.prenom2,
      nomMember: this.nom2,
      sexeMember: this.sexe2,
      ageMember: this.age2,
      telMember: this.telephone,
      infoMember: this.info,
    };

    await this.afAuth.user.subscribe((user) =>
      this.db
        .collection('users', (ref) => ref.where('uid', '==', user.uid))
        .get()
        .toPromise()
        .then((snapshot) => {
          if (snapshot.empty) {
            return;
          }
          snapshot.forEach((doc) => {
            if (doc.exists) {
               {
                this.db
                  .collection('users')
                  .doc(user.uid)
                  .update({ responsable2 : this.responsable2 });
              }
            }
          });
        })
        .then((ref) => this.dialog.closeAll())
        .then((ref2) => setTimeout((ref) => window.location.reload(), 1000))
        .catch((err) => {
          console.log('Error getting documents', err);
        })
    );
  }
}
