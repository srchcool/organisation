import vandium from 'vandium';

module.exports  = organisation();

function organisation(){



/********DATA SPECS**********************

"organisation"

body:
{
	  type: "corp",
	  companyName: "Test Inc",
	  address:
	    {
	      companyAddressLineOne: "123 Test St",
	      companyAddressLineTwo: "Suite 2A",
	      companyAddressLineThree: "Bldg 5",
	      city: "Test City",
	      postcode: "EH2 5AD",
	      state: "GA",
	      zipcode: "30033"
	    },
	  "billing-address":
	    {
	      companyAddressLineOne: "123 Test St Billing",
	      companyAddressLineTwo: "Suite 2A Billing",
	      companyAddressLineThree: "Bldg 5 Billing",
	      city: "Test City Billing",
	      postcode: "EH2 5AD",
	      state: "GA",
	      zipcode: "30033"
	    },
	   companyTelephone: "4043209989",
	   companyContact: "John Doe",
	   companySize: "10000",
	   vatnumber: "123456789",
	   companyNumber: "987654321",
	   employees:
	   {
	    customerId: ["31a9923b-9ee1-4e9e-a3d4-8f800fabce54","31a9923b-9ee1-4e9e-a3d4-8f800fabce54"]
	   }
};


*********************************************/


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

	const addressSchema = ()=> {
	  return( objectSchema().keys({
	    	companyAddressLineOne: stringSchema().required(),
	    	companyAddressLineTwo: stringSchema().optional(),
	    	companyAddressLineThree: stringSchema().optional(),
	    	city: stringSchema().required(),
	    	postcode: stringSchema().optional(),
	    	state: stringSchema().optional(),
	    	zipcode: stringSchema().optional()
	    }) ); 
	};

	const employeesSchema = ()=> {
	  return( objectSchema().keys({
	    	customerId: vandium.types.array().items(
	    		uuidSchema()
	    	).optional()
	    }) ); 
	};	

	const organisationValidationSchema = {
		  body: {
					id: uuidSchema(),
					type: stringSchema().required(),
					companyName: stringSchema().required(),
					address: addressSchema().required(),
					billingAddress: addressSchema().required(),
					companyTelephone: integerSchema().required(),
					companyContact: stringSchema().optional(),
					companySize: integerSchema().optional(),
					vatnumber: stringSchema().optional(),
					companyNumber: stringSchema().optional(),
					employees: employeesSchema().optional()

		  }
	};


	const organisationRequiredKeys = ["type","companyName","address","billingAddress","companyTelephone"];

	const organisationOptionalKeys = ["companyContact","companySize","vatnumber","companyNumber","employees"];

	return(
	{
	  validationSchema: organisationValidationSchema,
	  requiredKeys: organisationRequiredKeys,
	  optionalKeys: organisationOptionalKeys
	});

}
