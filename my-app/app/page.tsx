import Link from 'next/link'


export default function Home() {
return (
<div>
<p><Link href="/students">View Students</Link></p>
<p><Link href="/students/new">Create Student</Link></p>
<p><Link href="/courses/add">Add Course</Link></p>

</div>
)
}