import vandium from 'vandium';
import utils from './utils';

export const main = vandium.api()
    .DELETE( {

            body: {
             
                organisationId: vandium.types.uuid().required()

            }
        },   
        (event) => {

            return utils.removeUser(event);
        })
    .finally( () => {
});




