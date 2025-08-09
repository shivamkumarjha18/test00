const express = require("express");
const router = express.Router();
const ProspectCtrl = require("../Controller/ProspectCtrl");
const upload = require("../config/upload");

// create prospect
router.post("/create", ProspectCtrl.createProspect);

// add family members
router.put("/add/family/:prospectId", ProspectCtrl.addFamilyMember);

// add financial info
router.put("/add/financialinfo/:prospectId", ProspectCtrl.addFinancialInfo);

// add future priotities
router.put("/add/futurepriorities/:prospectId", ProspectCtrl.addFuturePrioritiesAndNeeds);

// add proposed financial plan
router.put("/add/proposedplan/:prospectId", ProspectCtrl.addProposedFinancialPlan);

// update personal details of the prospect
router.put("/update/personaldetails/:prospectId", ProspectCtrl.updatePersonalDetails);

// Get All Prospects
router.get("/all", ProspectCtrl.getAllProspects);

// Get Prospect by ID
router.get("/:id", ProspectCtrl.getProspectById);

// Update Prospect Status by ID
router.put("/update/status/:id", ProspectCtrl.updateProspectStatus);

// Delete Prospect by ID
router.delete("/delete/:id", ProspectCtrl.deleteProspect);

module.exports = router;
