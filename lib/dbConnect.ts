import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI as string;

console.log('URI:', uri);

const dbConnect = async () => {
	try {
		const connection = await mongoose.connect(uri);
		console.log('SUCCESFULL CONNECTION');
		return connection;
	} catch (error) {
		console.log('db connection fail: ', error);
	}
};

export default dbConnect;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
// 	serverApi: {
// 		version: ServerApiVersion.v1,
// 		strict: true,
// 		deprecationErrors: true,
// 	},
// });
// export default async function dbConnect() {
// 	try {
// 		// Connect the client to the server	(optional starting in v4.7)
// 		await client.connect();
// 		// Send a ping to confirm a successful connection
// 		await client.db('admin').command({ ping: 1 });
// 		console.log(
// 			'Pinged your deployment. You successfully connected to MongoDB!'
// 		);
// 	} finally {
// 		// Ensures that the client will close when you finish/error
// 		await client.close();
// 	}
// }
// dbConnect().catch(console.dir);
