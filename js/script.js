
        var ws = null;
        var توقعاتسابقة = [];
        var currentIndex = 0;

        function openWebSocket() {
            var url = 'wss://c74hber8wo.com/games-frame/sockets/crash?whence=22&fcountry=66&ref=1&gr=0&appGuid=games-web-master&lng=en&access_token=eyJhbGciOiJFUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiI1MC85ODM4OTQyMzkiLCJwaWQiOiIxIiwianRpIjoiMC9lNGIzMjIwNzA4MjRkOWRmZjlhZmI0YzY5MjBkZjUzNjk5YTRkOTIxZWNmZTVhYTllN2UyMmE1OWJmMTA5YTM3IiwiYXBwIjoiZmYzZDRhYmNmYmM2NWI0MF8yIiwieHBqIjoiMCIsInhnciI6IjAiLCJuYmYiOjE3Mjc2NDUxMTgsImV4cCI6MTcyNzY0NjMxOCwiaWF0IjoxNzI3NjQ1MTE4fQ.SrY6eW4FN_awolOE0YxYpgBNIi1mjdi_g_jUxEsMv-Gxlm5Brok5GvnZ4pAbJXDEI_4i5RIiFVXhrOPvrPiFhg';
            ws = new WebSocket(url);
            ws.onopen = function() {
                console.log('WebSocket opened');
                ws.send('{"protocol":"json","version":1}\x1e');
                ws.send('{"arguments":[{"activity":30,"account":983894239}],"invocationId":"0","target":"Account","type":1}\x1e');
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
