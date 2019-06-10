import { LightningElement, api, wire } from 'lwc'
import getGoodies from '@salesforce/apex/GoodieListAuraService.getGoodies'
import { createRecord } from 'lightning/uiRecordApi'
export default class GoodieList extends LightningElement {
  @api recordId
  @api goodies
  @api selectedGoodieId
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

  get isDisabled () {
    return !this.selectedGoodieId
  }

  addGoodie () {
    const { name, price } = this.goodies.find(g => g.id === this.selectedGoodieId)
    const goodieRecord = {
      apiName: 'Goodie__c',
      fields: {
        Name: name,
        Price__c: price,
        Contact__c: this.recordId
      }
    }

    createRecord(goodieRecord)
      .then(data => {
        console.log('success', data)
      })
      .catch(err => {
        console.error('error saving goodie', JSON.stringify(err))
      })
  }

  setSelected (event) {
    this.selectedGoodieId = event.detail
  }
}