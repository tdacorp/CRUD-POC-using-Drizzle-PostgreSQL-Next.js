CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TYPE student_status AS ENUM ('active', 'inactive');


CREATE TABLE courses (
id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
code varchar(32) NOT NULL UNIQUE,
title varchar(255) NOT NULL,
description text,
capacity int NOT NULL DEFAULT 0,
created_at timestamptz NOT NULL DEFAULT now(),
updated_at timestamptz NOT NULL DEFAULT now()
);


CREATE TABLE students (
id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
first_name varchar(100) NOT NULL,
last_name varchar(100) NOT NULL,
email varchar(255) NOT NULL UNIQUE,
status student_status NOT NULL DEFAULT 'active',
created_at timestamptz NOT NULL DEFAULT now(),
updated_at timestamptz NOT NULL DEFAULT now(),
deleted_at timestamptz NULL
);


CREATE TABLE student_courses (
student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
enrolled_at timestamptz NOT NULL DEFAULT now(),
PRIMARY KEY (student_id, course_id)
);


-- Trigger to update updated_at on update
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER set_updated_at
BEFORE UPDATE ON students
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


CREATE TRIGGER set_updated_at_courses
BEFORE UPDATE ON courses
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();