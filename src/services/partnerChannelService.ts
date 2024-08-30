import PartnerChannel from "../types/partnerChannel";
import apiClient from "./api";
import { handleApiResponse } from "./responseHandler";


export async function createPartnerChannel(body: PartnerChannel) {
    const response = await apiClient.post("/partner_channels", body);
    return handleApiResponse<PartnerChannel>(response);
}

export async function getPartnerChannelById(id: number) {
    const response = await apiClient.get(`/partner_channels?businessUserId=${id}`);
    return handleApiResponse<PartnerChannel[]>(response);
}

export async function updatePartnerChannelById(body: PartnerChannel) {
    const response = await apiClient.patch(`/partner_channels/${body.id}`, body);
    return handleApiResponse<PartnerChannel>(response);
}

export async function deletePartnerChannelById(id: number) {
    const response = await apiClient.delete(`/partner_channels/${id}`)
    return response;
}
