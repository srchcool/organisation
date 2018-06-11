import vandium from 'vandium';

module.exports  = organisation();

function organisation(){

/********DATA SPECS**********************


*/




	const organisationValidationSchema = {
		  body: {
					id: (0, uuidSchema)()
		  }
	};

	const organisationRequiredKeys = [];
	const organisationOptionalKeys = [];

	return(
	{
	  validationSchema: organisationValidationSchema,
	  requiredKeys: organisationRequiredKeys,
	  optionalKeys: organisationOptionalKeys
	});

}
