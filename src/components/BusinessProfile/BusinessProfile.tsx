import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react'
import axios from 'axios';

interface BusinessProfileProps{   

     }

const BusinessProfile: React.FC<BusinessProfileProps> = ({ }) => {
    let { id } = useParams();
    const path_url = `http://localhost:8080/profiles/business/${id}`;
    const [bioText, setBioText] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [bioFormData, setBioFormData] = useState<string>('');

     useEffect(() => {
        axios.get(path_url)
            .then((response) => {
                setBioText(response.data.bioText)
                setBioFormData(response.data.bioText)
            })
            .catch((error) => {
                console.error(error);
            });
     }, []);

    // temporary User Object
    const tempUser = { 
        id: 1234,
        username: "TestDummy1234",
        firstName: "John",
        lastName: "Doe",
        email: "testdummy1234@email.notreal",
        isBusiness: true
    } 

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBioFormData(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.patch(path_url, {
            bioText: bioFormData
        }).then((response) => {
            setBioText(response.data.bioText)
            setBioFormData(response.data.bioText)
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
        <h1 className='BusinessProfile_title'>Business Profile</h1>
        <p>{ `${tempUser.firstName} ${tempUser.lastName}` }</p>
        <p>{ tempUser.email }</p>
        
        {
            tempUser.isBusiness ? <h2>&lt; Links /&gt; Component (to be added)</h2> : null
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
            <button onClick={toggleEdit}>Edit</button>
        </div>
      )}
    </div>
  )
}

export default BusinessProfile;