(function ($) {
    "use strict";
    function mainMap() {
        var ib = new InfoBox();
        function locationData(
            locationImg,
            locationPrice,
            locationURL,
            locationTitle,
            locationDate,
            locationComment,
            locationAuthor
        ) {
            return (
                "" +
                '<div class="map-listing-item">' +
                '<div class="inner-box">' +
                '<div class="infoBox-close"><i class="flaticon-close-1"></i></div>' +
                '<div class="image-box">' +
                '<figure class="image"><img src="' +
                locationImg +
                '" alt=""></figure>' +
                "</div>" +
                '<div class="content">' +
                '<div class="price">' +
                locationPrice +
                "</div>" +
                "<h4><a href=" +
                locationURL +
                ">" +
                locationTitle +
                "</a></h4>" +
                '<div class="icon-box">' +
                '<div class="item">' +
                '<i class="flaticon-calendar"></i>' +
                "<p>" +
                locationDate +
                "</p>" +
                "</div>" +
                '<div class="item">' +
                '<i class="flaticon-message"></i>' +
                "<p>" +
                locationComment +
                "</p>" +
                "</div>" +
                '<div class="item">' +
                '<i class="flaticon-user-1"></i>' +
                "<p>" +
                locationAuthor +
                "</p>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>"
            );
        }

        var locations = [
            [
                locationData(
                    "./../images/avatar/user-6.png",
                    "$815,000",
                    "#",
                    "Archer House 1",
                    "06 April 2024",
                    "14",
                    "Esther Howard"
                ),

                16.007557,
                108.2269084,
                1,
                "../icons/make.svg",
                "<div></div>",
            ],
            // [
            //     locationData(
            //         "./../images/avatar/user-6.png",
            //         "$815,000",
            //         "#",
            //         "Archer House 1",
            //         "06 April 2024",
            //         "14",
            //         "Esther Howard"
            //     ),

            //     16.008663,
            //     108.223308,
            //     1,
            //      "../icons/make.svg",
            //     "<div></div>",
            // ],[
            //     locationData(
            //         "./../images/avatar/user-6.png",
            //         "$815,000",
            //         "#",
            //         "Archer House 1",
            //         "06 April 2024",
            //         "14",
            //         "Esther Howard"
            //     ),

            //     16.008663,
            //     108.223308,
            //     1,
            //      "../icons/make.svg",
            //     "<div></div>",
            // ],
            
        ];

        var mapZoomAttr = $("#map").attr("data-map-zoom");
        var mapScrollAttr = $("#map").attr("data-map-scroll");
        if (typeof mapZoomAttr !== typeof undefined && mapZoomAttr !== false) {
            var zoomLevel = parseInt(mapZoomAttr);
        } else {
            var zoomLevel = 5;
        }
        if (
            typeof mapScrollAttr !== typeof undefined &&
            mapScrollAttr !== false
        ) {
            var scrollEnabled = parseInt(mapScrollAttr);
        } else {
            var scrollEnabled = false;
        }
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: zoomLevel,
            // scrollwheel: false,
            center: new google.maps.LatLng(16.00776, 108.22706),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT,
            },
            mapTypeControl: false,
            scaleControl: false,
            panControl: false,
            navigationControl: false,
            streetViewControl: false,
            gestureHandling: "cooperative",
        });

        var boxText = document.createElement("div");
        boxText.className = "map-box";
        var currentInfobox;
        var boxOptions = {
            content: boxText,
            disableAutoPan: false,
            alignBottom: true,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-134, -55),
            zIndex: null,
            boxStyle: { width: "360px" },
            closeBoxMargin: "0",
            closeBoxURL: "",
            infoBoxClearance: new google.maps.Size(25, 25),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false,
        };
        var markerCluster, overlay, i;
        var allMarkers = [];
        var clusterStyles = [
            { textColor: "white", url: "", height: 50, width: 50 },
        ];
        var markerIco;
        for (i = 0; i < locations.length; i++) {
            markerIco = locations[i][4];
            var overlaypositions = new google.maps.LatLng(
                    locations[i][1],
                    locations[i][2]
                ),
                overlay = new CustomMarker(
                    overlaypositions,
                    map,
                    { marker_id: i },
                    markerIco
                );
            allMarkers.push(overlay);
            google.maps.event.addDomListener(
                overlay,
                "click",
                (function (overlay, i) {
                    return function () {
                        ib.setOptions(boxOptions);
                        boxText.innerHTML = locations[i][0];
                        ib.close();
                        ib.open(map, overlay);
                        currentInfobox = locations[i][3];
                        google.maps.event.addListener(
                            ib,
                            "domready",
                            function () {
                                $(".infoBox-close").click(function (e) {
                                    e.preventDefault();
                                    ib.close();
                                    $(".map-marker-container").removeClass(
                                        "clicked infoBox-opened"
                                    );
                                });
                            }
                        );
                    };
                })(overlay, i)
            );
        }
        var options = {
            imagePath: "images/",
            styles: clusterStyles,
            minClusterSize: 2,
        };
        markerCluster = new MarkerClusterer(map, allMarkers, options);
        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
    }
    var map = document.getElementById("map");
    if (typeof map != "undefined" && map != null) {
        google.maps.event.addDomListener(window, "load", mainMap);
    }

    function CustomMarker(latlng, map, args, markerIco) {
    this.latlng = latlng;
    this.args = args;
    this.markerIco = markerIco;
    this.setMap(map);
    }

    CustomMarker.prototype = new google.maps.OverlayView();
    CustomMarker.prototype.draw = function () {
        var self = this;
        var div = this.div;
        if (!div) {
            div = this.div = document.createElement("div");
            div.className = "map-marker-container";
            div.innerHTML =
                '<div class="marker-container">' +
                '<div class="marker-card">' +
                '<div class="front face">' +
                '<img src="' + self.markerIco + '" alt="Marker">' + // Thay đổi chỗ này để sử dụng ảnh SVG
                "</div>" +
                '<div class="back face">' +
                "</div>" +
                '<div class="marker-arrow"></div>' +
                "</div>" +
                "</div>";
            google.maps.event.addDomListener(div, "click", function (event) {
                $(".map-marker-container").removeClass("clicked infoBox-opened");
                google.maps.event.trigger(self, "click");
                $(this).addClass("clicked infoBox-opened");
            });
            if (typeof self.args.marker_id !== "undefined") {
                div.dataset.marker_id = self.args.marker_id;
            }
            var panes = this.getPanes();
            panes.overlayImage.appendChild(div);
        }
        var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
        if (point) {
            div.style.left = point.x + "px";
            div.style.top = point.y + "px";
        }
    };

    CustomMarker.prototype.remove = function () {
        if (this.div) {
            this.div.parentNode.removeChild(this.div);
            this.div = null;
            $(this).removeClass("clicked");
        }
    };

    CustomMarker.prototype.getPosition = function () {
        return this.latlng;
    };
})(this.jQuery);
