All instructions are for Ubuntu 12.0 LTS

Webapp Deployment Instructions :

1) install node.js (this package contains npm as well. try 'npm - v' to see the 
   version)

	sudo apt-get install python-software-properties python g++ make
	sudo add-apt-repository ppa:chris-lea/node.js
	sudo apt-get update
	sudo apt-get install nodejs

2) install express and cors with npm
	sudo npm install express
	sudo npm install cors


3) start nodejs server in a screen
    
	sudo node server.js

4) paste content of www folder into /var/www/<name of site> and you're done! 


