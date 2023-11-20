import React, { useRef, useState } from 'react';
import './Formulaire.css';

function Form() {
    const nameRef = useRef('');
    const surnameRef = useRef('');
    const emailRef = useRef('');
    const phoneRef = useRef('');
    const addressRef = useRef('');
    const birthDateRef = useRef('');
    const countryRef = useRef('');
    const acceptConditionsRef = useRef('');
    const [errors, setErrors] = useState([]);

    const validateForm = () => {
        const nameValue = nameRef.current.value;
        const surnameValue = surnameRef.current.value;
        const emailValue = emailRef.current.value;
        const phoneValue = phoneRef.current.value;
        const addressValue = addressRef.current.value;
        const birthDateValue = birthDateRef.current.value;
        const countryValue = countryRef.current.value;
        const acceptConditionsValue = acceptConditionsRef.current.checked;
        let isFormValid = true;

        if (nameValue.trim() === '') {
            setErrors(prevState => [...prevState, 'Name is required!!']);
            isFormValid = false;
        }

        if (surnameValue.trim() === '') {
            setErrors(prevState => [...prevState, 'Surname is required!']);
            isFormValid = false;
        }

        if (emailValue.trim() === '') {
            setErrors(prevState => [...prevState, 'Email is required']);
            isFormValid = false;
        } else if (!emailValue.match(/^\S+@\S+\.\S+$/)) {
            setErrors(prevState => [...prevState, 'Email format is invalid']);
            isFormValid = false;
        }

        if (phoneValue.trim() === '') {
            setErrors(prevState => [...prevState, 'Phone number is required!!']);
            isFormValid = false;
        }

        if (addressValue.trim() === '') {
            setErrors(prevState => [...prevState, 'Address is required !!']);
            isFormValid = false;
        }

        if (birthDateValue.trim() === '') {
            setErrors(prevState => [...prevState, 'Date of Birth is required !!']);
            isFormValid = false;
        }

        if (countryValue.trim() === '') {
            setErrors(prevState => [...prevState, 'Country is required !!']);
            isFormValid = false;
        }

        if (!acceptConditionsValue) {
            setErrors(prevState => [...prevState, 'Accept conditions should be checked']);
            isFormValid = false;
        }

        return isFormValid;
    };

    const handleSubmit = (e) => {
        setErrors([]);
        if (!validateForm()) {
            e.preventDefault();
        }
    };

    return (
        <div className="container-fluid w-75 mx-auto my-5">
            {errors.length > 0 ? (
                <div className="alert alert-danger" role="alert">
                    <strong>Error</strong>
                    <ul>
                        {errors.map((error, key) => (
                            <li key={key}>{error}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                ''
            )}
            <h3>Registration Form</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input type="text" id="name" name="name" ref={nameRef} />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname *</label>
                    <input type="text" id="surname" name="surname" ref={surnameRef} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input type="text" id="email" name="email" ref={emailRef} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input type="tel" id="phone" name="phone" ref={phoneRef} />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address *</label>
                    <input type="text" id="address" name="address" ref={addressRef} />
                </div>
                <div className="form-group">
                    <label htmlFor="date-of-birth">Date of Birth *</label>
                    <input type="date" id="date-of-birth" name="date-of-birth" ref={birthDateRef} />
                </div>
                <div className="form-group mb-4">
                    <label>Country </label>
                    <label htmlFor="country"></label>
                    <select className="form-control" id="country" ref={countryRef}>
                        <option value="">Select a Country</option>
                        <option value="MA">Morocco</option>
                        <option value="DZ">Algeria</option>
                        <option value="TN">Tunisia</option>
                    </select>
                </div>
                <div className="form-check mb-4">
                    <div className="d-flex">
                        <input
                            className="form-check-input me-2"
                            type="checkbox"
                            id="acceptAllConditions"
                            ref={acceptConditionsRef}
                        />
                        <label className="form-check-label" htmlFor="acceptAllConditions">
                            Accept all conditions
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-4">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Form;
