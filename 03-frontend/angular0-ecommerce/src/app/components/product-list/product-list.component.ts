import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: Product[] = [];
  currentCategotyId: number=0
  searchMode:boolean=false;
  constructor(private productService: ProductService,
    private route:ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe(() =>{
      this.listProducts();  
    
    })
    
  
  }
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProduct();
      
    }
    else{
      this.handleListProducts();
    }
  }
  handleSearchProduct() {
    const keywords = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(keywords).subscribe(
      data=>{
        this.products = data
      }
    )
  }

  handleListProducts(){

    const idParam = this.route.snapshot.paramMap.get('id');
    this.currentCategotyId = idParam ? +idParam : 1;
    console.log(this.currentCategotyId);
    this.productService.getProductList(this.currentCategotyId).subscribe((data) => {
      this.products = data;
      console.log('Inside subscribe callback:', this.products)
    });
  }
}
