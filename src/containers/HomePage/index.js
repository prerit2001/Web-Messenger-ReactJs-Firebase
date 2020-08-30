import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { getRealtimeUsers, updateMessage, getRealtimeConversation } from '../../actions'

/**
* @author
* @function HomePage
**/


const User = (props) => {


    const {user, onClick} = props;
  
    return (
      <div onClick={() => onClick(user)} className="displayName">
                    <div className="displayPic">
                        <img src="https://www.kindpng.com/picc/m/145-1454384_contact-tie-user-default-suit-display-woman-icon.png" alt="" />
                    </div>
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                        <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
                        <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
                    </div>
                </div>
    );
  }

const HomePage = (props) => {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [message, setMessage] = useState('');
  const [userUid, setUserUid] = useState(null);

  let unsubscribe;

  useEffect(() => {
    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
    .then(unsubscribe => {
        return unsubscribe;
    })
    .catch(error => {
        console.log(error);
    })

    
  }, []);

  console.log(user);

  useEffect(() => {
    return () => {
        //cleanup
        unsubscribe.then(f => f()).catch(error => console.log(error));
    }
  }, []);

  const initChat = (user) => {

    setChatStarted(true)
    setChatUser(`${user.firstName} ${user.lastName}`)
    setUserUid(user.uid);
    dispatch(getRealtimeConversation({ uid_1: auth.uid, uid_2: user.uid }));

  }

  const submitmessages = (e) => {
    const msgObj = {
        user_uid_1: auth.uid,
        user_uid_2: userUid,
        message: message
    }

    if(message!=""){
        dispatch(updateMessage(msgObj))
        .then(() => {
          setMessage('')
        });
      }
    

    console.log(msgObj);
  }

  return(
    <Layout>

      <section className="container">
        <div className="listOfUsers">
        <div className="displayName">
                <div className="displayPic">
                    <img src="https://icon-library.com/images/customer-service-icon-png/customer-service-icon-png-11.jpg" alt="" />
                </div>
                <div style={{display: 'flex' ,flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                    <span style={{fontWeight: 500}}><div>Prerit Kumar Jha</div><div>@Creater</div></span>
                    <span className='onlineStatus'></span>
                </div>
        </div>

        {
            user.users.length > 0 ? 
            user.users.map(user => {
                return(
                    <User
                     onClick={initChat}
                     key={user.uid} 
                     user={user}
                      />
                )
            })  : null 
        }

           
                    
        </div>
        <div className="chatArea">
            <div className="chatHeader">
             {   chatStarted ? chatUser : 'Prerit Kumar Jha @ Creater @ Contact Us @ preritkrjha@gmail.com' }
            </div>
            
            <div className="messageSections">
                {
                  chatStarted ? 
                  user.conversations.map(con =>
                    <div style={{ textAlign: con.user_uid_1 == auth.uid ? 'right' : 'left' }}>
                    <p className="messageStyle" >{con.message}</p>
                  </div> )
                  : null
                }
                

            </div>
            <div className="chatControls">
                <textarea 
                    value = {message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Messages Here"
                />
                <button onClick={submitmessages}>Send</button>
            </div>
        </div>
      </section>
    </Layout>
   )

 }

export default HomePage