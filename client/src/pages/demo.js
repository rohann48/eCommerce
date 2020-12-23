import React, { Fragment, useRef, useState, useEffect } from 'react';
import Chartjs from "chart.js";
import { jsPDF } from 'jspdf'
import "jspdf-autotable"
import $ from "jquery"
import { Bar } from "react-chartjs-2"
import Dot from "../assets/dot.png"

const Demo = () => {

	const data = {
		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
		datasets: [{
			label: '# of Votes',
			data: [12, 19, 3, 5, 8, 3],
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)'
			],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)'
			],
			borderWidth: 1
		}],
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	};
	const chartRef = useRef(null);

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
			cutoutPercentage: 80,
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
	}, [chartContainer, chartContainer2, chartContainer3]);

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


	const [company, setCompany] = useState([
		{ name: "Ultra Tech Cement Ltd", score: "280", scoreGovernance: "300", socialScore: "310", dots: 2, rating: "AAA", transScore: 50 },
		{ name: "ACC Limited", score: "280", scoreGovernance: "300", socialScore: "310", dots: 3, rating: "AA", transScore: 50 },
		{ name: "Ambuja Cements Limited", score: "280", scoreGovernance: "300", socialScore: "310", dots: 4, rating: "BB", transScore: 50 },
		{ name: "Birla Corp Limited", score: "280", scoreGovernance: "300", socialScore: "310", dots: 2, rating: "AAA", transScore: 50 },
		{ name: "Shree Cement Limited", score: "280", scoreGovernance: "300", socialScore: "310", dots: 1, rating: "BBB", transScore: 50 },
	])
	let date = "Date : June 09, 2020"
	console.log(company);

	const table = () => {
		return company.map((company, i) => {
			console.log(company.dots);
			return (
				<tr key={company._id}>
					<td>{company.name}</td>
					<td>{company.score}</td>
					<td>{company.scoreGovernance}</td>
					<td>{company.socialScore}</td>
					<td>
						{Array(company.dots)
							.fill()
							.map((i) => (
								<td><span className="dot"></span></td>
							))
						}
					</td>
					<td>{company.rating}</td>
					<td>{company.transScore}</td>
				</tr>
			)
		})
	}


	$('#saveChart').click(function () {

		var pdf = new jsPDF('p', 'mm', 'a3')
		pdf.setFontSize(14);
		pdf.text(15, 15, "ESG Risk Assessment Report");


		pdf.setFont('normal')
		pdf.setFontSize(14);
		pdf.text(15, 25, "Ultra Tech Cement Ltd.");

		pdf.setFont('normal')
		pdf.setFontSize(10);
		pdf.text(15, 35, "NSE: ULTRACEMCO");

		pdf.setFont('normal')
		pdf.setFontSize(10);
		pdf.text(15, 45, "NIC Code: 2394");

		pdf.setFont('normal')
		pdf.setFontSize(10);
		pdf.text(15, 55, "NIC Industry: Manufacture of Cement");

		pdf.setFont('normal')
		pdf.setFontSize(10);
		pdf.text(230, 55, `${date}`); //right

		pdf.setFont('normal')
		pdf.setFontSize(14);
		pdf.text(15, 65, "Executive Summary");

		//Rating OverView

		pdf.setFont('normal')
		pdf.setDrawColor(0)
		pdf.setFillColor(146, 207, 231)
		pdf.rect(0, 68, 298, 32, 'F')
		//x, y, width, height
		pdf.setFontSize(14);
		pdf.text(15, 75, "Rating OverView");

		let overview = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis, mi eget hendrerit semper, erat lacus ultrices massa, id interdum quam elit eget est." +
			" Vivamus sit amet orci consequat, molestie quam a, vulputate enim. Etiam sit amet eleifend tellus. Pellentesque ac dapibus augue, eu malesuada nisi. Sed molestie auctor diam sed mollis. Phasellus ac dolor lobortis, maximus elit" +
			" sit amet, cursus mi. Etiam dignissim pulvinar leo, vel blandit dui ullamcorper non. Quisque convallis est nisl, in cursus justo tristique ac. Maecenas id accumsan metus, eget dignissim nisl." +
			" Suspendisse vehicula lectus ut arcu fringilla, id rhoncus justo iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque bibendum risus eu orci luctus iaculis."
		var splitText = pdf.splitTextToSize(overview, 380);
		pdf.setFont('normal')
		pdf.setFontSize(10);
		pdf.setLineHeightFactor(1.3)
		pdf.text(15, 81, splitText);

		//Overall ESG Score

		pdf.setFont('normal')
		pdf.setDrawColor(0)
		pdf.setFillColor(227, 237, 241)
		pdf.rect(0, 100, 298, 65, 'F')
		pdf.setFontSize(12);
		pdf.text(35, 106, "Overall ESG Score");
		var canvas = document.querySelector('#myChart').toDataURL("image/png", 1.0);
		pdf.addImage(canvas, 'PNG', 20, 110, 60, 30);

		pdf.setFont('normal')
		pdf.setFontSize(10);
		pdf.text(35, 150, "Company Quartile -");

		pdf.setFont('normal')
		pdf.setFontSize(10);
		pdf.text(35, 155, "Avg Universe Rating- 400");

		pdf.setFont('normal')
		pdf.setFontSize(10);
		pdf.text(35, 160, "Avg Industry Score - 655");

		//BRR Score

		pdf.setFont('normal')
		pdf.setFontSize(12);
		pdf.text(130, 106, "BRR Score");
		var canvas2 = document.querySelector('#myChart2').toDataURL("image/png", 1.0);
		pdf.addImage(canvas2, 'PNG', 110, 110, 60, 30);

		pdf.setFont('normal')
		pdf.setFontSize(10);
		pdf.text(125, 150, "Company Quartile -");

		pdf.setFont('normal')
		pdf.setFontSize(10);
		pdf.text(125, 155, "Avg Universe Rating- 400");

		pdf.setFont('normal')
		pdf.setFontSize(10);
		pdf.text(125, 160, "Avg Industry Score - 655");

		//Transparency Score

		pdf.setFont('normal')
		pdf.setFontSize(12);
		pdf.text(212, 106, "Transparency Score");
		var canvas3 = document.querySelector('#myChart2').toDataURL("image/png", 1.0);
		pdf.addImage(canvas3, 'PNG', 200, 110, 60, 30);

		pdf.setFont('normal')
		pdf.setFontSize(10);
		pdf.text(214, 150, "Company Quartile -");

		pdf.setFont('normal')
		pdf.setFontSize(10);
		pdf.text(214, 155, "Avg Universe Rating - 400");

		pdf.setFont('normal')
		pdf.setFontSize(10);
		pdf.text(214, 160, "Avg Industry Score - 655");

		//overall ranking

		pdf.setFont('normal')
		pdf.setFontSize(14);
		pdf.text(15, 175, "Overall Ranking");

		pdf.setFont('normal')
		pdf.setFontSize(11);
		pdf.text(20, 185, "7");

		pdf.setFont('normal')
		pdf.setFontSize(11);
		pdf.text(35, 185, "Industry Position / Out of 15 Issuers");

		pdf.setFont('normal')
		pdf.setFontSize(11);
		pdf.text(20, 195, "28");

		pdf.setFont('normal')
		pdf.setFontSize(11);
		pdf.text(35, 195, "Industry Position / Out of 15 Issuers");

		//History Of Rating Changes

		pdf.setFont('normal')
		pdf.setFontSize(14);
		pdf.text(185, 175, "History Of Rating Changes");
		var canvas4 = document.querySelector('#myChart4').toDataURL("image/png", 1.0);
		pdf.addImage(canvas4, 'PNG', 180, 180, 110, 60);
		// pdf.addImage(canvas4, 'PNG', 180, 180, 110, 60 );
		//x y width, height

		//Rating Attribution

		pdf.setFont('normal')
		pdf.setFontSize(14);
		// pdf.text(15, 250, "");

		const title = "Rating Attribution";

		const headers = [
			[
				{content: 'Data', colSpan: 7, styles: {halign: 'center', fillColor: [22, 160, 133]}}
			],
				["Industry Peer Group", "Environmental Score", "ScoreGovernance Score", "Social Score", "Industry Quartile", "ESG Rating", "Transparency Score"]
			]
			
		// [];

		const data = company.map((company, i) => [
				company.name,
				company.score,
				company.scoreGovernance,
				company.socialScore,
				company.dots,
				company.rating,
				company.transScore
			]
		);

		// let content = {
		//   startY: 260,
		//   head: headers,
		//   body: data
		// };


		pdf.text(title, 15, 250);
		pdf.autoTable({
			body: data,
			head: headers,
			// html: '#table',
			startY: 260,
			headStyles: { halign: 'center', valign: 'middle' },
			bodyStyles: { minCellHeight: 10, halign: 'center', valign: 'middle' },
			columnStyles: { 4: { halign: 'right', fontSize: 1} },
			didDrawCell: function (data) {
				var img = new Image()
				img.src = Dot
				if (data.column.index === 4 && data.cell.section === 'body') {
					//  var dim = data.cell.height - data.cell.padding('vertical');
					var textPosx = data.cell.x;
					var textPosy = data.cell.y;
					
					if (data.row.raw[4] == 1) {
						pdf.setFillColor(255, 0, 0)
						// data.cell.styles.fillColor = "red";
						pdf.addImage(img, 'PNG', textPosx + 8, textPosy + 3, 4, 4)
					}
					else if (data.row.raw[4] == 2) {
						pdf.addImage(img, 'PNG', textPosx + 8, textPosy + 3, 4, 4)
						pdf.addImage(img, 'PNG', textPosx + 14, textPosy + 3, 4, 4)
					}
					else if (data.row.raw[4] == 3) {
						pdf.addImage(img, 'PNG', textPosx + 8, textPosy + 3, 4, 4)
						pdf.addImage(img, 'PNG', textPosx + 14, textPosy + 3, 4, 4)
						pdf.addImage(img, 'PNG', textPosx + 20, textPosy + 3, 4, 4)
					}
					else if (data.row.raw[4] == 4) {
						pdf.addImage(img, 'PNG', textPosx + 8, textPosy + 3, 4, 4)
						pdf.addImage(img, 'PNG', textPosx + 14, textPosy + 3, 4, 4)
						pdf.addImage(img, 'PNG', textPosx + 20, textPosy + 3, 4, 4)
						pdf.addImage(img, 'PNG', textPosx + 26, textPosy + 3, 4, 4)
					}
				}
			},
			didParseCell: function(data) {    
				console.log(data);              
				if (data.row.cells && data.cell.section === 'body') {              
					if (data.row.raw[4] == 1){   
						data.row.cells[4].styles.fillColor = 'red'
						}
					}
					if(data.row.raw[5] == 'BBB'){
						data.row.cells[5].styles.fillColor = 'green'
					}
					if(data.row.raw[0] == 'Birla Corp Limited'){
						data.row.cells[0].styles.fillColor = 'blue'
					}
					// if (data.cell.row.index === 0) {
					// 	data.cell.styles.textColor = [255, 255, 255];
					// 	data.cell.styles.fillColor = '#FF5783';
					// }
			},
			// didParseRow: function(row, data) {
			// 	// Colspan
			// 	console.log(row, data);
			// 	// console.log(data.table.rows[data.row.index - 1].raw);
			// 	var endPointName = "source"
			// 	pdf.setFontStyle("bold");
			// 	pdf.setFontSize(10);
			// 	//adding page
			// 	// var previousEndpointName =
			// 	// 	row.index === 0
			// 	// 		? ""
			// 	// 		: "source"
			// 			// data.table.rows[data.row.index - 1].raw.endPointName;
			// }
		})
		// {html: '#table', startY: 260})
		// {html: "#table", startY: 260})

		// pdf.addPage()	
		// pdf.text(20,20, 'hr')

		pdf.save("file.pdf")

	})

	return (
		<Fragment>
			<div style={{ borderTop: '10px solid green', width: "100%" }}></div>
			<button id="saveChart">Save PDF</button>
			<div id="content" style={{ height: "100vh", overflowY: "scroll", overflowX: "none" }}>
				<div className="ml-5 mb-2">
					<div className="row mt-3">
						<div className="col-md-8">
							ESG Risk Assessment Report
								<ul className="mt-3" style={{ lineHeight: "2em" }}>
								<li style={{ fontWeight: "bold", fontSize: "1.1em" }}>Ultra Tech Cement Ltd.</li>
								<li>NSE: ULTRACEMCO</li>
								<li>NIC Code: 2394</li>
								<li>NIC Industry: Manufacture of Cement</li>
							</ul>

						</div>
						<div className="col-md-4" style={{ display: "flex", padding: "2em" }}>
							<div className="mr-4" style={{ border: "1px solid blue", background: "#2c2ce5", color: "white", paddingTop: "1.8em" }}>Financial Risk Grading  AA</div>
							<div style={{ border: "1px solid blue", background: "#2c2ce5", color: "white", paddingTop: "1.8em" }}>ESG RATING  ESGrisk-AAA</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-9"></div>
						<div className="col-md-2">Date : June 09, 2020</div>
					</div>
				</div>
				<div>
					<label className="ml-5 mb-2" style={{ fontWeight: "bold", fontSize: "1.1em" }}>Executive Summary</label>
					<div style={{ background: "#92cfe7" }}>
						<label className="ml-5 mb-2 mt-2" style={{ fontWeight: "bold" }}>Rating Overview</label>
						<p className="ml-5 pb-2" style={{ width: "84em", lineHeight: "1.5em" }}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis, mi eget hendrerit semper, erat lacus ultrices massa, id interdum quam elit eget est. Vivamus sit amet orci consequat, molestie quam a, vulputate enim. Etiam sit amet eleifend tellus. Pellentesque ac dapibus augue, eu malesuada nisi. Sed molestie auctor diam sed mollis. Phasellus ac dolor lobortis, maximus elit sit amet, cursus mi. Etiam dignissim pulvinar leo, vel blandit dui ullamcorper non. Quisque convallis est nisl, in cursus justo tristique ac. Maecenas id accumsan metus, eget dignissim nisl. Suspendisse vehicula lectus ut arcu fringilla, id rhoncus justo iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque bibendum risus eu orci luctus iaculis.
							</p>
					</div>
				</div>
				{/* chart */}
				<div className="pb-4" style={{ background: "rgb(227 237 241)" }}>
					{/* <button onClick={onButtonClick}>Randomize!</button> */}
					<div className="row" style={{ marginLeft: "5em" }}>
						<div className="col-md-4">
							<label className="pb-2 pt-3" style={{ marginLeft: "5em", fontWeight: "bold" }}>Overall ESG Score</label>
							<canvas className="pieSize" id="myChart" ref={chartContainer} /><br /><br />
							<ul style={{ lineHeight: "1.5em", marginLeft: "4em" }}>
								<li>Company Quartile -</li>
								<li>Avg Industry Score - 655</li>
								<li>Avg Universe Rating- 400</li>
							</ul>
						</div>
						<div className="col-md-4">
							<label className="pb-2 pt-3" style={{ marginLeft: "6em", fontWeight: "bold" }}>BRR Score</label>
							<canvas className="pieSize" id="myChart2" ref={chartContainer2} /><br /><br />
							<ul style={{ lineHeight: "1.5em", marginLeft: "4em" }}>
								<li>Company Quartile -</li>
								<li>Avg Industry Score - 655</li>
								<li>Avg Universe Rating- 400</li>
							</ul>
						</div>
						<div className="col-md-4">
							<label className="pb-2 pt-3" style={{ marginLeft: "4em", fontWeight: "bold" }}>Transparency Score</label>
							<canvas className="pieSize" ref={chartContainer3} /><br /><br />
							<ul style={{ lineHeight: "1.5em", marginLeft: "4em" }}>
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
						<label className="pb-3 pt-3" style={{ fontWeight: "bold", fontSize: "1.1em" }}>Overall Ranking</label>
						<div className="row pb-3">
							<div className="col-md-2">
								<ul>
									<li>7</li>
								</ul>
							</div>
							<div className="col-md-4">
								<ul>
									<li style={{ borderBottom: "2px solid black" }}>Industry Position</li>
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
									<li style={{ borderBottom: "2px solid black" }}>Industry Position</li>
									<li>Out of 15 Issuers</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-md-5">
						<label className="pb-3 pt-3" style={{ fontWeight: "bold", fontSize: "1.1em" }}>History Of Rating Changes</label>
						<Bar id="myChart4" className="bar" data={data} ref={chartRef} />
					</div>
				</div>

				{/* table */}
				<div className="row">
					<label className="ml-5 pb-3 pt-3 col-md-6" style={{ fontWeight: "bold", fontSize: "1.1em" }}>Rating Attribution</label>
					<table id="table" className="table table-striped table-bordered col-md-11" style={{ textAlign: "center", marginLeft: "4em" }}>
						<thead style={{ background: "blue", color: "white" }}>
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
							{table()}
						</tbody>
					</table>
					{/* <img src={base} className="bar"/> */}
				</div>
				<div style={{ marginBottom: "2em" }}>{''}</div>
			</div>

		</Fragment>
	)
}

export default Demo