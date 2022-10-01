import  moment from 'moment'
class OrderItem {
    constructor(id,OnwerId,name,number,City,PostalAddress, item, Amount,Method, Date) {
        this.id = id;
        this.OnwerId= OnwerId
        this.name= name;
        this.number=number;
        this.City= City;
        this.PostalAddress= PostalAddress;
        this.item = item;
        this.Amount = Amount;
        this.Method= Method
        this.Date = Date;
    }
    get readableDate() {
        return moment(this.Date).format('MMMM Do YYYY, hh:mm');
    }
}
export default OrderItem;