import db from "../Database/index.js";

function AssignmentRoutes(app) {
  // route for getting all assignments
  app.get("/api/assignments", (req, res) => {
    res.send(db.assignments);
  });

  // route for creating a new assignment
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const assignment = { ...req.body, _id: new Date().getTime().toString() };
    db.assignments.push(assignment);
    res.send(assignment);
  });

  // route for getting all assignments of this course
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter(
      (assignment) => assignment.course === cid
    );
    res.send(assignments);
  });

  // route for getting a specific assignment
  app.get("/api/courses/:cid/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignment = db.assignments.find(
      (assignment) => assignment._id === aid
    );
    if (!assignment) {
      res.status(404).send("Assignment not found");
      return;
    }
    res.send(assignment);
  });

  // route for deleting an assigment
  app.delete("/api/courses/:cid/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    db.assignments = db.assignments.filter(
      (assignment) => assignment._id !== aid
    );
    res.sendStatus(200);
  });

  // route for updating an assigment
  app.put("/api/courses/:cid/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentIndex = db.assignments.findIndex(
      (assignment) => assignment._id === aid
    );
    db.assignments[assignmentIndex] = {
      ...db.assignments[assignmentIndex],
      ...req.body,
    };
    res.sendStatus(204);
  });
}
export default AssignmentRoutes;
