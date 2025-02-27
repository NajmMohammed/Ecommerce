import { Component, inject, OnInit } from '@angular/core';
import { CatandbrandsService } from '../../core/services/catandbrands/catandbrands.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Ibrands } from '../../shared/interfaces/ibrands';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
private readonly CatandbrandsService = inject(CatandbrandsService);
private readonly ngxSpinnerService = inject(NgxSpinnerService);

brands:Ibrands[]=[];
brandsSingle:Ibrands={} as Ibrands;
getAllBrands():void{
  this.ngxSpinnerService.show()
  this.CatandbrandsService.getAllBrands().subscribe({
    
    next:(res)=>{
      console.log(res)

      this.brands = res.data
      this.ngxSpinnerService.hide();
    },
    error:(err)=>{
      console.log(err)
    }
  })


}
getBrandId(id:string):void{
this.CatandbrandsService.getSpecificBrand(id).subscribe({
  next:(res)=>{
    console.log(res)
    this.brandsSingle = res.data
  },
  error:(err)=>{
    console.log(err)
  }
})

}




ngOnInit(): void {
  this.getAllBrands()
}
}
