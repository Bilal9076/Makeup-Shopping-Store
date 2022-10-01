import  moment from 'moment'
class AcceptedOrder {
    constructor(id,onwerId,Amount,Name,Number,City,PostalAddress,item,Method,Remarks,Date){
        this.id= id
        this.onwerId=onwerId
        this.Amount=Amount
        this.Name=Name
        this.Number=Number
        this.City=City
        this.PostalAddress=PostalAddress
        this.item=item
        this.Method=Method
        this.Remarks=Remarks
        this.Date= Date  
    }
    get readableDate() {
        return moment(this.Date).format('MMMM Do YYYY, hh:mm');
    }
}
export default AcceptedOrder;