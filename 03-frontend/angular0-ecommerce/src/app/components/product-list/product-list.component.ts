import { Component } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: Product[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.listProducts();
    console.log(this.products,"productList")
  }
  listProducts() {
    this.productService.getProductList().subscribe((data) => {
      this.products = data;
      console.log('Inside subscribe callback:', this.products)
    });
  }
}
