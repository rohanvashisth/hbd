@echo off
title HBD Auto-Commit Watcher
cd /d "%~dp0"
echo ========================================
echo   Starting Auto-Commit for hbd
echo ========================================
python autocommit.py
pause
