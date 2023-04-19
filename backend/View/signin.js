const name=document.getElementById('name');
const email=document.getElementById('email');
const mobile=document.getElementById('mobile');
const password=document.getElementById('pwd');

 async function AddUser(event)
{
    event.preventDefault();
    console.log(name.value);
    try {
        
            const UserData={
                name:name.value,
                email:email.value,
                mobile:mobile.value,
                password:password.value
            }
            
                const response= await axios.post("http://localhost:3000/adduserdetail",UserData);
                if(response.data.success===true)
                {
                    console.log("Insert  successfully");
                }else {
                    console.log("Email id Exists");
                }
                // if(response.data)
                //  console.log(name.value);
      } catch (error) {
            console.log(error);
    }   
}