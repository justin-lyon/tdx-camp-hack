import { LightningElement, api, track, wire } from 'lwc'
import { getListUi } from 'lightning/uiListApi'
import PRODUCT from '@salesforce/schema/Product__c'
import PRODUCT_FAMILY from '@salesforce/schema/Product_Family__c'

const LIST_VIEW_PREFIX = 'Family_'
export default class ProductList extends LightningElement {
  @api recordId
  @track families
  @track listViews
  @track products
  @track error
  @track selectedProductId

  @wire(getListUi, { objectApiName: PRODUCT_FAMILY, listViewApiName: 'All' })
  handleFamilies({ error, data }) {
    if (data) {
      console.log('data', JSON.parse(JSON.stringify(data.records)))
      console.log('count: ', data.records.count)
      const families = data.records.records.map(record => ({ Name: record.fields.Name.value, Id: record.fields.Id.value }))
      console.log('families', families)
      this.families = families
    } else if (error) {
      console.error('unhandled error: ', error.message)
    }
  }
  // surface in Product Family record page
  // wire this product family record
  // get products by family through listview
  // iterate over products to c-product-item
}