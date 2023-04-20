const email=document.getElementById('email');
const password=document.getElementById('pwd');

 async function loginChecking(event)
 {
    try {
        
            event.preventDefault();
            console.log(email.value);
            console.log(password.value);
            const loginData={
                email:email.value,
                password:password.value,
            }
            const respose=await axios.post("http://localhost:3000/login",loginData);
            console.log(respose.data.userdata);
            if(respose.data.success===true)
            {
                
                    console.log(respose.data.msg+""+respose.data.userdata);
                    localStorage.setItem("token",respose.data.userdata);
                    location.href='chatpage.htm'
            }else{
                console.log(respose.data.msg);
            }

    } catch (error) {
            console.log(error);
    }
 }