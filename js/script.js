
        var ws = null;
        var توقعاتسابقة = [];
        var currentIndex = 0;

        function openWebSocket() {
            var url = 'wss://c74hber8wo.com/games-frame/sockets/crash?whence=22&fcountry=66&ref=1&gr=0&appGuid=games-web-master&lng=en&access_token=eyJhbGciOiJFUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiI1MC85OTM2OTQyNTEiLCJwaWQiOiIxIiwianRpIjoiMC9jYWI4Y2JmZDY5MWViYTM5NjE1ZTE4MDViMDBmNWUyZmE4NDU3ZmIzZjM2ZWE1YTg0ZDY2YWUxODQ2NTkwMTUzIiwiYXBwIjoiTkEiLCJpbm5lciI6InRydWUiLCJuYmYiOjE3MjgwNTYzMzgsImV4cCI6MTcyODA3MDczOCwiaWF0IjoxNzI4MDU2MzM4fQ.mbM7_jbC2DEqiwImb8vjySmnZYelQ_FQw77Hn1lTMYm3AL2vhzsfHKzAuYWpX31q0OnRh7Bs2KcxXgPvWbbvwg';
            ws = new WebSocket(url);
            ws.onopen = function() {
                console.log('WebSocket opened');
                ws.send('{"protocol":"json","version":1}\x1e');
                ws.send('{"arguments":[{"activity":30,"account":993694251}],"invocationId":"0","target":"Account","type":1}\x1e');
            };
            ws.onclose = function() {
                console.log('WebSocket closed');
                ws = null;
            };
            ws.onmessage = function(event) {
                var data = JSON.parse(event.data.slice(0, -1));
                if (data.target === 'OnCrash') {
                    توقعاتسابقة.push(data.arguments[0].f);
                    عرضالتوقعالتالي();
                }
            };
            ws.onerror = function(event) {
                console.error('WebSocket error:', event);
            };
        }

        function عرضالتوقعالتالي() {
            if (currentIndex < توقعاتسابقة.length) {
                var crashValueElement = document.getElementById('crashValue');
                crashValueElement.innerText = توقعاتسابقة[currentIndex];
                currentIndex++;
            }
        }

        openWebSocket();
