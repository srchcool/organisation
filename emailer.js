import aws from 'aws-sdk';

const ses = new aws.SES({
   region: 'eu-west-1'
});

exports.send = function send ( emailComponents, event, context, error )
{

    return new Promise((resolve,reject) => {
        const eParams = {
            Destination: {
                ToAddresses: [emailComponents.to]
            },
            Message: {
                Body: {
                    Text: {
                        Data: emailComponents.bodyText
                    }
                },
                Subject: {
                    Data: emailComponents.subject
                }
            },
            Source: emailComponents.source
        };

        const email = ses.sendEmail(eParams, (err, data)=>{
            if(err) {

                reject( err );
            }
            else {
                /*
                console.log(data);
                console.log("EMAIL CODE END");
                console.log('EMAIL: ', email);*/
                context.succeed(event);
                resolve( err );

            }
        });
    });

};