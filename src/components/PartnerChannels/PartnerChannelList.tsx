import React from "react";
import { useEffect, useState } from "react";
import { deletePartnerChannelById, getPartnerChannelById } from "../../services/partnerChannelService";
import PartnerChannel from "../../types/partnerChannel";
import PartnerChannelDisplay from "./PartnerChannelDisplay";


const PartnerChannelList = ({ id }) => {

    const [partners, updatePartners] = useState<PartnerChannel[]>([]);

    useEffect(() => {
        (async () => {
            const response = await getPartnerChannelById(id);
            const partners: PartnerChannel[] = response.data;
            console.log(partners)
            updatePartners(partners);
        })();
    }, [id]);
    
    const handleDelete = async (id: number) => {
        if(id === undefined ) { return; }
        const response = await deletePartnerChannelById(id);
        console.log(response);
        if(response.status === 204) {
            updatePartners(partners.filter(partner => partner.id !== id));
        }
    }

    return (
        <div>
            {partners.map((partnerChannel: PartnerChannel) => 
                <PartnerChannelDisplay 
                key={partnerChannel.id}
                partnerChannel={partnerChannel} 
                handleDelete={handleDelete}
                />
            )}
        </div>
    )
}

export default PartnerChannelList;