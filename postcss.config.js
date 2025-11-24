// javascript
// Replace the current contents of `postcss.config.js` with this:
module.exports = {
    plugins: {
        // Use the PostCSS adapter if installed:
        '@tailwindcss/postcss': {},
        // Or, if you prefer the classic plugin, uncomment the next line and remove the adapter above:
        // tailwindcss: {},
        autoprefixer: {},
    },
};
