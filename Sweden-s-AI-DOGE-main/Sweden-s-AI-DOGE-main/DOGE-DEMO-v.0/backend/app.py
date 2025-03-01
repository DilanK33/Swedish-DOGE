from flask import Flask
from routes import api
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

app.register_blueprint(api, url_prefix='/api')

if __name__=="__main__":
	app.run(debug=True)