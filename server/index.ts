import { createServer } from 'http'
import { Server } from 'socket.io'
import logger from './logger'
import { ClientToServerEvents, ServerToClientEvents } from 'types/socket'
import { DateTime } from 'luxon'

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
let connectedUsers: SocketData[] = []
io.on('connection', (player) => {
    // Specify the type of player if known
    logger.info(`New player: ${player.id}`)
    player.on('connected', (user) => {
        // Specify the type of user if known
        //TODO@abouthugo: why did I spread the user object before?
        logger.info(`Welcome ${user.name}!`)
        player.data = Object.assign(user, {
            lastHeartBeat: DateTime.now().toMillis(),
            id: player.id,
        })
        player.broadcast.emit('newPlayer', { ...user, id: player.id })
        connectedUsers.push(player.data)

        player.emit('assignId', player.id)
        // on entering get the current users that are connected
        player.emit('entering', connectedUsers)
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
            logger.error(e)
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
        player.data.id
        logger.info('We got an update!')
        logger.info(user)
        player.broadcast.emit('update', user)
    })

    player.on('heartbeat', () => {
        // Specify the type of user if known
        logger.info('Heartbeat received!')
        try {
            let user = find(player.id, connectedUsers)
            if (!user) return
            user.lastHeartBeat = DateTime.now().toMillis()
        } catch (e) {
            logger.error(e)
            logger.error({ data: player.data, connectedUsers })
        }
        // player.broadcast.emit('entering', connectedUsers)
    })

    player.on('leave', (playerId) => {
        // Specify the type of id if known
        logger.info(`Player ${playerId} left`)
        io.sockets.emit('playerLeft', playerId)
        connectedUsers = connectedUsers.filter((u) => u.id !== playerId) // Specify the type of v if known
        player.disconnect()
    })
})

setInterval(() => {
    logger.info({ connectedUsers }, 'connected users')
    connectedUsers = connectedUsers.filter((u) => {
        if (!isWithinTimeLimit(u.lastHeartBeat)) {
            logger.warn(`User ${u.name} disconnected due to timeout`)
            io.sockets.emit('playerLeft', u.id)
            return false
        }
        return true
    })
}, 5000)

httpServer.listen(5000, () => logger.info('Listening on port 5000'))

function find(id: string, arr: SocketData[]): SocketData | undefined {
    for (let u of arr) {
        if (u.id === id) return u
    }
    throw new Error('User not found')
}

function isWithinTimeLimit(lastHeartBeat: number): boolean {
    return DateTime.now().toMillis() - lastHeartBeat < 5000
}
