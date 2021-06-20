import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const easyinvoice = require('easyinvoice');

toast.configure();
 export default function Pdf(props){
    const invoiceDetails = props.invoiceData
    var data = {
        //"documentTitle": "RECEIPT", //Defaults to INVOICE
        //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
        "currency": "USD", //See documentation 'Locales and Currency' for more info
        "taxNotation": "vat", //or gst
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "https://www.bycerlaw.com/wp-content/uploads/2016/09/bycer-law-patent-invoice.png", //or base64
        "sender": {
            "company":"Invoice Generator",
            "address": "135 East Street",
            "zip": "600001",
            "city": "Chennai",
            "country": "Tamilnadu",
            
        },
        "client": {
               "company": invoiceDetails.client.name,
               "address": invoiceDetails.client.address.door,
               "zip": invoiceDetails.client.address.zip,
               "city": invoiceDetails.client.address.city,
               "country": invoiceDetails.client.address.state
        },
        "invoiceNumber": invoiceDetails.invoiceno,
        "invoiceDate": invoiceDetails.date,
        "products": invoiceDetails.products   
        ,
        "bottomNotice": "Thank you for your purchase!!!",
    };
  
let invoice = () => {
    
    //Create your invoice! Easy!
    easyinvoice.createInvoice(data, async function (result) {
        easyinvoice.download(`${invoiceDetails.invoiceno}.pdf`);
    });
    toast(`Invoice downloading for - ${invoiceDetails.invoiceno}`);

}

return <>
<div>
    <button className="btn btn-success" onClick={invoice}>Download Invoice</button>
</div>
</>

}