import vandium from 'vandium';
import utils from './utils';

const uuidSchema = ()=>{
    return vandium.types.uuid();
  };

const stringSchema = ()=>{
    return vandium.types.string();
  };

const integerSchema = ()=>{
    return vandium.types.number().integer();
  };

const objectSchema = ()=>{
    return vandium.types.object();
  };

/*******OBJECTIVE DATA SPECS**************  

            const objective = {

              name: string,

              totalReach: int,

              recent: {

                percentage: int,

                startDate: string,

                endDate: string,

              }

              year: [array of ints]

            }

******************************************/  

const recentSchema = ()=> {
    return( objectSchema().keys({
        percentage: integerSchema().required(),
        startDate: stringSchema().required(),
        endDate: stringSchema().required()
      }).required() ); 
};

const objectiveSchema = ()=> {
    return( objectSchema().keys({
        name: stringSchema().required(),
        totalReach: integerSchema().required(),
        recent: recentSchema().required(),
        year: vandium.types.array().items(integerSchema()).required()
      }).required() ); 
};          

export const main = vandium.api()
    .POST( {

            /*******DATA SPECS**************  
            {

              orgId: guid,

              objectives: [array of objectives]

            }

            const objective = {

              name: string,

              totalReach: int,

              recent: {

                percentage: int,

                startDate: string,

                endDate: string,

              },

              year: [array of ints]

            }            
            ********************************/      
            
            body: {
             
                organisationId: uuidSchema().required(),
                objectives: vandium.types.array().items(
                    objectiveSchema().required()
                  ).required()             

            }
        },   
        (event) => {

            return utils.createStats(event);
        })
    .finally( () => {
});


