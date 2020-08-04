import * as d3 from 'd3'
import { loadMap } from './map'
import { addZoomToSvg } from './zoom'

// Adds a datavisualisation with specific settings.
function AddDataVisualisation(settings) {
    document.querySelector(settings.init.targetDiv).innerHTML = ''
    const svg = d3
        .select(settings.init.targetDiv)
        .append('svg')
        .attr('width', settings.init.svgSize[0])
        .attr('height', settings.init.svgSize[1])

    // map and datapoint projection settings
    const translation = [
        window.innerWidth / settings.projection.translation[0],
        window.innerHeight / settings.projection.translation[1],
    ]
	
    const projection = d3
        .geoMercator()
        .center(settings.projection.center)
        .scale(settings.projection.scale)
        .translate(translation)

    // add zoom functionality to svg, then load the map, then load the datapoints
    addZoomToSvg(settings, svg).then(g =>
        loadMap(g, projection)
    )
}

export { AddDataVisualisation }
