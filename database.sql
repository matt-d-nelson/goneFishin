
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
	"design_id" VARCHAR (500),
	"user_id" INT,
	"order_date" DATE,
	"fulfilled" BOOLEAN DEFAULT false,
	"ordered" BOOLEAN DEFAULT false
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

INSERT INTO "design" (user_id, svg_colors, description, title, image, public) VALUES 
	('1', 'svg colors go here', 'here is a lure yall!', 'lil lure', 'https://static01.nyt.com/images/2013/03/10/magazine/10wmt1/10wmt1-jumbo-v3.jpg', 'true'),
	('1', 'svg colors go here', 'another lure yall!', 'lil lure2', 'https://static01.nyt.com/images/2013/03/10/magazine/10wmt1/10wmt1-jumbo-v3.jpg', 'false'),
	('2', 'svg colors go here', 'I guess here is a lure too', 'allure', 'https://static01.nyt.com/images/2013/03/10/magazine/10wmt1/10wmt1-jumbo-v3.jpg', 'true');