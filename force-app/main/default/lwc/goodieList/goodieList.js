import { LightningElement, wire } from 'lwc';
import getGoodies from '@salesforce/apex/GoodieListAuraService.getGoodies'
export default class GoodieList extends LightningElement {
  @wire(getGoodies, {})
  goodies
}