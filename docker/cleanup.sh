#!/usr/bin/env bash
set -e
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR

for i in "$@"
do
case $i in
    -d=*|--database-name=*)
    DATABASE_NAME="${i#*=}"
    shift # past argument=value
    ;;
    *)
          # unknown option
    ;;
esac
done

if [ -z "$DATABASE_NAME" ]
then
  echo "DATABASE_NAME is required: use '-d=foo' or '--database-name=foo'";
  exit 1;
fi

pg_ex="docker-compose exec nightlybuilders-postgres"

echo "🥁 Cleaning database '${DATABASE_NAME}'..."

$pg_ex psql -U postgres -d ${DATABASE_NAME} -f /sql/cleanup.sql

echo "🚀 Done!"
