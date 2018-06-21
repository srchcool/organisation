import vandium from 'vandium';
import utils from './utils';

export const main = vandium.api()
    .PUT( {

            /*******DATA SPECS**************  
            {

                provisionalInvite: string (pid unique),
                organisationId: uuid          
                //Not needed for now per sparse key confirmedAt used active: boolean

            };
            ********************************/      
            
            body: {
                provisionalInvite: vandium.types.string().required(),
                organisationId: vandium.types.uuid().required()           
                //Not needed for now per sparse key confirmedAt used active: vandium.types.boolean().required()
            }

        },   
        (event) => {

            return utils.confirmUser(event);
        })
    .finally( () => {
});


