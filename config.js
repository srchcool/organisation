
const salt = "\][=|q2e`";
const emailSource = 'roumenkpetrov@gmail.com';
const addUserEmailSubject = 'You have been added as a user.'
const addUserEmailBody = (userId, provisionalInvite)=>{
		return `Please confirm your email address here: https://domain.do?userId=${userId}&provisionalInvite=${provisionalInvite}`}

exports.region = "eu-west-1";
exports.salt  = salt;
exports.emailSource  = emailSource;
exports.addUserEmailSubject = addUserEmailSubject;
exports.addUserEmailBody = addUserEmailBody;
