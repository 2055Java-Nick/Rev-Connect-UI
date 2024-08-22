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
    const [endorsementLinks, setEndorsementLinks] = useState<EndorsementLink[]>([]);
    const { user, setUser } = useUser();

    useEffect(() => {
        // console.log('User context:', user);
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

    const handleAddOrUpdateLink = async (endorsementLink: EndorsementLink) => {
      try {
        let updatedLink: EndorsementLink[];
        if (endorsementLink.id) {
          updatedLink = await updateEndorsementLinkService(endorsementLink);
          setEndorsementLinks((endorsementLinks) => ((endorsementLink.id === updatedLink?.id)) ? updatedLink : endorsementLinks);
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
                            {endorsementLinks.map((link) => (
                                <div key={link.id} className="py-2">
                                    <a href={link.link} target="_blank" rel="noopener noreferrer">
                                        {link.linkText}
                                    </a>
                                    <button onClick={() => handleDeleteLink(link.id!)} className="mx-3">
                                      Delete
                                    </button>
                                </div>
                            ))}
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