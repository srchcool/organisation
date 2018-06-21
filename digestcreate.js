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

/*****DATA SPECS****************
      
const nudgeData = {

  name: string,

  engagement: int,

  delivered: int,

};

*******************************/   

const nudgeDataSchema = ()=> {
    return( objectSchema().keys({
        name: stringSchema().required(),
        engagement: integerSchema().required(),
        delivered: integerSchema().required()
      }).required() ); 
};

/*****DATA SPECS****************

  const engagementOverTime = {

  date: string,

  engagement: int,

};

*******************************/

const engagementOverTimeSchema = ()=> {
    return( objectSchema().keys({
        date: stringSchema().required(),
        engagement: integerSchema().required()
      }).required() ); 
};


export const main = vandium.api()
    .POST( {

            /*******DATA SPECS**************  
            {

              orgId: uuid, // partition key

              users: int,

              nudgesServed: int,

              averageNudgesPerday: int,

              mostPopularType: string,

              nudgesByType: [array of nudgeData],

              engagementOverTime: [array of engagementOverTime]

            };

            const nudgeData = {

              name: string,

              engagement: int,

              delivered: int,

            };

            const engagementOverTime = {

              date: string,

              engagement: int,

            };
          
            ********************************/ 
            
            body: {

                  organisationId: uuidSchema().required(), // partition key

                  users: integerSchema().required(),

                  nudgesServed: integerSchema().required(),

                  averageNudgesPerday: integerSchema().required(),

                  mostPopularType: stringSchema().required(),

                  nudgesByType: vandium.types.array().items(
                    nudgeDataSchema().required()
                  ).required(),

                  engagementOverTime: vandium.types.array().items(
                    engagementOverTimeSchema().required()
                  ).required() 

            }
        },   
        (event) => {

            return utils.createDigest(event);
        })
    .finally( () => {
});


