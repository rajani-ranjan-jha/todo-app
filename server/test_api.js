// import { fetch } from 'undici'; // Native fetch used in Node 18+

const API_URL = 'http://localhost:3000';

async function testApi() {
    console.log('Testing API...');

    try {
        // 1. Create a Todo
        console.log('1. Creating Todo...');
        const createRes = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: 'Test Todo' })
        });

        if (!createRes.ok) throw new Error(`Create failed: ${createRes.statusText}`);
        const newTodo = await createRes.json();
        console.log('Created:', newTodo);

        // 2. Get Todos
        console.log('2. Fetching Todos...');
        const getRes = await fetch(`${API_URL}/todos`);
        const todos = await getRes.json();
        console.log('Fetch completed. Count:', todos.length);
        const found = todos.find(t => t.id === newTodo.id);
        if (!found) throw new Error('New todo not found in list');

        // 3. Update Todo
        console.log('3. Updating Todo...');
        const updateRes = await fetch(`${API_URL}/todos/${newTodo.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: true })
        });
        if (!updateRes.ok) throw new Error(`Update failed: ${updateRes.statusText}`);
        console.log('Updated successfully');

        // 4. Delete Todo
        console.log('4. Deleting Todo...');
        const deleteRes = await fetch(`${API_URL}/todos/${newTodo.id}`, {
            method: 'DELETE'
        });
        if (!deleteRes.ok) throw new Error(`Delete failed: ${deleteRes.statusText}`);
        console.log('Deleted successfully');

        console.log('✅ All API tests passed!');
    } catch (error) {
        console.error('❌ API Test Failed:', error.message);
        process.exit(1);
    }
}

testApi();
