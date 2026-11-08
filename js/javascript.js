
$(document).ready(function() {

    // Mobile navigation
    $("#menu-toggle").click(function() {

        $("#top-menu").slideToggle(200);

        let expanded = $(this).attr("aria-expanded") === "true";

        $(this).attr("aria-expanded", !expanded);

    });

    $(window).resize(function() {

        if ($(window).width() > 768) {
            $("#top-menu").removeAttr("style");
            $("#top-menu").removeClass("active");
            $("#menu-toggle").attr("aria-expanded", "false");
        }

    });


    // Parks directory
    const parks = [
        {
            name: "Patapsco Valley State Park",
            county: "Howard County",
            region: "Central",
            activities: ["Hiking", "Camping", "Fishing", "Biking", "Boating"],
            description: "Explore miles of trails, river valleys, waterfalls, and historic sites.",
            url: "https://dnr.maryland.gov/publiclands/Pages/central/Patapsco.aspx",
            image: "img/patapsco-valley.jpg"
        },
        {
            name: "Gunpowder Falls State Park",
            county: "Baltimore County",
            region: "Central",
            activities: ["Hiking", "Camping", "Fishing", "Biking", "Swimming"],
            description: "Enjoy wooded trails, river access, fishing, and waterfront recreation.",
            url: "https://dnr.maryland.gov/publiclands/Pages/central/gunpowder.aspx",
            image: "img/gunpowder.jpg"
        },
        {
            name: "Rocks State Park",
            county: "Harford County",
            region: "Central",
            activities: ["Hiking", "Fishing"],
            description: "Visit the King and Queen Seat, a dramatic rock overlook.",
            url: "https://dnr.maryland.gov/publiclands/Pages/central/rocks.aspx",
            image: "img/rocks.JPG"
        },
        {
            name: "Sandy Point State Park",
            county: "Anne Arundel County",
            region: "Southern",
            activities: ["Swimming", "Fishing", "Hiking", "Boating"],
            description: "Enjoy Chesapeake Bay beaches, swimming, fishing, and waterfront views.",
            url: "https://dnr.maryland.gov/publiclands/Pages/southern/sandypoint.aspx",
            image: "img/sandy-point.jpg"
        },
        {
            name: "Point Lookout State Park",
            county: "St. Mary's County",
            region: "Southern",
            activities: ["Camping", "Swimming", "Fishing", "Boating"],
            description: "Explore coastal landscapes where the Potomac meets the Chesapeake.",
            url: "https://dnr.maryland.gov/publiclands/Pages/southern/pointlookout.aspx",
            image: "img/point-lookout.jpg"
        },
        {
            name: "Cunningham Falls State Park",
            county: "Frederick County",
            region: "Western",
            activities: ["Hiking", "Camping", "Swimming", "Fishing"],
            description: "Discover Maryland's tallest cascading waterfall and nearby lake.",
            url: "https://dnr.maryland.gov/publiclands/Pages/western/cunningham.aspx",
            image: "img/cunningham.jpg"
        },
        {
            name: "Assateague State Park",
            county: "Worcester County",
            region: "Eastern",
            activities: ["Camping", "Swimming", "Fishing", "Biking"],
            description: "Experience Atlantic beaches and the island's famous wild horses.",
            url: "https://dnr.maryland.gov/publiclands/Pages/eastern/assateague.aspx",
            image: "img/assateague.jpg"
        },
        {
            name: "Tuckahoe State Park",
            county: "Queen Anne's County",
            region: "Eastern",
            activities: ["Hiking", "Camping", "Fishing", "Biking", "Boating"],
            description: "Explore wooded trails and quiet waterways on the Eastern Shore.",
            url: "https://dnr.maryland.gov/publiclands/Pages/eastern/tuckahoe.aspx",
            image: "img/tuckahoe.jpg"
        },
        {
            name: "Deep Creek Lake State Park",
            county: "Garrett County",
            region: "Western",
            activities: ["Hiking", "Swimming", "Fishing", "Boating"],
            description: "Enjoy mountain scenery, lake swimming, boating, fishing, and waterfront recreation.",
            url: "https://dnr.maryland.gov/publiclands/Pages/western/deepcreek.aspx",
            image: "img/deep-creek.jpg"
        }
    ];

    function displayParks() {

        const search = $("#park-search").val().toLowerCase();
        const region = $("#region-filter").val();
        const activity = $("#activity-filter").val();

        const filteredParks = parks.filter(function(park) {

            const matchesSearch =
                park.name.toLowerCase().includes(search) ||
                park.county.toLowerCase().includes(search);

            const matchesRegion =
                !region || park.region === region;

            const matchesActivity =
                !activity || park.activities.includes(activity);

            return matchesSearch && matchesRegion && matchesActivity;

        });

        $("#park-count").text(
            `Showing ${filteredParks.length} of ${parks.length} parks`
        );

        $("#park-results").empty();

        if (filteredParks.length === 0) {
            $("#park-results").html("<p>No parks match your search.</p>");
            return;
        }

        filteredParks.forEach(function(park) {

            $("#park-results").append(`
                <article class="destination-card park-result">
                    <img src="${park.image}" alt="${park.name}">
                    <div class="destination-info">
                        <h3>${park.name}</h3>
                        <p>${park.county} · ${park.region} Maryland</p>
                        <p>${park.description}</p>
                        <p><strong>Activities:</strong> ${park.activities.join(", ")}</p>
                        <a class="button-primary" href="${park.url}" target="_blank" rel="noopener noreferrer" aria-label="View Park Details for ${park.name}">View Park Details</a>
                    </div>
                </article>
            `);

        });

    }

    // Only run directory functionality on parks.html
    if ($("#park-results").length) {

        $("#park-search, #region-filter, #activity-filter")
            .on("input change", displayParks);

        displayParks();

    }

});
