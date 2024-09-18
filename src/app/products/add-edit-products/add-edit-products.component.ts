import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductsServiceService } from '../../products-service.service';
import { MessageService } from 'primeng/api';
import { Products } from '../../products';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrl: './add-edit-products.component.scss'
})
export class AddEditProductsComponent {

  @Input() displayAddModal : boolean =true;
  @Output() closeClick : EventEmitter<boolean> = new EventEmitter<boolean> ();
  @Output() addClick : EventEmitter<any> = new EventEmitter<any>();
  @Input() selectedProduct : any =null;
  modalType = "Add";

  prodForm = this.fb.group({
    title : ["",Validators.required],
    price:[0,Validators.required],
    description:[""],
    category:["",Validators.required],
    image:["",Validators.required]
  });

  constructor(private fb : FormBuilder,
    private prodService : ProductsServiceService,
    private msgService : MessageService
  ){

  }

  ngOnChanges(): void{
    if(this.selectedProduct){
      this.modalType="Edit";
      this.prodForm.patchValue(this.selectedProduct);
    }else{
      this.prodForm.reset();
      this.modalType="Add";
    }
  }


  closeDailog(){
    this.prodForm.reset();
    this.closeClick.emit(true);
  }

  addEditProduct(){
    this.prodService.addEditProd(this.prodForm.value,this.selectedProduct).subscribe(
      resp =>{
        this.addClick.emit(resp);
        this.closeDailog();
        const msg= this.modalType === 'Add' ? 'Product Added' : 'Product Updated';
        this.msgService.add({severity:"success",summary:"Sucess",detail: msg});
      },
      error=>{
        this.msgService.add({severity:"error",summary:"Sucess",detail: error });
        console.log('Errror occured');
      }
    )

  }

}
