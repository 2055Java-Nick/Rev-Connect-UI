import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react'
import axios from 'axios';
import { useUser } from '../Context/UserContext';
import EndorsementLinkForm from '../EndorsementLinkForm';



  interface BusinessProfileProps{   

  }

const BusinessProfile: React.FC<BusinessProfileProps> = ({ }) => {
    let { id } = useParams();

    const [bioText, setBioText] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [bioFormData, setBioFormData] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [business, setBusiness] = useState<boolean>(false);
    const [profileUserId, setProfileUserId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { user, setUser } = useUser();
 
    useEffect(() => {
        // console.log('User context:', user);
    }, [user]);


    useEffect(() => {
        axios.get(path_url)
            .then((response) => {
                console.log(response);
                setBioText(response.data.BIO_TEXT);
                setBioFormData(response.data.BIO_TEXT);
                setUsername(response.data.USERNAME);
                setFirstName(response.data.FIRSTNAME);
                setLastName(response.data.LASTNAME);
                setEmail(response.data.EMAIL);
                setBusiness(response.data.IS_BUSINESS);
                setProfileUserId(response.data.USER_ID);
                setError(null);
            })
            .catch((error) => {
                console.error(error);
                setError("No Profile For This User");
            });
    }, []);

    const path_url = `http://localhost:8080/profile/business/${id}`;

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
        setSuccess("Bio Updated!");
        setIsEditing(false);
    };

  return (
    <div>
        <img src="/src/assets/Revconnect.png" alt='RevConnect Logo' className='w-25 mx-3 my-3'/>
        {
          error ? (
            <p>{error}</p>
          ) : (
        <div className='d-flex flex-column justify-content-center align-items-center text-center'>
            <h1 className='text-center'>
            { username }
            </h1>
            <div className="border rounded px-5 py-1">
              <p className="text-center">{ `${ firstName } ${ lastName }` }</p>
              <p className="text-center">{ email }</p>
            </div>
          {
               //business ? ***ADD LINKS COMPONENT*** : null
          }
  
          { isEditing ? (
          <form onSubmit={ handleSubmit } className="text-center">
            <textarea
              value={ bioFormData }
              onChange={ handleChange }
              placeholder="Tell Everyone About Yourself!"
            />
            <div className="text-center">
              <button type="submit" disabled={ bioFormData.length > 500 ? true : false}>Submit</button>
              <button type="button" onClick={ toggleEdit }>
                  Cancel
              </button>
            </div>
          </form>
          ) : (
          <div>
            <div className="text-center border rounded px-5 py-2">
              <h3 className='rounded px-5 py-2'>About:</h3>
              <p className="BusinessProfile_bio">
                { bioText ? bioText : "Tell Everyone About Yourself!" }
              </p>
            </div>
              {
                 (user && profileUserId) && user.id == profileUserId.toString() ? <button onClick={toggleEdit} className='my-2'>Edit</button> : null
              }
              {
                success ? <p className="py-2">{success}</p> : null
              }
            </div>
        )}
        </div> 
        )
      }
    </div>
  )
}

export default BusinessProfile;