import re
import requests
import json
import time


from flask import Blueprint, jsonify, request, make_response

new_bp = Blueprint('new_signup', __name__)
#existing_bp = Blueprint('existing_signup', __name__)



#start
#get address data
#post to address Database
#if success return address id
    #get user data
    #post to the user Database
    #if success return user id
        #send mail to user to activate acccount
    #if error, show me the error Response
#if error, show me the error Response

@new_bp.route('/signup/new', methods=['POST'])
def new():
    address_data = request.form.to_dict()
    #customer_address=input_data['customer_address']
    #town=input_data['town']
    #lga=input_data['lga']
    #state=input_data['state']
    #country=input_data['country']



    url = "http://localhost:5500/address/create"

    payload = 'meter_id=1&address='+address_data['address']+'&lga='+address_data['lga']+'&city='+address_data['city']+'&state='+address_data['state']+'&no_of_occupants=3&lat=011&long=20&token=1234'
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    response = requests.request("POST", url, headers=headers, data = payload)


    if response:
        response_holder = json.loads(response.text)

        address_id = response_holder['data']['address_id']

        return jsonify({"message":"Address added succesfully","code":"201"}),201 and address_id
        #return address_id


    else:
        jsonify({"message":"Address cannot add due to internal error","code":"500"}),500




@new_bp.route('/signup/new_continue', methods=['POST'])
def new_continue():
    user_data = request.form.to_dict()
    #customer_address=input_data['customer_address']
    #town=input_data['town']
    #lga=input_data['lga']
    #state=input_data['state']
    #country=input_data['country']



    url = "http://localhost:5500/user/create"

    payload = 'meter_id=2345454&account_no=132347&phone=0982728292&dob=25/09/1990&email=blank@mahn.com&first_name=Blank&last_name=Mahn&password=rastRasTAA&token=1234&address_id=2'
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    response = requests.request("POST", url, headers=headers, data = payload)

    print(response.text.encode('utf8'))


    response = requests.request("POST", url, headers=headers, data = payload)
    if response:
        #print(response.text)
        return jsonify({"message":"Address added succesfully","code":"201"}),201
        #return address_id

    else:
        jsonify({"message":"Address cannot add due to internal error","code":"500"}),500
