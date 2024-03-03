from flask import Flask, render_template, request, session,jsonify
import os
# from werkzeug.utils import secure_filename
from IPython.display import Markdown
import textwrap
from PyPDF2 import PdfReader
import json
import re
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

app.secret_key="AIzaSyDZEMVPe"
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])

def extract_text_from_pdf(pdf_file):
    with open(pdf_file, "rb") as f:
        reader = PdfReader(f)
        text1 = ""
        for page in reader.pages:
            text1 += page.extract_text()
    return text1

def generate_interview_questions(resume_text):
    prompt = """Take this resume text and generate 10 interviews questions and technically based details mentioned in the resume in the list format start with wishing the interviewee and length of the question should be short
    example format in LIST FORMAT
    ["Good Morning","can you start by introducing yourself",Tell your hobbies and interests]"""
    chat = model.start_chat(history=[])
    res = chat.send_message([prompt, resume_text])
    sentences = re.split(r'\d+\.', res.text)
    questions = [sentence.strip() for sentence in sentences if sentence.strip()]
    return questions


def process_pdf(pdf_path):
    with open(pdf_path, "rb") as f:
        reader = PdfReader(f)
        text1 = ""
        for page in reader.pages:
            text1 += page.extract_text()
    response = chat.send_message(["Generate summary for the given text in structured format containg headings,side headings with its respective html tags example <h1>Heading1</h></p><matter for heading1</p>", text1])
    summary = response.text
    return summary

def generate_quiz(text):
    prompt = """"return a json file which actaully contains 10 questions generated based on the given text with 4 options(1,2,3,4) and answer(option number) for it.example format 
{
    "questions":[
    {
        "question_number": 1,
        "question": "What is the capital of France?",
        "options": [
          {"a" : "London"},
          {"b" : "Paris"},
          {"c" : "Berlin"},
          {"d" : "Rome"}
        ],
        "answer": "b"
      }
    ]
}
"""
    response = chat.send_message([prompt,text])
    json_str = response.text[response.text.find('{'):response.text.rfind('}')+1]
    jsond = json.loads(json_str)
    return jsond['questions']

# Function to calculate score
def calculate_score(answers, quiz_questions):
    score = 0
    for i, question in enumerate(quiz_questions):
        if answers.get(str(i)) == question['answer']:
            score += 1
    return score

@app.route('/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        try:
            file = request.files['file']  # Access the uploaded file
            file_path = os.path.join('uploads', file.filename)
            file.save(file_path)  # Save the file
            summary = process_pdf(file_path)
            session['summary'] = summary
            return jsonify({'message': 'File uploaded successfully'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

@app.route('/summary', methods=['GET'])
def get_summary():
    summary = session.get('summary', None)
    if summary:
        return jsonify({'summary': summary}), 200
    else:
        return jsonify({'message': 'No summary available in session'}), 404


@app.route('/quiz',methods=['GET','POST'])
def get_quiz():
    text = session.get('summary')
    if text:
        quiz_questions = generate_quiz(text)
        session['quiz_questions'] = quiz_questions
        return jsonify(quiz_questions), 200


@app.route('/interview', methods=['POST'])
def upload_resume():
    if request.method == 'POST':
        print('hello')
        try:
            file = request.files['file']  # Access the uploaded file
            file_path = os.path.join('uploads', file.filename)
            file.save(file_path)  # Save the file
            resume_text1 = extract_text_from_pdf(file_path)
            res = model.generate_content(["Generate summary for the given text in structured format containg headings,side headings with its respective html tags example <h1>Heading1</h></p><matter for heading1</p>", resume_text1])
            session['resume_text'] = res.text
            print(type(res.text))
            return jsonify({'message': 'File uploaded successfully'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500


@app.route('/get_details', methods=['GET'])
def get_details():
    resume_text = session.get('resume_text', None)
    if resume_text:
        return jsonify({'summary': resume_text}), 200
    else:
        return jsonify({'message': 'No summary available in session'}), 404



@app.route('/conduct_interview', methods=['GET'])
def conduct_interview():
    resume_text = session.get('resume_text',None)
    questions = generate_interview_questions(resume_text)
    return jsonify(questions) , 200

import json

@app.route('/submit_responses', methods=['POST'])
def feedback():
    data = request.json
    received_list = data['responses']
    response_dict = {}
    for item in received_list:
        question = item['question']
        answer = item['answer']
        response_dict[question] = answer
    data = json.dumps(response_dict)
    res = model.generate_content(["This is conversation between an interviewer and an interviewee, inform him how performed in this interview by giving some score out of 5, generate it in a way by adding h3 tags to evaluation metrics and h2 tags to scores",data])
    session['feed'] = res.text    
    return ''

@app.route('/feedback',methods=['GET'])
def output():
    print('feedback')
    feed = session.get('feed',None)
    if feed:
        return jsonify({'summary': feed}), 200
    else:
        return jsonify({'message': 'No summary available in session'}), 404



if __name__ == '__main__':
    app.run(debug=True)