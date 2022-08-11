
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (100) NOT NULL,
    "role" INT DEFAULT 0
);

CREATE TABLE "cart_items" (
	"id" SERIAL PRIMARY KEY,
	"design_id" INT,
	"user_id" INT,
	"order_date" DATE,
	"fulfilled" BOOLEAN DEFAULT false,
	"ordered" BOOLEAN
);

CREATE TABLE "design" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT,
	"svg_colors" VARCHAR (1000),
	"description" VARCHAR (1000),
	"title" VARCHAR (200),
	"image" VARCHAR (500),
	"public" BOOLEAN
);

CREATE TABLE "favorite" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT,
	"design_id" INT
);