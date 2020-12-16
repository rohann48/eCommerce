import React, { Fragment, useRef, useState, useEffect } from 'react';
import Chartjs from "chart.js";
import {jsPDF} from 'jspdf'
import $ from "jquery"
import html2canvas from "html2canvas"

const Demo = () => {

	const randomInt = () => Math.floor(Math.random() * (10 - 1 + 1)) + 1;
	var chartColors = {
		blue: 'rgb(54, 162, 235)',
		grey: 'rgb(231,233,237)'
	};
	const chartConfig = {
		type: "doughnut",
		data: {
			// labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
			datasets: [
				{
					label: "# of Votes",
					data: [12, 2,],
					backgroundColor: [
						chartColors.blue,
						chartColors.grey,
					],
					borderColor: [
						chartColors.blue,
						chartColors.grey,
					],
					borderWidth: 1
				}
			]
		},
		options: {
			cutoutPercentage : 80,
		}
	};

	const chartContainer = useRef(null);
	const [chartInstance, setChartInstance] = useState(null);
	const chartContainer2 = useRef(null);
	const [chartInstance2, setChartInstance2] = useState(null);
	const chartContainer3 = useRef(null);
  const [chartInstance3, setChartInstance3] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
		}
		if (chartContainer2 && chartContainer2.current) {
      const newChartInstance2 = new Chartjs(chartContainer2.current, chartConfig);
      setChartInstance2(newChartInstance2);
		}
		if (chartContainer3 && chartContainer3.current) {
      const newChartInstance3 = new Chartjs(chartContainer3.current, chartConfig);
      setChartInstance3(newChartInstance3);
    }
  }, [chartContainer]);

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
		chartInstance.update();
		chartInstance2.data.datasets[datasetIndex].data = newData;
		chartInstance2.update();
		chartInstance3.data.datasets[datasetIndex].data = newData;
    chartInstance3.update();
  };

  const onButtonClick = () => {
    const data = [
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt()
    ];
    updateDataset(0, data);
	};





	$('#saveChart').click(function() {
	
		var pdf = new jsPDF('p', 'mm', 'a3')
		
		pdf.setFontSize(20);

		
	var h1 = document.querySelector('#content')
	
	pdf.fromHTML(h1,10,15)


		
	 var canvas = document.querySelector('#myChart').toDataURL("image/png", 1.0);
		
	 var canvas2 = document.querySelector('#myChart2').toDataURL("image/png", 1.0);
 
	 pdf.text(15, 15, "Chart");
 
	
	pdf.setFontSize(20);
	pdf.text(15, 15, "Chart");
		
		
	pdf.addImage(canvas, 'PNG', 20, 20, 100, 50 );
	pdf.addImage(canvas2, 'PNG', 100, 20, 40, 40 );

		
	pdf.addPage()
		
	pdf.text(20,20, 'hr')
		

		
		pdf.save("file.pdf")
	})
	

	return (
		<Fragment>
			<div style={{ borderTop: '10px solid green', width: "100%" }}></div>
				<div id="content" style={{height: "calc(800px - 21px)", overflowY: "scroll", overflowX: "none !important"}}>
					<div className="ml-5 mb-2">
						<div className="row mt-3">
							<div className="col-md-8">
							<button id="saveChart">Save PDF</button>
								ESG Risk Assessment Report
								<ul className="mt-3" style={{lineHeight: "2em"}}>
									<li style={{fontWeight: "bold", fontSize: "1.1em"}}>Ultra Tech Cement Ltd.</li>
									<li>NSE: ULTRACEMCO</li>
									<li>NIC Code: 2394</li>
									<li>NIC Industry: Manufacture of Cement</li>
								</ul>

							</div>
							<div className="col-md-4" style={{display: "flex", padding: "2em"}}>
								<div className="mr-4" style={{border: "1px solid blue", background: "#2c2ce5", color: "white", paddingTop: "1.8em"}}>Financial Risk Grading  AA</div>
								<div style={{border: "1px solid blue", background: "#2c2ce5", color: "white", paddingTop: "1.8em"}}>ESG RATING  ESGrisk-AAA</div>
							</div>
							<div style={{marginLeft: "auto" ,marginRight: "4em"}}>Date : June 09, 2020</div>
						</div>
					</div>
					<div>
						<label className="ml-5 mb-2" style={{fontWeight: "bold", fontSize: "1.1em"}}>Executive Summary</label>
						<div style={{background: "#92cfe7"}}>
							<label className="ml-5 mb-2 mt-2" style={{fontWeight: "bold"}}>Rating Overview</label>
							<p className="ml-5 pb-2" style={{width: "84em", lineHeight: "1.5em"}}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis, mi eget hendrerit semper, erat lacus ultrices massa, id interdum quam elit eget est. Vivamus sit amet orci consequat, molestie quam a, vulputate enim. Etiam sit amet eleifend tellus. Pellentesque ac dapibus augue, eu malesuada nisi. Sed molestie auctor diam sed mollis. Phasellus ac dolor lobortis, maximus elit sit amet, cursus mi. Etiam dignissim pulvinar leo, vel blandit dui ullamcorper non. Quisque convallis est nisl, in cursus justo tristique ac. Maecenas id accumsan metus, eget dignissim nisl. Suspendisse vehicula lectus ut arcu fringilla, id rhoncus justo iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque bibendum risus eu orci luctus iaculis.
							</p>
						</div>
					</div>
					{/* chart */}
					<div className="pb-4" style={{background: "rgb(227 237 241)"}}>
						{/* <button onClick={onButtonClick}>Randomize!</button> */}
						<div className="row" style={{marginLeft: "5em"}}>
							<div className="col-md-4">
								<label className="pb-2 pt-3" style={{marginLeft: "5em", fontWeight: "bold"}}>Overall ESG Score</label>
								<canvas id="myChart" ref={chartContainer} /><br/><br/>
								<ul style={{lineHeight: "1.5em", marginLeft: "4em"}}>
									<li>Company Quartile -</li>
									<li>Avg Industry Score - 655</li>
									<li>Avg Universe Rating- 400</li>
								</ul>
							</div>
							<div className="col-md-4">
								<label className="pb-2 pt-3" style={{marginLeft: "6em", fontWeight: "bold"}}>BRR Score</label>
								<canvas id="myChart2" ref={chartContainer2} /><br/><br/>
								<ul style={{lineHeight: "1.5em", marginLeft: "4em"}}>
									<li>Company Quartile -</li>
									<li>Avg Industry Score - 655</li>
									<li>Avg Universe Rating- 400</li>
								</ul>
							</div>
							<div className="col-md-4">
								<label className="pb-2 pt-3" style={{marginLeft: "4em", fontWeight: "bold"}}>Transparency Score</label>
								<canvas ref={chartContainer3} /><br/><br/>
								<ul style={{lineHeight: "1.5em", marginLeft: "4em"}}>
									<li>Company Quartile -</li>
									<li>Avg Industry Score - 655</li>
									<li>Avg Universe Rating- 400</li>
								</ul>
							</div>
						</div>
					</div>
					{/* ranking */}
					<div className="ml-5 row">
						<div className="col-md-6">
							<label className="pb-3 pt-3" style={{fontWeight: "bold", fontSize: "1.1em"}}>Overall Ranking</label>
							<div className="row pb-3">
								<div className="col-md-2">
									<ul>
										<li>7</li>
									</ul>
								</div>
								<div className="col-md-4">
									<ul>
										<li style={{borderBottom: "2px solid black"}}>Industry Position</li>
										<li>Out of 15 Issuers</li>
									</ul>
								</div>
							</div>
							<div className="row">
								<div className="col-md-2">
									<ul>
										<li>28</li>
									</ul>
								</div>
								<div className="col-md-4">
									<ul>
										<li style={{borderBottom: "2px solid black"}}>Industry Position</li>
										<li>Out of 15 Issuers</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<label className="pb-3 pt-3" style={{fontWeight: "bold", fontSize: "1.1em"}}>History Of Rating Changes</label>
						</div>
					</div>

					{/* table */}
					<div className="">
						<label className="ml-5 pb-3 pt-3" style={{fontWeight: "bold", fontSize: "1.1em"}}>Rating Attribution</label>
						<table className="table table-striped table-bordered">
							<thead style={{background: "blue", color: "white"}}>
								<tr>
									<th>Industry Peer Group</th>
									<th>Environmental  Score</th>
									<th>ScoreGovernance  Score</th>
									<th>Social Score</th>
									<th>Industry Quartile</th>
									<th>ESG Rating</th>
									<th>Transparency Score</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Ultra Tech Cement Ltd</td>
									<td>280</td>
									<td>300</td>
									<td>310</td>
									<td>...</td>
									<td>AAA</td>
									<td>79</td>
								</tr>
								<tr>
									<td>ACC Limited</td>
									<td>280</td>
									<td>300</td>
									<td>310</td>
									<td>...</td>
									<td>AAA</td>
									<td>50</td>
								</tr>
								<tr>
									<td>Ambuja Cements Limited</td>
									<td>280</td>
									<td>300</td>
									<td>310</td>
									<td>...</td>
									<td>AAA</td>
									<td>60</td>
								</tr>
								<tr>
									<td>Birla Corp Limited</td>
									<td>280</td>
									<td>300</td>
									<td>310</td>
									<td>...</td>
									<td>AAA</td>
									<td>55</td>
								</tr>
								<tr>
									<td>Shree Cement Limited</td>
									<td>280</td>
									<td>300</td>
									<td>310</td>
									<td>...</td>
									<td>AAA</td>
									<td>50</td>
								</tr>
							</tbody>
						</table>
					</div>
			</div>

		</Fragment>
	)
}

export default Demo