const express = require("express");
const router = express.Router();
const SuspectCtrl = require("../Controller/SuspectCtrl");
const upload = require("../config/upload");

// create suspect
router.post("/create", SuspectCtrl.createSuspect);

// add family members
router.put("/add/family/:suspectId", SuspectCtrl.addFamilyMember);

// add financial info
router.put("/add/financialinfo/:suspectId", SuspectCtrl.addFinancialInfo);

// add future priotities
router.put("/add/futurepriorities/:suspectId", SuspectCtrl.addFuturePrioritiesAndNeeds);

// add proposed financial plan
router.put("/add/proposedplan/:suspectId", SuspectCtrl.addProposedFinancialPlan);

// update personal details of the suspect
router.put("/update/personaldetails/:suspectId", SuspectCtrl.updatePersonalDetails);

// Get All Suspects
router.get("/all", SuspectCtrl.getAllSuspects);

// Get Suspect by ID
router.get("/:id", SuspectCtrl.getSuspectById);

// Update Suspect Status by ID
router.put("/update/status/:id", SuspectCtrl.updateSuspectStatus);

// Delete Suspect by ID
router.delete("/delete/:id", SuspectCtrl.deleteSuspect);

module.exports = router;
