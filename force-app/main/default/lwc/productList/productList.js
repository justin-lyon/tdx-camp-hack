import { LightningElement, api, track, wire } from 'lwc'
import { getListUi } from 'lightning/uiListApi'
import PRODUCT from '@salesforce/schema/Product__c'
import PRODUCT_FAMILY from '@salesforce/schema/Product_Family__c'

export default class ProductList extends LightningElement {
  @api recordId
  @track families
  @track products
  @track error
  @track selectedProductId

  @wire(getListUi, { objectApiName: PRODUCT_FAMILY, listViewApiName: 'All' })
  handleFamilies({ error, data }) {
    if (data) {
      console.log('data', JSON.stringify(data.records))
      console.log('count: ', data.records.records.records.count)
      this.families = data.records.records.records
    } else if (error) {
      console.error('unhandled error: ', error.message)
    }
  }
  // surface in Product Family record page
  // get products by family
  // iterate over products to c-product-item
}