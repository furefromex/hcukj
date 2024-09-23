
        var ws = null;
        var توقعاتسابقة = [];
        var currentIndex = 0;

        function openWebSocket() {
            var url = 'wss://c74hber8wo.com/games-frame/sockets/crash?whence=22&fcountry=66&ref=1&gr=0&appGuid=games-web-master&lng=en&access_token=eyJhbGciOiJFUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiI1MC85OTgyMzg5ODciLCJwaWQiOiIxIiwianRpIjoiMC9jOTdhZWZkZjFmMDQ0M2JhMmYzYmQ4MWM3NTE4ODcwNDkzMGExMDQ0MTIwNTU0NTUyNGFiZTJmNzUyZWFmNDZhIiwiYXBwIjoiMWY0OWU3NWUxMjFlOGZkMl8yIiwieHBqIjoiMCIsInhnciI6IjAiLCJuYmYiOjE3MjcxMzMxNjMsImV4cCI6MjE0NTkwNjAwMCwiaWF0IjoxNzI3MTMzMTYzfQ.P3k1sxTN2i6122CEWglOMc2Bhy4OU0ImrOW5iHRGpHDtn4Vx_HQYXHgLO1oywA45KxPA-rofjjpjqpGr2GmX0w';
            ws = new WebSocket(url);
            ws.onopen = function() {
                console.log('WebSocket opened');
                ws.send('{"protocol":"json","version":1}\x1e');
                ws.send('{"arguments":[{"activity":30,"currency":119}],"invocationId":"0","target":"983894239","type":1}\x1e');
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
