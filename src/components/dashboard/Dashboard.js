import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png'
import "./Dashboard.css";
import ContactService from "../../service/AddressService.js";
import profile1 from "../../assets/Ellipse -1.png";
import profile2 from "../../assets/Ellipse -2.png";
import profile3 from "../../assets/Ellipse -3.png";
import profile4 from "../../assets/Ellipse-4.png";
import delete1 from '../../assets/delete-black-18dp.svg';
import edit from '../../assets/create-black-18dp.svg';
import { withRouter } from "react-router-dom";

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts: [],
        }
    }

    componentDidMount = () => {
        ContactService.getContact().then(response => {
            const contact = response.data;
            this.setState({ contacts: contact });
        })
    }

    deleteMethod = (contactID) => {
        ContactService.deleteConatact(contactID);
        window.location.assign(`http://localhost:3000/`);
        window.location.assign(`http://localhost:3000/`);
        //this.props.history.push('/');
        //window.history.pushState("/");
    }

    updateContact = (contactId) => {
        this.props.history.push({
            pathname: "/form",
            state: contactId,
        });
    }
    render() {
        return (
            <>
                <header className="header-container">
                    <div className="logo-content">
                        <Link to="/form"><img src={logo} /></Link>
                    </div>
                    <div>
                        <div className="header-text">ADDRESS</div>
                        <div className="headet-text-book">BOOK</div>
                    </div>
                </header>
                <div className="table-main">
                    <div className="header">
                        <div className="contact-details">Contact Details <div className="contact-count">{this.state.contacts.length}</div>
                            <Link to='/form'><button>Add User</button></Link>
                        </div>
                    </div>
                    <div className='table-content'>
                        <table className="table">
                            <thead>
                                <tr className='head-content'>
                                    <th className='colum-name'>Profile</th>
                                    <th className='colum-name'>Firstname</th>
                                    <th className='colum-name'>Lastname</th>
                                    <th className='colum-name'>Gender</th>
                                    <th className='colum-name'>Phone-No</th>
                                    <th className='colum-name'>Email</th>
                                    <th className='colum-name'>Address</th>
                                    <th className='colum-name'>City</th>
                                    <th className='colum-name'>State</th>
                                    <th className='colum-name'>Country</th>
                                    <th className='colum-name'>Action</th>
                                </tr>
                            </thead>
                            {
                                this.state.contacts.map(
                                    contact =>
                                        <tr key={contact.personID}>
                                            <td><img className="profilePic" src={
                                                contact.profilePic === "../../assets/Ellipse -1.png" ? profile1
                                                    : contact.profilePic === "../../assets/Ellipse -2.png" ? profile2
                                                        : contact.profilePic === "../../assets/Ellipse -3.png" ? profile3
                                                            : profile4
                                            }
                                            /></td>
                                            <td>{contact.firstName}</td>
                                            <td>{contact.lastName}</td>
                                            <td>{contact.gender}</td>
                                            <td>{contact.mobileNo}</td>
                                            <td>{contact.emailAddress}</td>
                                            <td>{contact.address}</td>
                                            <td>{contact.city}</td>
                                            <td>{contact.state}</td>
                                            <td>{contact.country}</td>
                                            <td>
                                                <img className="icon" name={contact.personId} src={edit} alt="update" onClick={() => this.updateContact(contact.personID)} />
                                                <img className="icon" name={contact.personId} src={delete1} alt="delete" onClick={() => this.deleteMethod(contact.personID)} />
                                            </td>
                                        </tr>
                                )
                            }
                        </table>
                    </div>
                </div>
            </>
        );
    }
}
export default withRouter(Dashboard)
