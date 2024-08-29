import React from 'react';
import EndorsementLinkForm from './EndorsementLinkForm';

interface EndorsementLink {
  id?: number;
  userId: number;
  link: string;
  linkText: string;
}

interface EndorsementLinksManagerProps {
  userId: number | null;
  endorsementLinks: EndorsementLink[];
  handleAddOrUpdateLink: (endorsementLink: EndorsementLink) => void;
  handleDeleteLink: (id: number) => void;
}

const EndorsementLinksManager: React.FC<EndorsementLinksManagerProps> = ({
  userId,
  endorsementLinks,
  handleAddOrUpdateLink,
  handleDeleteLink,
}) => {
  if (!userId) return null;

  return (
    <div className="border rounded px-5 py-1 my-3">
      <h2>Manage Your Endorsement Links</h2>
      <EndorsementLinkForm userId={userId} onSubmit={handleAddOrUpdateLink} />
      <div className="py-3">
        {endorsementLinks && endorsementLinks.map && endorsementLinks.map(link => {
          return (
            <div key={link.id} className="py-2">
              <a href={link.link} target="_blank" rel="noopener noreferrer">
                {link.linkText}
              </a>
              <button onClick={() => handleDeleteLink(link.id!)} className="mx-3">
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EndorsementLinksManager;
