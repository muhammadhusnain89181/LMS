import { useState, useEffect } from 'react'
import Peer from 'peerjs'

const usePeer = (id, opts) => {
  const [peer, setPeer] = useState(null)

  useEffect(() => {
    const newPeer = new Peer(id, opts)

    newPeer.on('open', () => {
      console.log(`usepeer.open is called ${id}`);
      setPeer(newPeer)
    })

    newPeer.on('close', () => {
      setPeer(null)
    })

    return () => newPeer.destroy()
  }, [])
  console.log(`Peer created is ${peer}`);
  return peer
}

export default usePeer
