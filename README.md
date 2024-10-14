# Tokenization Project

## Overview

The Tokenization Project is a web application built with Node.js and Express that allows users to input a sentence and visualize the tokenization process in a 3D plot.
Utilizing the `natural` library for text processing and `Plotly.js` for data visualization, the app breaks down user input into individual tokens and provides insights into their lengths and randomness.
### 1. Home Page
![{76D0C69E-83FE-454D-8D82-83BFD07E7292}](https://github.com/user-attachments/assets/a1d7117e-2a05-4e4c-a3cc-a539bee22b8c)


### How It Works

1. Users enter a sentence into a form.
2. The application tokenizes the input sentence into words.
3. It generates a 3D scatter plot displaying:
   - The token index (x-axis)
   - The length of each token (y-axis)
   - A random z-value to add dimension to the plot.
4. The app calculates and predicts the average token length as a simple prediction for the next token.

## Features

- **User-Friendly Interface**: Easy-to-use form for entering sentences.
- **Tokenization**: Utilizes the `natural` library for breaking down sentences into tokens.
- **3D Visualization**: Displays token information in a visually appealing 3D scatter plot using Plotly.js.
- **Dynamic Predictions**: Calculates and displays the predicted length of the next token based on the average token length.
- **Responsive Design**: The application is responsive and works on various devices.
### 2. Tokenization Result Page
![{4DB1109F-27A8-4E12-A82F-136DC6E9CD03}](https://github.com/user-attachments/assets/dca4c053-fa50-4ff5-b5d9-69ee79cc7986)
### 3. 3D Plot Visualization
![{255BE419-6131-4C5C-A58A-1F49F509B7A1}](https://github.com/user-attachments/assets/ae2ef072-712b-4830-82a1-cd2206399e84)



## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/tokenization-project.git
   cd tokenization-project
   npm install
   node app.js


