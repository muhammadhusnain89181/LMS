import { useState, useEffect } from 'react'
import Peer from 'peerjs'

const usePeer = (id, opts) => {
  console.log(`peer id is ::: ${id}`);
  const [peer, setPeer] = useState(null)

  useEffect(() => {
    const newPeer = new Peer(id, opts)

    newPeer.on('open', () => {
      setPeer(newPeer)
    })

    newPeer.on('close', () => {
      setPeer(null)
    })

    return () => newPeer.destroy()
  }, [])
console.log(`peer : ${peer}`);
  return peer
}

export default usePeer
