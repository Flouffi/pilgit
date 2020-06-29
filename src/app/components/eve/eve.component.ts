import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { filter, map, take } from "rxjs/operators";

interface Month {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-eve",
  templateUrl: "./eve.component.html",
  styleUrls: ["./eve.component.scss"],
})
export class EveComponent implements OnInit {
  defquota = 0;
  defcheck = false;
  m1all: any = {};
  m2all: any = {};
  m3all: any = {};
  m4all: any = {};
  m5all: any = {};
  m6all: any = {};
  m7all: any = {};
  m8all: any = {};

  m1cant = 0;
  m1aam = 0;
  m1am = 0;
  m1gs = 0;
  m1gm = 0;

  m2cant = 0;
  m2aam = 0;
  m2am = 0;
  m2gs = 0;
  m2gm = 0;

  m3cant = 0;
  m3aam = 0;
  m3am = 0;
  m3gs = 0;
  m3gm = 0;

  m4cant = 0;
  m4aam = 0;
  m4am = 0;
  m4gs = 0;
  m4gm = 0;

  m5cant = 0;
  m5aam = 0;
  m5am = 0;
  m5gs = 0;
  m5gm = 0;

  m6cant = 0;
  m6aam = 0;
  m6am = 0;
  m6gs = 0;
  m6gm = 0;

  m7cant = 0;
  m7aam = 0;
  m7am = 0;
  m7gs = 0;
  m7gm = 0;

  m8cant = 0;
  m8aam = 0;
  m8am = 0;
  m8gs = 0;
  m8gm = 0;

  isAdmin;
  isLoaded = false;
  hasProfil = false;
  profil;
  choixTab;
  results;
  Tab$;
  results2;
  results3;
  nameBdd = [];
  itemList: any[];
  dataSource;
  data;
  data2;
  col = [];
  columnsToDisplay = [];
  dataToDisplay = [];
  place;
  choixMonth;
  choixCat;
  choixWeek;
  choixJour;
  quota = Array(100)
    .fill(0)
    .map((e, i) => i + 1);
  quotat;
  quotatest;
  q1 = 0;
  q2 = 0;
  q3 = 0;
  q4 = 0;
  q5 = 0;
  q6 = 0;
  q7 = 0;
  q8 = 0;
  q9 = 0;
  q10 = 0;
  q11 = 0;
  q12 = 0;
  q13 = 0;
  q14 = 0;
  q15 = 0;
  q16 = 0;
  q17 = 0;
  q18 = 0;
  q19 = 0;
  q20 = 0;
  q21 = 0;
  q1s2 = 0;
  q2s2 = 0;
  q3s2 = 0;
  q4s2 = 0;
  q5s2 = 0;
  q6s2 = 0;
  q7s2 = 0;
  q8s2 = 0;
  q9s2 = 0;
  q10s2 = 0;
  q11s2 = 0;
  q12s2 = 0;
  q13s2 = 0;
  q14s2 = 0;
  q15s2 = 0;
  q16s2 = 0;
  q17s2 = 0;
  q18s2 = 0;
  q19s2 = 0;
  q20s2 = 0;
  q21s2 = 0;
  q1s3 = 0;
  q2s3 = 0;
  q3s3 = 0;
  q4s3 = 0;
  q5s3 = 0;
  q6s3 = 0;
  q7s3 = 0;
  q8s3 = 0;
  q9s3 = 0;
  q10s3 = 0;
  q11s3 = 0;
  q12s3 = 0;
  q13s3 = 0;
  q14s3 = 0;
  q15s3 = 0;
  q16s3 = 0;
  q17s3 = 0;
  q18s3 = 0;
  q19s3 = 0;
  q20s3 = 0;
  q21s3 = 0;
  q1s4 = 0;
  q2s4 = 0;
  q3s4 = 0;
  q4s4 = 0;
  q5s4 = 0;
  q6s4 = 0;
  q7s4 = 0;
  q8s4 = 0;
  q9s4 = 0;
  q10s4 = 0;
  q11s4 = 0;
  q12s4 = 0;
  q13s4 = 0;
  q14s4 = 0;
  q15s4 = 0;
  q16s4 = 0;
  q17s4 = 0;
  q18s4 = 0;
  q19s4 = 0;
  q20s4 = 0;
  q21s4 = 0;
  janvier;
  fevrier;
  mars;
  avril;
  mai;
  juin;
  juillet;
  aout;
  septembre;
  octobre;
  novembre;
  decembre;
  truc;
  testPeriod: any = {};
  testPeriod2: any = {};
  testPeriod3: any = {};
  testPeriod4: any = {};
  testPeriod5: any = {};
  testPeriod6: any = {};
  testPeriod7: any = {};
  testPeriod8: any = {};
  arrayDay = [];
  arrayMonth = [];
  arrayWeek = [];
  arrayLieu = [];
  arrayPerdiod = [];
  nameEve;
  placesup = [];
  s5;
  s6;
  s7;
  s8;
  datedebut;
  datefin;
  maxMax = 0;
  date1;date2;date3;date4;date5;date6;date7;date8;
  date1f;date2f;date3f;date4f;date5f;date6f;date7f;date8f;

  mercrediplus;
  theEve: any = {
    Nom: this.nameEve,
    Lieu: this.place,
    Jour: this.arrayDay,
    Semaine: this.choixWeek,
    Mois: this.choixMonth,
    Quota1: this.testPeriod,
    Quota2: this.testPeriod2,
    Quota3: this.testPeriod3,
    Quota4: this.testPeriod4,
    Tableau: this.choixTab,
    TrancheAge: this.results2,
    Id: this.getRandomInt(10000),
    Createur: "",
    IdDoc: this.getRandomInt(10000) + this.choixMonth,
  };

  theEve2: any = {};
  lundi = false;
  mardi = false;
  mercredi = false;
  jeudi = false;
  vendredi = false;
  samedi = false;
  dimanche = false;
  lundimat;
  lundiam;
  gml = 0;
  gmma = 0;
  gmme = 0;
  gmj = 0;
  gmv = 0;
  gms = 0;
  gmd = 0;
  gsl = 0;
  gsma = 0;
  gsme = 0;
  gsj = 0;
  gsv = 0;
  gss = 0;
  gsd = 0;
  gml2 = 0;
  gmma2 = 0;
  gmme2 = 0;
  gmj2 = 0;
  gmv2 = 0;
  gms2 = 0;
  gmd2 = 0;
  gsl2 = 0;
  gsma2 = 0;
  gsme2 = 0;
  gsj2 = 0;
  gsv2 = 0;
  gss2 = 0;
  gsd2 = 0;
  gml3 = 0;
  gmma3 = 0;
  gmme3 = 0;
  gmj3 = 0;
  gmv3 = 0;
  gms3 = 0;
  gmd3 = 0;
  gsl3 = 0;
  gsma3 = 0;
  gsme3 = 0;
  gsj3 = 0;
  gsv3 = 0;
  gss3 = 0;
  gsd3 = 0;
  gml4 = 0;
  gmma4 = 0;
  gmme4 = 0;
  gmj4 = 0;
  gmv4 = 0;
  gms4 = 0;
  gmd4 = 0;
  gsl4 = 0;
  gsma4 = 0;
  gsme4 = 0;
  gsj4 = 0;
  gsv4 = 0;
  gss4 = 0;
  gsd4 = 0;
  s1;
  s2;
  s3;
  s4;
  hasGS = false;
  hasGM = false;
  hasCantine = false;
  hasAccueilMatin = false;
  hasAccueilAM = false;

  ls1 = true;
  mas1 = true;
  mes1 = true;
  js1 = true;
  vs1 = true;

  ls2 = true;
  mas2 = true;
  mes2 = true;
  js2 = true;
  vs2 = true;
  ss1 = true;
  ss2 = true;
  ds1 = true;
  ds2 = true;

  ls3 = true;
  mas3 = true;
  mes3 = true;
  js3 = true;
  vs3 = true;
  ss3 = true;
  ds3 = true;

  ls4 = true;
  mas4 = true;
  mes4 = true;
  js4 = true;
  vs4 = true;
  ss4 = true;
  ds4 = true;

  bugTab;
  data3 = [];
  // month = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  places: Month[] = [
    // { value: 'Ecole Maternelle Branly (Belencontre 3/5 ans)', viewValue: 'Ecole Maternelle Branly' },
    // { value: 'Ecole Racine (Belecontre 6/8 ans et 8/12 ans)', viewValue: 'Ecole Racine' },
    // { value: 'CSC Belencontre (Ados)', viewValue: 'CSC Belencontre' },
    // { value: 'CSC Phalempins (La Fontaine) (6/8 et 8/12 ans et Ados)', viewValue: 'CSC Phalempins' },
    // { value: 'Ecoles Paul Bert (3/5 ans et 6/8 et 8/12 ans)', viewValue: 'Paul Bert' }
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

  cats: Month[] = [
    { value: "Accueil", viewValue: "Accueil" },
    { value: "Cantine", viewValue: "Cantine" },
    { value: "Garderie Matin", viewValue: "Garderie Matin" },
    { value: "Garderie Soir", viewValue: "Garderie Soir" },
  ];
  weeks: Month[] = [
    { value: "Semaine 1", viewValue: "Semaine 1" },
    { value: "Semaine 2", viewValue: "Semaine 2" },
    { value: "Semaine 3", viewValue: "Semaine 3" },
    { value: "Semaine 4", viewValue: "Semaine 4" },
  ];

  days: Month[] = [
    { value: "Lundi", viewValue: "Lundi" },
    { value: "Mardi", viewValue: "Mardi" },
    { value: "Mercredi", viewValue: "Mercredi" },
    { value: "Jeudi", viewValue: "Jeudi" },
    { value: "Vendredi", viewValue: "Vendredi" },
    { value: "Samedi", viewValue: "Samedi" },
    { value: "Dimanche", viewValue: "Dimanche" },
  ];

  state = { value: "" };
  choix: Month[] = [
    { value: "classique", viewValue: "Vacances/Activité" },
    { value: "mercredi+", viewValue: "Mercredi+" },
  ];

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
    this.getDocNameBDD();
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
        .then((ref) => this.getsupLieu())
        .then((ref6) => (this.isLoaded = true))
    );
  }
  async getTab2(choixTab: string) {
    //  this.hasGM = false;
    //  this.hasGS = false;
    this.Tab$ = await this.db
      .collection("Tableau")
      .doc(choixTab)
      .get()
      .toPromise()
      .then((doc) => (this.results3 = doc.data()))
      .then((ref) => this.getTab3());
  }
  async getTab3() {
    await this.db
      .collection("Tableau")
      .doc(this.choixTab)
      .get()
      .toPromise()
      .then((doc) => (this.results2 = doc.data().Age))
      .then((ref2) => this.getData());
  }
  getDocNameBDD() {
    this.db
      .collection("Tableau")
      .get()
      .toPromise()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.nameBdd.push(doc.id);
        });
      });
  }

  async getData() {
    this.data2 = false;
    await this.db
      .collection("Tableau")
      .doc(this.choixTab)
      .get()
      .toPromise()
      .then((doc) => (this.data = doc.data()))
      .then((ref2) => this.getToArrayOfObject());
    // this.data = JSON.stringify(doc.data()
    // console.log(Object.keys(doc.data())
  }

  async getToArrayOfObject() {
    this.columnsToDisplay = [];
    this.col = [];
    let name = "Tableau";
    let truc = name.toString();
    this.dataSource = await this.data[truc];
    this.col = this.data[truc];
    this.data2 = this.col.map(Object.values);
    this.data3 = await this.col.map(Object.keys);

    for (let j = 0; j < 8; j++) {
      if (this.data3[0][j] === "Prix_GS") {
        this.hasGS = true;
      } else if (this.data3[0][j] === "Prix_GM") {
        this.hasGM = true;
      } else if (this.data3[0][j] === "Prix_Cantine") {
        this.hasCantine = true;
      } else if (this.data3[0][j] === "Acceuil_Matin") {
        this.hasAccueilMatin = true;
      } else if (this.data3[0][j] === "Accueil_AM") {
        this.hasAccueilAM = true;
      }
    }
    for (let i = 0; i < 1; i++) {
      this.columnsToDisplay.push(Object.keys(this.col[0]));
      // this.dataToDisplay.push(Object.values(this.col[i]));
    }
    this.columnsToDisplay = this.columnsToDisplay[0];
    // console.log(this.columnsToDisplay);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  testEve() {
    let random = this.getRandomInt(100000);

    this.afAuth.user.subscribe(
      (user) =>
        (this.theEve = {
          Nom: this.nameEve,
          Lieu: this.place,
          Etat: "enligne",
          Jour: this.arrayDay,
          Semaine: this.arrayWeek,
          Mois: this.arrayMonth,
          Quota1: this.testPeriod,
          Quota2: this.testPeriod2,
          Quota3: this.testPeriod3,
          Quota4: this.testPeriod4,
          Tableau: this.bugTab,
          Id: random,
          Createur: user.uid,
          IdDoc: random + user.uid,
          vac_act: true,
        })
    );
    if (this.theEve.Tableau === undefined) {
      this.toastr.show(
        'Cliquez de nouveau pour confirmer la création de l\'évènement',
        "Confirmation"
      );
      console.log(this.theEve);
    } else {
      console.log(this.theEve);
      this.db
        .collection("Eve")
        .doc(this.theEve.IdDoc)
        .set(this.theEve)
        .then((ref) =>
          this.toastr.success(
            "Votre Evenement a bien été enregistré",
            "Ajout Réussi"
          )
        )
        .then((ref) => window.location.reload());
    }
  }

  testEve2() {
    this.togglemercredi();
    this.togglemercredi2();
    this.togglemercredi3();
    this.togglemercredi4();
    this.togglemercredi5();
    this.togglemercredi6();
    this.togglemercredi7();
    this.togglemercredi8();
    let random = this.getRandomInt(100000);
    this.afAuth.user.subscribe(
      (user) =>
        (this.theEve2 = {
          Nom: this.nameEve,
            Etat: "enligne",
            Lieu: this.place,
            mercredi: this.mercrediplus,
            DateDebut : this.datedebut,
            DateFin : this.datefin,
            Quota1: this.m1all,
            Quota2: this.m2all,
            Quota3: this.m3all,
            Quota4: this.m4all,
            Quota5: this.m5all,
            Quota6: this.m6all,
            Quota7: this.m7all,
            Quota8: this.m8all,
            Date1d: this.date1,
            Date2d: this.date2,
            Date3d: this.date3,
            Date4d: this.date4,
            Date5d: this.date5,
            Date6d: this.date6,
            Date7d: this.date7,
            Date8d: this.date8,
            Date1f: this.date1f,
            Date2f: this.date2f,
            Date3f: this.date3f,
            Date4f: this.date4f,
            Date5f: this.date5f,
            Date6f: this.date6f,
            Date7f: this.date7f,
            Date8f: this.date8f,
            Tableau: this.choixTab,
            Id: random,
            Createur: user.uid,
            IdDoc: random + user.uid,
            isMercrediplus: true,
        })
    );

    if (this.theEve2.Tableau && this.theEve2.Quota1) {
      this.db
        .collection("Eve")
        .doc(this.theEve2.IdDoc)
        .set(this.theEve2)
        .then((ref) =>
          this.toastr.success(
            "Votre Evenement a bien été enregistré",
            "Ajout Réussi"
          )
        )
        .then((ref) => window.location.reload());
    } else {
      this.toastr.show("Cliquez de nouveau pour valider", "Confirmation");
    }
  }

  setmaxMax(id) {
    this.maxMax = id.srcElement.value;
    console.log(this.maxMax);
   // this.testAll();
  }

  toggle($event) {
    if ($event.checked === true) {
      this.arrayDay.push($event.source.name);
    } else {
      this.arrayDay.splice(this.arrayDay.indexOf($event.source.name), 1);
    }

    if ($event.source.name === "Lundi") {
      this.lundi = !this.lundi;
    }
    if ($event.source.name === "Mardi") {
      this.mardi = !this.mardi;
    }
    if ($event.source.name === "Mercredi") {
      this.mercredi = !this.mercredi;
    }
    if ($event.source.name === "Jeudi") {
      this.jeudi = !this.jeudi;
    }
    if ($event.source.name === "Vendredi") {
      this.vendredi = !this.vendredi;
    }
    if ($event.source.name === "Samedi") {
      this.samedi = !this.samedi;
    }
    if ($event.source.name === "Dimanche") {
      this.dimanche = !this.dimanche;
    }
    console.log(this.arrayDay);
  }

  toggle2($event) {
    if ($event.checked === true) {
      this.arrayMonth.push($event.source.name);
    } else {
      this.arrayMonth.splice(this.arrayMonth.indexOf($event.source.name), 1);
    }

    if ($event.source.name === "Janvier") {
      this.janvier = !this.janvier;
    }
    if ($event.source.name === "Février") {
      this.fevrier = !this.fevrier;
    }
    if ($event.source.name === "Mars") {
      this.mars = !this.mars;
    }
    if ($event.source.name === "Avril") {
      this.avril = !this.avril;
    }
    if ($event.source.name === "Mai") {
      this.mai = !this.mai;
    }
    if ($event.source.name === "Juin") {
      this.juin = !this.juin;
    }
    if ($event.source.name === "Juillet") {
      this.juillet = !this.juillet;
    }
    if ($event.source.name === "Août") {
      this.aout = !this.aout;
    }
    if ($event.source.name === "Septembre") {
      this.septembre = !this.septembre;
    }
    if ($event.source.name === "Octobre") {
      this.octobre = !this.octobre;
    }
    if ($event.source.name === "Novembre") {
      this.novembre = !this.novembre;
    }
    if ($event.source.name === "Décembre") {
      this.decembre = !this.decembre;
    }
    console.log(this.arrayMonth);
  }

  toggle4($event) {
    if ($event.checked === true) {
      this.arrayWeek.push($event.source.name);
    } else {
      this.arrayWeek.splice(this.arrayWeek.indexOf($event.source.name), 1);
    }

    if ($event.source.name === "Semaine 1") {
      this.s1 = !this.s1;
    }
    if ($event.source.name === "Semaine 2") {
      this.s2 = !this.s2;
    }
    if ($event.source.name === "Semaine 3") {
      this.s3 = !this.s3;
    }
    if ($event.source.name === "Semaine 4") {
      this.s4 = !this.s4;
    }
    console.log(this.arrayWeek);
  }

  toggle5($event) {
    if ($event.checked === true) {
      this.arrayLieu.push($event.source.name);
    } else {
      this.arrayLieu.splice(this.arrayLieu.indexOf($event.source.name), 1);
    }
    console.log(this.arrayLieu);
  }
  // toggle2($event) {

  //   if ($event.checked === true) {
  //     this.arrayPerdiod.push($event.source.name);
  //   } else {
  //      this.arrayPerdiod.splice(this.arrayDay.indexOf($event.source.name), 1 );
  //    }
  //    console.log(this.arrayPerdiod)
  // }

  reset() {
    this.columnsToDisplay = [];
    this.col = [];
    this.dataSource;
  }

  toggle3($event, id) {
    this.testPeriod[$event.srcElement.name] = id;
    this.testPeriod.id = '1'

    if (id === "") {
      delete this.testPeriod[$event.srcElement.name];
    }
  }

  toggle3s2($event, id) {
    this.testPeriod2[$event.srcElement.name] = id;
    this.testPeriod2.id = '2'

    if (id === "") {
      delete this.testPeriod2[$event.srcElement.name];
    }

    console.log(this.testPeriod2);
  }

  toggle3s3($event, id) {
    this.testPeriod3[$event.srcElement.name] = id;
    this.testPeriod3.id = '3'

    if (id === "") {
      delete this.testPeriod3[$event.srcElement.name];
    }

    console.log(this.testPeriod3);
  }

  toggle3s4($event, id) {
    this.testPeriod4[$event.srcElement.name] = id;
    this.testPeriod4.id = '4'

    if (id === "") {
      delete this.testPeriod4[$event.srcElement.name];
    }

    console.log(this.testPeriod4);
  }

  // getQ(id)
  // {
  //   this.toggle3(id)
  // }

  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["sign-in"]);
    });
  }

  getsupLieu() {
    let tempLieu;

    this.db
      .collection("lieu")
      .doc("7Zvrcy1ejH0vp4TEYIHv")
      .get()
      .toPromise()
      .then((doc) => {
        if (doc.exists) {
          this.placesup = Object.values(doc.data());

          for (let i = 0; i < this.placesup.length; i++) {
            this.places.push({
              value: this.placesup[i],
              viewValue: this.placesup[i],
            });
          }
        }
      });
  }

  mercredicount() {
    if (this.mercrediplus == 1) {
      this.s1 = true;
      this.s2 = false;
      this.s3 = false;
      this.s4 = false;
      this.s5 = false;
      this.s6 = false;
      this.s7 = false;
      this.s8 = false;
    }
    if (this.mercrediplus == 2) {
      this.s1 = true;
      this.s2 = true;
      this.s3 = false;
      this.s4 = false;
      this.s5 = false;
      this.s6 = false;
      this.s7 = false;
      this.s8 = false;
    }
    if (this.mercrediplus == 3) {
      this.s1 = true;
      this.s2 = true;
      this.s3 = true;
      this.s4 = false;
      this.s5 = false;
      this.s6 = false;
      this.s7 = false;
      this.s8 = false;
    }
    if (this.mercrediplus == 4) {
      this.s1 = true;
      this.s2 = true;
      this.s3 = true;
      this.s4 = true;
      this.s5 = false;
      this.s6 = false;
      this.s7 = false;
      this.s8 = false;
    }
    if (this.mercrediplus == 5) {
      this.s1 = true;
      this.s2 = true;
      this.s3 = true;
      this.s4 = true;
      this.s5 = true;
      this.s6 = false;
      this.s7 = false;
      this.s8 = false;
    }
    if (this.mercrediplus == 6) {
      this.s1 = true;
      this.s2 = true;
      this.s3 = true;
      this.s4 = true;
      this.s5 = true;
      this.s6 = true;
      this.s7 = false;
      this.s8 = false;
    }
    if (this.mercrediplus == 7) {
      this.s1 = true;
      this.s2 = true;
      this.s3 = true;
      this.s4 = true;
      this.s5 = true;
      this.s6 = true;
      this.s7 = true;
      this.s8 = false;
    }
    if (this.mercrediplus == 8) {
      this.s1 = true;
      this.s2 = true;
      this.s3 = true;
      this.s4 = true;
      this.s5 = true;
      this.s6 = true;
      this.s7 = true;
      this.s8 = true;
    }
  }

  togglemercredi() {
    this.m1all = {
      GM: this.m1gm,
      AAM: this.m1am,
      AM: this.m1aam,
      GS: this.m1gs,
      CANT: this.m1cant,
      id: '1'
    };

    console.log(this.m1all);
  }
  togglemercredi2() {
    this.m2all = {
      GM: this.m2gm,
      AAM: this.m2am,
      AM: this.m2aam,
      GS: this.m2gs,
      CANT: this.m2cant,
      id: '2'
    };
  }
  togglemercredi3() {
    this.m3all = {
      GM: this.m3gm,
      AAM: this.m3am,
      AM: this.m3aam,
      GS: this.m3gs,
      CANT: this.m3cant,
      id: '3'
    };
  }
  togglemercredi4() {
    this.m4all = {
      GM: this.m4gm,
      AAM: this.m4am,
      AM: this.m4aam,
      GS: this.m4gs,
      CANT: this.m4cant,
      id: '4'
    };
  }
  togglemercredi5() {
    this.m5all = {
      GM: this.m5gm,
      AAM: this.m5am,
      AM: this.m5aam,
      GS: this.m5gs,
      CANT: this.m5cant,
      id: '5'
    };
  }
  togglemercredi6() {
    this.m6all = {
      GM: this.m6gm,
      AAM: this.m6am,
      AM: this.m6aam,
      GS: this.m6gs,
      CANT: this.m6cant,
      id: '6'
    };
  }
  togglemercredi7() {
    this.m7all = {
      GM: this.m7gm,
      AAM: this.m7am,
      AM: this.m7aam,
      GS: this.m7gs,
      CANT: this.m7cant,
      id: '7'
    };
  }
  togglemercredi8() {
    this.m8all = {
      GM: this.m8gm,
      AAM: this.m8am,
      AM: this.m8aam,
      GS: this.m8gs,
      CANT: this.m8cant,
      id: '8'
    };
  }

  resetEve() {
    this.place;
    this.nameEve = "";
  }

  checkbtn() {
    this.theEve = {};
    this.theEve2 = {};
  }

  testAll() {
    this.gml = this.maxMax;
    this.gmma = this.maxMax;
    this.gmme = this.maxMax;
    this.gmj = this.maxMax;
    this.gmv = this.maxMax;
    this.gms = this.maxMax;
    this.gmd = this.maxMax;
    this.gsl = this.maxMax;
    this.gsma = this.maxMax;
    this.gsme = this.maxMax;
    this.gsj = this.maxMax;
    this.gsv = this.maxMax;
    this.gss = this.maxMax;
    this.gsd = this.maxMax;
    this.gml2 = this.maxMax;
    this.gmma2 = this.maxMax;
    this.gmme2 = this.maxMax;
    this.gmj2 = this.maxMax;
    this.gmv2 = this.maxMax;
    this.gms2 = this.maxMax;
    this.gmd2 = this.maxMax;
    this.gsl2 = this.maxMax;
    this.gsma2 = this.maxMax;
    this.gsme2 = this.maxMax;
    this.gsj2 = this.maxMax;
    this.gsv2 = this.maxMax;
    this.gss2 = this.maxMax;
    this.gsd2 = this.maxMax;
    this.gml3 = this.maxMax;
    this.gmma3 = this.maxMax;
    this.gmme3 = this.maxMax;
    this.gmj3 = this.maxMax;
    this.gmv3 = this.maxMax;
    this.gms3 = this.maxMax;
    this.gmd3 = this.maxMax;
    this.gsl3 = this.maxMax;
    this.gsma3 = this.maxMax;
    this.gsme3 = this.maxMax;
    this.gsj3 = this.maxMax;
    this.gsv3 = this.maxMax;
    this.gss3 = this.maxMax;
    this.gsd3 = this.maxMax;
    this.gml4 = this.maxMax;
    this.gmma4 = this.maxMax;
    this.gmme4 = this.maxMax;
    this.gmj4 = this.maxMax;
    this.gmv4 = this.maxMax;
    this.gms4 = this.maxMax;
    this.gmd4 = this.maxMax;
    this.gsl4 = this.maxMax;
    this.gsma4 = this.maxMax;
    this.gsme4 = this.maxMax;
    this.gsj4 = this.maxMax;
    this.gsv4 = this.maxMax;
    this.gss4 = this.maxMax;
    this.gsd4 = this.maxMax;
    this.q1 = this.maxMax;
    this.q2 = this.maxMax;
    this.q3 = this.maxMax;
    this.q4 = this.maxMax;
    this.q5 = this.maxMax;
    this.q6 = this.maxMax;
    this.q7 = this.maxMax;
    this.q8 = this.maxMax;
    this.q9 = this.maxMax;
    this.q10 = this.maxMax;
    this.q11 = this.maxMax;
    this.q12 = this.maxMax;
    this.q13 = this.maxMax;
    this.q14 = this.maxMax;
    this.q15 = this.maxMax;
    this.q16 = this.maxMax;
    this.q17 = this.maxMax;
    this.q18 = this.maxMax;
    this.q19 = this.maxMax;
    this.q20 = this.maxMax;
    this.q21 = this.maxMax;
    this.q1s2 = this.maxMax;
    this.q2s2 = this.maxMax;
    this.q3s2 = this.maxMax;
    this.q4s2 = this.maxMax;
    this.q5s2 = this.maxMax;
    this.q6s2 = this.maxMax;
    this.q7s2 = this.maxMax;
    this.q8s2 = this.maxMax;
    this.q9s2 = this.maxMax;
    this.q10s2 = this.maxMax;
    this.q11s2 = this.maxMax;
    this.q12s2 = this.maxMax;
    this.q13s2 = this.maxMax;
    this.q14s2 = this.maxMax;
    this.q15s2 = this.maxMax;
    this.q16s2 = this.maxMax;
    this.q17s2 = this.maxMax;
    this.q18s2 = this.maxMax;
    this.q19s2 = this.maxMax;
    this.q20s2 = this.maxMax;
    this.q21s2 = this.maxMax;
    this.q1s3 = this.maxMax;
    this.q2s3 = this.maxMax;
    this.q3s3 = this.maxMax;
    this.q4s3 = this.maxMax;
    this.q5s3 = this.maxMax;
    this.q6s3 = this.maxMax;
    this.q7s3 = this.maxMax;
    this.q8s3 = this.maxMax;
    this.q9s3 = this.maxMax;
    this.q10s3 = this.maxMax;
    this.q11s3 = this.maxMax;
    this.q12s3 = this.maxMax;
    this.q13s3 = this.maxMax;
    this.q14s3 = this.maxMax;
    this.q15s3 = this.maxMax;
    this.q16s3 = this.maxMax;
    this.q17s3 = this.maxMax;
    this.q18s3 = this.maxMax;
    this.q19s3 = this.maxMax;
    this.q20s3 = this.maxMax;
    this.q21s3 = this.maxMax;
    this.q1s4 = this.maxMax;
    this.q2s4 = this.maxMax;
    this.q3s4 = this.maxMax;
    this.q4s4 = this.maxMax;
    this.q5s4 = this.maxMax;
    this.q6s4 = this.maxMax;
    this.q7s4 = this.maxMax;
    this.q8s4 = this.maxMax;
    this.q9s4 = this.maxMax;
    this.q10s4 = this.maxMax;
    this.q11s4 = this.maxMax;
    this.q12s4 = this.maxMax;
    this.q13s4 = this.maxMax;
    this.q14s4 = this.maxMax;
    this.q15s4 = this.maxMax;
    this.q16s4 = this.maxMax;
    this.q17s4 = this.maxMax;
    this.q18s4 = this.maxMax;
    this.q19s4 = this.maxMax;
    this.q20s4 = this.maxMax;
    this.q21s4 = this.maxMax;
  }


  testEve3() {
    let random = this.getRandomInt(100000);
    this.afAuth.user.subscribe(
      (user) =>
        (this.theEve2 = {
          Nom: this.nameEve,
          Etat: "enligne",
          Lieu: this.place,
          mercredi: this.mercrediplus,
          Quota1: this.m1all,
          Quota2: this.m2all,
          Quota3: this.m3all,
          Quota4: this.m4all,
          Quota5: this.m5all,
          Quota6: this.m6all,
          Quota7: this.m7all,
          Quota8: this.m8all,
          Tableau: this.choixTab,
          Id: random,
          Createur: user.uid,
          IdDoc: random + user.uid,
          isMercrediplus: true,
        })
    );

    if (this.theEve2.Tableau && this.theEve2.Quota1) {
      this.db
        .collection("Eve")
        .doc(this.theEve2.IdDoc)
        .set(this.theEve2)
        .then((ref) =>
          this.toastr.success(
            "Votre Evenement a bien été enregistré",
            "Ajout Réussi"
          )
        )
        .then((ref) => window.location.reload());
    } else {
      this.toastr.show("Cliquez de nouveau pour valider", "Confirmation");
    
    }
  }

  


  mercredifast()
  {
    let nbMercredi = this.mercrediplus;
    let nbplace = prompt('Combien de places pour TOUT les mercredi(s) ?')
    let place;
    place = parseInt(nbplace)
    

    for(let i = 0; i < nbMercredi; i++)
    {
      if(nbMercredi >= 1 )
      {
        i++;
        this.m1all = {
          GM: nbplace,
          AAM: nbplace,
          AM: nbplace,
          GS: nbplace,
          CANT: nbplace,
          id: i
        }
        
      }
      if(nbMercredi >= 2 )
      {
        i++;
        this.m2all = {
          GM: nbplace,
          AAM: nbplace,
          AM: nbplace,
          GS: nbplace,
          CANT: nbplace,
          id: i
        }
       
      }
      if(nbMercredi >= 3 )
      {
        i++;
        this.m3all = {
          GM: nbplace,
          AAM: nbplace,
          AM: nbplace,
          GS: nbplace,
          CANT: nbplace,
          id: i
        }
      
      }
      if(nbMercredi >= 4 )
      {
        i++;
        this.m4all = {
          GM: nbplace,
          AAM: nbplace,
          AM: nbplace,
          GS: nbplace,
          CANT: nbplace,
          id: i
        }
 
      }
      if(nbMercredi >= 5 )
      {
        i++;
        this.m5all = {
          GM: nbplace,
          AAM: nbplace,
          AM: nbplace,
          GS: nbplace,
          CANT: nbplace,
          id: i
        }
       
      }
      if(nbMercredi >= 6 )
      {
        i++;
        this.m6all = {
          GM: nbplace,
          AAM: nbplace,
          AM: nbplace,
          GS: nbplace,
          CANT: nbplace,
          id: i
        }
        
      }
      if(nbMercredi >= 7 )
      {
        i++;
        this.m7all = {
          GM: nbplace,
          AAM: nbplace,
          AM: nbplace,
          GS: nbplace,
          CANT: nbplace,
          id: i
        }
      
      }
      if(nbMercredi >= 8 )
      {
        i++;
        this.m8all = {
          GM: nbplace,
          AAM: nbplace,
          AM: nbplace,
          GS: nbplace,
          CANT: nbplace,
          id: i
        }
       
      }
      
    }


    if(confirm('Vous souhaitez créer '+  nbMercredi + ' Mercredi' + ' avec ' + place + ' places ?'))
    {
      if(this.mercrediplus && this.datefin && this.place && this.choixTab && this.nameEve )
      {
      let random = this.getRandomInt(100000);
      this.afAuth.user.subscribe((user) =>
      this.db
        .collection("Eve")
        .doc(random + user.uid)
        .set({
         
            Nom: this.nameEve,
            Etat: "enligne",
            Lieu: this.place,
            mercredi: this.mercrediplus,
            Quota1: this.m1all,
            Quota2: this.m2all,
            Quota3: this.m3all,
            Quota4: this.m4all,
            Quota5: this.m5all,
            Quota6: this.m6all,
            Quota7: this.m7all,
            Quota8: this.m8all,
            Date1d: this.date1,
            Date2d: this.date2,
            Date3d: this.date3,
            Date4d: this.date4,
            Date5d: this.date5,
            Date6d: this.date6,
            Date7d: this.date7,
            Date8d: this.date8,
            Date1f: this.date1f,
            Date2f: this.date2f,
            Date3f: this.date3f,
            Date4f: this.date4f,
            Date5f: this.date5f,
            Date6f: this.date6f,
            Date7f: this.date7f,
            Date8f: this.date8f,
            Tableau: this.choixTab,
            Id: random,
            Createur: user.uid,
            IdDoc: random + user.uid,
            isMercrediplus: true,
      
        })
        .then((ref) =>
          this.toastr.success(
            "Votre Evenement a bien été enregistré",
            "Ajout Réussi"
          ))
        .then(ref => window.location.reload()))
      }
    }

 
  }



  mercredimul()
  {
    let plusun = prompt('')
  }

  getTableau(event)
  {
   this.bugTab = event;
  }

}
