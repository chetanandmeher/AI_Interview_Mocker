import pkg from 'pg';
const { Client } = pkg;


const client = new Client({
    connectionString: "postgresql://ai-interview-mocker_owner:mRxA72dyuOYB@ep-polished-star-a8y243au-pooler.eastus2.azure.neon.tech/ai-interview-mocker?sslmode=require"
});

client.connect()
    .then(() => {
        console.log('Connected to the database successfully');
        return client.end();
    })
    .catch(err => {
        console.error('Connection error', err.stack);
    });
