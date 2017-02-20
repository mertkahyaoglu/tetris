import os
from flask import Flask, jsonify, request, send_from_directory
from flask_pymongo import PyMongo
from flask.ext.cors import CORS

app = Flask(__name__, static_folder='public', static_url_path='')
cors = CORS(app, resources={r"/tetris/*": {"origins": "http://ec2-35-160-20-129.us-west-2.compute.amazonaws.com/"}})

app.config['MONGO_DBNAME'] = 'tetris'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/tetris'

mongo = PyMongo(app)

@app.route('/')
def serve_index():
    return send_from_directory('public', 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory('public', path)

@app.route('/tetris/scores', methods=['GET'])
def get_all_scores():
    scores = mongo.db.scores
    output = []
    sorted_scores = scores.find().sort('score', -1)
    for s in sorted_scores:
        output.append({'username' : s['username'], 'score' : s['score']})
    return jsonify(output)

@app.route('/tetris/save_score', methods=['POST'])
def add_score():
    scores = mongo.db.scores
    username = request.json['username']
    score = request.json['score']
    try:
        score = int(score)
    except ValueError:
        score = 0
    sorted_scores = scores.find().sort('score', -1)

    score_list = []
    score_id = 0
    for s in sorted_scores:
        score_list.append({'id' : s['_id'], 'score': s['score']})

    # if there are less than 10 records insert directly
    if len(score_list) < 10:
        score_id = scores.insert({'username': username, 'score': score})
    elif score > score_list[-1]['score']: # otherwise compare with the smallest score
        scores.delete_one({'_id': score_list[-1]['id']})
        score_id = scores.insert({'username': username, 'score': score})

    if score_id:
        new_score = scores.find_one({'_id': score_id })
        output = {'username' : new_score['username'], 'score' : new_score['score']}
        return jsonify(output)
    else:
        return jsonify({'message' : 'did not insert'})
if __name__ == '__main__':
	app.run(host='0.0.0.0', port=80,threaded=True)
