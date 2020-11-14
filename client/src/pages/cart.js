import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import '../css/cart.css'
import EmptyCart from '../assets/empty-cart.png'


const Cart = () => {

	const [cartDetails, setCartDetails] = useState([])

	const getCarts = async () => {
		await axios.get(`/api/carts`)
			.then(res => {
				let data = res.data
				setCartDetails(data)
			})
	}

	useEffect(() => {
		getCarts()
	}, [])

	const deleteProduct = (items, product) => {
		swal({
			title: "Are you sure?",
			text: `You want to remove ${items.itemName} from the cart!`,
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then(async (res) => {
			if (res) {
				await axios.delete(`/api/del-cart/${product._id}`)
					.then(async res => {
						console.log(res.data);
						swal(`Successfully removed ${items.itemName}`, {
							icon: "success",
							timer: 900
						});
						await axios.get('/api/carts').then(res => {
							const data = res.data
							setCartDetails(data)
						})
					})
			}
		});
	};

	const displayProduct = () => {
		if (!cartDetails.map || cartDetails.length == 0) {
			return (
				<div className="col">
					<img src={EmptyCart} alt="empty cart"/>
					<p>{'Your cart is empty!'}</p>
				</div>
			)
		}
		else {
			return cartDetails.map((product, index) => {
				if (!product || !product.cart) {
					return
				}
				return product.cart.map(items => {
					return (
						<div className="pt-3 border" key={index}>
							<img src={items.imageURI} alt={items.itemName}/>
							<p>{items.itemName}</p>
							<p>Total: {items.amount}</p>
							<p>{items.details}</p>
							<button type="button" className="btn btn-danger mb-3" onClick={() => deleteProduct(items, product)}>
								Remove
								</button>
						</div>
					)
				})
			})
		}
	}

	//total bill
	const [totalBill, setTotalBill] = useState('')

	const totalAmount = () => {
		var amounts = 0
		if (!cartDetails.map || cartDetails.length == 0) {
			setTotalBill(0)
		}
		else {
			return cartDetails.map((product, index) => {
				if (!product || !product.cart) {
					return ''
				}
				return product.cart.map(items => {
					amounts += items.amount
					setTotalBill(amounts);
				})
			})
		}
	}
	//end total bill

	useEffect(() => {
		totalAmount()
	}, [cartDetails])

	const hidebtn = () => {
		const btn = totalBill === 0 ? 'd-none' : 'd-block'
		return btn
	}

	const goBack = () => {
		window.history.back();
	}

	return (
		<Fragment>
			<ul className="list-style nav-bar">
				<li><span className="navbar-text">Ecommerce</span></li>
			</ul>
			<div className="cart">
				<button type="button" className="btn btn-primary backBtn" onClick={goBack}>Back</button>
				<div className="container">
					<div className="row">
						<div className="col-md-9 center">
							{displayProduct()}
						</div>
						<div className={`col center cards ${hidebtn()}`}>
							<ul className="content">
								<li className="border">PRICE DETAILS</li>
								<li>Total: {totalBill || 0}</li>
							</ul>
							<div className="mt-3">
								<Link to="/checkout">
									<button type="button" className="btn btn-warning btn-block">
										CHECKOUT
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default Cart