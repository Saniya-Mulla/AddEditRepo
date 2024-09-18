import { Component } from '@angular/core';
import { Products } from './products';
import { ProductsServiceService } from './products-service.service';
import { ProductsComponent } from './products/products.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TaskManager';

  // editProduct: Products = new Products();
  editIndex: any = null;
  show :boolean= false;

  constructor(private prodService : ProductsServiceService){

  }

  ngOnInit(){
    
  }

  // editProducts(prod: Products) {
  //   this.show =true;
  //   this.editProduct = prod;
  // }

  // updateProductList(prods: Products[]) {
  //   this.products = prods;
  //   this.show =false;
  // }

  // initNewProd() {
  //   this.show =true;
  //   this.editProduct = new Products();
  //}

  
}
