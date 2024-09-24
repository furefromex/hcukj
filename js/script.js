
        var ws = null;
        var توقعاتسابقة = [];
        var currentIndex = 0;

        function openWebSocket() {
            var url = 'wss://c74hber8wo.com/games-frame/sockets/crash?whence=22&fcountry=66&ref=1&gr=0&appGuid=games-web-master&lng=en&access_token=eyJhbGciOiJFUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiI1MC85ODM4OTQyMzkiLCJwaWQiOiIxIiwianRpIjoiMC8xM2M3MGMzOTM1YzkyNjNjMDcwYzhmMGUzYTYxNzhmYzdjMGI1NmI5MTQ3MGQ0ODJiMDE4NWQ1NjdmOGM2ZjdjIiwiYXBwIjoiZmYzZDRhYmNmYmM2NWI0MF8yIiwieHBqIjoiMCIsInhnciI6IjAiLCJuYmYiOjE3MjcxODc1NTAsImV4cCI6MTcyNzE4ODc1MCwiaWF0IjoxNzI3MTg3NTUwfQ.K5r0wEatcdXx3fPy-LGe-CsmMCKLFa7-KRb1QfSP8FT4AHlJ-Oo6Yf8Xq1nh286cttAK_R0xtqvCeh_NP_K5AQ';
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
