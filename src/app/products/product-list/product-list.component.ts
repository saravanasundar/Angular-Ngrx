import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import {
  getCurrentProduct,
  getShowProductCode,
  state,
} from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<state>
  ) {}

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   (currentProduct) => (this.selectedProduct = currentProduct)
    // );
    this.store
      .select(getCurrentProduct)
      .subscribe((currentProduct) => (this.selectedProduct = currentProduct));

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => (this.products = products),
      error: (err) => (this.errorMessage = err),
    });

    this.store
      .select(getShowProductCode)
      .subscribe(
        (showProductCode: boolean) => (this.displayCode = showProductCode)
      );
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(ProductActions.setCurrentProduct({ product }));
  }
}
