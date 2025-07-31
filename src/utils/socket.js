let socket = null;
let reconnectTimer = null;
let heartbeatTimer = null;

let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_INTERVAL = 3000;

const HEARTBEAT_INTERVAL = 10000; // 每 10 秒发送一次
const HEARTBEAT_MESSAGE = "ping";

let onMessageCallback = null;
let onOpenCallback = null;
let onCloseCallback = null;

const createWebSocket = (url) => {
  if (!url) throw new Error("WebSocket URL 不能为空");

  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("✅ WebSocket 连接成功");
    reconnectAttempts = 0;
    startHeartbeat();
    onOpenCallback?.();
  };

  socket.onmessage = (event) => {
    if (event.data !== HEARTBEAT_MESSAGE && onMessageCallback) {
      onMessageCallback(event.data);
    }
  };

  socket.onclose = () => {
    console.warn("❌ WebSocket 连接关闭");
    stopHeartbeat();
    onCloseCallback?.();
    attemptReconnect(url);
  };

  socket.onerror = (err) => {
    console.error("⚠️ WebSocket 错误：", err);
    socket.close();
  };
};

const attemptReconnect = (url) => {
  if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    console.warn("🚫 WebSocket 超过最大重连次数");
    return;
  }

  reconnectAttempts++;
  clearTimeout(reconnectTimer);
  reconnectTimer = setTimeout(() => {
    console.log(`🔄 尝试第 ${reconnectAttempts} 次重连...`);
    createWebSocket(url);
  }, RECONNECT_INTERVAL);
};

const startHeartbeat = () => {
  stopHeartbeat();
  heartbeatTimer = setInterval(() => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(HEARTBEAT_MESSAGE);
    }
  }, HEARTBEAT_INTERVAL);
};

const stopHeartbeat = () => {
  clearInterval(heartbeatTimer);
  heartbeatTimer = null;
};

export default {
  connect(url) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log("WebSocket 已连接");
      return;
    }
    createWebSocket(url);
  },

  send(message) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.warn("WebSocket 未连接，发送失败");
    }
  },

  close() {
    if (socket) {
      socket.close();
      socket = null;
      stopHeartbeat();
      clearTimeout(reconnectTimer);
    }
  },

  onMessage(callback) {
    onMessageCallback = callback;
  },

  onOpen(callback) {
    onOpenCallback = callback;
  },

  onClose(callback) {
    onCloseCallback = callback;
  },

  isConnected() {
    return socket?.readyState === WebSocket.OPEN;
  },
};
