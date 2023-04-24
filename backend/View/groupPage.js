         const groups = document.querySelectorAll('#groups li a');
        const createGroupBtn = document.querySelector('#create-group-btn');
        const modal = document.querySelector('#modal');
        const closeBtn = document.querySelector('#close-btn');
        const createGroupForm = document.querySelector('#create-group-form');
        const createGroupSubmitBtn = document.querySelector('#create-group-submit');
        const messageForm = document.querySelector('#message-form');
        const messageInput = document.querySelector('#message-input');
        const messageList = document.querySelector('#message-list');
        const createGroupButton = document.getElementById("create-group-btn");
        const showGroupList = document.getElementById("showgroup");
        const userList = document.getElementById('user-list-container');
        const groupnameInput=document.getElementById('group-name');
        
        // Toggle modal when Create Group button is clicked
        createGroupBtn.addEventListener('click',() => {
            
                 axios.get("http://localhost:3000/UserDetail")
                 .then((Userlist)=>{
                    addUserToList(Userlist);
                    console.log(Userlist);
                    modal.style.display = 'flex';
                 }).catch((error)=>{
                    console.log(error)
                 })
                
               // console.log(Userlist);
                 
            
            
        });
        
        // Close modal when Close button is clicked
        closeBtn.addEventListener('click', () => {

        modal.style.display = 'none';
        });
        
        //cr

        

// Add a click event listener to the "create group" button
//   createGroupSubmitBtn.addEventListener("click", function() {
//   //Create a new list item and link element for the new group
//       // const newGroupListItem = document.createElement("li");
//       // const newGroupLink = document.createElement("a");
//       // newGroupLink.textContent = "Group 4"; // set the text for the new link

//       // // Add the link to the list item and the list item to the "showgroup" list
//       // newGroupListItem.appendChild(newGroupLink);
//       const CreateGroupData={
//                 groupname:groupnameInput.value,
//                 groupUserid:1
//       }

//       const newGroupListItem=  `<li><a href="#">fdkj;l</a></li>`;

//       showGroupList.innerHTML+=newGroupListItem;
//       // showGroupList.appendChild(newGroupListItem);
// });

        // Create group when Create button is clicked
        createGroupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const groupName = document.querySelector('#group-name').value;
        const members = document.querySelector('#members').value.split(',');

        
        // Do something with groupName and members
        modal.style.display = 'none';
        });
        
        // Send message when Send button is clicked
        messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        // Do something with message
        messageInput.value = '';
        const messageElem = document.createElement('p');
        messageElem.textContent = message;
         messageList.appendChild(messageElem);
        });
        
        // Switch between groups when a group is clicked
        groups.forEach((group) => {
        group.addEventListener('click', () => {
        const groupName = group.textContent;
        // Do something with groupName
        });
        });
        
        //this function use for adding li tag

    function addUserToList(user) {
          // create new list item element
           userList.innerHTML="";
          for (let index = 0; index < user.data.userDetail.length; index++) {
          
          const listItem = document.createElement('li');
          
          // create new input checkbox element
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.name = 'user';
           checkbox.value = user.data.userDetail[index].id;
          
          // create new label element
          const label = document.createElement('label');
          label.htmlFor = user.data.userDetail[index].id;
          label.textContent = user.data.userDetail[index].username;
          
          // append checkbox and label to list item
          listItem.appendChild(checkbox);
          listItem.appendChild(label);
          
          // append list item to unordered list
          
          userList.appendChild(listItem);
    }
    // const element = array[index];
            
}



createGroupSubmitBtn.addEventListener("click",  async function(event) {
    event.preventDefault(); // Prevent the form from submitting
  
    // Get all the checkboxes
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    
    // Create an array to store the selected values
    var selectedValues = [];
    
    // Loop through each checkbox and add its value to the array
    checkboxes.forEach(function(checkbox) {
      selectedValues.push(parseInt(checkbox.value));
    });
    
    // Do something with the selected values, like send them to a server
    console.log(selectedValues);


    const CreateGroupData={
                        groupname:groupnameInput.value,
                        groupUseridArray:selectedValues
              }

       
    await axios.post('http://localhost:3000/createGroup',CreateGroupData);
    const newGroupListItem=  `<li><a href="#">${groupnameInput.value}</a></li>`;

       showGroupList.innerHTML+=newGroupListItem;
    // http://localhost:3000/login
  });

      
  window.addEventListener('DOMContentLoaded',async (event)=>{
   try {
         event.preventDefault();
         const token=localStorage.getItem('token');
         const groupname=await axios.get(`http://localhost:3000/FetchGroupName`,{
            headers: {
              'Authorization':token
            }
          });
         console.log(groupname);
         GroupNameOnScreen(groupname)
   } catch (error) {
      console.log(error);
   }
      
  })


  function GroupNameOnScreen(groupname)
  {      showGroupList.innerHTML="";
         for (let index = 0; index < groupname.data.groupname.length; index++) {
            
            const newGroupListItem=  `<li id="${groupname.data.groupname[index].id}" ondblclick="myFunction(${groupname.data.groupname[index].id},'${groupname.data.groupname[index].groupName}')"><a href="#">${groupname.data.groupname[index].groupName}</a></li>`;
            newGroupListItem.style
            showGroupList.innerHTML+=newGroupListItem;
            
         }
     
  }

  async function myFunction(groupid,groupName)
  {
      alert("i am calling"+" "+groupid+groupName);
      document.getElementById("groupnameId").innerText=groupName;
      localStorage.setItem("groupid",groupid);

      const token=localStorage.getItem('token');
      const userchat= await axios.get(`http://localhost:3000/fetchGroupChat?groupid=${groupid}`,{
         headers: {
        'Authorization':token
      } 
   });

   console.log(userchat.data);
    addMessageOnScreen(userchat)
  }


  document.getElementById("send-btn").addEventListener('click', async (e)=>{
   try {
         e.preventDefault();
         const message = messageInput.value;
         // Do something with message
         messageInput.value = '';
         const messageElem = document.createElement('p');
         messageElem.textContent = message;
         messageList.appendChild(messageElem);
         // alert("i am input box");
         
         const msg={
            message,
            groupid:localStorage.getItem('groupid')
        }
        const token=localStorage.getItem('token');
        const respone=await axios.post("http://localhost:3000/addGroupMessage",msg, {
          headers: {
            'Authorization':token
          }
        });
   } catch (error) {
         console.log(error);
   }
        
  })



  

 function addMessageOnScreen(message)
{
  
  // messageList.innerHTML="";
  console.log(message);
  for (let index = 0; index < message.data.userchat.length; index++) {

        if(message.data.userchat[index].tbluserdetailId===userid)
        {
         
         console.log("i am in")
            //   newMessage.innerHTML =`
            //   <div class="message-content">
            //     <p>${message.data.userchat[index].message}</p>
            //   </div>
            //   <div class="message-sender">
            //     <span>You</span>
            //   </div>`;
            // const   newGroupListItem=  `<li><a href="#">fdkj;l</a>ff</li>`;
            //    // newGroupListItem.style.textAlign = "right";
            //    showGroupList.innerHTML+=newGroupListItem;
            const messageElem = document.createElement('p');
            messageElem.textContent =message.data.userchat[index].message ;
            messageElem.style.textAlign="right";
             messageList.appendChild(messageElem);
               
         }else{
                console.log("jello ajay");
            //     newMessage.innerHTML = `
            //     <div class="message-sender">
            //       <span>${message.data.userchat[index].tbluserdetail.username}</span>
            //     </div>
            //     <div class="message-content">
            //       <p>${message.data.userchat[index].message}</p>
            //     </div>`;
            //   newMessage.style.textAlign= "left";
            //   newGroupListItem=  `<li><a href="#">fdkj;l</a></li>`;
              // newGroupListItem.style.textAlign = "right";
            //   showGroupList.innerHTML+=newGroupListItem;
        

              const messageElem = document.createElement('p');
            messageElem.textContent =message.data.userchat[index].message ;
            messageElem.style.textAlign="left";
             messageList.appendChild(messageElem);
        // messageList.scrollTop = messageList.scrollHeight - messageList.clientHeight;
        }
     
      
  } 
}

var uname=""; 
var userid=0;

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

(function(){
 const userdetail= parseJwt (localStorage.getItem('token'));
 console.log(userdetail);
 uname=userdetail.username;
 userid=userdetail.userid;
 console.log('userid'+userid);
//  document.getElementById('username').innerText=userdetail.username;
}())
