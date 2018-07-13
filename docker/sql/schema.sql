CREATE TABLE IF NOT EXISTS "castles" (
  "id"  SERIAL ,
  "title" TEXT,
  "country" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,

  PRIMARY KEY ("id")
);
