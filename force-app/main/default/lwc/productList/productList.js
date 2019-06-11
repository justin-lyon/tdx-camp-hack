import { LightningElement, api, track, wire } from 'lwc'

export default class ProductList extends LightningElement {
  @api recordId
  @track products
  @track error
  @track selectedProductId

  // surface in Product Family record page
  // get products by family
  // iterate over products to c-product-item
}