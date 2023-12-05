import Database from "../Database/index.js";
function CourseRoutes(app) {
  // get all courses
  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.send(courses);
  });

  // route for creating a new course
  app.post("/api/courses", (req, res) => {
    const course = { ...req.body, _id: new Date().getTime().toString() };
    Database.courses.push(course);
    res.send(course);
  });

  // delete a course
  app.delete("/api/courses/:courseId", (req, res) => {
    const courseId = req.params.courseId;
    const index = Database.courses.findIndex(
      (course) => course._id === courseId
    );

    if (index !== -1) {
      Database.courses.splice(index, 1);
      res.send({ message: `Course with ID ${courseId} deleted successfully.` });
    } else {
      res.status(404).send({ error: `Course with ID ${courseId} not found.` });
    }
  });

  // update a course
  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = req.body;
    Database.courses = Database.courses.map((c) =>
      c._id === id ? { ...c, ...course } : c
    );
    res.sendStatus(204);
  });

  // get a course by ID
  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = Database.courses.find((c) => c._id === id);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.send(course);
  });
}
export default CourseRoutes;
