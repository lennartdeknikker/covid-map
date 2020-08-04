import * as d3 from 'd3'
import geoJson from '../assets/maps/NL_GE.json'
import dataSet from '../assets/data/NL_testData.csv'

// changes fill color of areas on mouse over and mouse out,
// and show the hovered over area as text.
async function mouseOverHandler(d) {
    console.log(d.properties.code)		
    d3.select('#map_text').text(d.properties.name)
}
function mouseOutHandler(d) {
    d3.select('#map_text').text('')
}

// renders the map from a given geoJson
async function renderMap(geoJson, g, projection) {
	
    const data = await d3.csv(dataSet)
    const filteredData = data.filter(item => {
        const currentDate = new Date(item.Date_of_report)
        const result = currentDate.getDate() === 26 && currentDate.getMonth() + 1 === 4 && currentDate.getFullYear() === 2020
        return result
    })		

    const colors = d3.scaleLinear()
        .domain([0, 1823])
        .range(['#f6ffb5', '#c40000'])

    const path = d3.geoPath().projection(projection)
    g.attr('class', 'g-map-container')
        .append('g')
        .attr('class', 'g-map')
        .selectAll('path')
        .data(geoJson.features)
        .enter()
        .append('path')
        .attr('class', 'area')
        .attr('d', path)
        .attr('fill', d => {
            const value = filteredData.find(item => {
                return item.Municipality_code === 'GM' + d.properties.code
            })
            if (value) {
                return colors(value.Total_reported)
								
            }		else {
                return 'white'
            }
        })
        .attr('stroke', '#c1eae8')
        .attr('stroke-width', 0.5)
        .on('mouseover', mouseOverHandler)
        .on('mouseout', mouseOutHandler)
}

// fetches the data, then renders the map
async function loadMap(g, projection) {
    console.log(geoJson)	
	
    renderMap(geoJson, g, projection)
}

export { loadMap }
