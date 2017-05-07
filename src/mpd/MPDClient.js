class MPDClient {
    constructor(ip, port) {
        this.callbackQueue = [];
        this.commnadQueue = [];

        this.net = window.require('net');
        this.start = false;
        this.client = this.net.connect({
            port: port,
            host: ip
        }, () => {
            this.callbackQueue.push((res) => {
            });
        });
        this.client.on('data', (res) => {
            console.log(res.toString())
            this.reciveResponse(res)
        });


    }

    sendCommand(command, callback = (res) => {
    }) {
        this.callbackQueue.push(callback);
        this.commnadQueue.push(command);
    }

    reciveResponse(res) {
        if (!this.start && res.toString().match(/^OK MPD/)) {
            this.start = true;
            this.writeCommand();
            return;
        }
        if (this.callbackQueue.length > 0) {
            this.callbackQueue.shift()(this.mpdResponseToValue(res));
            this.writeCommand();
        }
    }

    writeCommand() {
        if (this.callbackQueue.length > 0) {
            this.client.write(this.commnadQueue.shift() + '\n');
        } else {
            setTimeout(this.writeCommand.bind(this), 100);
        }
    }

    mpdResponseToValue(response) {
        var strRes = response.toString();
        var result = {};
        var strArr = strRes.split('\n');
        if (strArr[0].match(/^OK/)) {
            strArr.shift();
        }
        if (strArr[strArr.length - 1] === '') {
            strArr.pop();
        }
        if (strArr.length > 0 && strArr[strArr.length - 1].match(/^OK/)) {
            strArr.pop();
        }

        strArr.forEach((data) => {
            var endPos = data.indexOf(':');
            var value = data.substring(endPos + 1, data.length);
            var key = data.split(':')[0];
            result[key] = new String(value).replace(/^ /gi, '');
        });
        return result;
    }

}

export default MPDClient;
