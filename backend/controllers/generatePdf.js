const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const Project = require("../models/Projects/projectModel");
const path = require("path");
const pdf = require("pdf-creator-node");
const fs = require("fs");
const options = require("../utils/options");
/* ===================================================
       Meterial Generate Pdf  (/api/v1/meterial/pdf/generator) (req : get)
   =================================================== */
exports.meterialExpensesGenaratePdf = catchAsyncError(
  async (req, res, next) => {
    // const projects = await Project.find({
    //   //query today up to tonight
    //   createdAt: {
    //     $gte: new Date(2023, 9, 16),
    //     // $lt: new Date(2023, 11, 18),
    //   },
    // }).populate("totalExpenses");

    const project = await Project.findById(req.params.id)
      .sort({ createdAt: -1 })
      .populate("totalExpenses");
    let date = new Date(req.body.date);
    const expensesArray = project.totalExpenses.filter(
      (val) => val.createdAt >= date
    );

    let array = [];
    expensesArray.forEach((i) => {
      let data = {
        title: i.title,
        uom: i.uom,
        qty: i.qty,

        unitPrice: i.unitPrice,

        amount: i.amount,
        remarks: i.remarks,
      };
      array.push(data);
    });

    const html = fs.readFileSync(
      path.join(__dirname, "../utils/pdf/meterialExpenses.html"),
      "utf-8"
    );
    const filename = "meterial-expenses" + "_doc" + ".pdf";

    let totalExpenses = 0;
    expensesArray.forEach((i) => {
      return (totalExpenses = totalExpenses + i.amount);
    });
    const obj = {
      expensesList: array,
      total: totalExpenses,
      projectName: project.name,
      projectCode: project.code,
    };
    const document = {
      html: html,
      data: {
        expenses: obj,
      },
      path: "./docs/" + filename,
    };

    await pdf
      .create(document, options)
      .then((result) => {
        console.log();
      })
      .catch((err) => {
        console.log(err);
      });

    const filepath = `${process.env.URL}/docs/` + filename;
    res.status(200).json({
      success: true,
      message: "Pdf Created",
      file: filepath,
    });
  }
);

/* ===================================================
        Labour Generate Pdf  (/api/v1/labour/pdf/generator) (req : get)
   =================================================== */
exports.labourExpensesGenaratePdf = catchAsyncError(async (req, res, next) => {
  // const projects = await Project.find({
  //   //query today up to tonight
  //   createdAt: {
  //     $gte: new Date(2023, 9, 16),
  //     // $lt: new Date(2023, 11, 18),
  //   },
  // }).populate("totalExpenses");

  const project = await Project.findById(req.params.id)
    .sort({ createdAt: -1 })
    .populate("labourExpenses");
  let date = new Date(req.body.date);
  const expensesArray = project.labourExpenses.filter(
    (val) => val.createdAt >= date
  );

  let array = [];
  expensesArray.forEach((i) => {
    let data = {
      title: i.title,
      rate: i.rate,
      tAmount: i.tAmount,
      payment: i.payment,

      amount: i.amount,
      remarks: i.remarks,
    };
    array.push(data);
  });

  const html = fs.readFileSync(
    path.join(__dirname, "../utils/pdf/labourExpenses.html"),
    "utf-8"
  );
  const filename = "labour-expenses" + "_doc" + ".pdf";

  let totalExpenses = 0;
  expensesArray.forEach((i) => {
    return (totalExpenses = totalExpenses + i.tAmount);
  });
  const obj = {
    expensesList: array,
    total: totalExpenses,
    projectName: project.name,
    projectCode: project.code,
  };
  const document = {
    html: html,
    data: {
      expenses: obj,
    },
    path: "./docs/" + filename,
  };

  await pdf
    .create(document, options)
    .then((result) => {
      console.log();
    })
    .catch((err) => {
      console.log(err);
    });

  const filepath = `${process.env.URL}/docs/` + filename;
  res.status(200).json({
    success: true,
    message: "Pdf Created",
    file: filepath,
  });
});
