#!/bin/bash

set -e

# ⚙️ Настройки
PROJECT_DIR="$PWD"
BACKUP_TAG="d-dimitrov-backup:$(date +%F-%H-%M-%S)"
CONTAINER_NAME="d-dimitrov"
SERVICE_NAME="app"
LOG_FILE="$PROJECT_DIR/deploy_logs/deploy_test_$(date +%F_%H-%M-%S).log"

mkdir -p "$PROJECT_DIR/deploy_logs"
exec > >(tee -a "$LOG_FILE") 2>&1

echo "🧪 ТЕСТОВО ПУСКАНЕ НА СКРИПТА (НЕ ЗАСЯГА ПРОД)"

cd "$PROJECT_DIR" || exit 1

# Проверка дали контейнерът съществува
RUNNING_ID=$(docker ps -qf "name=$CONTAINER_NAME")
echo "Контейнерът има ID: $RUNNING_ID"
echo "Контейнерът има Име: $CONTAINER_NAME"
if [ -z "$RUNNING_ID" ]; then
    echo "❗ Контейнерът $CONTAINER_NAME не е активен. Стартирам нов за тест..."
    docker-compose up -d --build
    RUNNING_ID=$(docker ps -qf "name=$CONTAINER_NAME")
    echo "Нов контейнер ID: $RUNNING_ID"
fi
echo "📦 Създаване на бекъп на текущото състояние: $BACKUP_TAG"
docker commit "$RUNNING_ID" "$BACKUP_TAG"

echo "🚫 Спиране на старите контейнери..."
docker-compose down

echo "📥 Обновяване на тестовия код от GitHub..."
git pull origin stage
echo "🔨 Стартиране на нов билд..."
if docker-compose up -d --build; then
    echo "✅ Тестовият билд е стартиран успешно!"
else
    echo "❌ Грешка при стартирането. Връщане на бекъпа..."

    docker-compose down

    docker run -d --name "$CONTAINER_NAME" "$BACKUP_TAG"

    echo "♻️ Възстановен от бекъп: $BACKUP_TAG"
fi

echo "🧪 Тестов деплой приключи. Лог: $LOG_FILE"
