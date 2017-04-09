CREATE TABLE "WeatherWroclaw" ( "id" INT NOT NULL IDENTITY(1, 1), "date" DATETIME NOT NULL, "temp" float NOT NULL, "clouds" INT NOT NULL, "sunrise" INT NOT NULL, "sunset" INT NOT NULL, "wind" float NOT NULL, 
"pressure" INT NOT NULL, "humidity" INT NOT NULL, "description" nvarchar(max) NOT NULL ); 
