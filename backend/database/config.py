import os
import sqlite3
from sqlite3 import Error
from datetime import datetime


class Database:
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
            now = datetime.now()
            dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
            sql = '''INSERT INTO sensors(timestamp, bodyTemp, roomTemp, ecgData) VALUES (?,?,?,?)'''
            values = (dt_string, body_temp, room_temp, ecg_data)
            cur.execute(sql, values)
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
                "success": False,
                "error": e
            }

    def get_all_sensor_values(self):
        try:
            print("[INFO] Retriving values to Database...")
            conn = self.get_db()
            cur = conn.cursor()
            sql = '''SELECT * FROM sensors'''
            cur.execute(sql)
            rows = cur.fetchall()

            data_to_return = []
            for row in rows:
                js = {
                    "timestamp": row[1],
                    "bodyTemp": row[2],
                    "roomTemp": row[3],
                    "ecgData": row[4],
                }
                data_to_return.append(js)
            return data_to_return
        except Error as e:
            print(f"[ERROR] Inserting values to Database: {e}")
            return {
                "success": False,
                "error": e
            }

    def get_latest_entry(self):
        try:
            print("[INFO] Retriving values to Database...")
            conn = self.get_db()
            cur = conn.cursor()
            sql = '''SELECT * FROM sensors ORDER BY id DESC LIMIT 1'''
            cur.execute(sql)
            row = cur.fetchone()

            data_to_return = {
                "timestamp": row[1],
                "bodyTemp": row[2],
                "roomTemp": row[3],
                "ecgData": row[4],
            }

            return data_to_return
        except Error as e:
            print(f"[ERROR] Inserting values to Database: {e}")
            return {
                "success": False,
                "error": e
            }

    def create_tables(self):
        print("[INFO] Removing Existing Tables...")
        print("[INFO] Creating Tables...")
        tables = [
            """CREATE TABLE IF NOT EXISTS sensors(id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp TEXT NOT NULL, 
            bodyTemp REAL NOT NULL, roomTemp REAL NOT NULL, ecgData REAL NOT NULL)"""
        ]
        db = self.get_db()
        cursor = db.cursor()
        try:
            cursor.execute("DROP TABLE sensors")
        except:
            pass
        for table in tables:
            cursor.execute(table)
