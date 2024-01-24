import React, { useCallback, useEffect, useRef, useState } from 'react'
import './TextChat.css'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { msgsArray } from '../../helper/constants'
import { useSocket } from "../../providers/SocketProvider";

export function TextChat({ roomId }) {

    const [msgInput, setMsgInput] = useState('');
    const scrollRef = useRef(null);
    const [msgs, setMsgs] = useState([]);
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);


    const handleOnMsgSend = () => {
        console.log('msg send');
        console.log('msgInput', msgInput, msgs);
        if (!msgInput) return;
        socket.emit("msg:sent", { roomId: roomId, msg: msgInput });
        setMsgs([...msgs, { msg: msgInput, from: 'self' }]);
        setMsgInput('');
    }

    const handleOnMsgReceived = ({ msg }) => {
        console.log('receive', msg);
        setMsgs([...msgs, { msg: msg, from: '' }]);
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        socket.on("msg:received", handleOnMsgReceived);
        // console.log('useEffect');
        displayMsg();
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: "smooth" });
        };
    }, [msgs, socket])

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('press enter');
            handleOnMsgSend();
        }
    }

    const displayMsg = useCallback(() => {
        if (!msgs || !msgs.length) return;
        return msgs.map((msg) => {
            return (<Grid item textAlign={msg.from == 'self' && 'right' || 'left'} xs={12} className='msg-grid' >
                <Box spacing={1} >
                    <Typography variant="body1" color="initial" ref={scrollRef}>{msg.msg}</Typography>
                </Box>
            </Grid>)
        })
    }, [msgs]);

    return (
        <>
            <Box className=''>
                <Grid className='text-chat-screen' margin="auto" container spacing={1} width='70%' alignItems="center" >
                    <Grid container direction='row' margin="0" padding='5px' spacing={1} height='400px' sx={{ 'overflow-y': 'scroll' }}  >
                        {displayMsg()}
                    </Grid>
                    <Grid container sx={{ "margin": "10px" }} direction="row" justifyContent='space-between' >
                        <Grid item xs={9}>
                            <TextField
                                fullWidth
                                size='small'
                                id=""
                                label=""
                                value={msgInput}
                                placeholder='Message...'
                                onChange={e => setMsgInput(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3} >
                            <Button fullWidth size='medium' variant="contained"
                                color="primary"
                                onClick={handleOnMsgSend}
                                sx={{ 'height': '42px' }}>Send</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box >
        </>
    )
}
