import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  constructor(private httpClient: HttpClient) { 

  }
  public getAllProducts():Observable<Products[]>
  {
    return this.httpClient.get<Products[]>("https://fakestoreapi.com/products");
  }

  // public updateProduct(existingProduct: Products): Observable<Products[]> {
  //   return this.httpClient.put<Products[]>("http://localhost:5157/api/Products",existingProduct
  //   );
  // }

  public deleteProduct(prod: Products)  {
    return this.httpClient.delete(`https://fakestoreapi.com/products/${prod.id}`);
  }

  public addEditProd(prod: any,selectedProd : any) {
    if(!selectedProd){
      return this.httpClient.post("https://fakestoreapi.com/products",prod); 
    }else{
      return this.httpClient.put(`https://fakestoreapi.com/products/${selectedProd.id}`,prod);
    }
  }

}
