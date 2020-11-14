import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom'
import { Convert } from 'mongo-image-converter';
import '../../css/addProduct.css'
import swal from 'sweetalert'
import axios from 'axios'


const AddProduct = () => {

	const [product, setProduct] = useState({
		category: '',
		itemName: '',
		amount: '',
		details: '',
		imageURI: ''
	})

	const { category, itemName, amount, details, imageURI } = product

	const [imageFile, setImageFile] = useState('');

	const handleChange = (data) => {
		const { name, value } = data.target
		setProduct({ ...product, [name]: value })
	}

	const convertImage = async () => {
		try {
			const convertedImage = await Convert(imageFile)
			if (convertedImage) {
				setProduct({ ...product, imageURI: convertedImage });
				swal('Image Uploaded Successfully', {
					icon: "success",
					timer: 900
				});
			} else {
				swal('The file is not in jpeg or png format', {
					icon: "error"
				});
			}
		}
		catch (error) {
			console.warn(error.message)
		}
	}

	const handleSubmit = async (data) => {
		data.preventDefault()
		const productDetails = {
			category,
			itemName,
			amount,
			details,
			imageURI
		}

		if (!productDetails.category || !productDetails.itemName) {
			swal("Fill The Fields", {
				icon: "error",
				timer: 1500
			});
		}
		else {
			try {
				const config = {
					headers: {
						"Content-Type": "application/json"
					}
				}
				const body = JSON.stringify(productDetails)
				await axios.post('/api/save-product', body, config)
					.then(res => {
						console.log(res.data)
						swal("Added Item Successfully", {
							icon: "success",
							timer: 1000
						});
						setProduct({ category: '', itemName: '', amount: '', details: '' })
						setImageFile('')
					})
			}
			catch (err) {
				console.error("error", err.response.data)
			}
		}
	}

	const goBack = () => {
		window.history.back();
	}

	return (
		<Fragment>
			<ul className="list-style nav-bar">
				<li><span className="navbar-text">Ecommerce</span></li>
			</ul>
			<div className="addProduct">
				<button type="button" className="btn btn-primary backBtn" onClick={goBack}>Back</button>
				<form className="m-3" onSubmit={(data) => handleSubmit(data)}>
					<div className="container">
						<label className="">ADD Details :</label>
						<div className="row m-3 justify">
							<div className="form-group col-md-4">
								<label htmlFor="category">Category</label>
								<input type="text" className="form-control" name="category" value={category} onChange={data => handleChange(data)} placeholder="category" autoFocus />
							</div>
							<div className="form-group col-md-4">
								<label htmlFor="imageUpload">Image Upload</label>
								<input type="file" className="form-control" name="imageFile" onChange={(e) => setImageFile(e.target.files[0])} />
								<button type="button" className="btn btn-primary col" onClick={convertImage} > Upload </button>
							</div>
						</div>

						<div className="row m-3 justify">
							<div className="form-group col-md-4">
								<label htmlFor="amount">Amount</label>
								<input type="number" className="form-control" name="amount" value={amount} onChange={data => handleChange(data)} placeholder="amount" />
							</div>
							<div className="form-group col-md-4">
								<label htmlFor="itemName">Item Name</label>
								<input type="text" className="form-control" name="itemName" value={itemName} onChange={data => handleChange(data)} placeholder="item Name" />
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="details">Details</label>
								<textarea rows="2"
									name="details"
									className="form-control"
									value={details}
									onChange={(data) => handleChange(data)}
									placeholder="details"
								></textarea>
							</div>
						</div>

						<div className="center">
							<button type='submit' className="btn btn-primary">
								Save
							</button>
							<Link to="/">
								<button type="button" className="btn btn-primary ml-4">
									Cancel
								</button>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</Fragment>
	)
}

export default AddProduct