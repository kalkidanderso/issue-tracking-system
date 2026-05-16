
import sequelize, { Sequelize } from "sequelize";

import IssueTracker from "../models/IssuetrackerModel.js";

const { Op } = sequelize;


export const getIssues = async (req, res, next) => {

	      try {
	        const issues = await IssueTracker.findAll({
	          attributes: [
	            "id",
            "title",
            "description",
            "status",
            "createdAt",
          ],
          order: [
            ["updatedAt", "DESC"],
            ["id", "DESC"],
          ],
        });


	     
	        res.status(201).json(issues);

	      } catch (error) {
	        next(error);
	      }
	   
};




export const CreateIssueTracker = async (req, res, next) => {
  try {

    const {
      title,
      description,
      status
    } = req.body;




    await IssueTracker.create({
       title,
      description,
      status
    });

    res.status(201).json({ msg: 'Issue Created Successfully ' });
  } 
  catch (error) {
    next(error);
  }
};



export const getIssuesById = async (req, res, next) => {
    

    
    try {


	     const issue = await IssueTracker.findOne({
        where: { id: parseInt(req.params.id) },
      }).then(function (is) {
	        if (!is) {
	          const err = new Error("Issue not found");
            err.status = 404;
            throw err;
	        }
	        return is.dataValues;
	      });


    

    res.status(201).json({
      data:issue,
    });

  } catch (error) {
    next(error);
  }
};









export const updateIssueById = async (req, res, next) => {
     
    const id = parseInt(req.params.id)
    console.log("=======id===", id)
    // console.log("=======title===", title)
    // console.log("=======description===", description)
    // console.log("=======status===", status)
    
    const { title, description, status } = req.body;

      try {



        const issue = await IssueTracker.findByPk(id);
        if (!issue) {
          return res.status(404).json({ msg: "Issue not found." });
        }

        let updatedData = { title, description, status};

        
        await IssueTracker.update(updatedData, { where: { id: id } });



        res.status(201).json({
          msg: "Issue updated successfully."
        });
      } catch (error) {
        next(error);
      }
	   
};

export const deleteIssueById = async (req, res, next) => {
      try {
        const id = parseInt(req.params.id);

        const issue = await IssueTracker.findByPk(id);
        if (!issue) {
          return res.status(404).json({ msg: "Issue not found." });
        }

       

        await IssueTracker.destroy({ where: { id: id } });
      
        res.status(201).json({ msg: "Issue deleted successfully.", id });
	      } catch (error) {
	        next(error);
	      }
};





