import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import './index.css'

const App = () => {

    const [errorFirstName, setErrorFirstName] = useState('*This field cannot be empty');
    const [errorLastName, setErrorLastName] = useState('*This field cannot be empty');
    const [errorEmail, setErrorEmail] = useState('*This field cannot be empty');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    function validateFirstName(e){
        if(e.target.value === ""){
            setErrorFirstName('*This field cannot be empty')   
        }else if(!(/^[A-Za-z\s]*$/.test(e.target.value))){
            setErrorFirstName('*Can contain only letters and spaces')
        }else{
            setErrorFirstName('')
        }
        setFirstName(e.target.value)
    }

    function validateLastName(e){
        if(e.target.value === ""){
            setErrorLastName('*This field cannot be empty')   
        }else if(!(/^[A-Za-z\s]*$/.test(e.target.value))){
            setErrorLastName('*Can contain only letters and spaces')
        }else{
            setErrorLastName('')
        }
        setLastName(e.target.value)
    }

    function validateEmail(e){
        if(e.target.value === ""){
            setErrorEmail('*This field cannot be empty')   
        }else if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value))){
            setErrorEmail('*Invalid email address')
        }else{
            setErrorEmail('')
        }
        setEmail(e.target.value)
    }

    const [usersInDB, setUsersInDB] = useState([]);

    function fetchDbData() {
        fetch('http://localhost:3001/api/users')
            .then(r => r.json())
            .then((data) => {
                setUsersInDB(data)
            })
    }

    useEffect(() => {
        fetchDbData()
    }, [])

    
    let handleSubmit = async (e) => {
        e.preventDefault();

        if(errorFirstName===""&&errorLastName===""&&errorEmail===""){
            try {
            let req = await fetch("http://localhost:3001/api/users", {
                method: "POST",
                body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            console.log(req);
            if (req.status === 200) {
                setFirstName("");
                setLastName("");
                setEmail("");
                setErrorFirstName('*This field cannot be empty');
                setErrorLastName('*This field cannot be empty');
                setErrorEmail('*This field cannot be empty')
                fetchDbData()
            }}
            catch (err) {
            console.log(err);
            }
        } else {
            alert("There is a field with an error");
        }
  };

    return (
        <div className="test">
            <div className="userData">
                <h3>Form</h3>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Firstname" name="firstName" value={firstName} onChange={(e)=>validateFirstName(e)}></input>
                    {!errorFirstName? <span>&nbsp;</span> : <span>{errorFirstName}</span>}
                    <input placeholder="Lastname" name="lastName" value={lastName} onChange={(e)=>validateLastName(e)}></input>
                    {!errorLastName? <span>&nbsp;</span> : <span>{errorLastName}</span>}
                    <input placeholder="Email" name="email" value={email} onChange={(e)=>validateEmail(e)}></input>
                    {!errorEmail? <span>&nbsp;</span> : <span>{errorEmail}</span>}
                    <button type="submit">Send</button>
                </form>
            </div>
            <div className="table">                
                <table>
                    <tbody>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                    </tr>
                    {usersInDB.map(user => (
                        <tr key={user._id}>
                            <th className="users">{user.firstName}</th>
                            <th className="users">{user.lastName}</th>
                            <th className="users">{user.email}</th>
                        </tr>
                    ))}
                    </tbody>
                </table>            
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
//ReactDOM.render(<App />, document.getElementById("app"));