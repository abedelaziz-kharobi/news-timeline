from flask import Flask, jsonify
from flask_cors import CORS
import pymysql
import logging

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.DEBUG)


def get_db_connection():
    try:
        connection = pymysql.connect(
            host='mysql',  # The hostname of the MySQL service in the Docker network
            user='root',
            password='rootpassword',
            database='urgentNewsDB'
        )
        return connection
    except Exception as e:
        app.logger.error(f"Error connecting to database: {e}")
        raise


@app.route('/getUrgentNews', methods=['GET'])
def get_urgent_news():
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(
                'SELECT title, content FROM News ORDER BY id DESC LIMIT 10')
            result = cursor.fetchall()
        connection.close()
        formatted_result = []
        for row in result:
            news_item = {
                'title': row[0],
                'content': row[1]
            }
            formatted_result.append(news_item)
        return jsonify(formatted_result)
    except Exception as e:
        app.logger.error(f"Error fetching news: {e}")
        return "Internal Server Error", 500


if __name__ == '__main__':
    app.run(host='0.0.0.0')
