import axios from 'axios';

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

const BASE_URL = 'http://localhost:8080/api/endorsement_links';

/**
 * Creates an endorsement link.
 * @param endorsementLink The endorsement link to create.
 * @returns The created endorsement link.
 */
export const createEndorsementLinkService = async (
  endorsementLink: EndorsementLink
) => {
  const response = await axios.post(BASE_URL, endorsementLink);
  return response.data;
};

/**
 * Updates an endorsement link.
 * @param endorsementLink The endorsement link to update.
 * @returns The updated endorsement link.
 */
export const updateEndorsementLinkService = async (
  endorsementLink: EndorsementLink
) => {
  const response = await axios.patch(BASE_URL, endorsementLink);
  return response.data;
};

/**
 * Deletes an endorsement link by ID.
 * @param id The ID of the endorsement link to delete.
 */
export const deleteEndorsementLinkService = async (id: number) => {
  await axios.delete(`${BASE_URL}?endorsementLinkId=${id}`);
};

/**
 * Retrieves the endorsement links for a given user.
 * @param userId The user ID.
 * @returns The endorsement links for the user.
 */
export const getEndorsementLinksService = async (userId: number) => {
  const response = await axios.get<EndorsementLink[]>(
    `${BASE_URL}?userId=${userId}`
  );
  return response.data;
};
