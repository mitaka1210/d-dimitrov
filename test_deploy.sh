#!/bin/bash

set -e

# ═══════════════════════════════════════════════════════════════════════════
# ⚙️ Настройки
# ═══════════════════════════════════════════════════════════════════════════
PROJECT_DIR="${PROJECT_DIR:-$PWD}"
BACKUP_TAG="d-dimitrov-backup:$(date +%F-%H-%M-%S)"
CONTAINER_NAME="d-dimitrov"
SERVICE_NAME="app"
LOG_FILE="$PROJECT_DIR/deploy_logs/deploy_$(date +%F_%H-%M-%S).log"
ROLLBACK_COMPOSE="$PROJECT_DIR/docker-compose.rollback.yml"

# Режими (задай преди пускане):
#   LOCAL_TEST=1     – използва d-dimitrov-local и порт 3401 (не пипа прод)
#   DRY_RUN=1        – само показва какво ще се направи, без да изпълнява
# Telegram (опционално): задай преди пускане
   export TELEGRAM_BOT_TOKEN="8543178402:AAG9wUBIgJxyCmnr6mP2EzPvsbrZG-R5YDY"
   export TELEGRAM_CHAT_ID="439455873"

if [ -n "$LOCAL_TEST" ]; then
  CONTAINER_NAME="d-dimitrov-local"
  COMPOSE_FILES="-f docker-compose.yml -f docker-compose.local.yml"
else
  COMPOSE_FILES="-f docker-compose.yml"
fi

mkdir -p "$PROJECT_DIR/deploy_logs"
exec > >(tee -a "$LOG_FILE") 2>&1

# ─────────────────────────────────────────────────────────────────────────────
# Telegram
# ─────────────────────────────────────────────────────────────────────────────
send_telegram() {
  local msg="$1"
  if [ -n "$TELEGRAM_BOT_TOKEN" ] && [ -n "$TELEGRAM_CHAT_ID" ]; then
    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
      -d "chat_id=${TELEGRAM_CHAT_ID}" \
      -d "text=${msg}" \
      -d "disable_web_page_preview=true" >/dev/null || true
  fi
}

# ─────────────────────────────────────────────────────────────────────────────
# Команди за compose (уважават LOCAL_TEST и DRY_RUN)
# ─────────────────────────────────────────────────────────────────────────────
compose_cmd() {
  if [ -n "$DRY_RUN" ]; then
    echo "[DRY RUN] docker-compose $COMPOSE_FILES $*"
    return 0
  fi
  docker-compose $COMPOSE_FILES "$@"
}

run_cmd() {
  if [ -n "$DRY_RUN" ]; then
    echo "[DRY RUN] $*"
    return 0
  fi
  "$@"
}

echo "═══════════════════════════════════════════════════════════════════════════"
if [ -n "$DRY_RUN" ]; then
  echo "🔍 DRY RUN – ще се показват само командите, нищо няма да се изпълни"
elif [ -n "$LOCAL_TEST" ]; then
  echo "🧪 ЛОКАЛЕН ТЕСТ – контейнер: $CONTAINER_NAME, порт 3401 (прод не се пипа)"
else
  echo "🚀 ДЕПЛОЙ КЪМ ПРОД"
fi
echo "═══════════════════════════════════════════════════════════════════════════"

cd "$PROJECT_DIR" || exit 1

# Проверка дали контейнерът съществува
RUNNING_ID=$(docker ps -qf "name=^${CONTAINER_NAME}$")
echo "Контейнер: $CONTAINER_NAME, ID: ${RUNNING_ID:-няма}"

if [ -z "$RUNNING_ID" ]; then
  echo "❗ Контейнерът $CONTAINER_NAME не е активен. Стартиране..."
  compose_cmd up -d --build
  RUNNING_ID=$(docker ps -qf "name=^${CONTAINER_NAME}$")
  echo "Стартиран контейнер ID: $RUNNING_ID"
fi

echo "📦 Създаване на бекъп образ: $BACKUP_TAG"
run_cmd docker commit "$RUNNING_ID" "$BACKUP_TAG"

echo "🚫 Спиране на контейнери..."
compose_cmd down

echo "📥 Обновяване от git (origin stage)..."
run_cmd git pull origin stage

echo "🔨 Стартиране на нов билд..."
if compose_cmd up -d --build; then
  echo "✅ Деплойът завърши успешно!"
  send_telegram "✅ Деплой успешен: $CONTAINER_NAME"
else
  echo "❌ Грешка при стартиране. Връщане от бекъп..."

  compose_cmd down

  # Rollback чрез същия compose конфиг (портове, volumes, env), само с backup образа
  echo "services:
  app:
    image: $BACKUP_TAG" > "$ROLLBACK_COMPOSE"
  if [ -n "$DRY_RUN" ]; then
    echo "[DRY RUN] docker-compose $COMPOSE_FILES -f $ROLLBACK_COMPOSE up -d"
  else
    docker-compose $COMPOSE_FILES -f "$ROLLBACK_COMPOSE" up -d
  fi
  rm -f "$ROLLBACK_COMPOSE"

  echo "♻️ Възстановен от бекъп: $BACKUP_TAG"
  send_telegram "❌ Деплой неуспешен. Възстановен от бекъп: $CONTAINER_NAME"
fi

echo "═══════════════════════════════════════════════════════════════════════════"
echo "Лог: $LOG_FILE"
echo "═══════════════════════════════════════════════════════════════════════════"
