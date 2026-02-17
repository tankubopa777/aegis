# aegis

## รันแบบ docker
docker compose up --build

## รันแบบ local
# ปิด container ตัว app ใน docker ก่อน
# ติดตั้ง dependencies
bun install

# รัน (development พร้อม watch)
bun run dev

# หรือรันแบบ production
bun run start

# curl สำหรับ test
curl -X POST http://localhost:8000/v1/conversations \
  -H "Content-Type: application/json" \
  -d '{"title": "บทสนทนาของฉัน"}'

curl "http://localhost:8000/v1/conversations?offset=0&limit=20"

curl -X POST http://localhost:8000/v1/conversations/:id/messages \
  -H "Content-Type: application/json" \
  -d '{"content": "สวัสดีครับ"}'

curl -X PATCH http://localhost:8000/v1/conversations/:id \
  -H "Content-Type: application/json" \
  -d '{"title": "ชื่อใหม่"}'