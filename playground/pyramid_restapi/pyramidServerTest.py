#!python

from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response


def hello_world(request):
        return Response('Hello %(name)s!' % request.matchdict)


class TestServer(object):
        """Pyramid Test"""

        global server
        global config
        global serverAdress
        global serverPort

        def __init__(self, address, port):
                self.serverAdress = address
                self.serverPort = port
                self.config = Configurator()

        def configure(self):
                self.config.add_route('hello', '/hello/{name}')
                self.config.add_view(hello_world, route_name='hello')
                app = self.config.make_wsgi_app()
                self.server = make_server(self.serverAdress, self.serverPort, app)

        def run(self):
                self.server.serve_forever()


if __name__ == '__main__':

        port = 3000
        #address = 'ec2-54-215-38-177.us-west-1.compute.amazonaws.com'
        address = 'localhost'

        server = TestServer(address, port)
        server.configure()
        server.run()

	
	
   
