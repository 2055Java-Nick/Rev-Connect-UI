import React, { useEffect } from 'react';
import { useState } from "react";
import axios, { AxiosResponse } from "axios";

interface ProfileForm {
    id: string;
    firstName: string;
    lastName: string;
    bio: string;
}

interface User {
    uid: Number,
    firstName: string,
    lastName: string
}

interface PersonalProfile {
    user: User,
    bio: string
}

interface Header {
    Authorization: string
}

function Profile() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [formValues, setFormValues] = useState<ProfileForm>({ id: '', firstName: '', lastName: '', bio: '' })
    const [firstNameError, setFirstNameError] = useState<boolean>(false)
    const [lastNameError, setLastNameError] = useState<boolean>(false)
    const serviceLocation : string = "http://localhost:8080/api";
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log("Getting user from: " + serviceLocation + "/profile/" + localStorage.getItem('userId'))
                const response : AxiosResponse<PersonalProfile> = await axios.get(serviceLocation + "/profile/" + localStorage.getItem('userId'), {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("sessionToken")
                    }
                })
                setFormValues({
                    id: localStorage.getItem('userId') ?? "",
                    firstName: response.data.user.firstName,
                    lastName: response.data.user.lastName,
                    bio: response.data.bio
                });
                // Set Fields
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                // Log out
            }
        };

        fetchUser();
    }, [])

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let firstNameEntry : string = (document.getElementById("firstName") as HTMLInputElement)?.value ?? "";
        let lastNameEntry : string = (document.getElementById("lastName") as HTMLInputElement)?.value ?? "";
        if(firstNameEntry !== "")
            setFirstNameError(false)
        if(lastNameEntry !== "")
            setLastNameError(false)

        const {name, value} = e.target;
        setFormValues((prev: ProfileForm) => ({ ...prev, [name]: value}));
    }

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let firstNameInvalid : boolean = formValues.firstName === "" || formValues.firstName === null;
        let lastNameInvalid : boolean = formValues.lastName === "" || formValues.lastName === null;
        setFirstNameError(firstNameInvalid);
        setLastNameError(lastNameInvalid);
        
        if (firstNameInvalid || lastNameInvalid)
            return;
        
        axios.put(serviceLocation + "/profile", 
            {
                user: {
                    firstName: formValues.firstName,
                    lastName: formValues.lastName },
                bio: formValues.bio
            },{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("sessionToken")
                }
            }
        ).then((response: { status: any; data: any; }) => {
            console.log(response.status, response.data);
            // Succeeded
            alert("Profile updated successfully.");
          }).catch((e: any) => {
            // Failed
            alert("Failed to update profile!");
          });
    }

    if(isLoading)
    {
        return <div>Loading...</div>;
    }


    return <div>
        Profile Form
        <form onSubmit={onFormSubmit}>
            <div>
                { /* TODO: Remove this field when token validation exists */}
                <label htmlFor='id'>User Id</label>
                <input type='text' id='id' name='id' value={formValues.id} onChange={onFormChange} required></input>
            </div>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input type='text' id='firstName' name='firstName' value={formValues.firstName} onChange={onFormChange}></input>
                <span hidden={!firstNameError}>First name is required.</span>
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input type='text' id='lastName' name='lastName' value={formValues.lastName} onChange={onFormChange}></input>
                <span hidden={!lastNameError}>Last name is required.</span>
            </div>
            <div>
                <label htmlFor="bio">Bio</label>
                <input type='text' id='bio' name='bio' value={formValues.bio} onChange={onFormChange}></input>
            </div>
            <button name="submit" type="submit">Submit</button>
        </form>
    </div>
}

export default Profile;