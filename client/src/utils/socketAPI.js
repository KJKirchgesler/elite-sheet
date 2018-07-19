import * as WebSocketWrapper from "ws-wrapper";

// Exponential back-off configuration for auto-reconnect
const RECONNECT_VALUE_MIN = 1000 // 1 second
    , RECONNECT_VALUE_MAX = 1000 * 60 // 1 minute
    , RECONNECT_VALUE_FACTOR = 1.4;

let reconnectValue = RECONNECT_VALUE_MIN;

const URL = "ws://" + window.location.host + "/socket"

const socket = new WebSocketWrapper(
	new WebSocket(URL)
);

socket.autoReconnect = true;
socket.on("error", (err) => {
    socket.disconnect();
}).on("disconnect", function(event, wasOpen) {
    // Use exponential back-off to reconnect if `autoReconnect` is set
    if(wasOpen) {
        reconnectValue = RECONNECT_VALUE_MIN;
    } else {
        reconnectValue = Math.min(reconnectValue * RECONNECT_VALUE_FACTOR,
            RECONNECT_VALUE_MAX);
    }
    if(this.autoReconnect) {
        setTimeout(() => {
            socket.bind(new WebSocket(URL) );
        }, Math.random() * reconnectValue);
    }
});

export default socket;