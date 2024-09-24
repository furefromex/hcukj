
        var ws = null;
        var توقعاتسابقة = [];
        var currentIndex = 0;

        function openWebSocket() {
            var url = 'wss://c74hber8wo.com/games-frame/sockets/crash?whence=22&fcountry=66&ref=1&gr=0&appGuid=games-web-master&lng=en&access_token=eyJhbGciOiJFUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiI1MC85ODM4OTQyMzkiLCJwaWQiOiIxIiwianRpIjoiMC9jYTM3M2UwYjVlY2FjYjViYjliM2Y4NDFlZjkyY2IxMzdkZjNjMWZkZDlhMGZlNzE3OGQ2ZjI2NGI3ZmZiZjI5IiwiYXBwIjoiZmYzZDRhYmNmYmM2NWI0MF8yIiwieHBqIjoiMCIsInhnciI6IjAiLCJuYmYiOjE3MjcxNDA0OTYsImV4cCI6MTcyNzE0MTY5NiwiaWF0IjoxNzI3MTQwNDk2fQ.BdkAynkqYWT_j3a6HFglZt9T1WS4YZ17nrohUlBM197dXfYvhjOJ8HDX_vUPIACosJJih4HQwqQgl3hAtbXMIQ';
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
