import { LightningElement, api } from 'lwc';

export default class GoodieTile extends LightningElement {
  @api goodie
  @api selectedGoodieId = ''

  get isSelected () {
    return this.selectedGoodieId === this.goodie.id
  }

  get tileSelected () {
    const base = 'tile'
    return base + (this.isSelected ? ' selected' : '')
  }

  clickGoodie () {
    const selectEvent = new CustomEvent('selected', {
      detail: this.goodie.id
    })
    this.dispatchEvent(selectEvent)
  }
}