import React, { Component } from 'react';

import './CourseContent.scss';
import Scrollchor from 'react-scrollchor';
import axios from 'axios';
import LoginModel from '../../UI/SignUpModel/SignUpModel';

export default class CourseContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			course_name: (
				<div className="course_name">
					CAT 2019 <span>COACHING</span>
				</div>
			),
			price: '4,999',
			discounted: '14,999',
			isLogin: false,
			showLoginModal: false,
			request: {
				name: {
					value: '',
					isValid: true
				},
				email: {
					value: '',
					isValid: true
				},
				mobile: {
					value: '',
					isValid: true
				},
				product_id: '216'
			}
		};
	}

	showModal() {
		this.setState({
			showLoginModal: true
		});
	}

	hideModal() {
		this.setState({ showLoginModal: false });
	}

	componentDidMount() {
		axios.get('https://www.careeranna.com/websiteapi/getCourseDetails').then((response) => {
			this.setState({ price: response.data.price, discounted: response.data.discount });
		});
		axios.get('https://www.careeranna.com/websiteapi/isLoggedIn').then((response) => {
			if (response.data === 'notLoggedin') {
				this.setState({ isLogin: false });
			} else {
				this.setState({ isLogin: true });
			}
		});
	}

	formatDate(date) {
		var monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		let day = date.getDate();
		let monthIndex = date.getMonth();
		let year = date.getFullYear();
		let postfix = '';

		switch (day % 10) {
			case 1:
				postfix = 'st';
				break;
			case 2:
				postfix = 'nd';
				break;
			case 3:
				postfix = 'rd';
				break;
			default:
				postfix = 'th';
				break;
		}
		return day + postfix + ' ' + monthNames[monthIndex] + ' ' + year;
	}

	capitalize(s) {
		return s.toLowerCase().replace(/\b./g, function(a) {
			return a.toUpperCase();
		});
	}

	changeNameSubmit = (event) => {
		let request = this.state.request;
		request.name.value = this.capitalize(event.target.value);
		let value = event.target.value;
		value = value.split(' ').join('');
		if (value.match('[0-9\\W_]+') == null) {
			request.name.isValid = true;
		} else {
			request.name.isValid = false;
		}
		this.setState({ submit: false, request: request });
	};

	changeEmailSubmit = (event) => {
		let request = this.state.request;
		request.email.value = event.target.value;
		let pattern =
			"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
		if (!(request.email.value.match(pattern) == null)) {
			request.email.isValid = true;
		} else {
			request.email.isValid = false;
		}
		this.setState({ submit: false, request: request });
	};

	changePhoneSubmit = (event) => {
		let request = this.state.request;
		request.mobile.value = event.target.value;
		console.log(request.mobile.value);
		if (!(request.mobile.value.match('[0-9]+') == null)) {
			request.mobile.isValid = true;
		} else {
			request.mobile.isValid = false;
		}
		this.setState({ submit: false, request: request });
	};

	submitRequest = (event) => {
		event.preventDefault();
		const request = this.state.request;
		if (request.name.isValid && request.email.isValid && request.mobile.isValid) {
			const formData = new FormData();
			formData.append('name', request.name.value);
			formData.append('mobile', request.mobile.value);
			formData.append('email', request.email.value);
			formData.append('product_id', request.name.value);

			let bodyFormData = {
				name: request.name.value,
				mobile: request.mobile.value,
				email: request.email.value,
				product_id: request.product_id
			};
			console.log(bodyFormData);
			axios
				.post('https://www.careeranna.com/websiteapi/requestCall', formData)
				.then((response) => {
					console.log(response);
					alert('Call Submitted !');
				})
				.catch((err) => {
					console.log(err);
					alert('Some Error Occured !');
				});
		}
	};

	formatDiscount(price) {
		var parts = price.toString().split('.');
		return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');
	}

	onSubmitCall = () => {
		//	this.setState({ showLoginModal: true });
		alert('Plzzz Log In Or SignUp To Enroll');
	};

	render() {
		const course_name = this.state.course_name;

		const price = this.formatDiscount(this.state.price);
		const discounted = this.formatDiscount(this.state.discounted);

		const request = this.state.request;

		const isLoggedIn = this.state.isLogin;
		const showLoginModal = this.state.showLoginModal;

		const date = new Date();
		date.setDate(date.getDate() + 1);
		const updateddate = this.formatDate(date);

		return (
			<div className="upper_main">
				<LoginModel show={showLoginModal} modalClosed={() => this.hideModal()} />
				<div className="CourseContent">
					<div class="container px-0">
						<div className="row px-0">
							<div className="content">
								{course_name}
								<ul className="course_intro_list">
									<li>
										<b>300+ Hours</b> of Videos covering entire <b>CAT</b> Online Coaching{' '}
										<b>2019 syllabus.</b>
									</li>
									<li>
										48 Students with <b>99+ Percentile in CAT 2018.</b>
									</li>
									<li>
										<b>CAT Mock Test Series</b> of 15 All India Mocks.
									</li>
									<li className="end">
										Concepts covered from{' '}
										<b>
											Basics to Advanced <br />to Past Year Questions.
										</b>
									</li>
								</ul>
								<div className="course_price_and_offer">
									<span className="intro_max_price">
										<del>{`For ₹${price}/`}</del>
									</span>
									<span className="intro_offer_price">
										<b>{`Now For ₹ ${discounted}/-`}</b>
									</span>
									<div className="intro_offer_expire">{'* Discount ends on ' + updateddate}</div>
								</div>
								<div className="enroll_and_other_buttons">
									{isLoggedIn ? (
										<a href="https://www.careeranna.com/Cart/add/216" className="enroll_now">
											Enroll Now
										</a>
									) : (
										<a href="javascript:void(0)" onClick={this.onSubmitCall} className="enroll_now">
											Enroll Now
										</a>
									)}
									<Scrollchor to="#video" animate={{ offset: 0, duration: 300 }}>
										<div href="#demoVideo" className="demo_button d-inline-block">
											Demo Videos
										</div>
									</Scrollchor>
									<Scrollchor to="#pastScore" animate={{ offset: 0, duration: 300 }}>
										<div className="past_score_link">View Past Results</div>
									</Scrollchor>
								</div>
							</div>
							<div className="request_call">
								<div className="heading">
									<img
										src="https://careeranna.com/home/static/media/cat/request_call.png"
										alt=""
									/>{' '}
									<span>Request a Call Back</span>
								</div>
								<form class="request_form" onSubmit={this.submitRequest}>
									<div class="input-group">
										<input
											type="text"
											name="name"
											autoComplete="off"
											className={request.name.isTouched && !request.name.isValid ? 'error' : ''}
											id="name"
											placeholder="Full Name"
											onChange={this.changeNameSubmit}
											class="form-control"
											required
										/>
										{!request.name.isValid && request.name.value != '' ? (
											<small>Enter A Valid Name.</small>
										) : null}
									</div>
									<div class="input-group">
										<input
											type="text"
											pattern="[7-9][0-9]{9}"
											maxLength="10"
											autoComplete="off"
											name="mobile"
											className={
												request.mobile.isTouched && !request.mobile.isValid ? 'error' : ''
											}
											id="mobile"
											placeholder="Contact Number"
											class="form-control"
											onChange={this.changePhoneSubmit}
											required
										/>
										{!request.mobile.isValid && request.mobile.value !== '' ? (
											<small>Enter A Valid Number.</small>
										) : null}
									</div>
									<div class="input-group">
										<input
											type="email"
											pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
											autoComplete="off"
											name="email"
											className={request.email.isTouched && !request.email.isValid ? 'error' : ''}
											id="email"
											placeholder="Enter your email"
											onKeyPress={this.changeEmailSubmit}
											class="form-control"
											required
										/>
										{!request.email.isValid && request.email.value != '' ? (
											<small>Enter A Valid Email</small>
										) : null}
									</div>
									<input type="text" name="product_id" value="216" hidden />
									<button
										className={
											!(
												request.name.isValid &&
												request.mobile.isValid &&
												request.email.isValid
											) ? (
												'submit_request disabled'
											) : (
												'submit_request'
											)
										}
									>
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
