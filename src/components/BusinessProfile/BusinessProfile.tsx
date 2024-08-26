import {
  createEndorsementLinkService,
  deleteEndorsementLinkService,
  getEndorsementLinksService,
  updateEndorsementLinkService,
} from "../../api/endorsementLinkService";
import { useEffect, useState } from 'react';

import EndorsementLinkForm from './EndorsementLinkForm';
import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useUser } from '../Context/UserContext';



  interface BusinessProfileProps{   

  }

interface EndorsementLink {
  id?: number;
  userId: number;
  link: string;
  linkText: string;
}

const BusinessProfile: React.FC<BusinessProfileProps> = ({ }) => {
  // destructing the id that is included in the url path
  let { id } = useParams();

    const [bioText, setBioText] = useState<string>('');                               // Api profile entity bio
    const [isEditing, setIsEditing] = useState<boolean>(false);                       // state to toggle editing bio
    const [bioFormData, setBioFormData] = useState<string>('');                       // form input state for updating bio
    const [success, setSuccess] = useState<string>('');                               // success message for updating bio
    const [username, setUsername] = useState<string>('');                             // Api profile entity
    const [firstName, setFirstName] = useState<string>('');                           // Api profile entity first name of profile user
    const [lastName, setLastName] = useState<string>('');                             // Api profile entity last name of profile user
    const [email, setEmail] = useState<string>('');                                   // Api profile entity email address
    const [business, setBusiness] = useState<boolean>(false);                         // Api profile entity value of whether this is a business profile or not
    const [profileUserId, setProfileUserId] = useState<number | null>(null);          // Api profile entity User_id
    const [error, setError] = useState<string | null>(null);                          // error depending on whether a profile exists for a user
    const [endorsementLinks, setEndorsementLinks] = useState<EndorsementLink[]>([]);
    const { user, setUser } = useUser();                                              // Logged in user from UserContext

    useEffect(() => {
        //console.log('User context:', user);
    }, [user]);

    useEffect(() => {
      if (business) {
        getEndorsementLinksService(Number(profileUserId))
          .then((data) => {
            setEndorsementLinks(data);
          })
          .catch((error) => {
            console.error('Error fetching endorsement links:', error);
          });
      }
    }, [business, profileUserId]); 

    // Setting states from Api profile object, dependency is path parameter id
    useEffect(() => {
        axios.get(path_url)
            .then((response) => {
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
    }, [id]);

    // path variable for business profile calls
    const path_url = `http://localhost:8080/profile/business/${id}`;

    // toggles display/access to the update bio textarea field
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    // handles textarea value change
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBioFormData(event.target.value);
    };

    // handles submitting a new bio update
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

    const handleAddOrUpdateLink = async (endorsementLink: EndorsementLink) => {
      try {
        let updatedLink: EndorsementLink;
        if (endorsementLink.id) {
          updatedLink = await updateEndorsementLinkService(endorsementLink);
          setEndorsementLinks(
            endorsementLinks.map(endorsementLink => endorsementLink.id === updatedLink.id ? updatedLink : endorsementLink)
          );
        } else {
          updatedLink = await createEndorsementLinkService(endorsementLink);
          setEndorsementLinks((endorsementLinks) => [...endorsementLinks, updatedLink]);
        }
        
      } catch (error) {
        console.error(`Error adding or updating link: ${error}`);
      }
    }

    const handleDeleteLink = async (id: number) => {
      try {
        await deleteEndorsementLinkService(id);
        setEndorsementLinks((endorsementLinks) => endorsementLinks.filter((link) => link.id !== id));
      } catch (error) {
        console.error(`Error deleting link: ${error}`);
      }
    }

  return (
    <div>
        <img src="/src/assets/Revconnect.png" alt='RevConnect Logo' className='w-25 mx-3 my-3'/>
        {
          error ? (
            <p>{error}</p>
          ) : (
        <div className='d-flex flex-column justify-content-center align-items-center text-center '>
          <div className="border rounded px-2 py-3">
            <h1 className='text-center'>
            { username }
            </h1>
            <div className="px-5 py-1">
              <p className="text-center">{ `${ firstName } ${ lastName }` }</p>
              <p className="text-center">{ email }</p>
            </div>
        </div>
            {
                business ? (
                    <div className="border rounded px-5 py-1 my-3">
                        <h2>Manage Your Endorsement Links</h2>
                        <EndorsementLinkForm userId={Number(profileUserId)} onSubmit={handleAddOrUpdateLink} />
                        <div className="py-3">
                            {endorsementLinks && endorsementLinks.map && endorsementLinks.map(link => {
                              return(
                              <div key={link.id} className="py-2">
                                <a href={link.link} target="_blank" rel="noopener noreferrer">
                                    {link.linkText}
                                </a>
                                <button onClick={() => handleDeleteLink(link.id!)} className="mx-3">
                                  Delete
                                </button>
                              </div>)
                              }) 
                            }
                        </div>
                    </div>
                ) : null
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