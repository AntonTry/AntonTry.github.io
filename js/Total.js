var resultService = new ResultService(DbConnection.getConnection());


var resultGame = resultService.getGameResults("-KpfXdftfy4mRHJYp-i8")
    .then((res) => {
        return res.val()
    })
    .then(drawChart)

function drawChart(data) {
    var result = [];

    for (key in data) {
        result.push(data[key])
    }

    var margins = {
        top: 12,
        left: 60,
        right: 24,
        bottom: 24
    };
    legendPanel = {
        width: 200
    };
    width = 650 - margins.left - margins.right - legendPanel.width;
    height = 150 - margins.top - margins.bottom;
    dataset = GameResultParser.getRoundsResult(result);
    console.log(dataset);
    rounds = dataset.map(function (d) {
        return d.round;
    }),
        dataset = dataset.map(function (d) {
            return d.data.map(function (o, i) {
                return {
                    y: o.score,
                    x: o.team
                };
            });
        }),
        stack = d3.stack();
    stack(dataset);

    for (var i = 0; i < dataset.length; i++) {
        for (let j = 0; j < dataset[i].length; j++) {
            try {
                dataset[i][j].y0 = dataset[i - 1][j].y + dataset[i - 1][j].y0;
            } catch (e) {
                dataset[i][j].y0 = 0;
            }

        }
    }

    var dataset = dataset.map(function (group) {
        return group.map(function (d) {
            return {
                x: d.y,
                y: d.x,
                x0: d.y0
            };
        });
    });

    svg = d3.select('.chart')
        .append('svg')
        .attr('width', width + margins.left + margins.right + legendPanel.width)
        .attr('height', height + margins.top + margins.bottom)
        .append('g')
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

    xMax = d3.max(dataset, function (group) {
        return d3.max(group, function (d) {
            return d.x + d.x0;
        });
    });

    xScale = d3.scaleLinear()
        .domain([0, xMax])
        .range([0, width]);

    teamNames = dataset[0].map(d=>{
        return d.y;
    })

    yScale = d3.scaleBand()
        .domain(teamNames)
        .rangeRound([0, height])
        .padding(0.1);

    xAxis = d3.axisBottom()
        .scale(xScale);

    yAxis = d3.axisLeft()
        .scale(yScale);

    colours = d3.scaleOrdinal(d3.schemeCategory10);

    groups = svg.selectAll('g')
        .data(dataset)
        .enter()
        .append('g')
        .style('fill', function (d, i) {
            return colours(i);
        })

    rects = groups.selectAll('rect')
        .data(function (d) {
            return d;
        })
        .enter()
        .append('rect')
        .attr('x', function (d) {
            return xScale(d.x0);
        })
        .attr('y', function (d) {
            return yScale(d.y);
        })
        .attr('height', function () {
            return yScale.bandwidth();
        })
        .attr('width', function (d) {
            return xScale(d.x);
        })


    texts = groups.selectAll('text')
        .data((d)=>{
            return d
        })
        .enter()
        .append('text')
        .attr('x', function (d) {
            return xScale(d.x0+d.x*0.5);
        })
        .attr('y', function (d) {
            return yScale(d.y)+yScale.bandwidth()*0.6;
        })
        .style('fill', "black")
        .text(function (d) { return d.x; });


    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
        .call(yAxis);


    rounds.forEach(function (s, i) {
        svg.append('text')
            .attr('font-size', 14)
            .attr('fill', 'black')
            .attr('x', width + margins.left)
            .attr('y', i * 24 + 18)
            .text(s);
        svg.append('rect')
            .attr('fill', colours(i))
            .attr('width', 60)
            .attr('height', 20)
            .attr('x', width + margins.left + 90)
            .attr('y', i * 23 + 6);
    });
}