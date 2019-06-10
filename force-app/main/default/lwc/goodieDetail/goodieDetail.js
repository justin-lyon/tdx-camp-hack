import { LightningElement, api } from 'lwc';

export default class GoodieDetail extends LightningElement {
  @api goodie = {
    name: 'Cody Plush',
    price: 50,
    available: true,
    image_url: 'https://goodies-list.herokuapp.com/images/codey.jpg'
  }


}