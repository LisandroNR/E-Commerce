const mainController = {
    home: (req, res) => {
        res.render('pages/index');
    },
    product: (req, res) => {
        res.render('pages/product');
    },
    cart: (req, res) => {
        res.render('pages/cart');
    },
    checkout: (req, res) => {
        res.send(`
            <div style="font-family: 'Montserrat', sans-serif; text-align: center; padding: 100px;">
                <h1>Página de Checkout en construcción 🚧</h1>
                <a href="/cart" style="padding: 10px 20px; background: #00ceb0; color: #1a1a1a; text-decoration: none; border-radius: 5px; font-weight: bold;">Volver al Carrito</a>
            </div>
        `);
    },
    login: (req, res) => {
        res.render('pages/login');
    },
    register: (req, res) => {
        res.render('pages/register');
    },
    error: (req, res) => {
        res.render('pages/error');
    }
};

module.exports = mainController;