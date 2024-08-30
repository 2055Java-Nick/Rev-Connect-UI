
import { useState } from 'react';
import '../../styles/components/PartnerChannel.css';
import PartnerChannel from '../../types/partnerChannel';
import { createPartnerChannel } from '../../services/partnerChannelService';

const CreatePartnerChannelsForm = () => {
    const [partnerChannelId, updatePartnerChannelId] = useState(0);
    const [name, updateName] = useState("");
    const [url, updateUrl] = useState("");

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        const body: PartnerChannel = {
            businessUserId: partnerChannelId,
            name: name,
            url: url,
        }
        console.log(body);
        const data = createPartnerChannel(body);
        console.log(data);
    }

    return (
        <div className="container">
            <h2>Create partner channel</h2>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <label>Partner channel id: </label>
                <input
                    type="number"
                    onChange={(e) => updatePartnerChannelId(e.target.value)}
                    required
                />
                <label>Partner channel name: </label>
                <input 
                    type="text"
                    onChange={(e) => updateName(e.target.value)}
                    required
                />
                <label>Partner channel url: </label>
                <input 
                    type="text"
                    onChange={(e) => updateUrl(e.target.value)}
                    required
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreatePartnerChannelsForm;