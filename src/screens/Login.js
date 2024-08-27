import React,{useState} from 'react'
import { Link , useNavigate} from 'react-router-dom';
import Navbar from '../components/navbar';

export default function Login() {
  const [credentials, setCredentials] = useState({ name: "", password: ""});
  let navigate=useNavigate()

  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("https://gofoods-backend.onrender.com/api/loginuser", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email:credentials.email,password:credentials.password})
      });
      const json=await response.json();
      console.log(json);  

      if(!json.success){
          alert("enter valid credentials");
      }
      if(json.success){
        localStorage.setItem("authToken",credentials.email);
        localStorage.setItem("userEmail",json.authToken);
        console.log(localStorage.getItem("authToken"))
        navigate("/")
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
}

  return (
    <div>
        <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
       <div className='container'>
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={handleInputChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/createuser" className="m-3 btn btn-danger">i'm a new User?</Link>
                </form>
            </div>
            </div>
    </div>
  )
}

