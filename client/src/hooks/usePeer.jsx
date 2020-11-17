import { useState, useEffect } from 'react'
import Peer from 'peerjs'

const usePeer = (id, opts) => {
  const [peer, setPeer] = useState(null)

  useEffect(() => {
    console.log(`usepeer called peer ${peer}`); 
    const newPeer = new Peer(id, opts)

    newPeer.on('open', () => {
      console.log(`usepeer.open : ${peer}`); 
      setPeer(newPeer)
    })

    newPeer.on('close', () => {
      console.log(`usepeer.close  : ${peer}`); 
      setPeer(null)
    })
    console.log(`exported peer is : ${peer}`);  
    return () => newPeer.destroy()
  }, [id])
  
  return peer
}

export default usePeer
