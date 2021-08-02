import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { RestCategoryService } from 'src/app/services/restCategory/rest-category.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

export interface DialogData {
  name: string;
  description: string;
  id: string;
  image: string;
  role: String;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  categories:[];
  user;


  constructor(public dialog: MatDialog, private restCategory: RestCategoryService, private restUser:RestUserService) { }

  ngOnInit(): void {

    this.restCategory.getCategories().subscribe((res:any)=>{
      if(res.categories){
        this.categories = res.categories;
      }else{
        alert(res.message)
      }
    })
  }

  openSaveCategory(): void {
    const dialogRef = this.dialog.open(CategorySaveComponent, {
      height: '290px',
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  
  openUpdate(category): void {
    const dialogRef = this.dialog.open(CategoryUpdateComponent, {
      height: '290px',
      width: '500px',
      data: {name: category.name, id: category._id , description: category.description}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  

  openDelete(category): void {
    const dialogRef = this.dialog.open(CategoryDeleteComponent, {
      height: '280px',
      width: '250px',
      data: {id: category._id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}

@Component({
  selector: 'app-category-delete',
  templateUrl: './category.delete.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CategoryDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private restCategory: RestCategoryService, public snackBar: MatSnackBar,){}
    
  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  deleteCat(){
    this.restCategory.removeCategory(this.data.id).subscribe((res:any)=>{
      if(res.categoryPull){
        this.snackBar.open('categoria eliminada', 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-accent']
        });

        this.onNoClick();
      }else{

      }
    })
  }
}


@Component({
  selector: 'app-category-save',
  templateUrl: 'category.save.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategorySaveComponent implements OnInit {

  public category: Category;

  constructor(public dialogRef: MatDialogRef<CategorySaveComponent>,
  private restCategory: RestCategoryService, public snackBar: MatSnackBar,
  private storage: AngularFireStorage) {
    this.category = new Category('','','',null)
  }

  ngOnInit() { }


  onSubmit(saveCategory){
    if(this.category.image == null){
      this.snackBar.open('coloque una imagen', 'cerrar', {
        duration: 2000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }else if(this.category.name == ''){
      this.snackBar.open('Agregue un nombre', 'cerrar', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['mat-toolbar', 'mat-warn']
      });

    }else{
      this.restCategory.saveCategory(this.category).subscribe((res:any)=>{
        if(res.categorySaved){
          this.snackBar.open(res.message, 'cerrar', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', 'mat-accent']
          });
          this.dialogRef.close();
        }else{
          alert(res.message)
        }
      })
    }
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private image: any;
  private filePath: any;
  color: ThemePalette = 'warn';
  public cargador = 0;

  handleImage(event:any){
    this.image = event.target.files[0]
    this.cargador = 1;

    this.filePath = `images/${this.image.name}`
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, this.image)
    return task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe( urlImage => { 
          this.category.image = urlImage
          this.cargador = 2;
        })
      })
    ).subscribe();
  }
}


@Component({
  selector: 'app-categoryupdate',
  template:`Message from parent:`,
  templateUrl: './category.update.component.html',
  styleUrls: ['./category.component.scss'],
  animations: []
})
export class CategoryUpdateComponent implements OnInit {

  category:[];
  user;
  
  constructor(public dialogRef: MatDialogRef<CategoryUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private restUser:RestUserService, private restCategory:RestCategoryService, 
    public snackBar: MatSnackBar, private storage: AngularFireStorage){}


  ngOnInit(): void {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  updateCategory(){
    this.restCategory.updateCategory(this.data.id, this.data).subscribe((res:any)=>{
      if(res.updateCategory){
        this.snackBar.open(res.message, 'cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-accent']
        });
        this.onNoClick();
      }
    })
  }

  private image: any;
  private filePath: any;
  color: ThemePalette = 'warn';
  public cargador = 0;

  handleImage(event:any){
    this.image = event.target.files[0]
    this.cargador = 1;

    this.filePath = `images/${this.image.name}`
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, this.image)
    return task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe( urlImage => { 
          this.data.image = urlImage;
          this.cargador = 2;
        })
      })
    ).subscribe();
  }

}
