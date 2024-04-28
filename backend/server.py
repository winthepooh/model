from flask import Flask, request, jsonify
from keras.models import load_model
import numpy as np
import cv2

app = Flask(__name__)

model = load_model('best_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    image_file = request.files['image'].read()
    image_array = np.fromstring(image_file, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, (96, 96))  
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    prediction = model.predict(image_array)
    result = process_prediction(prediction)
    print(result)
    res = jsonify({'result': result})
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res

def process_prediction(prediction):
    prediction = prediction[0]
    prediction = {
        "no_cancer": str(prediction[0]),
        "have_cancer": str(prediction[1])
    }
    return prediction  
if __name__ == '__main__':
    app.run(debug=True)
