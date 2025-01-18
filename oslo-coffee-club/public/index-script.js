        // Order submission (Persistent XSS)
        document.getElementById('orderForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const coffee = document.getElementById('coffee').value;

            try {
                const response = await fetch('/api/order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, coffee }),
                });

                const data = await response.json();
                alert(data.message);
                fetchOrders(); // Update orders
            } catch (err) {
                alert('Order failed: ' + err.message);
            }
        });

        // Fetch and display orders
        async function fetchOrders() {
            const ordersList = document.getElementById('ordersList');
            ordersList.innerHTML = '';
            const response = await fetch('/api/orders');
            const orders = await response.json();

            orders.forEach(order => {
                // Persistent XSS vulnerability: unsanitised data rendered with innerHTML
                ordersList.innerHTML += `<li class="list-group-item">${order.name} ordered ${order.coffee}</li>`;
            });
        }

        // Search orders (DOM-based XSS)
        document.getElementById('searchForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const searchQuery = document.getElementById('search').value;
            const searchResults = document.getElementById('searchResults');

            // DOM-based XSS: unsanitised input rendered with innerHTML
            searchResults.innerHTML = `<p>Search results for: <b>${searchQuery}</b></p>`;
        });

        // Clear all orders
        document.getElementById('clearOrdersButton').addEventListener('click', async () => {
            try {
                const response = await fetch('/api/clear-orders');
                const data = await response.json();
                alert(data.message); // Show success message
                fetchOrders(); // Refresh the orders list
            } catch (err) {
                alert('Failed to clear orders: ' + err.message);
            }
        });

        // Fetch orders on page load
        fetchOrders();
