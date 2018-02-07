@echo off

call npm install
SETLOCAL
SET PATH=node_modules\.bin;node_modules\hubot\node_modules\.bin;%PATH%
SET TELEGRAM_TOKEN=491068676:AAG808fOjvsLf10M0RkvKxtOMkKOsyLY8t4 
SET REDIS_URL=redis://redistogo:b10e2919739921c8bd259802eabc1421@soldierfish.redistogo.com:11070/

node_modules\.bin\hubot.cmd -a telegram --name "SabrinoBot" %* 
