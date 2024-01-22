const { checklistAI } = require("./checklistAI");
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const clients = new Set(); // Using a Set to store connected clients

io.on("connection", (socket) => {
  // Add the newly connected client to the set
  clients.add(socket);
  // Define variables to track incoming data
  let jsonDataReceived = false;
  let framesReceived = 0;
  let frames;
  let jsonData;

  console.log("Socket.IO connection opened");

  socket.on("message", async (message) => {
    // Check if the message is valid JSON before parsing
    try {
      const data = JSON.parse(message);
      console.log("data :", data);

      // Handle the parsed data based on its structure
      if (data.type === "ping") {
        // Handle ping message
        socket.send(JSON.stringify({ type: "pong" }));
      } else if (data.type === "jsonData") {
        try {
          // Handle jsonData
          console.log("Setting jsonDataReceived flag");
          jsonDataReceived = true;
          console.log("jsonDataReceived :", jsonDataReceived);
          console.log("jsonDataReceived is now true");
          console.log("data.jsonData :", data.jsonData);
          jsonData = data.jsonData;
        } catch (error) {
          console.error("Error handling jsonData:", error);
        }
      } else if (data.type === "frames") {
        // Handle live stream frames
        console.log("data.frames :", data.frames);
        frames = data.frames;
        framesReceived++;
        console.log("jsonDataReceived:", jsonDataReceived);
        console.log("framesReceived:", framesReceived);

        if (jsonDataReceived && framesReceived > 0 && framesReceived <= 16) {
          // Both jsonData and at least one frame received, trigger checkedListAI

          // Log the data being sent to the AI API endpoint
          console.log("Sending data to AI API endpoint:", { jsonData, frames });
          const content = await checklistAI(jsonData, frames);

          try {
            // Log the data being sent to the AI API endpoint
            console.log("content - AI result returned from AI API endpoint :", content);

            const aiResult = content.parts[0].text;
            console.log("aiResult before ws send to client :", aiResult);
            // Send the content to all connected Socket.IO clients
            clients.forEach((client) => {
              client.emit("aiResult", aiResult);
            });

            console.log("aiResult already sent to client.");
            // Reset flags after processing
            // jsonDataReceived = false;
            framesReceived = 0;
          } catch (error) {
            console.error("Error processing frames asynchronously:", error);
          }
          // jsonData = null;
        }
      } else {
        // Handle other types of messages
      }
    } catch (error) {
      console.error("Error parsing Socket.IO message:", error);
      // Handle the error, e.g., display an error message to the user
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket.IO connection closed");
    // Remove the disconnected client from the set
    clients.delete(socket);
  });
});

const PORT = process.env.PORT || 3002;

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server is listening on port ${PORT}`);
});
