import vandium from 'vandium';
import utils from './utils';

export const main = vandium.api()
    .PUT( {

            /*******DATA SPECS**************  
            {

                provisionalInvite: string (pid unique),
                organisationId: uuid,                
                active: boolean

            };
            ********************************/      
            
            body: {
                provisionalInvite: vandium.types.string().required(),
                organisationId: vandium.types.uuid().required(),                
                active: vandium.types.boolean().required()
            }

        },   
        (event) => {

            return utils.confirmUser(event);
        })
    .finally( () => {
});


