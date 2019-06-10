import { CurrentPageReference } from 'lightning/navigation'
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import { LightningElement, api, wire } from 'lwc'
import getGoodies from '@salesforce/apex/GoodieListAuraService.getGoodies'
import { createRecord } from 'lightning/uiRecordApi'
import { fireEvent } from 'c/pubsub'
export default class GoodieList extends LightningElement {
  @api recordId
  @api goodies
  @api selectedGoodieId
  @api selectedGoodie
  @api error

  @wire(CurrentPageReference) pageRef

  @wire(getGoodies)
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
      .then(success => this.onGoodieAdded(success, this))
      .catch(error => this.onGoodieFailed(error, this))
  }

  onGoodieAdded (success, thisArg) {
    const name = success.fields.Name.value
    const event = new ShowToastEvent({
      title: 'Success',
      variant: 'success',
      message: 'Added ' + name + '.'
    })
    thisArg.dispatchEvent(event)
  }

  onGoodieFailed (error, thisArg) {
    console.error('Error adding Goodie: ', error)
    const event = new ShowToastEvent({
      title: 'Error',
      variant: 'error',
      message: 'Sorry, we couldn\'t add your Goodie.'
    })
    thisArg.dispatchEvent(event)
  }

  setSelected (event) {
    this.selectedGoodieId = event.detail
    this.selectedGoodie = this.goodies.find(g => g.id === this.selectedGoodieId)
    this.fireGoodie()
  }

  fireGoodie () {
    fireEvent(this.pageRef, 'selectedGoodie', { goodie: this.selectedGoodie })
  }
}