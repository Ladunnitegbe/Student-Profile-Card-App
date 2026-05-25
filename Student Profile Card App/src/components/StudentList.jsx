import StudentCard from "./StudentCard";

const StudentList = ({
  students,
  title = "All Students",
  children,
}) => {
  return (
    <section className="student-section">
      <h2>{title}</h2>

      {students.length > 0 ? (
        <div className="student-grid">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
            />
          ))}
        </div>
      ) : (
        <p>No students to display</p>
      )}

      {children}
    </section>
  );
};

export default StudentList;