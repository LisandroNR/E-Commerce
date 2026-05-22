const productsService = require('./productsService');

const cartService = {
    // 1. Agregar al carrito
    addProduct: (session, productId, quantity = 1) => {
        const product = productsService.getById(productId);
        if (!product) return false; 

        const parsedId = parseInt(productId);
        const parsedQuantity = parseInt(quantity);
        const sessionCart = session.cart || [];
        
        const existingItem = sessionCart.find(item => item.id === parsedId);

        if (existingItem) {
            existingItem.quantity += parsedQuantity;
        } else {
            sessionCart.push({ id: parsedId, quantity: parsedQuantity });
        }
        
        session.cart = sessionCart;
        return true;
    },

    // 2. Obtener detalles (¡Acá está el arreglo del nombre!)
    getCartDetails: (session) => {
        const sessionCart = session.cart || [];
        let items = [];
        let total = 0;
        let count = 0;

        for (const item of sessionCart) {
            const product = productsService.getById(item.id);
            if (product) {
                const subtotal = product.price * item.quantity;
                total += subtotal;
                count += item.quantity;

                items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                    quantity: item.quantity,
                    subtotal: subtotal
                });
            }
        }

        return {
            cartItems: items, // <--- ACÁ ESTÁ EL CAMBIO MÁGICO QUE PEDÍA TU CONTROLADOR
            total,
            count
        };
    },

    // 3. Eliminar producto
    remove: (session, productId) => {
        const sessionCart = session.cart || [];
        const index = sessionCart.findIndex(item => item.id === parseInt(productId));
        if (index !== -1) {
            sessionCart.splice(index, 1);
            session.cart = sessionCart;
            return true;
        }
        return false;
    },

    // 4. Actualizar cantidad (+ / -) para la US de tu controlador
    updateProduct: (session, productId, action) => {
        const sessionCart = session.cart || [];
        const existingItem = sessionCart.find(item => item.id === parseInt(productId));
        
        if (existingItem) {
            if (action === 'increase') {
                existingItem.quantity += 1;
            } else if (action === 'decrease' && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else if (action === 'decrease' && existingItem.quantity === 1) {
                cartService.remove(session, productId);
                return;
            }
        }
        session.cart = sessionCart;
    },

    // 5. Vaciar el carrito por completo
    emptyCart: (session) => {
        session.cart = [];
    }
};

module.exports = cartService;