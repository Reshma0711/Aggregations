const express = require("express");

const router = express.Router();
const {
  q1,
  q2,
  q3,
  q4,
  q5,
  q6,
  q7,
  q8,
  q9,
  q10,
  q11,
  q12,
  q13,
  q14,
  q15,
  q16,
  q17,
  q18,
  q19
} = require("../controllers/query");
const { getData } = require("../controllers/getdata");

router.get("/data", getData);

router.get("/q1", q1);

router.get("/q2", q2);

router.get("/q3", q3);

router.get("/q4", q4);

router.get("/q5", q5);

router.get("/q6", q6);

router.get("/q7", q7);

router.get("/q8", q8);

router.get("/q9", q9);

router.get("/q10", q10);

router.get("/q11", q11);

router.get("/q12", q12);

router.get("/q13", q13);

router.get("/q14", q14)

router.get("/q15", q15)

router.get("/q16",q16)

router.get("/q17", q17);

router.get("/q18", q18);

router.get("/q19", q19);

module.exports = router;
