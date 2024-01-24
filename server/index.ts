import { createServer } from 'http'
import { Server } from 'socket.io'
import logger from './logger'
import { ClientToServerEvents, ServerToClientEvents } from 'types/socket'
import { UserType } from '@/game-state-provider'

type SocketData = {
    id: string
    name: string
    available: boolean
    lastHeartBeat: number
}

type InterServerEvents = {
    ping: () => void
}

const httpServer = createServer()
let io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
})
let connectedUsers: UserType[] = []
io.on('connection', (player) => {
    // Specify the type of player if known
    logger.info(`New player: ${player.id}`)

    player.emit('assignId', player.id)

    player.emit('entering', connectedUsers)

    player.on('connected', (user) => {
        // Specify the type of user if known
        //TODO@abouthugo: why did I spread the user object before?
        logger.info(`Welcome ${user.name}!`)
        player.broadcast.emit('newPlayer', user)
        connectedUsers.push(user)
    })

    player.on('requestMatch', (id) => {
        // Specify the type of id if known
        try {
            let sender = find(player.id, connectedUsers)
            let receiver = find(id, connectedUsers)
            logger.info(
                `${sender?.name} is trying to battle with ${receiver?.name}`,
            )
            if (!sender || !receiver) return
            player.broadcast.to(id).emit('matchInvite', sender.id, sender.name)
        } catch (e) {
            logger.info(e)
        }
    })

    player.on('confirmMatch', (playerId, accepted) => {
        // Specify the type of id and answer if known
        if (accepted) logger.info('Match accepted!')
        else logger.info('Match declined')

        player.broadcast.to(playerId).emit('confirmMatch', accepted)
    })

    player.on('choice', (playerId, choice) => {
        // Specify the type of to and choice if known
        logger.info(choice)
        player.broadcast.to(playerId).emit('choice', choice)
    })

    player.on('update', (user) => {
        // Specify the type of user if known
        //TODO@abouthugo: why is the user not updated in the server?
        logger.info('We got an update!')
        logger.info(user)
        player.broadcast.emit('update', user)
    })

    player.on('leave', (playerId) => {
        // Specify the type of id if known
        logger.info(`Player ${playerId} left`)
        io.sockets.emit('playerLeft', playerId)
        connectedUsers = connectedUsers.filter((u) => u.id !== playerId) // Specify the type of v if known
        logger.info(connectedUsers)
        player.disconnect()
    })
})

setInterval(() => {
    logger.info({ connectedUsers }, 'connected users')
}, 1000)

httpServer.listen(5000, () => logger.info('Listening on port 5000'))
interface User {
    id: string
    name: string
}

function find(id: string, arr: User[]): User | undefined {
    for (let u of arr) {
        if (u.id === id) return u
    }
    throw new Error('User not found')
}
