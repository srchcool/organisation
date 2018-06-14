import vandium from 'vandium';

module.exports  = organisationUsers();


/***ALPHA*******/
function organisationUsers(){


/********DATA SPECS**********************
//Lookup table
"organisationusers"

body:
{
	userId: uuid,
	organisationId: uuid,
	provisionalInvite: uuid, //????
	active: false	
};

*********************************************/


	const uuidSchema = ()=>{
	  return vandium.types.uuid();
	};

	const boolSchema = ()=>{
	  return vandium.types.boolean();
	};

	

	const organisationUsersValidationSchema = {
		  body: {
					id: uuidSchema(),
					organisationId: uuidSchema().required(),
					userId: uuidSchema().required(),					
					provisionalInvite: uuidSchema().optional(),
					active: boolSchema().optional()

		  }
	};


	const organisationUsersRequiredKeys = ["organisationId","userId"];

	const organisationUsersOptionalKeys = ["provisionalInvite","active"];

	return(
	{
	  validationSchema: organisationUsersValidationSchema,
	  requiredKeys: organisationUsersRequiredKeys,
	  optionalKeys: organisationUsersOptionalKeys
	});

}