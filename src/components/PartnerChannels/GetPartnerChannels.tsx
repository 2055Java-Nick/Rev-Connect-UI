import React from "react";
import { useEffect, useState } from "react";
import { deletePartnerChannelById, getPartnerChannelById } from "../../services/partnerChannelService";
import PartnerChannel from "../../types/partnerChannel";
import PartnerChannelDisplay from "./PartnerChannelDisplay";
import PartnerChannelList from "./PartnerChannelList";

// This component is just used to verify that the partner channel display and list work
const GetPartnerChannels = () => {
    const [id, updateId] = useState<Number>(0);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        const input = document.getElementById("inputId") as HTMLInputElement;
        console.log(input.value);
        updateId(Number(input.value));
    }

    return (
        <div className="container">
            <h2>Get partner channels</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Input id: </label>
                <input 
                    type="number"
                    id="inputId"
                />
                <button type="submit">Submit</button>
            </form>
            <PartnerChannelList id={id} />
        </div>
    )
}

export default GetPartnerChannels;