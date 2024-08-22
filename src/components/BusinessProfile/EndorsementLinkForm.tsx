import React, { useState, useEffect } from 'react';

/**
 * This is the interface for the EndorsementLink object.
 * It has an optional id field, a userId field, a link field, and a linkText field.
 */
interface EndorsementLink {
  id?: number;
  userId: number;
  link: string;
  linkText: string;
}

/**
 * This is the interface for the EndorsementLinkFormProps object.
 * It has a userId field, an optional existingLink field, and an onSubmit field.
 */
interface EndorsementLinkFormProps {
  userId: number;
  existingLink?: EndorsementLink;
  onSubmit: (endorsementLink: EndorsementLink) => void;
}

/**
 * This is the EndorsementLinkForm component.
 * It takes in a userId, an optional existingLink, and an onSubmit function.
 * It renders a form with a link input and a link text input.
 * It sets the initial values of the link and link text inputs to the existing link values.
 * It updates the link and link text state when the inputs change.
 * It calls the onSubmit function with the updated endorsement link object when the form is submitted.
 */
const EndorsementLinkForm: React.FC<EndorsementLinkFormProps> = ({
  userId,
  existingLink,
  onSubmit,
}) => {
  const [link, setLink] = useState(existingLink?.link || '');
  const [linkText, setLinkText] = useState(existingLink?.linkText || '');

  useEffect(() => {
    setLink(existingLink?.link || '');
    setLinkText(existingLink?.linkText || '');
  }, [existingLink]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ id: existingLink?.id || 0, userId, link, linkText });
  };

  return (
    <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center text-center'>
      <label htmlFor="links">
        Link
      </label>
        <input
          type="text"
          name="link"
          value={link}
          onChange={(event) => setLink(event.target.value)}
        />
      
      <br/>
      <label htmlFor='linkText'>
        Link Text
      </label>
        <input
          type="text"
          name='linkText'
          value={linkText}
          onChange={(event) => setLinkText(event.target.value)}
        />
      <button type="submit" className='my-1'>Save</button>
    </form>
  );
};

export default EndorsementLinkForm;
