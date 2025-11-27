export default async function EditStudentPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const res = await fetch(`http://localhost:3000/api/students/${id}`, {
    cache: "no-store", // ensures fresh data every time
  });

  if (!res.ok) {
    const error = await res.json();
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  const student = await res.json();

  return <pre>{JSON.stringify(student, null, 2)}</pre>;
}
