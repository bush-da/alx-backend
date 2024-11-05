#!/usr/bin/env python3
"""Flask module to server the static page"""
from flask import Flask, render_template
from flask_babel import Babel, gettext


app = Flask(__name__)
app.url_map.strict_slashes = False


class Config:
    """config class for app available languages"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)

babel = Babel()


@babel.localeselector
def get_locale():
    """determine which the match with supported language"""
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def home():
    """home page"""
    return render_template('3-index.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
