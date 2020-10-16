from flask import Flask

#from functions.user.login import login_bp
#from functions.onboard.forgot_password
#from functions.onboard.login

from functions.onboard.signup import new_bp

app = Flask(__name__)

app.register_blueprint(new_bp, url_prefix='/api')

app.run(debug=True)
