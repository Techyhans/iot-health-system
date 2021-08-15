import sqlite3
from sqlite3 import Error


class Database():
    def __init__(self):
        self.DATABASE_NAME = "health.db"

    def get_db(self):
        print("[INFO] Connecting to Database...")
        try:
            conn = sqlite3.connect(self.DATABASE_NAME)
        except Error as e:
            print(f"[ERROR] Connecting to Database: {e}")
        return conn

    def insert_values(self, body_temp: float, room_temp: float, ecg_data: float):
        try:
            print("[INFO] Inserting values to Database...")
            conn = self.get_db()
            cur = conn.cursor()
            sql = '''INSERT INTO projects(name,begin_date,end_date) VALUES (?,?,?)'''
            cur.execute(sql)
            conn.commit()
            return {
                "success": True,
                "data_inserted": {
                    "bodyTemp": body_temp,
                    "roomTemp": room_temp,
                    "ecgData": ecg_data,
                }
            }
        except Error as e:
            print(f"[ERROR] Inserting values to Database: {e}")
            return {
                "success": False
            }


    def get_all_sensor_values(self):
        self.get_db()
        return {
            "data": "db"
        }

    def create_tables(self):
        print("[INFO] Creating Tables...")
        tables = [
            """CREATE TABLE IF NOT EXISTS sensors(id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp TEXT NOT NULL, 
            bodyTemp REAL NOT NULL, roomTemp REAL NOT NULL, ecgData REAL NOT NULL)"""
        ]
        db = self.get_db()
        cursor = db.cursor()
        for table in tables:
            cursor.execute(table)
