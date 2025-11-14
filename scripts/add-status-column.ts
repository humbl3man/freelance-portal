import { createClient } from '@libsql/client';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = createClient({
	url: process.env.DATABASE_URL,
	authToken: process.env.DATABASE_AUTH_TOKEN
});

async function addStatusColumn() {
	try {
		// Check if column already exists
		const tableInfo = await client.execute(
			"SELECT name FROM pragma_table_info('client') WHERE name='status'"
		);

		if (tableInfo.rows.length > 0) {
			console.log('Status column already exists');
			client.close();
			return;
		}

		// Add the status column
		await client.execute("ALTER TABLE client ADD COLUMN status text NOT NULL DEFAULT 'default'");
		console.log('Successfully added status column to client table');
	} catch (error) {
		console.error('Error adding status column:', error);
		throw error;
	} finally {
		client.close();
	}
}

addStatusColumn();
