import React, { useEffect, useState } from "react";
import "../form/Form.css";
import logo from '../../assets/logo.png';
import profile1 from "../../assets/Ellipse -1.png";
import profile2 from "../../assets/Ellipse -2.png";
import profile3 from "../../assets/Ellipse -3.png";
import profile4 from "../../assets/Ellipse-4.png";
import { Link } from "react-router-dom";
import AddressService from "../../service/AddressService.js"


const Form = (props) => {
    const [contact, setContact] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        mobileNo: "",
        country: "",
        emailAddress: "",
        profilePic: "",
        isUpdate: ""
    })

    const [error, setError] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        mobileNo: "",
        country: "",
        emailAddress: "",
        profilePic: "",
        isUpdate: ""
    })

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setContact({ ...contact, [name]: value });
        validate(e);
    }

    const validate = (e) => {
        const regexName = /^[A-Z]{1}[a-zA-Z]{2,}$/;
        const regexMobile = /^[6-9]{1}[0-9]{9,}$/;
        const regexEmail = /^[a-zA-Z0-9_+/#$%?~.-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z1-9]{1,}$/;
        const addressRegex = /^[A-Z]{1}[a-zA-]{1,}/;

        if (e.target.name == "firstName") {
            if (!regexName.test(e.target.value))
                var error = "Enter a valid First Name";
            setError({ firstName: error });
        }

        if (e.target.name == "lastName") {
            if (!regexName.test(e.target.value))
                var error = "Enter a valid Last Name";
            setError({ lastName: error });
        }

        if (e.target.name == "emailAddress") {
            if (!regexEmail.test(e.target.value))
                var error = "Enter a valid Email";
            setError({ emailAddress: error });
        }

        if (e.target.name == "mobileNo") {
            if (!regexMobile.test(e.target.value))
                var error = "Enter valid Mobile Number";
            setError({ mobileNo: error });
        }

        if (e.target.name == "address") {
            if (!(e.target.value))
                var error = "Enter valid address";
            setError({ address: error });
        }

        if (e.target.name == "city") {
            if (!addressRegex.test(e.target.value))
                var error = "Enter valid city name";
            setError({ city: error });
        }

        if (e.target.name == "state") {
            if (!addressRegex.test(e.target.value))
                var error = "Enter valid state name";
            setError({ state: error });
        }

        if (e.target.name == "country") {
            if (!addressRegex.test(e.target.value))
                var error = "Enter valid country name";
            setError({ country: error });
        }
    }

    const value = props.location.state;
    useEffect(() => {
        if (value) {
            getValueByID(value);
        }
    }, [])

    const getValueByID = (personID) => {
        AddressService
            .getConatctByID(personID)
            .then((data) => {
                setContact({
                    ...contact, ...data, firstName: data.data.firstName, lastName: data.data.lastName, gender: data.data.gender, address: data.data.address, city: data.data.city
                    , state: data.data.state, pinCode: data.data.pinCode, mobileNo: data.data.mobileNo, country: data.data.country, emailAddress: data.data.emailAddress, profilePic: data.data.profilePic,
                    isUpdate: true
                });
            });
    }

    const save = async (event) => {
        event.preventDefault();
        let object = {
            firstName: contact.firstName,
            lastName: contact.lastName,
            gender: contact.gender,
            address: contact.address,
            city: contact.city,
            state: contact.state,
            mobileNo: contact.mobileNo,
            emailAddress: contact.emailAddress,
            country: contact.country,
            profilePic: contact.profilePic
        }
        if (contact.isUpdate) {
            AddressService.updateMethod(value, object);
            window.location.assign(`http://localhost:3000/`);
        }
        else {
            AddressService.addContact(object);
            window.location.assign(`http://localhost:3000/`);
        }
    }

    return (
        <>
            <header className="header-container">
                <div className="logo-content">
                    <Link to="/"><img src={logo} /></Link>
                </div>
                <div>
                    <div className="header-text">ADDRESS</div>
                    <div className="headet-text-book">BOOK</div>
                </div>
            </header>
            <div className="main-content">
                <form action="" className="form-content" onSubmit={save}>
                    <h1 className="header-content">PERSON ADDRESS FORM</h1>
                    <div className="row-content">
                        <label htmlFor="firstName" className="label-text" >First Name:</label>
                        <input type="text" className="input" id="firstName" name="firstName" value={contact.firstName} onChange={handleInput} placeholder="First Name.." required />
                    </div>
                    <p className="error">{error.firstName}</p>

                    <div className="row-content">
                        <label ht="name" className="label-text">Last Name:</label>
                        <input type="text" className="input" id="lastName" name="lastName" value={contact.lastName} onChange={handleInput} placeholder="Last Name.." required />
                    </div>
                    <p className="error">{error.lastName}</p>
                    <div className="row-content">
                        <label className='label-text' htmlFor='profilePic'>Profile image</label>
                        <label className='profile'>
                            <input type="radio" id='profile1' value="../../assets/Ellipse -1.png" checked={contact.profilePic === "../../assets/Ellipse -1.png"} onChange={handleInput} name='profilePic' required />
                            <img className='pic' id='image1' src={profile1}></img>
                        </label>
                        <label className='profile'>
                            <input type="radio" id='profile2' value="../../assets/Ellipse -2.png" checked={contact.profilePic === "../../assets/Ellipse -2.png"} onChange={handleInput} name='profilePic' required />
                            <img className='pic' id='image2' src={profile2}></img>
                        </label>
                        <label className='profile'>
                            <input type="radio" id='profile3' value="../../assets/Ellipse -3.png" checked={contact.profilePic === "../../assets/Ellipse -3.png"} onChange={handleInput} name='profilePic' required />
                            <img className='pic' id='image3' src={profile3}></img>
                        </label>
                        <label className='profile'>
                            <input type="radio" id='profile4' value="../../assets/Ellipse -4.png" checked={contact.profilePic === "../../assets/Ellipse -4.png"} onChange={handleInput} name='profilePic' required />
                            <img className='pic' id='image4' src={profile4}></img>
                        </label>
                    </div><br></br>
                    <div className="row-content">
                        <label className="label-text" htmlFor="gender">Gender:</label>
                        <input className="radio-button" type="radio" id="male" name="gender" checked={contact.gender === 'male'} onChange={handleInput} value="male" />
                        <label className="text" htmlFor="male">Male</label>
                        <input className="radio-button" type="radio" id="female" name="gender" checked={contact.gender === 'female'} onChange={handleInput} value="female" />
                        <label className="text" htmlFor="female">Female</label>
                    </div>
                    <div className="row-content">
                        <label htmlFor="mobileNo" className="label-text">Phone Number:</label>
                        <input type="text" className="input" id="mobileNo" name="mobileNo" value={contact.mobileNo} onChange={handleInput} placeholder=" Phone Number.." required />
                    </div>
                    <p className="error">{error.mobileNo}</p>
                    <div className="row-content">
                        <label htmlFor="emailAddress" className="label-text">Email:</label>
                        <input type="text" className="input" id="emailAddress" name="emailAddress" value={contact.emailAddress} onChange={handleInput} placeholder="Email.." required />
                    </div>
                    <p className="error">{error.emailAddress}</p>

                    <div className="row-content">
                        <label htmlFor="address" className="label-text">Address:</label>
                        <input type="text" className="input" id="address" name="address" value={contact.address} onChange={handleInput} placeholder=" Address.." required />
                    </div>
                    <p className="error">{error.address}</p>
                    <div className="row-content">
                        <div className="column-content">
                            <label htmlFor="city" className="label-text1">City:</label>
                            <input type="text" className="input1" id="city" name="city" value={contact.city} onChange={handleInput} placeholder="City.." required />
                            <p className="error">{error.city}</p>
                        </div>
                        <div className="column-content">
                            <label htmlFor="state" className="label-text1">State:</label>
                            <input type="text" className="input1" id="state" name="state" value={contact.state} onChange={handleInput} placeholder="State.." required />
                            <p className="error">{error.state}</p>
                        </div>
                        <div className="column-content">
                            <label htmlFor="country" className="label-text1">Country:</label>
                            <input type="text" className="input1" id="country" name="country" value={contact.country} onChange={handleInput} placeholder="Country.." required />
                            <p className="error">{error.country}</p>
                        </div>
                    </div>
                    <div className="row-content">
                        <button type="reset" className="button updateButton">Reset</button>
                        <button type="submit" className="submit-button">{contact.isUpdate ? 'Update' : 'Submit'}</button>
                    </div><br></br>
                </form>
            </div>
        </>
    );
}

export default Form;