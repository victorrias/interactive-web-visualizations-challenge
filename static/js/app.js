function getData(samples) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

        let metadata = data.metadata;

        let objectDescriptions = metadata.filter(sampleObj => sampleObj.id == samples);
        let result = objectDescriptions[0];

        let PANEL = d3.select("#sample-metadata");

        PANEL.html("");

        Object.entries(result).forEach(([key, value]) => {PANEL.append("h6").text(`${key}: ${value}`);
        });
        });
        }



function chartData(samples) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

        let samplesfromsamples = data.samples;
        let objectDescriptions = samplesfromsamples.filter(sampleObj => sampleObj.id == samples);
        let result = objectDescriptions[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;


        let barData = [
        {
            y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
        }
        ];

        let barLayout = {
        title: "top 10 OTUs",
        margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barData, barLayout);




        let bubbleLayout = {
            title: "samples",
            margin: { t: 30, l: 150 }
          };
          let bubbleData = [
            {
              x: otu_ids,
              y: sample_values,
              text: otu_labels,
              mode: "markers",
              marker: {
                size: sample_values,
                color: otu_ids,
              }
            }
          ];
      
          Plotly.newPlot("bubble", bubbleData, bubbleLayout);


        });
    }


function init() {
    let selector = d3.select("#selDataset");
  

    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let samplesNames = data.names;
  
      samplesNames.forEach((samples) => {
        selector
          .append("option")
          .text(samples)
          .property("value", samples);
      });
 
      let firstSample = samplesNames[0];
      chartData(firstSample);
      getData(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    chartData(newSample);
    getData(newSample);
  }
  
  init();