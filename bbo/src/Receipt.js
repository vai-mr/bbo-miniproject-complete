import React, { useEffect, useState } from 'react';
import './Receipt.css';
import HeaderLogo from './bbo_headerLogo.jpeg'
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import { useTable } from 'react-table';

function Billproduct({id,title,price}) {
	return (
		<div className='billproduct'>
			<div className="billproduct_title">
				<p>{title}</p>
			</div>
			<div className="billproduct_price">
				<p className="product_price">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
			</div>
		</div>
	)
}
function Receipt() {

	const [invoice, setInvoice] = useState({});
	const [{user}, dispatch] = useStateValue();
    

	const fetchInvoice= async() => {
		const invoiceRef = db.collection('users')
		.doc(user?.uid)
		.collection('orders')
		.orderBy('created','desc');
		const snapshot = await invoiceRef.get();
		if(snapshot.empty) {
			console.log('No matching doc');
			return;
		}
		
		setInvoice({
			id:snapshot.docs[0].id,
			data:snapshot.docs[0].data(),
		})
		console.log('the snapshot is >> ',snapshot);
		console.log('the invoice  is >> ',invoice);
	}
	useEffect(() => {
		fetchInvoice();
    }, [])
    return (
        <div className="receipt">
        	<img src={HeaderLogo} alt="logo_img" className="top_logo"/>
            <h1><b>INVOICE</b></h1>
            <div className="date">
         	Date: {new Date().toLocaleString() + ''}
         	<br></br>
         	Delivery Address:<br></br>
         	<div className="deliver_address">
				{invoice.data.billing_address.line1},<br></br>
				 {invoice.data.billing_address.line2},<br></br>
				{invoice.data.billing_address.city},<br></br>
				{invoice.data.billing_address.state}-{invoice.data.billing_address.postal_code}.<br></br>
				Contact: {invoice.data.billing_address.email},<br></br>
				{invoice.data.billing_address.phone}.
			 </div>

			
         	<br></br><br></br>
         	</div>
         	<div className="bill">
				{invoice.data.map(item => (
					<Billproduct
						id={item.id}
						title={item.title}						
						price={item.price}
					/>
				))}
         	<div className="tax">
         		Tax:<br></br>
         		GST : 8%<br></br>
         		VAT : 2%<br></br>
         		Discount: 10%<br></br>
         		<br></br>
         	</div>
         	</div> 
         	<br></br>
            {/* generate the receipt to be viewed by the user*/}
        </div>
    )
}

export default Receipt
