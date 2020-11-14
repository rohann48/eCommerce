import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../css/product.css'

const Product = () => {

	let [productDetails, setproductDetails] = useState([])
	console.log(productDetails.length);
	const getProducts = async () => {
		await axios.get('/api/products')
			.then(res => {
				let data = res.data
				setproductDetails(data)
			})
	}

	const getCarts = async () => {
		await axios.get(`/api/carts`)
			.then(res => {
				let data = res.data
				setCartNotify(data)
			})
	}

	useEffect(() => {
		getProducts()
		getCarts()
	}, [])

	//selectedOption from categories
	let [selectedOption, setSelectedOption] = useState([]);
	console.log(selectedOption);

	const onOptionClicked = async value => {
		await axios.get(`/api/products/${value}`)
			.then(res => {
				let result = res.data
				setSelectedOption(result)
			})
	};

	// displaying productDetails and selectedOption
	const displayProducts = () => {
		if (selectedOption.length === 0) {
			return productDetails.map(product => {
				return (
					<div className="col-md-4 cards" key={product._id}>
						<img src={product.imageURI} alt={product.itemName} />
						<p>{product.itemName}</p>
						<button type="button" className="btn btn-primary" onClick={() => addCart(product)}>
							Add to cart
							</button>
						<ul className="hide">
							<li>Price: {product.amount}</li>
							<li>Specs: {product.details} </li>
						</ul>
					</div>
				)
			})
		}
		else if (selectedOption.length > 0) {
			return selectedOption.map(product => {
				return (
					<div className="col-md-4 cards" key={product._id}>
						<img src={product.imageURI} alt={product.itemName} />
						<p>{product.itemName}</p>
						<button type="button" className="btn btn-primary" onClick={() => addCart(product)}>
							Add to cart
							</button>
						<ul className="hide">
							<li>Price: {product.amount}</li>
							<li>Specs: {product.details}</li>
						</ul>
					</div>
				)
			})
		}
	}
	//end

	const [cartNotify, setCartNotify] = useState([])

	const addCart = async (data) => {
		await axios.get(`/api/product/${data._id}`)
			.then(async res => {
				let cart = res.data
				setCartNotify([...cartNotify, cart])

				const product = {
					cart
				}
				try {
					const config = {
						headers: {
							"Content-Type": "application/json"
						}
					}
					const body = JSON.stringify(product)
					console.log(body);
					await axios.post('/api/save-cart', body, config)
						.then(res => {
							console.log(res.data)
							setCartNotify([...cartNotify, res.data])
						})
				}
				catch (err) {
					console.error("error", err.response.data)
				}
			})
	}

	//search input by filter
	const [input, setInput] = useState([])

	const handleInput = (data) => {
		data.preventDefault()
		setInput(data.target.value)
	}

	const searchFilter = selectedOption.length === 0 ?
		productDetails = productDetails.filter((product) => {
			return product.itemName.toLowerCase().match(input)
		}) : selectedOption = selectedOption.filter((product) => {
			return product.itemName.toLowerCase().match(input)
		})
	//end search input by filter

	// filter categories
	const [categories, setcategories] = useState([])

	const filterCategory = () => {
		return productDetails.map(x => {
			return categories.filter(a => {
				return a.category == x.category
			}).length > 0 ? null : setcategories([...categories, x])
		})
	}

	useEffect(() => {
		filterCategory()
	})
	//end filter categories

	const displayCategory = () => {
		return categories.map((item, index) => {
			return (
				<Fragment key={index}>
					<span name="search" className="dropdown-font" value={item.category} onClick={() => onOptionClicked(item.category)}>{item.category}</span>
				</Fragment>
			)
		})
	}

	return (
		<Fragment>
			<ul className="list-style nav-bar">
				<li><span className="navbar-text">Ecommerce</span></li>
				<li><Link className="navbar-text" to="/add">Add Products</Link></li>
				<li className="dropdown">
					<Link className="navbar-text dropbtn" to="#">Categories</Link>
					<div className="dropdown-content">
						<span name="search" className="dropdown-font" onClick={() => onOptionClicked('All')}>All</span>
						{displayCategory()}
					</div>
				</li>
				<li className="searchBar"><input type="text" className="form-control width" value={input} onChange={(data) => handleInput(data)} style={{ textTransform: 'capitalize' }} placeholder="Search For Items" /></li>
				<li className="right">
					<Link to='/cart' className="navbar-text badges" data-count={cartNotify.length}>Cart </Link>
				</li>
			</ul>
			<div className="products">
				<div className="container">
					<div className="row align">
						{displayProducts()}
					</div>
					<div className="notFound">
						{!searchFilter.length ? 'Not Data Found' : null}
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default Product