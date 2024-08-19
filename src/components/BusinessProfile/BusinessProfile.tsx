import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react'
import axios from 'axios';

interface BusinessProfileProps{   

     }

const BusinessProfile: React.FC<BusinessProfileProps> = ({ }) => {
    let { id } = useParams();

    const [bioText, setBioText] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [bioFormData, setBioFormData] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [business, setBusiness] = useState(false);
    const [profileUserId, setProfileUserId] = useState('');


    useEffect(() => {
        axios.get(path_url)
            .then((response) => {
                setBioText(response.data.BIO_TEXT)
                setBioFormData(response.data.BIO_TEXT)
                setUsername(response.data.USERNAME)
                setFirstName(response.data.FIRSTNAME)
                setLastName(response.data.LASTNAME)
                setEmail(response.data.EMAIL)
                setBusiness(response.data.IS_BUSINESS)
                setProfileUserId(response.data.USER_ID)
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // temporary AuthUser Object
    const tempUser = { 
      id: 1234,
      username: "TestDummy1234",
      firstName: "John",
      lastName: "Doe",
      email: "testdummy1234@email.notreal",
      isBusiness: true
    } 

    const path_url = `http://localhost:8080/profiles/business/${id}`;

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBioFormData(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.patch(path_url, {
            bioText: bioFormData.trim()
        }).then((response) => {
            setBioText(response.data.BIO_TEXT)
            setBioFormData(response.data.BIO_TEXT)
        })
        .catch((error) => {
            console.error(error);
        });
        
        console.log("Bio updated");
        alert("Bio Updated!");
        setIsEditing(false);
    };

  return (
    <div className='BusinessProfile'>
        <h1 className='BusinessProfile_title'>
          { username }
        </h1>
        <p>{ `${ firstName } ${ lastName }` }</p>
        <p>{ email }</p>
        
        {
            business ? <h2>&lt; Links /&gt; Component (to be added)</h2> : null
        }

        { isEditing ? (

        <form onSubmit={ handleSubmit }>
          <textarea
            value={ bioFormData }
            onChange={ handleChange }
            placeholder="Tell Everyone About Yourself!"
          />
          <div>
            <button type="submit">Submit</button>
            <button type="button" onClick={ toggleEdit }>
                Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h2 className="BusinessProfile_bio">
            { bioText ? bioText : "Tell Everyone About Yourself!" }
          </h2>
          {
            // If authUser id = profile.user_id, option to edit bio
            // User.id === profileUserId ? <button onClick={toggleEdit}>Edit</button> : null
            <button onClick={toggleEdit}>Edit</button>
          }
        </div>
      )}
    </div>
  )
}

export default BusinessProfile;