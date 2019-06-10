import { LightningElement, api, track, wire } from 'lwc'
import getRecentAccounts from '@salesforce/apex/RecentAccountsAuraService.getRecentAccounts'
import { loadScript } from 'lightning/platformResourceLoader'
import VendorResource from '@salesforce/resourceUrl/Vendors'
const WordCloudUrl = VendorResource + '/js/wordcloud2.js'

export default class RecentAccounts extends LightningElement {
  @api max = 20
  @api accounts = undefined
  @track error
  @track cloudInitialized = false

  @wire(getRecentAccounts, { limitter: '$max' })
  handleRecentAccounts ({ error, data }) {
    if (data) {
      this.accounts = data

      if (!this.cloudInitialized) {
        //this.loadWordCloud()
      }

    } else if (error) {
      this.accounts = []
      this.error = error
    }
  }

  renderedCallback () {
    this.loadWordCloud()
  }

  loadWordCloud () {
    if (!this.accounts) {
      console.log('no accounts yet')
      return
    }
    if (this.cloudInitialized) return

    this.cloudInitialized = true

    console.log('accounts length', this.accounts.length)

    loadScript(this, WordCloudUrl)
      .then(() => {
        const container = this.template.querySelector('div.cloudcontainer')
        const width = container.offsetWidth * 0.9
        const canvas = this.template.querySelector('canvas.mywordcloud')
        canvas.width = width
        canvas.height = width * 0.50
        const words = this.buildWordList()
        console.log('width', width)
        WordCloud(canvas,
          {
            list: words,
            //gridSize: width * 0.25,
            //weightFactor: Math.floor((width % 100) / 2)
          })
      })
      .catch(error => {
        console.error(JSON.stringify(error))
        this.error = error
      })
  }

  buildWordList () {
    return this.accounts.map((acc, i) => {
      return [ acc.Name, i ]
    })
  }
}