const express = require('express');
const natural = require('natural');

const app = express();

// Use middleware to handle form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tokenizer function using 'natural'
const tokenizer = new natural.WordTokenizer();

// Home route to take user input
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Tokenize and Plot</title>
                <!-- Bootstrap CSS -->
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        padding: 20px;
                        font-family: Arial, sans-serif;
                    }
                    h1 {
                        text-align: center;
                        color: #007bff;
                    }
                    form {
                        max-width: 600px;
                        margin: auto;
                        padding: 20px;
                        background-color: #f8f9fa;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    }
                    .result-container {
                        margin-top: 40px;
                    }
                    .chart-container {
                        margin-top: 20px;
                        width: 90%;
                        max-width: 900px;
                        margin: auto;
                    }
                </style>
            </head>
            <body>
                <h1>Tokenize, Plot and Predict</h1>
                <form action="/tokenize" method="post">
                    <div class="mb-3">
                        <label for="sentence" class="form-label">Enter a sentence:</label>
                        <input type="text" class="form-control" id="sentence" name="sentence" placeholder="Type a sentence" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Tokenize and Plot</button>
                </form>
            </body>
        </html>
    `);
});

// Route to handle tokenization and plotting
app.post('/tokenize', (req, res) => {
    const sentence = req.body.sentence;
    const tokens = tokenizer.tokenize(sentence);

    // Print the tokens
    console.log("Tokens: ", tokens);

    // Create data for 3D plot and Bar chart
    const x = [];
    const y = [];
    const z = [];
    const colors = [];
    const barData = [];
    const backgroundColors = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6610f2', '#20c997', '#17a2b8'];

    // Generate random data for each token and prepare arrays for plotting
    tokens.forEach((token, index) => {
        x.push(index); // Token index as 'x'
        y.push(token.length);  // Token length as 'y'
        z.push(Math.random() * 10);  // Random 'z' value
        barData.push(token.length); // Bar chart token length

        // Randomly assign colors to each token for the 3D plot
        colors.push(backgroundColors[Math.floor(Math.random() * backgroundColors.length)]);
    });

    // Calculate the prediction: Average token length as a simple "prediction"
    const avgTokenLength = tokens.reduce((acc, token) => acc + token.length, 0) / tokens.length;
    const predictedTokenLength = avgTokenLength.toFixed(2); // Limit prediction to 2 decimal places

    // Serve the HTML with embedded Plotly.js and Chart.js
    res.send(`
        <html>
            <head>
                <title>Token Plot Results</title>
                <!-- Bootstrap CSS -->
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
                <!-- Plotly.js and Chart.js from CDN -->
                <script src="https://cdn.plot.ly/plotly-2.35.2.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                <style>
                    h1, h2 {
                        text-align: center;
                        margin-top: 20px;
                    }
                    .result-container {
                        margin-top: 40px;
                        padding: 20px;
                    }
                    .chart-container {
                        margin: auto;
                        width: 90%;
                        max-width: 900px;
                    }
                </style>
            </head>
            <body>
                <h1>3D Token Plot with Bar Chart</h1>
                <div class="result-container">
                    <h2>Tokens: ${tokens.join(', ')}</h2>
                    <p><strong>Prediction:</strong> The predicted next token length is: ${predictedTokenLength} characters</p>
                </div>
                <div class="chart-container">
                    <h2>Token Length Bar Chart</h2>
                    <canvas id="barChart"></canvas>
                </div>
                <div class="chart-container">
                    <h2>3D Token Plot</h2>
                    <div id="plot"></div>
                </div>
                
                <!-- Bar Chart with Chart.js -->
                <script>
                    const ctx = document.getElementById('barChart').getContext('2d');
                    const barChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ${JSON.stringify(tokens)},
                            datasets: [{
                                label: 'Token Length',
                                data: ${JSON.stringify(barData)},
                                backgroundColor: ${JSON.stringify(backgroundColors)},
                            }]
                        },
                        options: {
                            scales: {
                                y: { beginAtZero: true }
                            }
                        }
                    });
                </script>

                <!-- 3D Token Plot with Plotly.js -->
                <script>
                    const trace = {
                        x: ${JSON.stringify(x)},
                        y: ${JSON.stringify(y)},
                        z: ${JSON.stringify(z)},
                        mode: 'markers+text',
                        marker: {
                            size: 12,
                            color: ${JSON.stringify(colors)},
                            line: {
                                width: 1
                            }
                        },
                        text: ${JSON.stringify(tokens)},
                        textposition: 'top center',
                        type: 'scatter3d'
                    };

                    const layout = {
                        title: '3D Token Plot',
                        scene: {
                            xaxis: { title: 'Token Index' },
                            yaxis: { title: 'Token Length' },
                            zaxis: { title: 'Random Z' }
                        }
                    };

                    const data = [trace];
                    Plotly.newPlot('plot', data, layout);
                </script>
            </body>
        </html>
    `);
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
