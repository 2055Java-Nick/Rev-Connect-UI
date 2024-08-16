import React, { useState, useEffect } from 'react';

interface EndorsementLink {
  id?: number;
  userId: number;
  link: string;
  linkText: string;
}

interface EndorsementLinkFormProps {
  userId: number;
  existingLink?: EndorsementLink;
  onSubmit: (endorsementLink: EndorsementLink) => void;
}

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
    <form onSubmit={handleSubmit}>
      <label>
        Link
        <input
          type="text"
          value={link}
          onChange={(event) => setLink(event.target.value)}
        />
      </label>
      <label>
        Link Text
        <input
          type="text"
          value={linkText}
          onChange={(event) => setLinkText(event.target.value)}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default EndorsementLinkForm;
