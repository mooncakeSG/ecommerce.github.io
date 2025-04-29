# ShopEase - Modern Ecommerce Website

A responsive and interactive ecommerce website built with HTML5, CSS3, and JavaScript.

## Features

- Responsive design that works on all devices
- Interactive product cards with hover effects
- Shopping cart functionality with real-time updates
- Multi-currency support with real-time exchange rates
- Newsletter subscription form
- Mobile-friendly navigation
- User authentication system
- Product search functionality
- Modern and clean UI

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome for icons
- Exchange Rate API for currency conversion
- LocalStorage for data persistence
- No external dependencies

## Project Structure

```
ecommerce.github.io/
├── index.html          # Main HTML file
├── products.html       # Products listing page
├── cart.html          # Shopping cart page
├── about.html         # About page
├── contact.html       # Contact page
├── login.html         # User authentication page
├── product-details.html # Product details template
├── styles.css         # CSS styles
├── script.js          # JavaScript functionality
└── images/            # Image assets
    ├── product1.jpg
    ├── product2.jpg
    ├── product3.jpg
    └── hero-bg.jpg
```

## Features in Detail

### Multi-Currency Support
- Real-time currency conversion using Exchange Rate API
- Supports ZAR, USD, EUR, and GBP
- Automatic price updates across all pages
- Currency preference persistence
- Cached exchange rates for better performance

### Shopping Cart
- Add/remove products
- Quantity adjustment
- Real-time price updates
- Order summary with subtotal, shipping, and tax
- Cart persistence using localStorage

### User Authentication
- Login and registration forms
- Remember me functionality
- Password validation
- Session management
- Secure form handling

### Product Management
- Product categories
- Search functionality
- Product filtering
- Detailed product views
- Related products section

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ecommerce.github.io.git
   ```

2. Open `index.html` in your web browser to view the website locally.

## API Integration

The website uses the Exchange Rate API for currency conversion. To use your own API key:

1. Sign up at [Exchange Rate API](https://exchangerate.host)
2. Get your API key
3. Replace the API_KEY constant in `script.js` with your key:
   ```javascript
   const API_KEY = 'your-api-key-here';
   ```

## Deployment

This website can be easily deployed to GitHub Pages:

1. Create a new repository on GitHub
2. Push your code to the repository
3. Go to repository settings
4. Under "GitHub Pages" section, select the main branch as the source
5. Your site will be published at `https://yourusername.github.io/ecommerce.github.io/`

## Customization

- Replace the placeholder images in the `images` folder with your own product images
- Modify the product information in `index.html` and `products.html`
- Adjust colors and styles in `styles.css`
- Add more interactive features in `script.js`
- Add more currencies in the currency selector

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/ecommerce.github.io](https://github.com/yourusername/ecommerce.github.io)