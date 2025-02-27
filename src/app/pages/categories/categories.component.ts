import { Component, OnInit, inject } from '@angular/core';
import { CatandbrandsService } from '../../core/services/catandbrands/catandbrands.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { NgFor } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  imports: [NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
private readonly catandbrandsService = inject(CatandbrandsService)
private readonly ngxSpinnerService = inject(NgxSpinnerService)

categoryDetails:ICategory[] = []
subcategoryDetails:ICategory[] = []
getCats():void{
  this.ngxSpinnerService.show()

this.catandbrandsService.getAllCats().subscribe({
  next:(res)=>{
    console.log(res)
    this.categoryDetails = res.data
    this.ngxSpinnerService.hide()

  },
  error:(err)=>{
    console.log(err)
  }
})
}

getSubCat(id:string):void{
  this.ngxSpinnerService.show()

  this.catandbrandsService.getSpecificCat(id).subscribe({
    next:(res)=>{
      console.log(res)
      this.subcategoryDetails = res.data
      this.ngxSpinnerService.hide()

    },
    error:(err)=>{
      console.log(err)
    }
  })
}
ngOnInit(): void {
  this.getCats()
}
}
