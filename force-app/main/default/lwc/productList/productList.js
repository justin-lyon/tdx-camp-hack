import { LightningElement, api, track, wire } from 'lwc'
import { getRecord } from 'lightning/uiRecordApi'
import { getListUi } from 'lightning/uiListApi'
import PRODUCT from '@salesforce/schema/Product__c'
import PRODUCT_FAMILY_NAME from '@salesforce/schema/Product_Family__c.Name'

const LIST_VIEW_PREFIX = 'Family_'
export default class ProductList extends LightningElement {
  @api recordId
  @track error

  @track products
  @track selectedProductId

  @track family
  @track listViewName

  get familyTitle() {
    return this.family.Name + ' Products'
  }

  @wire(getRecord, {
    recordId: '$recordId',
    fields: [PRODUCT_FAMILY_NAME]
  }) handleFamily ({ error, data }) {
    if (data) {
      this.family = {
        Name: data.fields.Name.value,
        Id: data.id
      }
      this.setListViewName()

    } else if (error) {
      this.error = error
    }
  }

  @wire(getListUi, { objectApiName: PRODUCT, listViewApiName: '$listViewName' })
  handleFamilies({ error, data }) {
    if (data) {
      const products = data.records.records.map(record => {
        return {
          Name: record.fields.Name.value,
          Id: record.fields.Id.value,
          Category__c: record.fields.Category__c.value,
          Level__c: record.fields.Level__c.value,
          MSRP__c: record.fields.MSRP__c.value
        }
      })
      this.products = products
    } else if (error) {
      console.error('unhandled error: ', error.message)
    }
  }

  setListViewName() {
    this.listViewName = LIST_VIEW_PREFIX + this.family.Name.toUpperCase()
  }

  // surface in Product Family record page
  // wire this product family record
  // get products by family through listview
  // iterate over products to c-product-item
}