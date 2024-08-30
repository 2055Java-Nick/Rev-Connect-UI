import React from "react";
import PartnerChannel from "../../types/partnerChannel";
import "../../styles/components/PartnerChannel.css";
import { useState } from "react";
import { updatePartnerChannelById } from "../../services/partnerChannelService";

const PartnerChannelDisplay = (props: any) => {

    const partner: PartnerChannel = props.partnerChannel;
    const [name, updateName] = useState(partner.name);
    const [url, updateUrl] = useState(partner.url);
    const [isUpdating, updateIsUpdating] = useState(false);

    const handleUpdate = async (e: Event) => {
        if(isUpdating) {
            const body: PartnerChannel = {
                id: partner.id,
                businessUserId: partner.businessUserId,
                name, url
            };
            console.log(body);
            const response = await updatePartnerChannelById(body);
            console.log(response);
        }
        updateIsUpdating(!isUpdating);
    }

    return (
        <div className="partnerChannelDisplay">
            <div>Id: { partner.id }</div>
            <div>
                <label>
                    Name: <span hidden={isUpdating}>{ name }</span>    
                </label>
                <input 
                hidden={!isUpdating} 
                type="text"
                onChange={(e) => updateName(e.target.value)}
                defaultValue={name}
                />
            </div>
            <div>
                Url: <span hidden={isUpdating}><a href={partner.url}>{ url }</a></span>
                <input 
                hidden={!isUpdating}
                type="text"
                onChange={(e) => updateUrl(e.target.value)}
                defaultValue={url}
                />
            </div>

            <div>
                <button onClick={(e) => {handleUpdate(e)}}>Update</button>
                <button onClick={() => props.handleDelete(partner.id)}>Delete</button>
            </div>
        </div>
    );
}

export default PartnerChannelDisplay;