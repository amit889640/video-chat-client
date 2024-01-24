import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../services/peer";
import { TextChat } from '../../components/text-chat/TextChat'
import { useSocket } from "../../providers/SocketProvider";
import { useParams } from "react-router";
import './Room.css';

import VdoChat from "../../components/vdo-chat/VdoChat";
import { Box } from "@mui/system";
import Grid from '@mui/material/Grid'
import { Switch } from "@mui/base";
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import { FormControlLabel } from "@mui/material";

const RoomPage = ({ match }) => {
  const { roomId } = useParams();
  const socket = useSocket();
  const [isVideoOn, setIsVideoOn] = useState(true);

  useEffect(() => {
  }, [isVideoOn]);

  const render = () => {
    if (isVideoOn) {
      return <>
        <VdoChat />
      </>
    } else {
      return <div>
        <TextChat roomId={roomId} />
      </div>
    }
  }
  return (
    <>
      <Grid className="border" direction='row' container xs={12} spacing={0} >
        <Grid item className="border" xs={4}  >
          <FormControlLabel label='Switch to Video Mode' control={<Switch onChange={() => setIsVideoOn(!isVideoOn)} />} />
        </Grid>
        <Grid item className="border" xs={4}  >
          <h1 className="heading" >Room Page</h1>
        </Grid>
        <Grid item className="border" xs={4}  >
          <h3>Is anyone on-line</h3>
        </Grid>
      </Grid >
      {render()}
    </>
  );
};

export default RoomPage;
