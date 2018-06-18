
const salt = "\][=|q2e`";
const emailSource = 'roumenkpetrov@gmail.com';
const addUserEmailSubject = 'You have been added as a user.'
const addUserEmailBody = (organisationId, provisionalInvite)=>{
		return `Please confirm your email address here: http://login.welbot.io?orgId=${organisationId}&provisionalInviteId=${provisionalInvite}`}

exports.region = "eu-west-1";
exports.salt  = salt;
exports.emailSource  = emailSource;
exports.addUserEmailSubject = addUserEmailSubject;
exports.addUserEmailBody = addUserEmailBody;
