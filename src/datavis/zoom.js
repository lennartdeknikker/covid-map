import * as d3 from 'd3'

// creates a zoom object using the settings defined in main.js
async function createZoomObject(settings) {
    const zoom = d3.zoom().scaleExtent(settings.render.scaleExtent)
    return zoom
}

// adds zooming handlers to input.
function addZoomHandlers(zoom, zoomGroup, settings, svg) {
    function zoomHandler() {
        zoomGroup.attr('transform', d3.event.transform)
    }

    function clickToZoom(zoomStep) {
        svg
            .transition()
            .duration(500)
            .call(zoom.scaleBy, zoomStep)
    }

    function resetProjection() {
        svg
            .transition()
            .duration(500)
            .call(zoom.transform, d3.zoomIdentity)
    }

    zoom.on('zoom', zoomHandler)

    // makes it possible to zoom on click with adjustable steps,
    // and resets the projection when search input is changed.
    d3.select('#btn-zoom--in').on('click', () => clickToZoom(2))
    d3.select('#btn-zoom--out').on('click', () => clickToZoom(0.5))
    d3.select('#search_input').on('select', () => resetProjection())
    d3.select('#search_input').on('click', () => resetProjection())
    return zoomGroup
}

// adds zoom functionality to the svg using the functions above.
async function addZoomToSvg(settings, svg) {
    const svgWithZoom = createZoomObject(settings).then(zoom => {
        const zoomGroup = svg.call(zoom).append('g')
        const zoomGroupWithHandlers = addZoomHandlers(
            zoom,
            zoomGroup,
            settings,
            svg
        )
        return zoomGroupWithHandlers
    })
    return svgWithZoom
}

export { addZoomToSvg }
