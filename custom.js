document.addEventListener('DOMContentLoaded', function() {
    const itemsTable = document.getElementById('itemsTable');
    const addItemForm = document.getElementById('addItemForm');
    const saveNewItem = document.getElementById('saveNewItem');
    const modal = new bootstrap.Modal(document.getElementById('addItemModal'));

    let items = [];
    const VAT_RATE = 0.07; // 7% VAT

    function updateTotals() {
        const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.pricePerUnit), 0);
        const vat = subtotal * VAT_RATE;
        const shipping = 0; // Can be modified based on requirements
        const total = subtotal + vat + shipping;

        document.getElementById('subtotal').textContent = subtotal.toFixed(2);
        document.getElementById('vat').textContent = vat.toFixed(2);
        document.getElementById('shipping').textContent = shipping.toFixed(2);
        document.getElementById('total').textContent = total.toFixed(2);
    }

    function renderItems() {
        itemsTable.innerHTML = '';
        items.forEach((item, index) => {
            const row = document.createElement('tr');
            const amount = item.quantity * item.pricePerUnit;
            
            row.innerHTML = `
                <td>${item.quantity}</td>
                <td>${item.description}</td>
                <td class="text-end">${item.pricePerUnit.toFixed(2)}</td>
                <td class="text-end">${amount.toFixed(2)}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">X</button>
                </td>
            `;
            itemsTable.appendChild(row);
        });
        updateTotals();
    }

    window.removeItem = function(index) {
        items.splice(index, 1);
        renderItems();
    };

    saveNewItem.addEventListener('click', function() {
        const description = document.getElementById('description').value;
        const pricePerUnit = parseFloat(document.getElementById('pricePerUnit').value);
        const quantity = parseInt(document.getElementById('quantity').value);

        if (description && pricePerUnit && quantity) {
            items.push({ description, pricePerUnit, quantity });
            renderItems();
            addItemForm.reset();
            modal.hide();
        }
    });
});