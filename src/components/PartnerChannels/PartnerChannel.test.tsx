import React from "react";
import { describe, expect, vi } from "vitest";
import PartnerChannelList from "./PartnerChannelList";
import PartnerChannelDisplay from "./PartnerChannelDisplay";
import { render, screen } from "@testing-library/react";
import { getPartnerChannelById } from "../../services/partnerChannelService";
import { ApiResponse } from "../../services/responseHandler";
import PartnerChannel from "../../types/partnerChannel";
import '@testing-library/jest-dom/vitest';


// describe("Partner channel list", () => {
//     // const mock = vi.fn().mockImplementation(getPartnerChannelById);
//     const mockData: ApiResponse<PartnerChannel[]> = { 
//         status: "mockStatus",
//         message: "mockMessage",
//         data: [],
//     }
    
//     axios.get.mockResolvedValueOnce(mockData);

//     render(<PartnerChannelList id={1} />);
// });

describe("Partner channel display", () => {
    const partnerChannel: PartnerChannel = {
        id: 1,
        businessUserId: 1,
        name: "test name",
        url: "test url"
    }

    const handleDelete = vi.fn();

    render(<PartnerChannelDisplay partnerChannel={partnerChannel} handleDelete={handleDelete} />);

    // expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument()
    // expect(screen.getAllByText(/Name/)).toBeInTheDocument();
    expect(screen.getByText(/test name/i)).toBeInTheDocument();
})