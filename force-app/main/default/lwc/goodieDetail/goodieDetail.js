import { CurrentPageReference } from 'lightning/navigation'
import { LightningElement, api, wire } from 'lwc';
import { registerListener, unregisterListener } from 'c/pubsub'

export default class GoodieDetail extends LightningElement {
  @wire(CurrentPageReference) pageRef
  @api goodie

  goodieListener (event) {
    this.goodie = event.goodie
  }

  connectedCallback () {
    registerListener('selectedGoodie', this.goodieListener, this)
  }

  disconnectedCallback () {
    unregisterListener('selectedGoodie', this.goodieListener, this)
  }
}