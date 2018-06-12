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
}

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
	  return( (0, objectSchema)().keys({
	    	companyAddressLineOne: (0, stringSchema)().required(),
	    	companyAddressLineTwo: (0, stringSchema)().optional(),
	    	companyAddressLineThree: (0, stringSchema)().optional(),
	    	city: (0, stringSchema)().required(),
	    	postcode: (0, stringSchema)().optional(),
	    	state: (0, stringSchema)().optional(),
	    	zipcode: (0, stringSchema)().optional()
	    }) ); 
	};

	const employeesSchema = ()=> {
	  return( (0, objectSchema)().keys({
	    	customerId: vandium.types.array().items(
	    		(0, uuidSchema)()
	    	).optional()
	    }) ); 
	};	

	const organisationValidationSchema = {
		  body: {
					id: (0, uuidSchema)(),
					type: (0, stringSchema)().required(),
					companyName: (0, stringSchema)().required(),
					address: (0, addressSchema)().required(),
					billingAddress: (0, addressSchema)().required(),
					companyTelephone: (0, integerSchema)().required(),
					companyContact: (0, stringSchema)().optional(),
					companySize: (0, integerSchema)().optional(),
					vatnumber: (0, stringSchema)().optional(),
					companyNumber: (0, stringSchema)().optional(),
					employees: (0, employeesSchema)().optional()

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
