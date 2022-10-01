import  moment from 'moment'
class SoldProduct {
    constructor(
        id,name,number,City,PostalAddress, item, Amount,Method, Date
    ) {
        this.id = id;
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
export default SoldProduct;