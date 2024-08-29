// import {
//   createEndorsementLinkService,
//   deleteEndorsementLinkService,
//   getEndorsementLinksService,
//   updateEndorsementLinkService,
// } from "../../api/endorsementLinkService";
// import { useEffect, useState } from 'react';

// import EndorsementLinkForm from './EndorsementLinkForm';
// import React from 'react'
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useUser } from '../Context/UserContext';



//   interface BusinessProfileProps{   

//   }

// interface EndorsementLink {
//   id?: number;
//   userId: number;
//   link: string;
//   linkText: string;
// }

// const BusinessProfile: React.FC<BusinessProfileProps> = ({ }) => {
//   // destructing the id that is included in the url path
//   let { id } = useParams();

//     const [bioText, setBioText] = useState<string>('');                               // Api profile entity bio
//     const [isEditing, setIsEditing] = useState<boolean>(false);                       // state to toggle editing bio
//     const [bioFormData, setBioFormData] = useState<string>('');                       // form input state for updating bio
//     const [success, setSuccess] = useState<string>('');                               // success message for updating bio
//     const [username, setUsername] = useState<string>('');                             // Api profile entity
//     const [firstName, setFirstName] = useState<string>('');                           // Api profile entity first name of profile user
//     const [lastName, setLastName] = useState<string>('');                             // Api profile entity last name of profile user
//     const [email, setEmail] = useState<string>('');                                   // Api profile entity email address
//     const [business, setBusiness] = useState<boolean>(false);                         // Api profile entity value of whether this is a business profile or not
//     const [profileUserId, setProfileUserId] = useState<number | null>(null);          // Api profile entity User_id
//     const [error, setError] = useState<string | null>(null);                          // error depending on whether a profile exists for a user
//     const [endorsementLinks, setEndorsementLinks] = useState<EndorsementLink[]>([]);
//     const { user, setUser } = useUser();                                              // Logged in user from UserContext

//     useEffect(() => {
//         //console.log('User context:', user);
//     }, [user]);

//     useEffect(() => {
//       if (business) {
//         getEndorsementLinksService(Number(profileUserId))
//           .then((data) => {
//             setEndorsementLinks(data);
//           })
//           .catch((error) => {
//             console.error('Error fetching endorsement links:', error);
//           });
//       }
//     }, [business, profileUserId]); 

//     // Setting states from Api profile object, dependency is path parameter id
//     useEffect(() => {
//         axios.get(path_url)
//             .then((response) => {
//                 setBioText(response.data.BIO_TEXT);
//                 setBioFormData(response.data.BIO_TEXT);
//                 setUsername(response.data.USERNAME);
//                 setFirstName(response.data.FIRSTNAME);
//                 setLastName(response.data.LASTNAME);
//                 setEmail(response.data.EMAIL);
//                 setBusiness(response.data.IS_BUSINESS);
//                 setProfileUserId(response.data.USER_ID);
//                 setError(null);
//             })
//             .catch((error) => {
//                 console.error(error);
//                 setError("No Profile For This User");
//             });
//     }, [id]);

//     // path variable for business profile calls
//     const path_url = `http://localhost:8080/profile/business/${id}`;

//     // toggles display/access to the update bio textarea field
//     const toggleEdit = () => {
//         setIsEditing(!isEditing);
//     };

//     // handles textarea value change
//     const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setBioFormData(event.target.value);
//     };

//     // handles submitting a new bio update
//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         axios.patch(path_url, {
//             bioText: bioFormData.trim()
//         }).then((response) => {
//             setBioText(response.data.BIO_TEXT)
//             setBioFormData(response.data.BIO_TEXT)
//         })
//         .catch((error) => {
//             console.error(error);
//         });
        
//         console.log("Bio updated");
//         setSuccess("Bio Updated!");
//         setIsEditing(false);
//     };

//     const handleAddOrUpdateLink = async (endorsementLink: EndorsementLink) => {
//       try {
//         let updatedLink: EndorsementLink;
//         if (endorsementLink.id) {
//           updatedLink = await updateEndorsementLinkService(endorsementLink);
//           setEndorsementLinks(
//             endorsementLinks.map(endorsementLink => endorsementLink.id === updatedLink.id ? updatedLink : endorsementLink)
//           );
//         } else {
//           updatedLink = await createEndorsementLinkService(endorsementLink);
//           setEndorsementLinks((endorsementLinks) => [...endorsementLinks, updatedLink]);
//         }
        
//       } catch (error) {
//         console.error(`Error adding or updating link: ${error}`);
//       }
//     }

//     const handleDeleteLink = async (id: number) => {
//       try {
//         await deleteEndorsementLinkService(id);
//         setEndorsementLinks((endorsementLinks) => endorsementLinks.filter((link) => link.id !== id));
//       } catch (error) {
//         console.error(`Error deleting link: ${error}`);
//       }
//     }

//   return (
//     <div>
//         <img src="/src/assets/Revconnect.png" alt='RevConnect Logo' className='w-25 mx-3 my-3'/>
//         {
//           error ? (
//             <p>{error}</p>
//           ) : (
//         <div className='d-flex flex-column justify-content-center align-items-center text-center '>
//           <div className="border rounded px-2 py-3">
//             <h1 className='text-center'>
//             { username }
//             </h1>
//             <div className="px-5 py-1">
//               <p className="text-center">{ `${ firstName } ${ lastName }` }</p>
//               <p className="text-center">{ email }</p>
//             </div>
//         </div>
//             {
//                 business ? (
//                     <div className="border rounded px-5 py-1 my-3">
//                         <h2>Manage Your Endorsement Links</h2>
//                         <EndorsementLinkForm userId={Number(profileUserId)} onSubmit={handleAddOrUpdateLink} />
//                         <div className="py-3">
//                             {endorsementLinks && endorsementLinks.map && endorsementLinks.map(link => {
//                               return(
//                               <div key={link.id} className="py-2">
//                                 <a href={link.link} target="_blank" rel="noopener noreferrer">
//                                     {link.linkText}
//                                 </a>
//                                 <button onClick={() => handleDeleteLink(link.id!)} className="mx-3">
//                                   Delete
//                                 </button>
//                               </div>)
//                               }) 
//                             }
//                         </div>
//                     </div>
//                 ) : null
//             }
//           { isEditing ? (
//           <form onSubmit={ handleSubmit } className="text-center">
//             <textarea
//               value={ bioFormData }
//               onChange={ handleChange }
//               placeholder="Tell Everyone About Yourself!"
//             />
//             <div className="text-center">
//               <button type="submit" disabled={ bioFormData.length > 500 ? true : false}>Submit</button>
//               <button type="button" onClick={ toggleEdit }>
//                   Cancel
//               </button>
//             </div>
//           </form>
//           ) : (
//           <div>
//             <div className="text-center border rounded px-5 py-2">
//               <h3 className='rounded px-5 py-2'>About:</h3>
//               <p className="BusinessProfile_bio">
//                 { bioText ? bioText : "Tell Everyone About Yourself!" }
//               </p>
//             </div>
//               {
//                  (user && profileUserId) && user.id == profileUserId.toString() ? <button onClick={toggleEdit} className='my-2'>Edit</button> : null
//               }
//               {
//                 success ? <p className="py-2">{success}</p> : null
//               }
//             </div>
//         )}
//         </div> 
//         )
//       }
//     </div>
//   )
// }

// export default BusinessProfile;

import {
  // createEndorsementLinkService,
  // deleteEndorsementLinkService,
  // getEndorsementLinksService,
  // updateEndorsementLinkService,
} from "../../api/endorsementLinkService";
import { useEffect, useState } from 'react';

import EndorsementLinkForm from './EndorsementLinkForm';
import React from 'react'
// import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import EndorsementLinksManager from "./EndorsementLink";
import BioSection from "./BioSection";
import { Grid, Box, Typography, Button, FormControl, FormLabel  } from '@mui/material';
import ThemeSelector from './ThemeSelector';
import { useTheme } from './ThemeManager';


interface BusinessProfileProps {}

interface EndorsementLink {
  id?: number;
  userId: number;
  link: string;
  linkText: string;
}

const BusinessProfile: React.FC<BusinessProfileProps> = ({ }) => {
  let { id } = useParams();
  const { themeName, setThemeName } = useTheme();
  const [bioText, setBioText] = useState<string>('Default Bio Text'); // Hardcoded bio text
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [bioFormData, setBioFormData] = useState<string>('Default Bio Text'); // Hardcoded bio text
  const [success, setSuccess] = useState<string>('');
  const [username, setUsername] = useState<string>('JohnDoe'); // Hardcoded username
  const [firstName, setFirstName] = useState<string>('John'); // Hardcoded first name
  const [lastName, setLastName] = useState<string>('Doe'); // Hardcoded last name
  const [email, setEmail] = useState<string>('john.doe@example.com'); // Hardcoded email
  const [business, setBusiness] = useState<boolean>(true); // Hardcoded business flag
  const [profileUserId, setProfileUserId] = useState<number | null>(1); // Hardcoded user ID
  const [error, setError] = useState<string | null>(null);
  const [endorsementLinks, setEndorsementLinks] = useState<EndorsementLink[]>([
    { id: 1, userId: 1, link: 'https://example.com/link1', linkText: 'Link 1' },
    { id: 2, userId: 1, link: 'https://example.com/link2', linkText: 'Link 2' },
  ]); // Hardcoded endorsement links
  const [bannerUrl, setBannerUrl] = useState<string>('/path/to/default/banner.jpg');
  const [profilePicURL, setProfilePicURL] = useState<string>(''); 
  const { user, setUser } = useUser();

  useEffect(() => {
      //console.log('User context:', user);
  }, [user]);

  // Commenting out Axios data fetching
  // useEffect(() => {
  //     axios.get(path_url)
  //         .then((response) => {
  //             setBioText(response.data.BIO_TEXT);
  //             setBioFormData(response.data.BIO_TEXT);
  //             setUsername(response.data.USERNAME);
  //             setFirstName(response.data.FIRSTNAME);
  //             setLastName(response.data.LASTNAME);
  //             setEmail(response.data.EMAIL);
  //             setBusiness(response.data.IS_BUSINESS);
  //             setProfileUserId(response.data.USER_ID);
  //             setError(null);
  //         })
  //         .catch((error) => {
  //             console.error(error);
  //             setError("No Profile For This User");
  //         });
  // }, [id]);

  const toggleEdit = () => {
      setIsEditing(!isEditing);
  };
  // Handle banner picture upload
  const handleBannerUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'my_preset');

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dzjvzmwvf/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        setBannerUrl(data.secure_url);
        console.log(data.secure_url);
      } catch (error) {
        console.error('Error uploading banner:', error);
      }
    }
  };
  
  // Handle profile picture upload
  const handleProfilePicUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'my_preset');

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dzjvzmwvf/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        setProfilePicURL(data.secure_url);
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setBioFormData(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setBioText(bioFormData.trim());
      setSuccess("Bio Updated!");
      setIsEditing(false);
  };

  const handleAddOrUpdateLink = async (endorsementLink: EndorsementLink) => {
    let updatedLink: EndorsementLink;
    if (endorsementLink.id) {
      updatedLink = endorsementLink;
      setEndorsementLinks(
        endorsementLinks.map(link => link.id === updatedLink.id ? updatedLink : link)
      );
    } else {
      updatedLink = { ...endorsementLink, id: endorsementLinks.length + 1 };
      setEndorsementLinks((endorsementLinks) => [...endorsementLinks, updatedLink]);
    }
  }

  const handleDeleteLink = async (id: number) => {
    setEndorsementLinks((endorsementLinks) => endorsementLinks.filter((link) => link.id !== id));
  }

  return (
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          minHeight: '100vh',
          p: 3,
        }}
      >
        <Button variant="contained" color="primary" onClick={toggleEdit} className="my-2">
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
        {isEditing && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <FormLabel>Upload Banner Image</FormLabel>
                  <Button variant="contained"component="label">
                    Choose Banner
                    <input type="file"onChange={handleBannerUpload} accept="image/*" hidden/>
                  </Button>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <FormLabel>Upload Profile Picture</FormLabel>
                  <Button variant="contained" component="label">
                    Choose Profile Picture
                    <input type="file" onChange={handleProfilePicUpload} accept="image/*" hidden/>
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
            <form onSubmit={handleSubmit} className="text-center">
              <ThemeSelector currentTheme={themeName} onThemeChange={setThemeName} />
              <textarea
                value={bioFormData}
                onChange={handleChange}
                placeholder="Tell Everyone About Yourself!"
                className="form-control my-2"
                style={{ width: '100%', height: '100px' }}
              />
              
              <div className="text-center">
                <Button type="submit" variant="contained" color="success" disabled={bioFormData.length > 500}>
                  Save Changes
                </Button>
              </div>
            </form>
          </>
        )}
        {error ? (
          <Typography variant="body1" color="error">{error}</Typography>
        ) : (
          <Box className='d-flex flex-column justify-content-center align-items-center text-center'>
            <img src={bannerUrl || '/src/assets/Revconnect.png'} alt='Banner' className='w-100 mx-3 my-3' />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <img
                src={profilePicURL || '/path/to/default/profile/pic.jpg'}
                alt='Profile'
                className='w-25 rounded-circle mx-3 my-3'
                style={{ maxWidth: '150px' }}
              />
              <Box className="border rounded px-2 py-3" sx={{ bgcolor: 'background.paper' }}>
                <Typography variant="h4" className='text-center'>{username}</Typography>
                <Box className="px-5 py-1">
                  <Typography variant="h6" className="text-center">{`${firstName} ${lastName}`}</Typography>
                  <Typography variant="body1" className="text-center">{email}</Typography>
                </Box>
              </Box>
            </Box>
            {business && (
              <EndorsementLinksManager
                userId={profileUserId}
                endorsementLinks={endorsementLinks}
                handleAddOrUpdateLink={handleAddOrUpdateLink}
                handleDeleteLink={handleDeleteLink}
              />
            )}
            <BioSection
              bioText={bioText}
              bioFormData={bioFormData}
              setBioFormData={setBioFormData}
              isEditing={isEditing}
              toggleEdit={toggleEdit}
              handleSubmit={handleSubmit}
              success={success}
              user={user}
              profileUserId={profileUserId}
            />
          </Box>
        )}
      </Box>
  );
};

export default BusinessProfile;