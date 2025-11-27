export default async function StudentsPage() {
    // alls your API route and returns the list of students from DB.
  const res = await fetch("http://localhost:3000/api/students", {
    // Always fetch fresh data from the server
    cache: "no-store",
  });

if (!res.ok) {
  console.error("Failed to load students", await res.text());
  return <div>Error fetching students</div>;
}

let students = [];

try {
  students = await res.json();
} catch (err) {
  console.error("Invalid JSON returned:", err);
  return <div>Invalid JSON returned from API</div>;
}

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Students</h1>

      

      <ul className="mt-4 space-y-2">
        {students.map((s: any) => (
          <li key={s.id} className="border p-2 rounded flex justify-between">
            <div>
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-gray-600">{s.email}</div>
            </div>

            <a
              href={`/students/edit/${s.id}`}
              className="text-blue-600 underline"
            >
              Edit
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
