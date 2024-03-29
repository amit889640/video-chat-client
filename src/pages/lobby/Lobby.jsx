import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../providers/SocketProvider";
import './Lobby.css'

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div >
      <div>
        <h1>Lobby</h1>
      </div>
      <div className="main">
        <form onSubmit={handleSubmitForm}>
          <div>
            <label htmlFor="room">Room Number</label>
            <input type="text" id="room" value={room} onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email ID</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button>Join</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LobbyScreen;
