const backEndDomain = "http://localhost:3000/api";

const apis = {
  userSignup: {
    url: `${backEndDomain}/auth/signup`,
  },
  userSignupOtp: {
    url: `${backEndDomain}/auth/signup/otp`,
  },
  userLogin: {
    url: `${backEndDomain}/auth/login`,
  },
  userLogOut: {
    url: `${backEndDomain}/auth/logout`,
  },
  googleLogin: {
    url: `${backEndDomain}/auth/google`,
  },
  allUser: {
    url: `${backEndDomain}/user/read`,
  },
  approveUser: {
    url: `${backEndDomain}/user/approve`,
  },
  loggedInUser: {
    url: `${backEndDomain}/user/read/loginuser`,
  },
  updateUser: {
    url: `${backEndDomain}/user/update`,
  },
  createNewJob: {
    url: `${backEndDomain}/job/create`,
  },
  fetchAllJob: {
    url: `${backEndDomain}/job/getalljob`,
  },
  fetchLandingData: {
    url: `${backEndDomain}/job/getlandingdata`,
  },
  getSingleJob: {
    url: `${backEndDomain}/job/getsinglejob`,
  },
  approveJob: {
    url: `${backEndDomain}/job/approve`,
  },
  saveJob: {
    url: `${backEndDomain}/job/save`,
  },
  unsaveJob: {
    url: `${backEndDomain}/job/unsave`,
  },
  savedJob: {
    url: `${backEndDomain}/job/saved`,
  },
  postedJob: {
    url: `${backEndDomain}/job/posted`,
  },
  applyJob: {
    url: `${backEndDomain}/application/apply`,
  },
  allApplications: {
    url: `${backEndDomain}/application/all`,
  },
  jobApplied: {
    url: `${backEndDomain}/application/applied`,
  },
  jobApplicants: {
    url: `${backEndDomain}/application/applicants`,
  },
  updateApplicationStatus: {
    url: `${backEndDomain}/application/update`,
  },
  allPayments: {
    url: `${backEndDomain}/payment/all`,
  },
  khaltiPay: {
    url: `${backEndDomain}/payment/initialize-khalti`,
  },
  khaltiPayCompletion: {
    url: `${backEndDomain}/application/complete-khalti-payment`,
  },
};

export default apis;
