from flask import Flask
from processData import subreddit_recommender

app = Flask(__name__)


@app.route('/recommendations/<subreddit>')
def recomandSubreddit(subreddit):
    val = subreddit_recommender(subreddit)
    print(val)
    return val;


if __name__ == '__main__':
    app.run()
