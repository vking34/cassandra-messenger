import cassandra from 'cassandra-driver';



export default new cassandra.Client({
    contactPoints: [process.env.CASSANDRA_CONTACT_POINTS],
    protocolOptions: {
        port: Number(process.env.CASSANDRA_PORT)
    },
    localDataCenter: process.env.CASSANDRA_LOCAL_DATACENTER,
    keyspace: process.env.CASSANDRA_KEYSPACE,
    credentials: {
        username: process.env.CASSANDRA_USERNAME,
        password: process.env.CASSANDRA_PASSWORD
    }
})