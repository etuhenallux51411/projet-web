import { create, read, update, remove } from '../data/crud.js';

class CrudController {
    constructor(tableName) {
        this.tableName = tableName;
    }

    createItem(item) {
        try {
            console.log(`Creating item in table: ${this.tableName}`);
            const createdItem = create(this.tableName, item);
            return { success: true, data: createdItem };
        } catch (error) {
            console.error("Error creating item:", error);
            return { success: false, error: error.message };
        }
    }

    readItems(predicate = () => true) {
        try {
            console.log(`Reading items from table: ${this.tableName}`);
            const items = read(this.tableName, predicate);
            return { success: true, data: items };
        } catch (error) {
            console.error("Error reading items:", error);
            return { success: false, error: error.message };
        }
    }

    updateItem(predicate, updates) {
        try {
            console.log(`Updating item in table: ${this.tableName}`);
            const updatedItem = update(this.tableName, predicate, updates);
            if (updatedItem) {
                return { success: true, data: updatedItem };
            } else {
                return { success: false, error: "Item not found" };
            }
        } catch (error) {
            console.error("Error updating item:", error);
            return { success: false, error: error.message };
        }
    }

    deleteItem(predicate) {
        try {
            console.log(`Deleting item from table: ${this.tableName}`);
            const deletedItem = remove(this.tableName, predicate);
            if (deletedItem) {
                return { success: true, data: deletedItem };
            } else {
                return { success: false, error: "Item not found" };
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            return { success: false, error: error.message };
        }
    }
}

export default CrudController;
