import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { ViewChildren, ElementRef, QueryList, ViewChild } from "@angular/core";
import {
  FormArray,
  FormGroup,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { MatTable } from "@angular/material/table";
import { filter, map, take, first } from "rxjs/operators";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs";
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from "@angular/animations";
import { ToastrService } from "ngx-toastr";

interface Food {
  value: string;
  viewValue: string;
}

interface Month {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class GridComponent implements OnInit {
  isAdmin;
  isLoaded = false;
  hasProfil = false;
  profil;
  age2: number;
  flag;
  displayedColumns: string[] = [];
  displayedHead: string[] = [];
  displayedFields: string[] = [];
  myformArray = new FormArray([]);
  dataSource = this.myformArray.controls;
  columns: number;
  addIcon = false;
  nomTab;
  nomTabl: string;
  nomCol;
  preNom;
  preNom3;
  preNom2;
  FormDate = false;
  champs = 0;
  result: Observable<unknown[]>;
  results2;
  results3 = [];
  choixTab;
  resultsChoix;
  resultsGetBdd;
  nameEvent;
  choixEvent;
  numberRow;
  etape = 0;
  list;
  element: HTMLElement;
  newArray = [];
  newBdd;
  Tab$: Observable<any>;
  age: number;
  selectAge;
  deg2 = "";
  deg3 = "";
  deg4 = "";
  dis = false;
  putain = {};
  putain2 = {};
  degri = {
    inscri2: this.deg2,
    inscri3: this.deg3,
    inscri4: this.deg4,
  };
  foods: Food[] = [
    { value: "Prix_GM", viewValue: "Prix GM" },
    { value: "Prix_GS", viewValue: "Prix GS" },
    { value: "Prix_Cantine", viewValue: "Prix Cantine" },
    { value: "Accueil", viewValue: "Accueil" },
  ];
  foods2: Food[] = [
    { value: "Catégorie", viewValue: "Catégorie" },
    { value: "Tranche d'âge", viewValue: "Tranche d'âge" },
    { value: "Age", viewValue: "Age" },
    { value: "Date de début", viewValue: "Date de début" },
    { value: "Date de fin", viewValue: "Date de fin" },
    { value: "Heure de début", viewValue: "Heure de début" },
    { value: "Heure de fin", viewValue: "Heure de fin" },
    { value: "Adresse", viewValue: "Adresse" },
  ];
  tranche: Food[] = [
    { value: "3-12", viewValue: "3-12" },
    { value: "3-13", viewValue: "3-13" },
    { value: "3-14", viewValue: "3-14" },
    { value: "12-17", viewValue: "12-17" },
    { value: "13-17", viewValue: "13-17" },
    { value: "14-17", viewValue: "14-17" },
  ];

  QF0 = "test";

  state = { value: "" };
  choix: Month[] = [
    { value: "classique", viewValue: "Vacances/Activité" },
    { value: "mercredi+", viewValue: "Mercredi+" },
  ];

  @ViewChild("mat-input-4", { static: false }) myDiv: ElementRef;

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
    this.addColumnDialog5();
    this.addColumnDialog4();
    this.addColumnDialog6();
    this.addColumnDialog7();
    this.addColumnDialog8();
    this.addColumnDialog9();
    this.addColumnDialog5new();
    this.addColumnDialog4new();
    this.addColumnDialog6new();
    this.addColumnDialog7new();
    this.addColumnDialog8new();
    this.addColumnDialog9new();
    // this.addColumnDialognew();
    this.addColumnDialog10new();

    //  this.addColumnDialog3();
    this.add();
    this.getTabBDD();
    this.add();
    this.add();
    this.add();
    this.add();
    this.add();
    this.add();
    this.add();
    this.add();
    this.getQF();
    this.addnew();
    this.addnew();
    this.addnew();
    this.addnew();
    this.addnew();
    this.addnew();
    this.addnew();
    this.addnew();
    this.addnew();
  }

  ngOnInit() {
    this.getDocNameBDD();

    // setTimeout(() => {
    //   this.inserQF();
    // }, 10);
  }

  async main() {
    await this.afAuth.user.subscribe((user) =>
      this.db
        .collection("users")
        .doc(user.uid)
        .get()
        .toPromise()
        .then((doc) => (this.profil = doc.data()))
        .then((ref2) => (this.isAdmin = this.profil.isAdmin))
        .then((ref6) => (this.isLoaded = true))
    );
  }
  valid() {
    localStorage.setItem("Nom de l'évènement", this.nameEvent);
    this.etape++;
  }
  valid2() {
    localStorage.setItem("Grille", this.choixEvent);
    this.etape++;
  }
  delete(index: number) {
    this.myformArray.removeAt(index);
    this.dataSource = [...this.myformArray.controls];
  }
  getTab(choixTab: string) {
    this.resultsChoix = this.db
      .collection("Tableau")
      .doc(choixTab)
      .get()
      .toPromise()
      .then((doc) => {
        this.resultsGetBdd = doc.data();
        this.newBdd = doc.data();
        // this.list = Object.keys(this.resultsGetBdd);
        console.log(this.list);
      })
      .then((ref) => (this.list = Object.values(this.resultsGetBdd.nom)));
  }
  getTab2(choixTab: string) {
    this.Tab$ = this.db
      .collection("Tableau")
      .doc(choixTab)
      .valueChanges()
      .pipe(take(1));
    console.log(this.Tab$);
  }
  changeNom() {
    this.dialog.closeAll();
  }
  deleteCol(col: string, index: number) {
    this.myformArray.controls.forEach((group: FormGroup) => {
      group.removeControl(col);
      group.updateValueAndValidity({ onlySelf: true, emitEvent: true });
      if (this.displayedHead.indexOf(col) !== -1) {
        this.displayedHead.splice(this.displayedHead.indexOf(col), 1);
      }
      if (this.displayedFields.indexOf(col) !== -1) {
        this.displayedFields.splice(this.displayedFields.indexOf(col), 1);
      }
      if (this.displayedColumns.indexOf(col) !== -1) {
        this.displayedColumns.splice(this.displayedColumns.indexOf(col), 1);
      }
    });
    this.foods.push({ value: col, viewValue: col });
    // this.myformArray.removeAt(index)
    this.dataSource = [...this.myformArray.controls];
    this.dialog.closeAll();
  }
  add() {
    const newGroup = new FormGroup({});
    this.displayedFields.forEach((x) => {
      newGroup.addControl(x, new FormControl());
    });
    this.myformArray.push(newGroup);
    this.dataSource = [...this.myformArray.controls];
  }
  addColumn() {
    const newField = "Column" + (this.displayedFields.length + 1);
    this.myformArray.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    this.displayedHead.push(newField);
    this.dataSource = [...this.myformArray.controls];
    this.displayedFields.push(newField);
    this.displayedColumns = [...this.displayedFields, "delete"];
    // VERIF DUPLICATE COL
  }
  addColumnDialog() {
    const newField = this.nomCol;
    // if (this.preNom === 'age') {
    //   this.addIcon = true;
    //   console.log(this.addIcon);
    // }
    this.myformArray.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    this.displayedHead.push(newField);
    this.dataSource = [...this.myformArray.controls];
    this.displayedFields.push(newField);
    this.displayedColumns = [...this.displayedFields, "delete"];
    // VERIF DUPLICATE COL
    console.log(this.dataSource);
    console.log(this.displayedHead);
    this.flag = newField;
    console.log(this.flag);
    this.dialog.closeAll();
  }
  addColumnDialog3(id) {
    console.log(this.preNom);
    const newField = this.preNom;
    // this.inserQF( )
    // VERIF DUPLICATE COL
    if (newField === "Age") {
      this.addIcon = true;
      console.log(this.addIcon);
    }
    for (let i = 0; i < this.foods.length; i++) {
      if (this.foods[i].value === newField) {
        this.foods.splice(i, 1);
        break;
      }
    }
    this.displayedHead.push(newField);
    this.displayedFields.push(newField);
    this.myformArray.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    // this.dataSource = [...this.myformArray.controls];
    this.displayedColumns = [...this.displayedFields, "delete"];
    this.dialog.closeAll();
  }
  openDialog(templateRef) {
    this.nomCol = "";
    const dialogRef = this.dialog.open(templateRef, {
      width: "600px",
      height: "600px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      // this.animal = result;
    });
  }

  openDialogDeg(templateRef) {
    this.nomCol = "";
    const dialogRef = this.dialog.open(templateRef, {
      width: "700px",
      height: "400px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      // this.animal = result;
    });
  }
  openDialog2(templateRef2) {
    const dialogRef = this.dialog2.open(templateRef2, {
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      // this.animal = result;
    });
  }
  openDialog3(templateRef2) {
    const dialogRef = this.dialog2.open(templateRef2, {
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      // this.animal = result;
    });
  }
  openDialog4(templateRef2) {
    const dialogRef = this.dialog2.open(templateRef2, {
      width: "600px",
      height: "600px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      // this.animal = result;
    });
  }
  openDialog5(templateRef2) {
    const dialogRef = this.dialog2.open(templateRef2, {
      width: "600px",
      height: "600px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      // this.animal = result;
    });
  }
  addColumnDialog2() {
    const newField = "Prix";
    this.myformArray.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    this.displayedHead.push(newField);
    this.dataSource = [...this.myformArray.controls];
    this.displayedFields.push(newField);
    this.displayedColumns = [...this.displayedFields, "delete"];
    this.dialog.closeAll();
  }
  addColumnDialog4() {
    const newField = "TrancheQF";
    this.myformArray.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    this.displayedHead.push(newField);
    this.dataSource = [...this.myformArray.controls];
    this.displayedFields.push(newField);
    this.displayedColumns = [...this.displayedFields, "delete"];
    this.dialog.closeAll();
  }
  addColumnDialog5() {
    const newField = "QF";
    this.myformArray.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    this.displayedHead.push(newField);
    this.dataSource = [...this.myformArray.controls];
    this.displayedFields.push(newField);
    this.displayedColumns = [...this.displayedFields, "delete"];

    this.dialog.closeAll();
  }
  addColumnDialog6() {
    const newField = "Prix_GM";
    this.myformArray.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    this.displayedHead.push(newField);
    this.dataSource = [...this.myformArray.controls];
    this.displayedFields.push(newField);
    this.displayedColumns = [...this.displayedFields, "delete"];
    this.dialog.closeAll();
  }
  addColumnDialog7() {
    const newField = "Prix_GS";
    this.myformArray.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    this.displayedHead.push(newField);
    this.dataSource = [...this.myformArray.controls];
    this.displayedFields.push(newField);
    this.displayedColumns = [...this.displayedFields, "delete"];
    this.dialog.closeAll();
  }
  addColumnDialog8() {
    const newField = "Prix_Cantine";
    this.myformArray.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    this.displayedHead.push(newField);
    this.dataSource = [...this.myformArray.controls];
    this.displayedFields.push(newField);
    this.displayedColumns = [...this.displayedFields, "delete"];
    this.dialog.closeAll();
  }
  addColumnDialog9() {
    const newField = "Accueil";
    this.myformArray.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    this.displayedHead.push(newField);
    this.dataSource = [...this.myformArray.controls];
    this.displayedFields.push(newField);
    this.displayedColumns = [...this.displayedFields, "delete"];
    this.dialog.closeAll();
  }
  verifInput() {
    if (
      this.preNom ||
      this.preNom2 ||
      this.preNom3 === ("Date de début" || "Date de fin")
    ) {
      this.FormDate = true;
    }
  }
  champsPlus() {
    this.champs++;
  }
  TabBDD() {
    if (this.nomTabl === undefined) {
      this.toastr.error("Merci de donner un nom à votre grille", "Erreur");
    } else {
      this.wut();
      //  this.getVal(this.age);
      this.db
        .collection("Tableau")
        .doc(this.nomTabl)
        .set({ Tableau: this.putain })
        .then((refbis) => (this.dis = true))
        // .then(ref => this.MergeDegri())
        .then((ref0) =>
          this.toastr.success(
            "Votre grille a été sauvegardé avec succès",
            "SUCCES"
          )
        )
        .then((ref1) => setTimeout((ref) => window.location.reload(), 3000));
    }
  }

  TabBDD2() {
    if (this.nomTabl === undefined) {
      this.toastr.error("Merci de donner un nom à votre grille", "Erreur");
    } else {
      this.wut2();
      //   console.log(this.putain2)
      //  this.getVal(this.age);
      this.db
        .collection("Tableau")
        .doc(this.nomTabl)
        .set({ Tableau: this.putain2 })
        .then((refbis) => (this.dis = true))
        // .then(ref => this.MergeDegri())
        .then((ref0) =>
          this.toastr.success(
            "Votre grille a été sauvegardé avec succès",
            "SUCCES"
          )
        )
        .then((ref1) => setTimeout((ref) => window.location.reload(), 3000));
    }
  }

  MergeDegri() {
    if (this.deg2 === "" || this.deg3 === "" || this.deg4 === "") {
      this.db
        .collection("Tableau")
        .doc(this.nomTabl)
        .update({ hasDegri: false });
      this.db
        .collection("Tableau")
        .doc(this.nomTabl)
        .update({ Age: this.selectAge });
    } else {
      this.db
        .collection("Tableau")
        .doc(this.nomTabl)
        .update({ Degri: this.degri });
      this.db
        .collection("Tableau")
        .doc(this.nomTabl)
        .update({ Age: this.selectAge });
    }
  }
  getDocNameBDD() {
    this.db
      .collection("Tableau")
      .get()
      .toPromise()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.results3.push(doc.id);
        });
      });
  }
  getTabBDD() {
    this.results2 = this.db
      .collection("Tableau")
      .doc("NOM DU TABLEAU")
      .valueChanges()
      .pipe(take(1));
  }
  openDialog6(templateRef2) {
    const dialogRef = this.dialog2.open(templateRef2, {
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      // this.animal = result;
    });
  }
  addRow(numberRow) {
    for (let i = 0; i < numberRow; i++) {
      this.add();
    }
    // var inputElement = <HTMLInputElement>document.getElementById('test');
    // inputElement[i].value

    this.dialog.closeAll();
  }

  addRow2(id) {
    this.add();
    for (let i = 0; i < 20; i++) {
      var inputElement = <HTMLInputElement>document.getElementById(id + i);
      if (id === "QF") {
        inputElement.value = "QF" + i;
      }
      if (id === "Prix") {
        inputElement.value = "0.00";
      } else if (inputElement === null) {
        inputElement.value = id + i;
      }
    }
  }

  // getVal(age) {
  //   this.selectAge = age;
  // }

  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["sign-in"]);
    });
  }

  getDeg() {
    if (this.deg2 || this.deg3 || this.deg4) {
      this.degri = {
        inscri2: this.deg2,
        inscri3: this.deg3,
        inscri4: this.deg4,
      };
    }
    this.dialog.closeAll();
  }

  ageverif() {
    if (this.age && this.age2) {
      this.selectAge = this.age
        .toString(10)
        .concat("-", this.age2.toString(10));
    }
  }

  inserQF() {
    for (let i = 0; i < 9; i++) {
      (<HTMLInputElement>document.getElementById("QF0")).setAttribute(
        "value",
        "QF1"
      );
      (<HTMLInputElement>document.getElementById("QF0")).value = "QF1";
      (<HTMLInputElement>document.getElementById("QF1")).value = "QF2";
      (<HTMLInputElement>document.getElementById("QF2")).value = "QF3";
      (<HTMLInputElement>document.getElementById("QF3")).value = "QF4";
      (<HTMLInputElement>document.getElementById("QF4")).value = "QF5";
      (<HTMLInputElement>document.getElementById("QF5")).value = "QF6";
      (<HTMLInputElement>document.getElementById("QF6")).value = "QF7";
      (<HTMLInputElement>document.getElementById("QF7")).value = "QF8";
      (<HTMLInputElement>document.getElementById("QF8")).value =
        "Hors-Tourcoing";
      (<HTMLInputElement>document.getElementById("TrancheQF0")).value = "0-369";
      (<HTMLInputElement>document.getElementById("TrancheQF1")).value =
        "370-499";
      (<HTMLInputElement>document.getElementById("TrancheQF2")).value =
        "500-700";
      (<HTMLInputElement>document.getElementById("TrancheQF3")).value =
        "701-800";
      (<HTMLInputElement>document.getElementById("TrancheQF4")).value =
        "801-1000";
      (<HTMLInputElement>document.getElementById("TrancheQF5")).value =
        "1001-1200";
      (<HTMLInputElement>document.getElementById("TrancheQF6")).value =
        "1201-1400";
      (<HTMLInputElement>document.getElementById("TrancheQF7")).value = ">1400";
      (<HTMLInputElement>document.getElementById("TrancheQF8")).value =
        "Hors-Tourcoing";
      (<HTMLInputElement>document.getElementById("Prix_GM" + i)).value = "0.00";
      (<HTMLInputElement>document.getElementById("Prix_GS" + i)).value = "0.00";
      (<HTMLInputElement>document.getElementById("Prix_Cantine" + i)).value =
        "0.00";
      (<HTMLInputElement>document.getElementById("Accueil" + i)).value = "0.00";

      if (this.flag) {
        (<HTMLInputElement>document.getElementById(this.flag + i)).value =
          "0.00";
      }
    }

    this.myformArray.value[0] = {
      QF: "QF1",
      TrancheQF: "0-369",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil: "0.00",
    };
    this.myformArray.value[1] = {
      QF: "QF2",
      TrancheQF: "370-499",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil: "0.00",
    };
    this.myformArray.value[2] = {
      QF: "QF3",
      TrancheQF: "500-700",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil: "0.00",
    };
    this.myformArray.value[3] = {
      QF: "QF4",
      TrancheQF: "701-800",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil: "0.00",
    };
    this.myformArray.value[4] = {
      QF: "QF5",
      TrancheQF: "801-1000",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil: "0.00",
    };
    this.myformArray.value[5] = {
      QF: "QF6",
      TrancheQF: "1001-1200",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil: "0.00",
    };
    this.myformArray.value[6] = {
      QF: "QF7",
      TrancheQF: "1201-1400",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil: "0.00",
    };
    this.myformArray.value[7] = {
      QF: "QF8",
      TrancheQF: ">1400",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil: "0.00",
    };
    this.myformArray.value[8] = {
      QF: "QF9",
      TrancheQF: "Hors-Tourcoing",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil: "0.00",
    };
  }

  inserQF2() {
    for (let i = 0; i < 9; i++) {
      (<HTMLInputElement>document.getElementById("QF0")).setAttribute(
        "value",
        "QF1"
      );
      (<HTMLInputElement>document.getElementById("QF0")).value = "QF1";
      (<HTMLInputElement>document.getElementById("QF1")).value = "QF2";
      (<HTMLInputElement>document.getElementById("QF2")).value = "QF3";
      (<HTMLInputElement>document.getElementById("QF3")).value = "QF4";
      (<HTMLInputElement>document.getElementById("QF4")).value = "QF5";
      (<HTMLInputElement>document.getElementById("QF5")).value = "QF6";
      (<HTMLInputElement>document.getElementById("QF6")).value = "QF7";
      (<HTMLInputElement>document.getElementById("QF7")).value = "QF8";
      (<HTMLInputElement>document.getElementById("QF8")).value =
        "Hors-Tourcoing";
      (<HTMLInputElement>document.getElementById("TrancheQF0")).value = "0-369";
      (<HTMLInputElement>document.getElementById("TrancheQF1")).value =
        "370-499";
      (<HTMLInputElement>document.getElementById("TrancheQF2")).value =
        "500-700";
      (<HTMLInputElement>document.getElementById("TrancheQF3")).value =
        "701-800";
      (<HTMLInputElement>document.getElementById("TrancheQF4")).value =
        "801-1000";
      (<HTMLInputElement>document.getElementById("TrancheQF5")).value =
        "1001-1200";
      (<HTMLInputElement>document.getElementById("TrancheQF6")).value =
        "1201-1400";
      (<HTMLInputElement>document.getElementById("TrancheQF7")).value = ">1400";
      (<HTMLInputElement>document.getElementById("TrancheQF8")).value =
        "Hors-Tourcoing";
      (<HTMLInputElement>document.getElementById("Prix_GM" + i)).value = "0.00";
      (<HTMLInputElement>document.getElementById("Prix_GS" + i)).value = "0.00";
      (<HTMLInputElement>document.getElementById("Prix_Cantine" + i)).value =
        "0.00";
      (<HTMLInputElement>document.getElementById("Accueil_Matin" + i)).value =
        "0.00";
      (<HTMLInputElement>document.getElementById("Accueil_AM" + i)).value =
        "0.00";
    }
    this.myformArray2.value[0] = {
      QF: "QF1",
      TrancheQF: "0-369",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil_Matin: "0.00",
      Accueil_AM: "0.00",
    };
    this.myformArray2.value[1] = {
      QF: "QF2",
      TrancheQF: "370-499",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil_Matin: "0.00",
      Accueil_AM: "0.00",
    };
    this.myformArray2.value[2] = {
      QF: "QF3",
      TrancheQF: "500-700",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil_Matin: "0.00",
      Accueil_AM: "0.00",
    };
    this.myformArray2.value[3] = {
      QF: "QF4",
      TrancheQF: "701-800",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil_Matin: "0.00",
      Accueil_AM: "0.00",
    };
    this.myformArray2.value[4] = {
      QF: "QF5",
      TrancheQF: "801-1000",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil_Matin: "0.00",
      Accueil_AM: "0.00",
    };
    this.myformArray2.value[5] = {
      QF: "QF6",
      TrancheQF: "1001-1200",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil_Matin: "0.00",
      Accueil_AM: "0.00",
    };
    this.myformArray2.value[6] = {
      QF: "QF7",
      TrancheQF: "1201-1400",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil_Matin: "0.00",
      Accueil_AM: "0.00",
    };
    this.myformArray2.value[7] = {
      QF: "QF8",
      TrancheQF: ">1400",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil_Matin: "0.00",
      Accueil_AM: "0.00",
    };
    this.myformArray2.value[8] = {
      QF: "QF9",
      TrancheQF: "Hors-Tourcoing",
      Prix_GM: "0.00",
      Prix_GS: "0.00",
      Prix_Cantine: "0.00",
      Accueil_Matin: "0.00",
      Accueil_AM: "0.00",
    };
  }

  addQF2() {
    (<HTMLInputElement>document.getElementById("QF1")).value = "QF2";
    (<HTMLInputElement>document.getElementById("TrancheQF1")).value = "370-499";

    console.log(this.myformArray);
  }

  tabQF = [];

  getQF() {
    this.db
      .collection("QF")
      .doc("hx87ersLKOGdmOZpt9y3")
      .get()
      .toPromise()
      .then((doc) => this.tabQF.push(doc.data()));
  }

  wut() {
    let truc;
    let bordel;
    let chier;
    let truc2;
    let bordel2;
    let chier2;
    let truc3;
    let bordel3;
    let chier3;
    let truc4;
    let bordel4;
    let chier4;
    let truc5;
    let bordel5;
    let chier5;
    let truc6;
    let bordel6;
    let chier6;
    let truc7;
    let bordel7;
    let chier7;
    let truc8;
    let bordel8;
    let chier8;
    let truc9;
    let bordel9;
    let chier9;
    let truc10;
    let pute;
    let conne;
    let truc11;
    let pute2;
    let conne2;
    let truc12;
    let pute3;
    let conne3;
    let truc13;
    let pute4;
    let conne4;
    let truc14;
    let pute5;
    let conne5;
    let truc15;
    let pute6;
    let conne6;
    let truc16;
    let pute7;
    let conne7;
    let truc17;
    let pute8;
    let conne8;
    let truc18;
    let pute9;
    let conne9;

    let merde;
    let merde2;
    let merde3;
    let merde4;
    let merde5;
    let merde6;
    let merde7;
    let merde8;
    let merde9;

    truc = (<HTMLInputElement>document.getElementById("QF0")).value;
    truc2 = (<HTMLInputElement>document.getElementById("TrancheQF0")).value;
    bordel = (<HTMLInputElement>document.getElementById("Prix_GM0")).value;
    pute = (<HTMLInputElement>document.getElementById("Prix_GS0")).value;
    chier = (<HTMLInputElement>document.getElementById("Prix_Cantine0")).value;
    conne = (<HTMLInputElement>document.getElementById("Accueil0")).value;

    truc3 = (<HTMLInputElement>document.getElementById("QF1")).value;
    truc4 = (<HTMLInputElement>document.getElementById("TrancheQF1")).value;
    bordel2 = (<HTMLInputElement>document.getElementById("Prix_GM1")).value;
    pute2 = (<HTMLInputElement>document.getElementById("Prix_GS1")).value;
    chier2 = (<HTMLInputElement>document.getElementById("Prix_Cantine1")).value;
    conne2 = (<HTMLInputElement>document.getElementById("Accueil1")).value;

    truc5 = (<HTMLInputElement>document.getElementById("QF2")).value;
    truc6 = (<HTMLInputElement>document.getElementById("TrancheQF2")).value;
    bordel3 = (<HTMLInputElement>document.getElementById("Prix_GM2")).value;
    pute3 = (<HTMLInputElement>document.getElementById("Prix_GS2")).value;
    chier3 = (<HTMLInputElement>document.getElementById("Prix_Cantine2")).value;
    conne3 = (<HTMLInputElement>document.getElementById("Accueil2")).value;

    truc7 = (<HTMLInputElement>document.getElementById("QF3")).value;
    truc8 = (<HTMLInputElement>document.getElementById("TrancheQF3")).value;
    bordel4 = (<HTMLInputElement>document.getElementById("Prix_GM3")).value;
    pute4 = (<HTMLInputElement>document.getElementById("Prix_GS3")).value;
    chier4 = (<HTMLInputElement>document.getElementById("Prix_Cantine3")).value;
    conne4 = (<HTMLInputElement>document.getElementById("Accueil3")).value;

    truc9 = (<HTMLInputElement>document.getElementById("QF4")).value;
    truc10 = (<HTMLInputElement>document.getElementById("TrancheQF4")).value;
    bordel5 = (<HTMLInputElement>document.getElementById("Prix_GM4")).value;
    pute5 = (<HTMLInputElement>document.getElementById("Prix_GS4")).value;
    chier5 = (<HTMLInputElement>document.getElementById("Prix_Cantine4")).value;
    conne5 = (<HTMLInputElement>document.getElementById("Accueil4")).value;

    truc11 = (<HTMLInputElement>document.getElementById("QF5")).value;
    truc12 = (<HTMLInputElement>document.getElementById("TrancheQF5")).value;
    bordel6 = (<HTMLInputElement>document.getElementById("Prix_GM5")).value;
    pute6 = (<HTMLInputElement>document.getElementById("Prix_GS5")).value;
    chier6 = (<HTMLInputElement>document.getElementById("Prix_Cantine5")).value;
    conne6 = (<HTMLInputElement>document.getElementById("Accueil5")).value;

    truc13 = (<HTMLInputElement>document.getElementById("QF6")).value;
    truc14 = (<HTMLInputElement>document.getElementById("TrancheQF6")).value;
    bordel7 = (<HTMLInputElement>document.getElementById("Prix_GM6")).value;
    pute7 = (<HTMLInputElement>document.getElementById("Prix_GS6")).value;
    chier7 = (<HTMLInputElement>document.getElementById("Prix_Cantine6")).value;
    conne7 = (<HTMLInputElement>document.getElementById("Accueil6")).value;

    truc15 = (<HTMLInputElement>document.getElementById("QF7")).value;
    truc16 = (<HTMLInputElement>document.getElementById("TrancheQF7")).value;
    bordel8 = (<HTMLInputElement>document.getElementById("Prix_GM7")).value;
    pute8 = (<HTMLInputElement>document.getElementById("Prix_GS7")).value;
    chier8 = (<HTMLInputElement>document.getElementById("Prix_Cantine7")).value;
    conne8 = (<HTMLInputElement>document.getElementById("Accueil7")).value;

    truc17 = (<HTMLInputElement>document.getElementById("QF8")).value;
    truc18 = (<HTMLInputElement>document.getElementById("TrancheQF8")).value;
    bordel9 = (<HTMLInputElement>document.getElementById("Prix_GM8")).value;
    pute9 = (<HTMLInputElement>document.getElementById("Prix_GS8")).value;
    chier9 = (<HTMLInputElement>document.getElementById("Prix_Cantine8")).value;
    conne9 = (<HTMLInputElement>document.getElementById("Accueil8")).value;

    if (this.flag) {
      merde = (<HTMLInputElement>document.getElementById(this.flag + "0"))
        .value;
      merde2 = (<HTMLInputElement>document.getElementById(this.flag + "1"))
        .value;
      merde3 = (<HTMLInputElement>document.getElementById(this.flag + "2"))
        .value;
      merde4 = (<HTMLInputElement>document.getElementById(this.flag + "3"))
        .value;
      merde5 = (<HTMLInputElement>document.getElementById(this.flag + "4"))
        .value;
      merde6 = (<HTMLInputElement>document.getElementById(this.flag + "5"))
        .value;
      merde7 = (<HTMLInputElement>document.getElementById(this.flag + "6"))
        .value;
      merde8 = (<HTMLInputElement>document.getElementById(this.flag + "7"))
        .value;
      merde9 = (<HTMLInputElement>document.getElementById(this.flag + "8"))
        .value;

      console.log(merde);

      this.putain = [
        {
          QF: truc,
          TrancheQF: truc2,
          Prix_GM: bordel,
          Prix_GS: pute,
          Prix_Cantine: chier,
          Accueil: conne,
          [this.flag]: merde,
          id: "0",
        },
        {
          QF: truc3,
          TrancheQF: truc4,
          Prix_GM: bordel2,
          Prix_GS: pute2,
          Prix_Cantine: chier2,
          Accueil: conne2,
          [this.flag]: merde2,
          id: "1",
        },
        {
          QF: truc5,
          TrancheQF: truc6,
          Prix_GM: bordel3,
          Prix_GS: pute3,
          Prix_Cantine: chier3,
          Accueil: conne3,
          [this.flag]: merde3,
          id: "2",
        },
        {
          QF: truc7,
          TrancheQF: truc8,
          Prix_GM: bordel4,
          Prix_GS: pute4,
          Prix_Cantine: chier4,
          Accueil: conne4,
          [this.flag]: merde4,
          id: "3",
        },
        {
          QF: truc9,
          TrancheQF: truc10,
          Prix_GM: bordel5,
          Prix_GS: pute5,
          Prix_Cantine: chier5,
          Accueil: conne5,
          [this.flag]: merde5,
          id: "4",
        },
        {
          QF: truc11,
          TrancheQF: truc12,
          Prix_GM: bordel6,
          Prix_GS: pute6,
          Prix_Cantine: chier6,
          Accueil: conne6,
          [this.flag]: merde6,
          id: "5",
        },
        {
          QF: truc13,
          TrancheQF: truc14,
          Prix_GM: bordel7,
          Prix_GS: pute7,
          Prix_Cantine: chier7,
          Accueil: conne7,
          [this.flag]: merde7,
          id: "6",
        },
        {
          QF: truc15,
          TrancheQF: truc16,
          Prix_GM: bordel8,
          Prix_GS: pute8,
          Prix_Cantine: chier8,
          Accueil: conne8,
          [this.flag]: merde8,
          id: "7",
        },
        {
          QF: truc17,
          TrancheQF: truc18,
          Prix_GM: bordel9,
          Prix_GS: pute9,
          Prix_Cantine: chier9,
          Accueil: conne9,
          [this.flag]: merde9,
          id: "8",
        },
      ];
    } else {
      this.putain = [
        {
          QF: truc,
          TrancheQF: truc2,
          Prix_GM: bordel,
          Prix_GS: pute,
          Prix_Cantine: chier,
          Accueil: conne,
          id: "0",
        },
        {
          QF: truc3,
          TrancheQF: truc4,
          Prix_GM: bordel2,
          Prix_GS: pute2,
          Prix_Cantine: chier2,
          Accueil: conne2,
          id: "1",
        },
        {
          QF: truc5,
          TrancheQF: truc6,
          Prix_GM: bordel3,
          Prix_GS: pute3,
          Prix_Cantine: chier3,
          Accueil: conne3,
          id: "2",
        },
        {
          QF: truc7,
          TrancheQF: truc8,
          Prix_GM: bordel4,
          Prix_GS: pute4,
          Prix_Cantine: chier4,
          Accueil: conne4,
          id: "3",
        },
        {
          QF: truc9,
          TrancheQF: truc10,
          Prix_GM: bordel5,
          Prix_GS: pute5,
          Prix_Cantine: chier5,
          Accueil: conne5,
          id: "4",
        },
        {
          QF: truc11,
          TrancheQF: truc12,
          Prix_GM: bordel6,
          Prix_GS: pute6,
          Prix_Cantine: chier6,
          Accueil: conne6,
          id: "5",
        },
        {
          QF: truc13,
          TrancheQF: truc14,
          Prix_GM: bordel7,
          Prix_GS: pute7,
          Prix_Cantine: chier7,
          Accueil: conne7,
          id: "6",
        },
        {
          QF: truc15,
          TrancheQF: truc16,
          Prix_GM: bordel8,
          Prix_GS: pute8,
          Prix_Cantine: chier8,
          Accueil: conne8,
          id: "7",
        },
        {
          QF: truc17,
          TrancheQF: truc18,
          Prix_GM: bordel9,
          Prix_GS: pute9,
          Prix_Cantine: chier9,
          Accueil: conne9,
          id: "8",
        },
      ];
    }
  }

  wut2() {
    let truc;
    let bordel;
    let chier;
    let chiant;
    let truc2;
    let bordel2;
    let chier2;
    let chiant2;
    let truc3;
    let bordel3;
    let chier3;
    let chiant3;
    let truc4;
    let bordel4;
    let chier4;
    let chiant4;
    let truc5;
    let bordel5;
    let chier5;
    let chiant5;
    let truc6;
    let bordel6;
    let chier6;
    let chiant6;
    let truc7;
    let bordel7;
    let chier7;
    let chiant7;
    let truc8;
    let bordel8;
    let chier8;
    let chiant8;
    let truc9;
    let bordel9;
    let chier9;
    let chiant9;
    let truc10;
    let pute;
    let conne;
    let truc11;
    let pute2;
    let conne2;
    let truc12;
    let pute3;
    let conne3;
    let truc13;
    let pute4;
    let conne4;
    let truc14;
    let pute5;
    let conne5;
    let truc15;
    let pute6;
    let conne6;
    let truc16;
    let pute7;
    let conne7;
    let truc17;
    let pute8;
    let conne8;
    let truc18;
    let pute9;
    let conne9;

    truc = (<HTMLInputElement>document.getElementById("QF0")).value;
    truc2 = (<HTMLInputElement>document.getElementById("TrancheQF0")).value;
    bordel = (<HTMLInputElement>document.getElementById("Prix_GM0")).value;
    pute = (<HTMLInputElement>document.getElementById("Prix_GS0")).value;
    chier = (<HTMLInputElement>document.getElementById("Prix_Cantine0")).value;
    conne = (<HTMLInputElement>document.getElementById("Accueil_Matin0")).value;
    chiant = (<HTMLInputElement>document.getElementById("Accueil_AM0")).value;

    truc3 = (<HTMLInputElement>document.getElementById("QF1")).value;
    truc4 = (<HTMLInputElement>document.getElementById("TrancheQF1")).value;
    bordel2 = (<HTMLInputElement>document.getElementById("Prix_GM1")).value;
    pute2 = (<HTMLInputElement>document.getElementById("Prix_GS1")).value;
    chier2 = (<HTMLInputElement>document.getElementById("Prix_Cantine1")).value;
    conne2 = (<HTMLInputElement>document.getElementById("Accueil_Matin1"))
      .value;
    chiant2 = (<HTMLInputElement>document.getElementById("Accueil_AM1")).value;

    truc5 = (<HTMLInputElement>document.getElementById("QF2")).value;
    truc6 = (<HTMLInputElement>document.getElementById("TrancheQF2")).value;
    bordel3 = (<HTMLInputElement>document.getElementById("Prix_GM2")).value;
    pute3 = (<HTMLInputElement>document.getElementById("Prix_GS2")).value;
    chier3 = (<HTMLInputElement>document.getElementById("Prix_Cantine2")).value;
    conne3 = (<HTMLInputElement>document.getElementById("Accueil_Matin2"))
      .value;
    chiant3 = (<HTMLInputElement>document.getElementById("Accueil_AM2")).value;

    truc7 = (<HTMLInputElement>document.getElementById("QF3")).value;
    truc8 = (<HTMLInputElement>document.getElementById("TrancheQF3")).value;
    bordel4 = (<HTMLInputElement>document.getElementById("Prix_GM3")).value;
    pute4 = (<HTMLInputElement>document.getElementById("Prix_GS3")).value;
    chier4 = (<HTMLInputElement>document.getElementById("Prix_Cantine3")).value;
    conne4 = (<HTMLInputElement>document.getElementById("Accueil_Matin3"))
      .value;
    chiant4 = (<HTMLInputElement>document.getElementById("Accueil_AM3")).value;

    truc9 = (<HTMLInputElement>document.getElementById("QF4")).value;
    truc10 = (<HTMLInputElement>document.getElementById("TrancheQF4")).value;
    bordel5 = (<HTMLInputElement>document.getElementById("Prix_GM4")).value;
    pute5 = (<HTMLInputElement>document.getElementById("Prix_GS4")).value;
    chier5 = (<HTMLInputElement>document.getElementById("Prix_Cantine4")).value;
    conne5 = (<HTMLInputElement>document.getElementById("Accueil_Matin4"))
      .value;
    chiant5 = (<HTMLInputElement>document.getElementById("Accueil_AM4")).value;

    truc11 = (<HTMLInputElement>document.getElementById("QF5")).value;
    truc12 = (<HTMLInputElement>document.getElementById("TrancheQF5")).value;
    bordel6 = (<HTMLInputElement>document.getElementById("Prix_GM5")).value;
    pute6 = (<HTMLInputElement>document.getElementById("Prix_GS5")).value;
    chier6 = (<HTMLInputElement>document.getElementById("Prix_Cantine5")).value;
    conne6 = (<HTMLInputElement>document.getElementById("Accueil_Matin5"))
      .value;
    chiant6 = (<HTMLInputElement>document.getElementById("Accueil_AM5")).value;

    truc13 = (<HTMLInputElement>document.getElementById("QF6")).value;
    truc14 = (<HTMLInputElement>document.getElementById("TrancheQF6")).value;
    bordel7 = (<HTMLInputElement>document.getElementById("Prix_GM6")).value;
    pute7 = (<HTMLInputElement>document.getElementById("Prix_GS6")).value;
    chier7 = (<HTMLInputElement>document.getElementById("Prix_Cantine6")).value;
    conne7 = (<HTMLInputElement>document.getElementById("Accueil_Matin6"))
      .value;
    chiant7 = (<HTMLInputElement>document.getElementById("Accueil_AM6")).value;

    truc15 = (<HTMLInputElement>document.getElementById("QF7")).value;
    truc16 = (<HTMLInputElement>document.getElementById("TrancheQF7")).value;
    bordel8 = (<HTMLInputElement>document.getElementById("Prix_GM7")).value;
    pute8 = (<HTMLInputElement>document.getElementById("Prix_GS7")).value;
    chier8 = (<HTMLInputElement>document.getElementById("Prix_Cantine7")).value;
    conne8 = (<HTMLInputElement>document.getElementById("Accueil_Matin7"))
      .value;
    chiant8 = (<HTMLInputElement>document.getElementById("Accueil_AM7")).value;

    truc17 = (<HTMLInputElement>document.getElementById("QF8")).value;
    truc18 = (<HTMLInputElement>document.getElementById("TrancheQF8")).value;
    bordel9 = (<HTMLInputElement>document.getElementById("Prix_GM8")).value;
    pute9 = (<HTMLInputElement>document.getElementById("Prix_GS8")).value;
    chier9 = (<HTMLInputElement>document.getElementById("Prix_Cantine8")).value;
    conne9 = (<HTMLInputElement>document.getElementById("Accueil_Matin8"))
      .value;
    chiant9 = (<HTMLInputElement>document.getElementById("Accueil_AM8")).value;

    this.putain2 = [
      {
        QF: truc,
        TrancheQF: truc2,
        Prix_GM: bordel,
        Prix_GS: pute,
        Prix_Cantine: chier,
        Accueil_Matin: conne,
        Accueil_AM: chiant,
        id: "0",
      },
      {
        QF: truc3,
        TrancheQF: truc4,
        Prix_GM: bordel2,
        Prix_GS: pute2,
        Prix_Cantine: chier2,
        Accueil_Matin: conne2,
        Accueil_AM: chiant2,
        id: "1",
      },
      {
        QF: truc5,
        TrancheQF: truc6,
        Prix_GM: bordel3,
        Prix_GS: pute3,
        Prix_Cantine: chier3,
        Accueil_Matin: conne3,
        Accueil_AM: chiant3,
        id: "2",
      },
      {
        QF: truc7,
        TrancheQF: truc8,
        Prix_GM: bordel4,
        Prix_GS: pute4,
        Prix_Cantine: chier4,
        Accueil_Matin: conne4,
        Accueil_AM: chiant4,
        id: "3",
      },
      {
        QF: truc9,
        TrancheQF: truc10,
        Prix_GM: bordel5,
        Prix_GS: pute5,
        Prix_Cantine: chier5,
        Accueil_Matin: conne5,
        Accueil_AM: chiant5,
        id: "4",
      },
      {
        QF: truc11,
        TrancheQF: truc12,
        Prix_GM: bordel6,
        Prix_GS: pute6,
        Prix_Cantine: chier6,
        Accueil_Matin: conne6,
        Accueil_AM: chiant6,
        id: "5",
      },
      {
        QF: truc13,
        TrancheQF: truc14,
        Prix_GM: bordel7,
        Prix_GS: pute7,
        Prix_Cantine: chier7,
        Accueil_Matin: conne7,
        Accueil_AM: chiant7,
        id: "6",
      },
      {
        QF: truc15,
        TrancheQF: truc16,
        Prix_GM: bordel8,
        Prix_GS: pute8,
        Prix_Cantine: chier8,
        Accueil_Matin: conne8,
        Accueil_AM: chiant8,
        id: "7",
      },
      {
        QF: truc17,
        TrancheQF: truc18,
        Prix_GM: bordel9,
        Prix_GS: pute9,
        Prix_Cantine: chier9,
        Accueil_Matin: conne9,
        Accueil_AM: chiant9,
        id: "8",
      },
    ];
  }

  displayedColumns2: string[] = [];
  displayedHead2: string[] = [];
  displayedFields2: string[] = [];
  myformArray2 = new FormArray([]);
  dataSource2 = this.myformArray.controls;
  columns2: number;

  addnew() {
    const newGroup = new FormGroup({});
    this.displayedFields2.forEach((x) => {
      newGroup.addControl(x, new FormControl());
    });
    this.myformArray2.push(newGroup);
    this.dataSource2 = [...this.myformArray2.controls];
  }

  addColumnDialognew() {
    const newField = "Column" + (this.displayedFields2.length + 1);
    this.myformArray2.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    this.displayedHead2.push(newField);
    this.dataSource2 = [...this.myformArray2.controls];
    this.displayedFields2.push(newField);
    this.displayedColumns2 = [...this.displayedFields2, "delete"];
    // VERIF DUPLICATE COL
  }

  addColumnDialog4new() {
    const newField = "TrancheQF";
    this.myformArray2.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    this.displayedHead2.push(newField);
    this.dataSource2 = [...this.myformArray2.controls];
    this.displayedFields2.push(newField);
    this.displayedColumns2 = [...this.displayedFields2, "delete"];
    this.dialog.closeAll();
  }
  addColumnDialog5new() {
    const newField = "QF";
    this.myformArray2.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    this.displayedHead2.push(newField);
    this.dataSource2 = [...this.myformArray2.controls];
    this.displayedFields2.push(newField);
    this.displayedColumns2 = [...this.displayedFields2, "delete"];

    this.dialog.closeAll();
  }
  addColumnDialog6new() {
    const newField = "Prix_GM";
    this.myformArray2.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    this.displayedHead2.push(newField);
    this.dataSource2 = [...this.myformArray2.controls];
    this.displayedFields2.push(newField);
    this.displayedColumns2 = [...this.displayedFields2, "delete"];
    this.dialog.closeAll();
  }
  addColumnDialog7new() {
    const newField = "Prix_GS";
    this.myformArray2.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    this.displayedHead2.push(newField);
    this.dataSource2 = [...this.myformArray2.controls];
    this.displayedFields2.push(newField);
    this.displayedColumns2 = [...this.displayedFields2, "delete"];
    this.dialog.closeAll();
  }
  addColumnDialog8new() {
    const newField = "Prix_Cantine";
    this.myformArray2.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    this.displayedHead2.push(newField);
    this.dataSource2 = [...this.myformArray2.controls];
    this.displayedFields2.push(newField);
    this.displayedColumns2 = [...this.displayedFields2, "delete"];
    this.dialog.closeAll();
  }
  addColumnDialog9new() {
    const newField = "Accueil_Matin";
    this.myformArray2.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    this.displayedHead2.push(newField);
    this.dataSource2 = [...this.myformArray2.controls];
    this.displayedFields2.push(newField);
    this.displayedColumns2 = [...this.displayedFields2, "delete"];
    this.dialog.closeAll();
  }
  addColumnDialog10new() {
    const newField = "Accueil_AM";
    this.myformArray2.controls.forEach((group: FormGroup) => {
      group.addControl(newField, new FormControl());
    });
    this.displayedHead2.push(newField);
    this.dataSource2 = [...this.myformArray2.controls];
    this.displayedFields2.push(newField);
    this.displayedColumns2 = [...this.displayedFields2, "delete"];
    this.dialog.closeAll();
  }
}
