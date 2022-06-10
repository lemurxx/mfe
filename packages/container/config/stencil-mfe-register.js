module.exports = srv => `
    <script type="module">
        import { defineCustomElements } from "${srv}/esm/loader.js";
        defineCustomElements();
    </script>`;
