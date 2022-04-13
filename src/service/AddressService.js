import axios from "axios";
class AddressService{
    baseURL=`http://localhost:8080/personlist`;

    addContact(data){
        //return axios.post(this.baseURL+`/create`,data)
        return axios.post(`http://localhost:3006/addressBook`,data);
    }

    getContact(){
        return axios.get(this.baseURL+`/get`);
    }

    deleteConatact(contactID){
        return axios.delete(this.baseURL+`/delete/${contactID}`);
    }

    updateMethod(contactID,object){
        return axios.put(this.baseURL+`/update/${contactID}`,object);
    }

    getConatctByID(contactID){
        return axios.get(this.baseURL+`/getbyid/${contactID}`);

    }
}
export default new AddressService();