import React, { Fragment, useState } from 'react';
import swal from 'sweetalert'
import '../css/checkout.css'


const Checkout = () => {

	//hide/show address 
	const [toggleDisplay, setToggleDisplay] = useState(false)

	const showHide = () => {
		setToggleDisplay(true)
		if (toggleDisplay == true) {
			setToggleDisplay(false)
		}
	}

	const handleDisplay = () => {
		let display = toggleDisplay == true ? "d-block" : "d-none"
		return display
	}
	//end hide/show address 

	const order = () => {
		swal("Successfully Ordered", {
			icon: "success",
			timer: 1500
		});
	}

	const goBack = () => {
		window.history.back();
	}

	return (
		<Fragment>
			<ul className="list-style nav-bar">
				<li><span className="navbar-text">Ecommerce</span></li>
			</ul>

			<div className="checkout">
				<button type="button" className="btn btn-primary backBtn" onClick={goBack}>Back</button>
				<div className="deliveryBtnAlign">
					<button type='button' className="btn btn-lg btn-primary" onClick={() => showHide()}>Add Delivery Address</button>
				</div>
				<div className={`container ${handleDisplay()}`}>
					<div className="row">
						<div className="form-group col-md-5">
							<label htmlFor="name">Name</label>
							<input type="text" className="form-control" name="name" placeholder="Name" />
						</div>
						<div className="form-group col-md-5">
							<label htmlFor="mobileNumber">Mobile Number</label>
							<input type="text" className="form-control" name="mobileNumber" placeholder="Mobile Number" />
						</div>
					</div>

					<div className="row">
						<div className="form-group col-md-5">
							<label htmlFor="address">Address</label>
							<textarea className="form-control" name="address" placeholder="Address"></textarea>
						</div>
						<div className="form-group col-md-5">
							<label htmlFor="pincode">Pincode</label>
							<input type="text" className="form-control" name="pincode" placeholder="Pincode" />
						</div>
					</div>

					<div className="row">
						<div className="form-group col-md-5">
							<label htmlFor="city">City/Town</label>
							<input type="text" className="form-control" name="city" placeholder="City/Town" />
						</div>
						<div className="form-group col-md-5">
							<label htmlFor="state">State</label>
							<input type="text" className="form-control" name="state" placeholder="State" />
						</div>
					</div>
				</div>

				<div className='container'>
					<div className="row">
						<button type='button' className="btn btn-lg btn-block btn-info col-md-8" onClick={order}>Place Order</button>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default Checkout