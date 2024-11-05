#!/usr/bin/env python3
"""Flask module to server the static page"""
from flask import Flask, render_template, request
from flask_babel import Babel, gettext

app = Flask(__name__)

@app.route('/')
def home():
    """home page"""
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host="127.0.0.1", debug=True)
