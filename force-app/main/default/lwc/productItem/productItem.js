import { LightningElement, api } from 'lwc'

export default class ProductItem extends LightningElement {
  @api product

  get price () {
    return '$' + this.product.MSRP__c.toFixed(2)
  }

  clickProduct () {
    const click = new CustomEvent('navproduct', {
      detail: { productId: this.product.Id }
    })
    this.dispatchEvent(click)
  }
}