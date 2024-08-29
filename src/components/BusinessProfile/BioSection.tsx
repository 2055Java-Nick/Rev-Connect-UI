import React, { useState } from 'react';

interface BioSectionProps {
  bioText: string;
  bioFormData: string;
  setBioFormData: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
  toggleEdit: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  success: string;
  user: any;
  profileUserId: number | null;
}

const BioSection: React.FC<BioSectionProps> = ({
  bioText,
  bioFormData,
  setBioFormData,
  isEditing,
  toggleEdit,
  handleSubmit,
  success,
  user,
  profileUserId
}) => {

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setBioFormData(event.target.value);
  };

  return (
    <div>
      { isEditing ? (
        <form onSubmit={ handleSubmit } className="text-center">
          <textarea
            value={ bioFormData }
            onChange={ handleChange }
            placeholder="Tell Everyone About Yourself!"
          />
          <div className="text-center">
            <button type="submit" disabled={ bioFormData.length > 500 }>Submit</button>
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
            (user && profileUserId) && user.id == profileUserId.toString() ? 
            <button onClick={toggleEdit} className='my-2'>Edit</button> 
            : null
          }
          {
            success ? <p className="py-2">{success}</p> : null
          }
        </div>
      )}
    </div>
  );
};

export default BioSection;
