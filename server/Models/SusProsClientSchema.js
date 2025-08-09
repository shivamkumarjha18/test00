// const mongoose = require("mongoose");

// // Reuse sub-documents
// const healthHistorySchema = new mongoose.Schema({
//   submissionDate: Date,
//   diseaseName: String,
//   since: Date,
//   height: String,
//   weight: String,
//   remark: String,
// });

// const familyMemberSchema = new mongoose.Schema({
//   title: String,
//   name: String,
//   relation: String,
//   annualIncome: String,
//   occupation: String,
//   dobActual: Date,
//   dobRecord: Date,
//   marriageDate: Date,
//   includeHealth: Boolean,
//   healthHistory: healthHistorySchema,
// });


// const financialInfoSchema = new mongoose.Schema({
//   futurePriorities: [String],
//   insuranceInvestment: [String],
//   loans: [String],

//   // insurance: [
//   //   {
//   //     submissionDate: { type: Date, required: true },
//   //     memberName: { type: String, required: true },
//   //     insuranceCompany: { type: String, required: true },
//   //     policyNumber: { type: String, required: true },
//   //     planName: { type: String, required: true },
//   //     sumAssured: { type: Number, required: true },
//   //     mode: { type: String, required: true }, // e.g., Monthly, Yearly
//   //     premium: { type: Number, required: true },
//   //     startDate: { type: Date, required: true },
//   //     maturityDate: { type: Date, required: true },
//   //     document: { type: String }, // file path or URL
//   //   },
//   // ],

//   // investments: [
//   //   {
//   //     submissionDate: { type: Date, required: true },
//   //     memberName: { type: String, required: true },
//   //     financialProduct: { type: String, required: true },
//   //     companyName: { type: String, required: true },
//   //     planName: { type: String, required: true },
//   //     amount: { type: Number, required: true },
//   //     startDate: { type: Date, required: true },
//   //     maturityDate: { type: Date, required: true },
//   //     document: { type: String }, // file path or URL
//   //   },
//   // ],

//   // loans: [
//   //   {
//   //     submissionDate: { type: Date, required: true },
//   //     memberName: { type: String, required: true },
//   //     loanType: { type: String, required: true },
//   //     companyName: { type: String, required: true },
//   //     loanAccountNumber: { type: String, required: true },
//   //     outstandingAmount: { type: Number, required: true },
//   //     interestRate: { type: Number, required: true }, // In %
//   //     term: { type: String, required: true }, // e.g., "5 Years"
//   //     startDate: { type: Date, required: true },
//   //     maturityDate: { type: Date, required: true },
//   //     document: { type: String }, // file path or URL
//   //   },
//   // ],


// });


// const futurePrioritiesSchema = new mongoose.Schema({

//   futurePriorities: [
//     {
//       priorityName: { type: String, required: true },
//       members: { type: [String], required: true },
//       approxAmount: { type: Number, required: true },
//       duration: { type: String, required: true }, 
//       remark: { type: String }
//     }
//   ]
// })


// const needsSchema = new mongoose.Schema({
//   financialProducts: String,
//   anyCorrection: String,
//   anyUpdation: String,
//   financialCalculation: Boolean,
//   assesmentOfNeed: Boolean,
//   portfolioManagement: Boolean,
//   doorStepServices: Boolean,
//   purchaseNewProducts: Boolean,
// });


// const proposedPlanSchema = new mongoose.Schema({
//       createdDate: { type: Date, required: true },
//       memberName: { type: String, required: true },
//       financialProduct: { type: String, required: true },
//       financialCompany: { type: String, required: true },
//       planName: { type: String, required: true },
//       documents: { type: [String] }
// });


// const customerDocSchema = new mongoose.Schema({
//   createdDate: Date,
//   memberName: String,
//   documentNo: String,
//   documentName: String,
//   financialProducts: String,
//   remark: String,
//   upload: [String],
// });

//   // group: String,
//   // mobile: Number,
//   // whatsapp: Number,
//   // email: String,

// const personalDetailsSchema = new mongoose.Schema({
//   groupCode: String,
//   groupName: String,
//   gender: String,
//   salutation: String,
//   organisation: String,
//   designation: String,
//   annualIncome: String,
//   grade: Number,
//   familyHead: String,
//   mobileNo: Number,
//   contactNo: Number,
//   whatsappNo: Number,
//   emailId: String,
//   paName: String,
//   paMobileNo: Number,
//   adharNumber: String,
//   panCardNumber: String,
//   preferredAddressType: { type: String, enum: ["resi", "office"] },
//   resiAddr: String,
//   resiLandmark: String,
//   resiPincode: String,
//   officeAddr: String,
//   officeLandmark: String,
//   officePincode: String,
//   preferredMeetingAddr: String,
//   preferredMeetingArea: String,
//   city: String,
//   bestTime: String,
//   nativePlace: String,
//   hobbies: String,
//   socialLink: String,
//   habits: String,
//   leadSource: String,
//   leadName: String,
//   leadPerson: String,
//   leadOccupation: String,
//   leadOccupationType: String,
//   occupation: String,
//   callingPurpose: String,
//   name: String,
//   allocatedCRE: String,
//   remark: String,
//   pincode: Number,
//   dob: Date,
//   dom: Date,
// });


// const TestShema = new mongoose.Schema({
//   status: {
//     type: String,
//     enum: ["suspect", "prospect", "client"],
//     default: "suspect",
//   },

//   personalDetails: personalDetailsSchema, 

//   education: {
//     types: {
//       type: String,
//       enum: ["", "school", "college", "professional"],
//     },
//     schoolName: String,
//     schoolSubjects: String,
//     collegeName: String,
//     collegeCourse: String,
//     instituteName: String,
//     professionalDegree: String,
//   },
//   leadInfo: {
//     remark: String,
//   },
//   preferences: {},
//   familyMembers: [familyMemberSchema],
//   financialInfo: financialInfoSchema,
//   futurePriorities : futurePrioritiesSchema,
//   proposedPlan: proposedPlanSchema,
//   needs: needsSchema,
//   customerDoc: [customerDocSchema],
//  kycs: [
//   {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Kyc"
//   }
// ]
// ,
//   taskDetails: String,
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });
// module.exports = mongoose.model("testSchema", TestShema);








const mongoose = require("mongoose");


// Reuse sub-documents
const healthHistorySchema = new mongoose.Schema({
  submissionDate: Date,
  diseaseName: String,
  since: Date,
  height: String,
  weight: String,
  remark: String,
});




const familyMemberSchema = new mongoose.Schema({
  title: String,
  name: String,
  relation: String,
  annualIncome: String,
  occupation: String,
  dobActual: Date,
  dobRecord: Date,
  marriageDate: Date,
  includeHealth: Boolean,
  // healthHistory: healthHistorySchema,
  healthHistory : [healthHistorySchema]
});





const customerDocSchema = new mongoose.Schema({
  createdDate: Date,
  memberName: String,
  documentNo: String,
  documentName: String,
  financialProducts: String,
  remark: String,
  upload: [String],
});




const financialInfoSchema = new mongoose.Schema({


  insurance: [
    {
      submissionDate: { type: Date, required: true },
      memberName: { type: String, required: true },
      insuranceCompany: { type: String, required: true },
      policyNumber: { type: String, required: true },
      planName: { type: String, required: true },
      sumAssured: { type: Number, required: true },
      mode: { type: String, required: true }, // e.g., Monthly, Yearly
      premium: { type: Number, required: true },
      startDate: { type: Date, required: true },
      maturityDate: { type: Date, required: true },
      document: { type: String }, // file path or URL
    },
  ],

  investments: [
    {
      submissionDate: { type: Date, required: true },
      memberName: { type: String, required: true },
      financialProduct: { type: String, required: true },
      companyName: { type: String, required: true },
      planName: { type: String, required: true },
      amount: { type: Number, required: true },
      startDate: { type: Date, required: true },
      maturityDate: { type: Date, required: true },
      document: { type: String },
    },
  ],

  loans: [
    {
      submissionDate: { type: Date, required: true },
      memberName: { type: String, required: true },
      loanType: { type: String, required: true },
      companyName: { type: String, required: true },
      loanAccountNumber: { type: String, required: true },
      outstandingAmount: { type: Number, required: true },
      interestRate: { type: Number, required: true }, // In %
      term: { type: String, required: true }, // e.g., "5 Years"
      startDate: { type: Date, required: true },
      maturityDate: { type: Date, required: true },
      document: { type: String }, // file path or URL
    },
  ],


});


const needsSchema = new mongoose.Schema({
  financialProducts: String,
  anyCorrection: String,
  anyUpdation: String,
  financialCalculation: Boolean,
  assesmentOfNeed: Boolean,
  portfolioManagement: Boolean,
  doorStepServices: Boolean,
  purchaseNewProducts: Boolean,
});


const futurePrioritiesSchema = new mongoose.Schema({

  futurePriorities: [
    {
      priorityName: { type: String, required: true },
      members: { type: [String], required: true },
      approxAmount: { type: Number, required: true },
      duration: { type: String, required: true }, 
      remark: { type: String }
    }
  ]
})

const proposedPlanSchema = new mongoose.Schema({
      createdDate: { type: Date, required: true },
      memberName: { type: String, required: true },
      financialProduct: { type: String, required: true },
      financialCompany: { type: String, required: true },
      planName: { type: String, required: true },
      documents: { type: [String] }
});

const personalDetailsSchema = new mongoose.Schema({
  groupCode: String,
  groupName: {
    type: String,
    required: function () {
      const parent = this.ownerDocument();
      return ['prospect', 'suspect'].includes(parent.status);
    },
  },
  gender: String,
  salutation: {
    type: String,
    required: function () {
      const parent = this.ownerDocument();
      return ['prospect', 'suspect'].includes(parent.status);
    },
  },
  organisation: String,
  designation: String,
  annualIncome: String,
  grade: Number,
  familyHead: String,
  mobileNo: {
    type: Number,
    required: function () {
      const parent = this.ownerDocument();
      return ['prospect', 'suspect'].includes(parent.status);
    },
  },
  contactNo: Number,
  whatsappNo: Number,
  emailId: {
    type: String,
    required: function () {
      const parent = this.ownerDocument();
      return ['prospect', 'suspect'].includes(parent.status);
    },
  },
  paName: String,
  paMobileNo: Number,
  adharNumber: String,
  panCardNumber: String,
  preferredAddressType: { type: String, enum: ["resi", "office"] },
  resiAddr: String,
  resiLandmark: String,
  resiPincode: String,
  officeAddr: String,
  officeLandmark: String,
  officePincode: String,
  preferredMeetingAddr: String,
  preferredMeetingArea: String,
  city: String,
  bestTime: String,
  nativePlace: String,
  hobbies: String,
  socialLink: String,
  habits: String,
  leadSource: String,
  leadName: String,
  leadPerson: String,
  leadOccupation: String,
  leadOccupationType: String,
  occupation: String,
  callingPurpose: String,
  name: {
    type: String,
    required: function () {
      const parent = this.ownerDocument();
      return ['prospect', 'suspect'].includes(parent.status);
    },
  },
  allocatedCRE: String,
  remark: String,
  pincode: Number,
  dob: Date,
  dom: Date,
});

const TestShema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["suspect", "prospect", "client"],
    default: "suspect",
  },
  personalDetails: personalDetailsSchema,
  education: {
    types: {
      type: String,
      enum: ["", "school", "college", "professional"],
    },
    schoolName: String,
    schoolSubjects: String,
    collegeName: String,
    collegeCourse: String,
    instituteName: String,
    professionalDegree: String,
  },
  leadInfo: {
    remark: String,
  },
  preferences: {},
  familyMembers: [familyMemberSchema],
  financialInfo: financialInfoSchema,
  futurePriorities: futurePrioritiesSchema,
  proposedPlan: [proposedPlanSchema],
  needs: needsSchema,
  customerDoc: [customerDocSchema],
  kycs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kyc"
    }
  ],
  taskDetails: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("testSchema", TestShema);