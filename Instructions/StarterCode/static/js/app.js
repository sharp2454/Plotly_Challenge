//define a function that will create metadata for given sample
function buildMetadata(selection) {

    // Read the json data
    d3.json("samples.json").then((sampleData) => {

        console.log(sampleData);

    //filter & parse data to return sample data
    var parsedData=sampleData.metadata;
    console.log(parsedData);

    var sample = parsedData.filter(item => item.id == selection);
    console.log(sample[0]);

    //update metadata location
    var metadata = d3.select("#sample-metadata").html("");

    Object.entries(sample[0]).forEach(([key,value]) => {
        metadata.append("p").text(`${key}: ${value}`);
    });

    console.log(metadata)
    });
}

//Build charts
function buildCharts(selection) {

    //read json file
    d3.json("samples.json").then((sampleData) => {

        //parse and filter data to get sample's OTU data
        var  parsedData = sampleData.samples;
        console.log(parsedData);

        var sampleDict = parsedData.filter(item.id == selection)[0];
        console.log(sample.Dict);

        var sampleValues= sampleDict.sample_values;
        var barChartValues = sampleValues.slice(0,10).reverse();
        console.log(barChartValues);

        var idValues = sampleDict.otu_ids;
        var barChartLabels = idValues.slice(0,10).reverse();
        console.log(barChartLabels);

        var hovertext = sampleDict.otu_labels;
        var barCharthovertext = hovertext.slice(0,10).reverse();
        console.log(barCharthovertext);

        //create bar chart

        var barChartTrace = {
            type: "bar",
            x: barChartValues,
            y: barChartLabels,
            text: barCharthovertext,
            orientation: 'h'
        };

        var barChartData = [barChartTrace];

        Plotly.newPlot("bar", barChartData);

        //create bubble chart

        var bubbleChartTrace = {
            x: idValues,
            y: sampleValues,
            text: hovertext,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: idValues
            }
        };
        
        var bubbleChartData = [bubbleChartTrace];

        var layout = {
            height: 500,
            width: 800,
            xaxis: {
                title: "OTU ID"
            }
        };

        Plotly.newPlot("bubble", bubbleChartData, layout);
    });
}

//page load function
function init() {

    //read json data
    d3.json("samples.json").then((sampleData) => {

        //filter and parse for sample names
        var parsedData = sampleData.names;
        console.log(parsedData);

        //add dropdown menu
        var dropdownMenu= d3.select("#selDataset");

        parsedData.forEach((name)=> {
            dropdownMenu.append("option").property("value", name).text(name);
       })

       //build data and charts
       buildCharts(parsedData[0]);
       buildMetadata(parsedData[0]);

    });
}

function optionChanged(newSelection) {
    buildMetadata(newSelection);
    buildCharts(newSelection);
}

init();





    


