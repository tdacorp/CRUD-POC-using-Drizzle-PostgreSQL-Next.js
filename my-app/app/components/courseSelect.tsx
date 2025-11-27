'use client';
import { useEffect, useState } from 'react';

export default function CourseSelect({ value, onChange }: any) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(setCourses);
  }, []);

  const toggle = (id: number) => {
    if (value.includes(id)) onChange(value.filter((x: number) => x !== id));
    else onChange([...value, id]);
  };

  return (
    <div className="space-y-1">
      {courses.map((c: any) => (
        <label key={c.id} className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={value.includes(c.id)}
            onChange={() => toggle(c.id)}
          />
          {c.title}
        </label>
      ))}
    </div>
  );
}
