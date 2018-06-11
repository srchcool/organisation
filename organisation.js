import vandium from 'vandium';

module.exports  = organisation();

function organisation(){



/********DATA SPECS**********************

"organisation"

body:
{
	  "type": "corp",
	  "company-name": "Test Inc",
	  "address":
	    {
	      "company-address-line-one": "123 Test St",
	      "company-address-line-two": "Suite 2A",
	      "company-address-line-three": "Bldg 5",
	      "city": "Test City",
	      "postcode": "EH2 5AD",
	      "state": "GA",
	      "zipcode": "30033"
	    },
	  "billing-address":
	    {
	      "company-address-line-one": "123 Test St Attn: Billing",
	      "company-address-line-two": "Suite 2A",
	      "company-address-line-three": "Bldg 5",
	      "city": "Test Billing City",
	      "postcode": "EH2 5AD",
	      "state": "GA",
	      "zipcode": "30033"
	    },
	   "company-telephone": "4043209989",
	   "company-contact": "John Doe",
	   "company-size": "10000",
	   "vatnumber": "123456789",
	   "company-number": "987654321",
	   "employees":
	   {
	    "customer-id": ["31a9923b-9ee1-4e9e-a3d4-8f800fabce54","31a9923b-9ee1-4e9e-a3d4-8f800fabce54"]
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
	    	"company-address-line-one": (0, stringSchema)().required(),
	    	"company-address-line-two": (0, stringSchema)(),
	    	"company-address-line-three": (0, stringSchema)(),
	    	"city": (0, stringSchema)().required(),
	    	"postcode": (0, stringSchema)(),
	    	"state": (0, stringSchema)(),
	    	"zipcode": (0, stringSchema)()
	    }).required() ); 
	};

	const employeesSchema = ()=> {
	  return( (0, objectSchema)().keys({
	    	"customer-id": vandium.types.array().items(
	    		(0, uuidSchema)()
	    	)
	    }) ); 
	};	

	const organisationValidationSchema = {
		  body: {
					id: (0, uuidSchema)(),
					type: (0, stringSchema)().required(),
					"company-name": (0, stringSchema)().required(),
					"address": (0, addressSchema)().required(),
					"billing-address": (0, addressSchema)().required(),
					"company-telephone": (0, integerSchema)().required(),
					"company-contact": (0, stringSchema)().required(),
					"company-size": (0, integerSchema)().required(),
					"vatnumber": (0, integerSchema)().required(),
					"company-number": (0, integerSchema)().required(),
					"employees": (0, employeesSchema)().required()

		  }
	};


	const organisationRequiredKeys = ["type","company-name","address","billing-address","company-telephone",
										"company-contact", "company-size", "vatnumber", "company-number",
											"employees" ];
	const organisationOptionalKeys = [];

	return(
	{
	  validationSchema: organisationValidationSchema,
	  requiredKeys: organisationRequiredKeys,
	  optionalKeys: organisationOptionalKeys
	});

}
