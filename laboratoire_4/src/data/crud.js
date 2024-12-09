let combinedData = {
    "profile": [
        {
            "user_id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com",
            "password": "password123",
            "address": "123 Main Street",
            "bank_account": "BE1234567890",
            "balance": 150.00
        },
        {
            "user_id": 2,
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "password": "securepass",
            "address": "456 Elm Street",
            "bank_account": "BE9876543210",
            "balance": 250.00
        },
        {
            "user_id": 3,
            "name": "Alice Brown",
            "email": "alice.brown@example.com",
            "password": "mypassword",
            "address": "789 Oak Avenue",
            "bank_account": "BE1122334455",
            "balance": 300.00
        },
        {
            "user_id": 4,
            "name": "Alice Dupont",
            "email": "alice.dupont@example.com",
            "password": "hashedpassword1",
            "address": "123 Rue Principale, Paris, France",
            "bank_account": "FR7630004000031234567890143",
            "balance": 1500.75
        },
        {
            "user_id": 5,
            "name": "Bob Martin",
            "email": "bob.martin@example.com",
            "password": "hashedpassword2",
            "address": "456 Avenue des Champs, Lyon, France",
            "bank_account": "FR7630004000039876543210987",
            "balance": 250.50
        },
        {
            "user_id": 6,
            "name": "Charlie Dubois",
            "email": "charlie.dubois@example.com",
            "password": "hashedpassword3",
            "address": "789 Boulevard Haussmann, Marseille, France",
            "bank_account": "FR7630004000036543217890123",
            "balance": 3000.00
        }

    ],
    "orders": [
        {
            "order_id": 1,
            "buyer_id": 1,
            "payment_status": "completed",
            "shipping_status": "shipped",
            "order_date": "2024-12-06"
        },
        {
            "order_id": 2,
            "buyer_id": 2,
            "payment_status": "failed",
            "shipping_status": "delivered",
            "order_date": "2024-12-05T15:45:00Z"
        },
        {
            "order_id": 3,
            "buyer_id": 3,
            "payment_status": "completed",
            "shipping_status": "delivered",
            "order_date": "2024-12-04T09:00:00Z"
        }
    ],
    "review": [
        {
            "reviewer_id": 1,
            "seller_id": 2,
            "rating": 5,
            "comment": "Excellent service!",
            "review_date": "2024-12-06"
        },
        {
            "reviewer_id": 2,
            "seller_id": 3,
            "rating": 4,
            "comment": "Good quality product.",
            "review_date": "2024-12-05T12:30:00Z"
        },
        {
            "reviewer_id": 3,
            "seller_id": 1,
            "rating": 3,
            "comment": "Average experience.",
            "review_date": "2024-12-04T16:00:00Z"
        }
    ],
    "product": [
        {
            "product_id": 1,
            "seller_id": 1,
            "name": "3D Printer Filament",
            "description": "PLA filament, 1kg spool",
            "price": 20.99,
            "filament_type": "PLA"
        },
        {
            "product_id": 2,
            "seller_id": 2,
            "name": "3D Printer Nozzle",
            "description": "0.4mm brass nozzle",
            "price": 5.99,
            "filament_type": "N/A"
        },
        {
            "product_id": 3,
            "seller_id": 3,
            "name": "3D Printer Bed",
            "description": "Tempered glass bed, 220x220mm",
            "price": 25.50,
            "filament_type": "N/A"
        },
        {
            "product_id": 4,
            "name": "3D Printer - Model A",
            "description": "High-quality 3D printer suitable for industrial use.",
            "price": 1200.00,
            "filament_type": "PLA",
            "seller_id": 1
        },
        {
            "product_id": 5,
            "name": "3D Printer - Model B",
            "description": "Compact 3D printer for home use.",
            "price": 600.00,
            "filament_type": "ABS",
            "seller_id": 2
        },
        {
            "product_id": 6,
            "name": "Filament PLA 1.75mm - Black",
            "description": "Premium quality filament for precision printing.",
            "price": 25.50,
            "filament_type": "PLA",
            "seller_id": 3
        },
        {
            "product_id": 7,
            "name": "Filament ABS 1.75mm - White",
            "description": "Durable ABS filament for complex designs.",
            "price": 30.00,
            "filament_type": "ABS",
            "seller_id": 2
        },
        {
            "product_id": 8,
            "name": "3D Printer - Model C",
            "description": "High-speed 3D printer with advanced features.",
            "price": 1500.00,
            "filament_type": "PETG",
            "seller_id": 1
        }
    ],
    "order_items": [
        {
            "order_id": 1,
            "product_id": 1,
            "quantity": 2
        },
        {
            "order_id": 2,
            "product_id": 2,
            "quantity": 1
        },
        {
            "order_id": 3,
            "product_id": 3,
            "quantity": 3
        }
    ]
    ,
    "auto": [
        {
            "test": 1,
            "voila encore": 1,
            "teu": 2
        },
        {
            "order_id": 2,
            "product_id": 2,
            "quantity": 1
        },
        {
            "order_id": 3,
            "product_id": 3,
            "quantity": 3
        }
    ]
};



export const create = (tableName, item) => {
    console.log("test CRUD CREATE", tableName, item);
    let table = combinedData[tableName]
    table.push(item);
    return item;
};

export const read = (tableName, predicate = () => true) => {
    console.log("test CRUD read", tableName, predicate);
    let table = combinedData[tableName]
    return table.filter(predicate);
};

export const update = (tableName, predicate, updates) => {
    console.log("test CRUD update", tableName, updates);
    let table = combinedData[tableName]
    const item = table.find(predicate);
    if (item) {
        Object.assign(item, updates);
        return item;
    }
    return null;
};

export const remove = (tableName, predicate) => {
    console.log("test CRUD remove", tableName, );
    let table = combinedData[tableName]
    const index = table.findIndex(predicate);
    if (index !== -1) {
        return table.splice(index, 1)[0];
    }
    return null;
};
