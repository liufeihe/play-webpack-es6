export class MyTable {
    constructor (el) {
        this.el = el
    }
    setData (data) {
        this.data = data
        this.render()
    }
    render () {
        let data = this.data, cnt = $('#'+this.el)
        cnt.empty()
        cnt.append('table:'+data)
    }
}