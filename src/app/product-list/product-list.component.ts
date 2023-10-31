import { Component, Injectable, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { get } from 'lodash'
import { QueryClientService, UseQuery } from '@ngneat/query';
import { NgForOf, NgIf } from '@angular/common';
import { SubscribeDirective } from '@ngneat/subscribe';

const PRODUCTS_URL = 'https://dummyjson.com/products'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class ProductListComponent {
  products$ = inject(ProductsService).getProducts().result$;
  JSON = JSON

  renderCounter = 0

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('init', ++this.renderCounter);
  }
  ngOnChanges() {
    console.log('changes', ++this.renderCounter);
  }
  ngDoCheck() {
    console.log('check', ++this.renderCounter);
  }
  ngAfterContentInit() {
    console.log('after content init', ++this.renderCounter);
  }
  ngAfterContentChecked() {
    console.log('after content checked', ++this.renderCounter);
  }
  ngAfterViewInit() {
    console.log('after view init', ++this.renderCounter);
  }
  ngAfterViewChecked() {
    console.log('after view checked', ++this.renderCounter);
  }
  ngOnDestroy(){
    console.log('on destroy', ++this.renderCounter);
  }
}

export type ProductResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type ProductByIdResponse = {
  products: Product
  total: number
  skip: number
  limit: number
}

export type Product = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  private _queryClient = inject(QueryClientService);
  private useQuery = inject(UseQuery);

  getProducts() {
    return this.useQuery(['todos'], () => {
      return this.http.get<ProductResponse>(
        PRODUCTS_URL
      );
    });
  }

  getProduct(id: number) {
    return this.useQuery(['todo', id], () => {
      return this.http.get<ProductByIdResponse>(
        `${PRODUCTS_URL}/${id}`
      );
    });
  }
}