import renderUtil from "./RenderUtil.js";

/**
 *  Router - Handles routing and rendering for the order pages
 *
 *  Summary:
 *      - url hash changes
 *      - render function checks routes for the hash changes
 *      - function for that hash gets called and loads page content
 */
var router = {

    // An object of all the routes
    routes: {},
    ROUTER_ROOT : "#root", // must be defined in html templates
    init: function() {
        console.log('router was created...');
        this.bindEvents();

        // Manually trigger a hashchange to start the router.
        // This make the render function look for the route called "" (empty string)
        // and call it"s function
        $(window).trigger("hashchange");
    },
    bindEvents: function() {

        // Event handler that calls the render function on every hashchange.
        // The render function will look up the route and call the function
        // that is mapped to the route name in the route map.
        // .bind(this) changes the scope of the function to the
        // current object rather than the element the event is bound to.
        $(window).on("hashchange", this.render.bind(this));
    },
    // Checks the current url hash tag
    // and calls the function with that name
    // in the routes
    render: function() {

        // Get the keyword from the url.
        var keyName = window.location.hash.split("/")[0];

        if(!keyName){ // empty url
          keyName = this.ROUTER_ROOT;
        }

        // Grab anything after the hash
        var url = window.location.hash;

        // Hide whatever page is currently shown.
        $("#page-container")
            .find(".active")
                .hide()
                    .removeClass("active");

        // Call the the function
        // by key name
        if (this.routes[keyName]) {
            this.routes[keyName](url);

            // Render the error page if the
            // keyword is not found in routes.
        } else {
            renderUtil.pageNotFoundError();
        }
    }
};

module.exports = router;
