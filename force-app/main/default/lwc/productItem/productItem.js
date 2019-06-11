import { LightningElement, api } from 'lwc'

export default class ProductItem extends LightningElement {
  @api product

  // display: image, name, price
  // button: click nav to product detail record
}