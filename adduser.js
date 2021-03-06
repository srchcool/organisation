import vandium from 'vandium';
import utils from './utils';

export const main = vandium.api()
    .POST( {

            /*******DATA SPECS**************  
            {

              organisationId: uuid,
              details:{
                firstName: string,
                lastName: string,
                email: email,
                userName: string
                }              

            };
            ********************************/      
            
            body: {
             
                organisationId: vandium.types.uuid().required(),
                details: vandium.types.object().keys({
                  firstName: vandium.types.string().required(),
                  lastName: vandium.types.string().required(),
                  email: vandium.types.string().email().required(),
                  userName: vandium.types.string().required()
                }).required()                

            }
        },   
        (event) => {

            return utils.addUser(event);
        })
    .finally( () => {
});


