import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Products } from '../products';
import { ProductsServiceService } from '../products-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  // @Input() prod?: Products;
  // @Output() prodsUpdated = new EventEmitter<Products[]>();
  products : Products[] = [];
  displayModal : boolean = false;
  selectedProduct : any = null;

  constructor(private prodservice: ProductsServiceService,
    private msgService : MessageService,
    private confirmMsg : ConfirmationService) {}

  ngOnInit(): void {
    this.prodservice.getAllProducts().subscribe(
      (response:Products[]) => {
        this.products =response;
      }
     );
  }

  showAddModal(){
    this.displayModal=true;
  }

  hideAddModal(event : boolean){
  this.displayModal = !event;
  }

  saveProductToList(newData: any) {
    if(this.selectedProduct && newData.id === this.selectedProduct.id)
    {
      const productIndex = this.products.findIndex(data => data.id === newData.id);
      this.products[productIndex] = newData;
    }else{
      this.products.unshift(newData);
    }
    
  }

  showEditModal(prod : Products){
   this.displayModal = true;
   this.selectedProduct=prod;
  }

  deleteProduct(prod : Products){
    this.confirmMsg.confirm({
     message: 'Are you sure that you want to delete this product?',
     accept : () =>{
      this.prodservice.deleteProduct(prod).subscribe(
        res =>{
          this.products = this.products.filter(data => data.id != prod.id);
          this.msgService.add({severity:"success",summary:"Success",detail: "Product deleted Successfully" });
        },
        error=>{
          this.msgService.add({severity:"error",summary:"Error",detail: error });
          console.log('Errror occured');
        }
       );
     }
    });
   
  }

  // updateProducts(prod: Products) {
  //   this.prodservice
  //     .updateProduct(prod)
  //     .subscribe((prods: Products[]) => this.prodsUpdated.emit(prods));
  // }

  // deleteProduct(prod: Products) {
  //   this.prodservice
  //     .deleteProduct(prod)
  //     .subscribe((prods: Products[]) => this.prodsUpdated.emit(prods));
  // }

  // AddProd(prod: Products) {
  //   this.prodservice
  //     .addProd(prod)
  //     .subscribe((prods: Products[]) => this.prodsUpdated.emit(prods));;
  // }
}
