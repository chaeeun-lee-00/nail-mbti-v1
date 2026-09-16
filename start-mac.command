#!/bin/zsh

cd -- "$(dirname -- "$0")" || exit 1

port=4173
while lsof -iTCP:"$port" -sTCP:LISTEN -t >/dev/null 2>&1; do
  port=$((port + 1))
done

python3 -m http.server "$port" >/tmp/patz-nail-quiz.log 2>&1 &
server_pid=$!
trap 'kill "$server_pid" 2>/dev/null' EXIT INT TERM

sleep 1
open "http://localhost:$port"

echo ""
echo "내 네일 취향, 몇 대 몇? 테스트를 실행했습니다."
echo "주소: http://localhost:$port"
echo "이 창을 닫으면 서버가 종료됩니다."
echo ""

wait "$server_pid"
