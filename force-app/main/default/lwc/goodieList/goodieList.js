import { LightningElement, api, wire } from 'lwc'
import getGoodies from '@salesforce/apex/GoodieListAuraService.getGoodies'
export default class GoodieList extends LightningElement {
  @api goodies
  @api error

  @wire(getGoodies, {})
  wireGoodies ({ error, data }) {
    this.goodies = []
    if (data) {
      const theGoods = JSON.parse(data)
      this.goodies = theGoods

    } else if (error) {
      this.error = error
    }
  }
}