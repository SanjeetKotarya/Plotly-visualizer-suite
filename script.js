
let currentChartType = 'surface';
let currentData = null;

// Chart type configurations
const chartConfigs = {
  mathgraph: {
    inputs: `
      <div class="input-group">
        <div class="input-wrapper">
          <label>Equation f(x, y)</label>
          <input type="text" id="mathEquation" placeholder="sin(x^2 + y^2) - cos(x - y)">
        </div>
        <div class="input-wrapper">
          <label>X Range</label>
          <input type="text" id="mathXRange" placeholder="-10,10" value="-10,10">
        </div>
        <div class="input-wrapper">
          <label>Y Range</label>
          <input type="text" id="mathYRange" placeholder="-10,10" value="-10,10">
        </div>
        <div class="input-wrapper">
          <label>Resolution</label>
          <input type="number" id="mathResolution" value="50" min="10" max="200">
        </div>
      </div>
    `
  },
  surface: {
    inputs: `
      <div class="input-group">
        <div class="input-wrapper">
          <label>3D Equation f(x,y)</label>
          <input type="text" id="equation" placeholder="sin(x^2 + y^2) - cos(x - y)" value="sin(x^2 + y^2) - cos(x - y)">
          <button class="sample-data-btn" onclick="loadSample('surface')">Load Sample</button>
        </div>
        <div class="input-wrapper">
          <label>X Range</label>
          <input type="text" id="xRange" placeholder="-10,10" value="-10,10">
        </div>
        <div class="input-wrapper">
          <label>Y Range</label>
          <input type="text" id="yRange" placeholder="-10,10" value="-10,10">
        </div>
        <div class="input-wrapper">
          <label>Resolution</label>
          <input type="number" id="resolution" value="50" min="10" max="200">
        </div>
      </div>
    `
  },
  scatter: {
    inputs: `
      <div class="input-group">
        <div class="input-wrapper">
          <label>X Data (comma-separated)</label>
          <textarea id="xData" placeholder="1,2,3,4,5">1,2,3,4,5</textarea>
          <button class="sample-data-btn" onclick="loadSample('scatter')">Load Sample</button>
        </div>
        <div class="input-wrapper">
          <label>Y Data (comma-separated)</label>
          <textarea id="yData" placeholder="2,4,6,8,10">2,4,6,8,10</textarea>
        </div>
        <div class="input-wrapper">
          <label>Chart Title</label>
          <input type="text" id="title" placeholder="My Scatter Plot" value="Interactive Scatter Plot">
        </div>
        <div class="input-wrapper">
          <label>Marker Size</label>
          <input type="number" id="markerSize" value="8" min="1" max="50">
        </div>
      </div>
    `
  },
  line: {
    inputs: `
      <div class="input-group">
        <div class="input-wrapper">
          <label>X Data (comma-separated)</label>
          <textarea id="xData" placeholder="1,2,3,4,5">1,2,3,4,5</textarea>
          <button class="sample-data-btn" onclick="loadSample('line')">Load Sample</button>
        </div>
        <div class="input-wrapper">
          <label>Y Data (comma-separated)</label>
          <textarea id="yData" placeholder="2,4,6,8,10">2,4,6,8,10</textarea>
        </div>
        <div class="input-wrapper">
          <label>Chart Title</label>
          <input type="text" id="title" placeholder="My Line Chart" value="Interactive Line Chart">
        </div>
        <div class="input-wrapper">
          <label>Line Width</label>
          <input type="number" id="lineWidth" value="3" min="1" max="10">
        </div>
      </div>
    `
  },
  bar: {
    inputs: `
      <div class="input-group">
        <div class="input-wrapper">
          <label>Categories (comma-separated)</label>
          <textarea id="categories" placeholder="A,B,C,D">Product A,Product B,Product C,Product D</textarea>
          <button class="sample-data-btn" onclick="loadSample('bar')">Load Sample</button>
        </div>
        <div class="input-wrapper">
          <label>Values (comma-separated)</label>
          <textarea id="values" placeholder="10,20,30,40">25,30,18,35</textarea>
        </div>
        <div class="input-wrapper">
          <label>Chart Title</label>
          <input type="text" id="title" placeholder="My Bar Chart" value="Sales by Product">
        </div>
        <div class="input-wrapper">
          <label>Orientation</label>
          <select id="orientation">
            <option value="v">Vertical</option>
            <option value="h">Horizontal</option>
          </select>
        </div>
      </div>
    `
  },
  pie: {
    inputs: `
      <div class="input-group">
        <div class="input-wrapper">
          <label>Labels (comma-separated)</label>
          <textarea id="labels" placeholder="Apple,Banana,Cherry">Apples,Bananas,Cherries,Dates</textarea>
          <button class="sample-data-btn" onclick="loadSample('pie')">Load Sample</button>
        </div>
        <div class="input-wrapper">
          <label>Values (comma-separated)</label>
          <textarea id="values" placeholder="10,20,30">30,25,20,25</textarea>
        </div>
        <div class="input-wrapper">
          <label>Chart Title</label>
          <input type="text" id="title" placeholder="My Pie Chart" value="Fruit Distribution">
        </div>
        <div class="input-wrapper">
          <label>Hole Size (0-0.9)</label>
          <input type="number" id="holeSize" value="0" min="0" max="0.9" step="0.1">
        </div>
      </div>
    `
  },
  heatmap: {
    inputs: `
      <div class="input-group">
        <div class="input-wrapper">
          <label>Z Data (comma-separated rows, semicolon-separated)</label>
          <textarea id="zData" placeholder="1,2,3;4,5,6;7,8,9">1,2,3,4;5,6,7,8;9,10,11,12;13,14,15,16</textarea>
          <button class="sample-data-btn" onclick="loadSample('heatmap')">Load Sample</button>
        </div>
        <div class="input-wrapper">
          <label>X Labels (comma-separated)</label>
          <input type="text" id="xLabels" placeholder="A,B,C" value="Mon,Tue,Wed,Thu">
        </div>
        <div class="input-wrapper">
          <label>Y Labels (comma-separated)</label>
          <input type="text" id="yLabels" placeholder="X,Y,Z" value="Week 1,Week 2,Week 3,Week 4">
        </div>
        <div class="input-wrapper">
          <label>Chart Title</label>
          <input type="text" id="title" placeholder="My Heatmap" value="Activity Heatmap">
        </div>
      </div>
    `
  }
};

// Sample data for different chart types
const sampleData = {
  surface: {
    equation: "Math.sin(Math.sqrt(x**2 + y**2)) * Math.exp(-0.1 * Math.sqrt(x**2 + y**2))"
  },
  scatter: {
    xData: "1,2,3,4,5,6,7,8,9,10",
    yData: "2.1,3.9,6.2,7.8,10.1,12.2,13.8,16.1,18.9,20.2"
  },
  line: {
    xData: "0,1,2,3,4,5,6,7,8,9,10",
    yData: "0,1,4,9,16,25,36,49,64,81,100"
  },
  bar: {
    categories: "January,February,March,April,May,June",
    values: "65,59,80,81,56,72"
  },
  pie: {
    labels: "Desktop,Mobile,Tablet,Other",
    values: "45,35,15,5"
  },
  heatmap: {
    zData: "1,20,30,50,1;20,1,60,80,30;30,60,1,5,20;50,80,5,1,40;1,30,20,40,1"
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  updateInputSection();
});

function setupEventListeners() {
  document.querySelectorAll('.chart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentChartType = this.dataset.type;
      updateInputSection();
    });
  });
}

function updateInputSection() {
  const inputSection = document.getElementById('inputSection');
  const config = chartConfigs[currentChartType];
  
  if (config) {
    inputSection.innerHTML = config.inputs;
  } else {
    // Generic input for chart types not specifically configured
    inputSection.innerHTML = `
      <div class="input-group">
        <div class="input-wrapper">
          <label>Data (JSON format)</label>
          <textarea id="jsonData" placeholder='{"x": [1,2,3], "y": [4,5,6]}' rows="4"></textarea>
          <button class="sample-data-btn" onclick="loadSample('${currentChartType}')">Load Sample</button>
        </div>
        <div class="input-wrapper">
          <label>Chart Title</label>
          <input type="text" id="title" placeholder="My Chart" value="Interactive ${currentChartType.charAt(0).toUpperCase() + currentChartType.slice(1)} Chart">
        </div>
      </div>
    `;
  }
}

function loadSample(type) {
  const sample = sampleData[type];
  if (sample) {
    Object.keys(sample).forEach(key => {
      const element = document.getElementById(key);
      if (element) {
        element.value = sample[key];
      }
    });
  }
}

function toggleAdvanced() {
  const options = document.getElementById('advancedOptions');
  options.style.display = options.style.display === 'block' ? 'none' : 'block';
}

function showError(message) {
  const errorMsg = document.getElementById('errorMsg');
  errorMsg.textContent = message;
  errorMsg.style.display = 'block';
  setTimeout(() => {
    errorMsg.style.display = 'none';
  }, 5000);
}

function showLoading(show) {
  document.getElementById('loading').style.display = show ? 'block' : 'none';
}

function parseEquation(input) {
  let expr = input.replace(/\^/g, '**');
  expr = expr.replace(/([a-zA-Z]+)\s*\(/g, function(match, fn) {
    const mathFns = ['sin','cos','tan','asin','acos','atan','atan2','log','log10','exp','sqrt','abs','floor','ceil','round','max','min','pow','random'];
    if (mathFns.includes(fn)) {
      return 'Math.' + fn + '(';
    }
    return match;
  });
  return expr;
}

function parseRange(rangeStr) {
  const parts = rangeStr.split(',');
  return [parseFloat(parts[0]), parseFloat(parts[1])];
}

function parseArray(str) {
  return str.split(',').map(s => {
    const num = parseFloat(s.trim());
    return isNaN(num) ? s.trim() : num;
  });
}

function generateVisualization() {
  showLoading(true);
  
  try {
    setTimeout(() => {
      const data = generateChartData();
      const layout = generateLayout();
      const config = {
        responsive: true,
        displayModeBar: true,
        modeBarButtonsToAdd: ['drawline', 'drawopenpath', 'drawclosedpath', 'drawcircle', 'drawrect', 'eraseshape'],
        displaylogo: false,
        toImageButtonOptions: {
          format: 'png',
          filename: `chart_${Date.now()}`,
          height: 700,
          width: 1200,
          scale: 2
        }
      };
      
      Plotly.newPlot('graph', data, layout, config);
      showLoading(false);
    }, 100);
  } catch (error) {
    showError('Error generating visualization: ' + error.message);
    showLoading(false);
  }
}

function generateChartData() {
  switch (currentChartType) {
    case 'mathgraph':
      return generateMathGraphData();
    case 'surface':
      return generateSurfaceData();
    case 'scatter3d':
      return generateScatter3DData();
    case 'line3d':
      return generateLine3DData();
    case 'mesh3d':
      return generateMesh3DData();
    case 'scatter':
      return generateScatterData();
    case 'line':
      return generateLineData();
    case 'bar':
      return generateBarData();
    case 'histogram':
      return generateHistogramData();
    case 'box':
      return generateBoxData();
    case 'violin':
      return generateViolinData();
    case 'heatmap':
      return generateHeatmapData();
    case 'contour':
      return generateContourData();
    case 'pie':
      return generatePieData();
    case 'sunburst':
      return generateSunburstData();
    case 'treemap':
      return generateTreemapData();
    case 'sankey':
      return generateSankeyData();
    case 'polar':
      return generatePolarData();
    case 'radar':
      return generateRadarData();
    case 'waterfall':
      return generateWaterfallData();
    case 'funnel':
      return generateFunnelData();
    default:
      throw new Error('Chart type not implemented');
  }
}

function generateMathGraphData() {
  const equation = document.getElementById('mathEquation').value;
  const xRange = parseRange(document.getElementById('mathXRange').value);
  const yRange = parseRange(document.getElementById('mathYRange').value);
  const resolution = parseInt(document.getElementById('mathResolution').value);
  const expr = parseEquation(equation);
  const step = (xRange[1] - xRange[0]) / resolution;
  const xData = [], yData = [], zData = [];
  for (let i = 0; i <= resolution; i++) {
    xData.push(xRange[0] + i * step);
    yData.push(yRange[0] + i * (yRange[1] - yRange[0]) / resolution);
  }
  for (let i = 0; i <= resolution; i++) {
    const row = [];
    for (let j = 0; j <= resolution; j++) {
      const x = xData[j];
      const y = yData[i];
      try {
        const z = Function("x", "y", "return " + expr)(x, y);
        row.push(isFinite(z) ? z : 0);
      } catch (e) {
        row.push(0);
      }
    }
    zData.push(row);
  }
  return [{
    type: 'surface',
    x: xData,
    y: yData,
    z: zData,
    colorscale: document.getElementById('colorScale').value,
    lighting: {
      ambient: 0.4,
      diffuse: 0.6,
      fresnel: 0.2,
      specular: 0.05,
      roughness: 0.05
    },
    contours: {
      z: {
        show: true,
        usecolormap: true,
        highlightcolor: "#42f462",
        project: {z: true}
      }
    }
  }];
}

function generateSurfaceData() {
  const equation = document.getElementById('equation').value;
  const xRange = parseRange(document.getElementById('xRange').value);
  const yRange = parseRange(document.getElementById('yRange').value);
  const resolution = parseInt(document.getElementById('resolution').value);
  
  const expr = parseEquation(equation);
  const step = (xRange[1] - xRange[0]) / resolution;
  const xData = [], yData = [], zData = [];
  
  for (let i = 0; i <= resolution; i++) {
    xData.push(xRange[0] + i * step);
    yData.push(yRange[0] + i * (yRange[1] - yRange[0]) / resolution);
  }
  
  for (let i = 0; i <= resolution; i++) {
    const row = [];
    for (let j = 0; j <= resolution; j++) {
      const x = xData[j];
      const y = yData[i];
      try {
        const z = Function("x", "y", "return " + expr)(x, y);
        row.push(isFinite(z) ? z : 0);
      } catch (e) {
        row.push(0);
      }
    }
    zData.push(row);
  }
  
  return [{
    type: 'surface',
    x: xData,
    y: yData,
    z: zData,
    colorscale: document.getElementById('colorScale').value,
    lighting: {
      ambient: 0.4,
      diffuse: 0.6,
      fresnel: 0.2,
      specular: 0.05,
      roughness: 0.05
    },
    contours: {
      z: {
        show: true,
        usecolormap: true,
        highlightcolor: "#42f462",
        project: {z: true}
      }
    }
  }];
}

function generateScatterData() {
  const xData = parseArray(document.getElementById('xData').value);
  const yData = parseArray(document.getElementById('yData').value);
  const markerSize = parseInt(document.getElementById('markerSize').value) || 8;
  
  return [{
    type: 'scatter',
    mode: 'markers',
    x: xData,
    y: yData,
    marker: {
      size: markerSize,
      color: xData.map((_, i) => i),
      colorscale: document.getElementById('colorScale').value,
      line: {
        color: 'white',
        width: 1
      }
    },
    hovertemplate: '<b>X:</b> %{x}<br><b>Y:</b> %{y}<extra></extra>'
  }];
}

function generateLineData() {
  const xData = parseArray(document.getElementById('xData').value);
  const yData = parseArray(document.getElementById('yData').value);
  const lineWidth = parseInt(document.getElementById('lineWidth').value) || 3;
  
  return [{
    type: 'scatter',
    mode: 'lines+markers',
    x: xData,
    y: yData,
    line: {
      width: lineWidth,
      color: '#667eea'
    },
    marker: {
      size: 8,
      color: '#764ba2'
    },
    hovertemplate: '<b>X:</b> %{x}<br><b>Y:</b> %{y}<extra></extra>'
  }];
}

function generateBarData() {
  const categories = parseArray(document.getElementById('categories').value);
  const values = parseArray(document.getElementById('values').value);
  const orientation = document.getElementById('orientation').value;
  
  return [{
    type: 'bar',
    x: orientation === 'v' ? categories : values,
    y: orientation === 'v' ? values : categories,
    orientation: orientation,
    marker: {
      color: values.map((_, i) => i),
      colorscale: document.getElementById('colorScale').value,
      line: {
        color: 'white',
        width: 1
      }
    },
    hovertemplate: '<b>Category:</b> %{' + (orientation === 'v' ? 'x' : 'y') + '}<br><b>Value:</b> %{' + (orientation === 'v' ? 'y' : 'x') + '}<extra></extra>'
  }];
}

function generatePieData() {
  const labels = parseArray(document.getElementById('labels').value);
  const values = parseArray(document.getElementById('values').value);
  const holeSize = parseFloat(document.getElementById('holeSize').value) || 0;
  
  return [{
    type: 'pie',
    labels: labels,
    values: values,
    hole: holeSize,
    textinfo: 'label+percent',
    textposition: 'auto',
    marker: {
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF']
    },
    hovertemplate: '<b>%{label}</b><br>Value: %{value}<br>Percent: %{percent}<extra></extra>'
  }];
}

function generateHeatmapData() {
  const zDataStr = document.getElementById('zData').value;
  const xLabels = parseArray(document.getElementById('xLabels').value);
  const yLabels = parseArray(document.getElementById('yLabels').value);
  
  const zData = zDataStr.split(';').map(row => parseArray(row));
  
  return [{
    type: 'heatmap',
    z: zData,
    x: xLabels,
    y: yLabels,
    colorscale: document.getElementById('colorScale').value,
    hoverongaps: false,
    hovertemplate: '<b>X:</b> %{x}<br><b>Y:</b> %{y}<br><b>Value:</b> %{z}<extra></extra>'
  }];
}

// Additional chart type generators
function generateScatter3DData() {
  // Generate sample 3D scatter data
  const n = 100;
  const x = [], y = [], z = [];
  
  for (let i = 0; i < n; i++) {
    x.push(Math.random() * 20 - 10);
    y.push(Math.random() * 20 - 10);
    z.push(Math.random() * 20 - 10);
  }
  
  return [{
    type: 'scatter3d',
    mode: 'markers',
    x: x,
    y: y,
    z: z,
    marker: {
      size: 5,
      color: z,
      colorscale: document.getElementById('colorScale').value,
      opacity: 0.8
    },
    hovertemplate: '<b>X:</b> %{x}<br><b>Y:</b> %{y}<br><b>Z:</b> %{z}<extra></extra>'
  }];
}

function generateLine3DData() {
  const t = [];
  const x = [], y = [], z = [];
  
  for (let i = 0; i <= 100; i++) {
    const ti = i * 0.1;
    t.push(ti);
    x.push(Math.sin(ti));
    y.push(Math.cos(ti));
    z.push(ti * 0.1);
  }
  
  return [{
    type: 'scatter3d',
    mode: 'lines+markers',
    x: x,
    y: y,
    z: z,
    line: {
      width: 6,
      color: '#667eea'
    },
    marker: {
      size: 3,
      color: '#764ba2'
    }
  }];
}

function generateMesh3DData() {
  return [{
    type: 'mesh3d',
    x: [0, 1, 2, 0],
    y: [0, 0, 1, 2],
    z: [0, 2, 0, 1],
    i: [0, 0, 0, 1],
    j: [1, 2, 3, 2],
    k: [2, 3, 1, 3],
    opacity: 0.8,
    color: '#667eea'
  }];
}

function generateHistogramData() {
  // Generate sample histogram data
  const data = [];
  for (let i = 0; i < 1000; i++) {
    data.push(Math.random() * 100);
  }
  
  return [{
    type: 'histogram',
    x: data,
    nbinsx: 30,
    marker: {
      color: '#667eea',
      opacity: 0.7,
      line: {
        color: 'white',
        width: 1
      }
    }
  }];
}

function generateBoxData() {
  const datasets = [
    { name: 'Group A', data: Array.from({length: 100}, () => Math.random() * 50 + 25) },
    { name: 'Group B', data: Array.from({length: 100}, () => Math.random() * 40 + 30) },
    { name: 'Group C', data: Array.from({length: 100}, () => Math.random() * 60 + 20) }
  ];
  
  return datasets.map((dataset, i) => ({
    type: 'box',
    y: dataset.data,
    name: dataset.name,
    boxpoints: 'outliers',
    marker: {
      color: ['#FF6B6B', '#4ECDC4', '#45B7D1'][i]
    }
  }));
}

function generateViolinData() {
  const datasets = [
    { name: 'Group A', data: Array.from({length: 100}, () => Math.random() * 50 + 25) },
    { name: 'Group B', data: Array.from({length: 100}, () => Math.random() * 40 + 30) }
  ];
  
  return datasets.map((dataset, i) => ({
    type: 'violin',
    y: dataset.data,
    name: dataset.name,
    box: { visible: true },
    meanline: { visible: true },
    fillcolor: ['#FF6B6B', '#4ECDC4'][i],
    opacity: 0.6,
    line: { color: 'black' }
  }));
}

function generateContourData() {
  const size = 50;
  const x = [], y = [], z = [];
  
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      const xi = (i - size/2) * 0.4;
      const yi = (j - size/2) * 0.4;
      row.push(Math.sin(xi) * Math.cos(yi) * Math.exp(-(xi*xi + yi*yi) * 0.1));
    }
    z.push(row);
  }
  
  return [{
    type: 'contour',
    z: z,
    colorscale: document.getElementById('colorScale').value,
    contours: {
      showlabels: true,
      labelfont: {
        family: 'Raleway',
        size: 12,
        color: 'white'
      }
    }
  }];
}

function generateSunburstData() {
  return [{
    type: 'sunburst',
    labels: ['Root', 'A', 'B', 'C', 'A1', 'A2', 'B1', 'B2', 'C1'],
    parents: ['', 'Root', 'Root', 'Root', 'A', 'A', 'B', 'B', 'C'],
    values: [0, 5, 3, 4, 2, 3, 1, 2, 4],
    branchvalues: 'total',
    hovertemplate: '<b>%{label}</b><br>Value: %{value}<br>Percent: %{percentParent}<extra></extra>'
  }];
}

function generateTreemapData() {
  return [{
    type: 'treemap',
    labels: ['Root', 'A', 'B', 'C', 'A1', 'A2', 'B1', 'B2'],
    parents: ['', 'Root', 'Root', 'Root', 'A', 'A', 'B', 'B'],
    values: [0, 5, 3, 4, 2, 3, 1, 2],
    textinfo: 'label+value',
    hovertemplate: '<b>%{label}</b><br>Value: %{value}<extra></extra>'
  }];
}

function generateSankeyData() {
  return [{
    type: 'sankey',
    node: {
      pad: 15,
      thickness: 20,
      line: { color: 'black', width: 0.5 },
      label: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3']
    },
    link: {
      source: [0, 1, 0, 2, 3, 3],
      target: [2, 3, 3, 4, 4, 5],
      value: [8, 4, 2, 8, 4, 2]
    }
  }];
}

function generatePolarData() {
  const r = [], theta = [];
  
  for (let i = 0; i <= 360; i += 5) {
    theta.push(i);
    r.push(1 + Math.sin(i * Math.PI / 180 * 4));
  }
  
  return [{
    type: 'scatterpolar',
    r: r,
    theta: theta,
    mode: 'lines',
    line: { color: '#667eea', width: 3 },
    fill: 'toself',
    fillcolor: 'rgba(102, 126, 234, 0.3)'
  }];
}

function generateRadarData() {
  const categories = ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'];
  const values1 = [4, 3, 5, 4, 3];
  const values2 = [3, 5, 4, 3, 5];
  
  return [
    {
      type: 'scatterpolar',
      r: values1.concat([values1[0]]),
      theta: categories.concat([categories[0]]),
      fill: 'toself',
      name: 'Product A',
      line: { color: '#FF6B6B' },
      fillcolor: 'rgba(255, 107, 107, 0.3)'
    },
    {
      type: 'scatterpolar',
      r: values2.concat([values2[0]]),
      theta: categories.concat([categories[0]]),
      fill: 'toself',
      name: 'Product B',
      line: { color: '#4ECDC4' },
      fillcolor: 'rgba(78, 205, 196, 0.3)'
    }
  ];
}

function generateWaterfallData() {
  return [{
    type: 'waterfall',
    name: '2023',
    orientation: 'v',
    measure: ['relative', 'relative', 'relative', 'relative', 'total'],
    x: ['Sales', 'Consulting', 'Net revenue', 'Purchases', 'Profit before tax'],
    textposition: 'outside',
    text: ['+60', '+80', '', '-40', 'Total'],
    y: [60, 80, 0, -40, 0],
    connector: { line: { color: 'rgb(63, 63, 63)' } }
  }];
}

function generateFunnelData() {
  return [{
    type: 'funnel',
    y: ['Website visit', 'Downloads', 'Potential customers', 'Requested price', 'Finalized'],
    x: [13873, 10553, 5443, 3703, 1708],
    textinfo: 'value+percent initial',
    marker: {
      color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57']
    }
  }];
}

function generateLayout() {
  const title = document.getElementById('title')?.value || `Interactive ${currentChartType.charAt(0).toUpperCase() + currentChartType.slice(1)} Chart`;
  const bgColor = document.getElementById('bgColor').value;
  const gridColor = document.getElementById('gridColor').value;
  
  const baseLayout = {
    title: {
      text: title,
      font: { size: 24, color: '#333' },
      x: 0.5
    },
    paper_bgcolor: bgColor,
    plot_bgcolor: bgColor,
    font: { family: 'Segoe UI, Arial, sans-serif', size: 12 },
    hovermode: 'closest',
    showlegend: true,
    legend: {
      orientation: 'h',
      y: -0.2,
      x: 0.5,
      xanchor: 'center'
    }
  };
  
  // Add specific layout configurations for different chart types
  if (['surface', 'scatter3d', 'line3d', 'mesh3d'].includes(currentChartType)) {
    baseLayout.scene = {
      xaxis: { 
        title: 'X Axis', 
        gridcolor: gridColor,
        backgroundcolor: bgColor
      },
      yaxis: { 
        title: 'Y Axis', 
        gridcolor: gridColor,
        backgroundcolor: bgColor
      },
      zaxis: { 
        title: 'Z Axis', 
        gridcolor: gridColor,
        backgroundcolor: bgColor
      },
      camera: {
        eye: { x: 1.5, y: 1.5, z: 1.5 }
      }
    };
  } else if (['polar', 'radar'].includes(currentChartType)) {
    baseLayout.polar = {
      radialaxis: { visible: true },
      angularaxis: { direction: 'counterclockwise' }
    };
  } else {
    baseLayout.xaxis = {
      title: 'X Axis',
      gridcolor: gridColor,
      zerolinecolor: gridColor
    };
    baseLayout.yaxis = {
      title: 'Y Axis',
      gridcolor: gridColor,
      zerolinecolor: gridColor
    };
  }
  
  // Add animations
  baseLayout.transition = {
    duration: parseInt(document.getElementById('animationSpeed')?.value || 500),
    easing: 'cubic-in-out'
  };
  
  return baseLayout;
}
